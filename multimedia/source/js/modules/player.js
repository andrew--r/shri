import {
	formatSeconds,
	formattedTimeToSeconds,
	getRandomInt,
	getRandom,
	webgl,
} from '../helpers';

import grayscaleVertexShaderSource from '../shaders/grayscaleVertexShader';
import grayscaleFragmentShaderSource from '../shaders/grayscaleFragmentShader';


const baseClass = 'player';
const classes = {
	base: baseClass,
	stage: {
		base: `${baseClass}__stage`,
	},
	canvas: {
		base: `${baseClass}__canvas`,
	},
	playButton: {
		base: `${baseClass}__control_state`,
		paused: `${baseClass}__control_state_play`,
		playing: `${baseClass}__control_state_pause`,
	},
	time: {
		base: 'time',
		watched: 'time__watched',
		total: 'time__total',
	},
	fakeVideo: {
		base: `${baseClass}__fakeVideo`,
	},
	progress: {
		base: 'progress',
		bar: 'progress__bar',
	},
};

export default class Player {
	/**
	 * @param {Object} root - root DOM node for player
	 * @param {Object} resources - list of resources urls to use (video, soundtrack, subtitles)
	 */
	constructor({root, resources}) {
		this.elements = {
			root,
			stage: root.querySelector(`.${classes.stage.base}`),
			canvas: root.querySelector(`.${classes.canvas.base}`),
			playButton: root.querySelector(`.${classes.playButton.base}`),
			timeWatched: root.querySelector(`.${classes.time.watched}`),
			timeTotal: root.querySelector(`.${classes.time.total}`),
			progressBar: root.querySelector(`.${classes.progress.bar}`),
		};

		this.state = {
			isPlaying: false,
			videoIsPlaying: false,
			audioIsPlaying: false,
		};

		Promise
			.all([
				loadVideo(resources.video),
				loadAudio(resources.soundtrack),
				loadTextFile(resources.subtitles),
			])
			.then((result) => {
				this.video = result[0];
				this.audio = result[1];
				this.subtitles = parseSubtitles(result[2]);

				this._setupCanvas();
				this._setupTiming();
				this._setupSound();

				this.elements.root.classList.add(`${classes.base}_initialized`);
				this.play();
			});
	}

	/**
	 * Creates all contexts and sets sizes
	 */
	_setupCanvas() {
		const {video, elements} = this;

		const virtualCanvas = elements.virtualCanvas = document.createElement('canvas');

		this.context = elements.canvas.getContext('2d');
		this.virtualContext = virtualCanvas.getContext('2d');

		elements.canvas.width = virtualCanvas.width = video.videoWidth;
		elements.canvas.height = virtualCanvas.height = video.videoHeight;
	}

	_setupTiming() {
		const subtitlesDuration = this.subtitles.reduce((result, slideData) => result + slideData.duration, 0);
		const videoDuration = Math.round(this.video.duration);
		const duration = videoDuration + subtitlesDuration;

		this.timing = {
			duration,
			watchedSeconds: 0,
			prevWatchedSecond: 0,
			lastFrameTimestamp: null,
		};

		this.timeline = computeTimeline(this.subtitles, duration);

		this._updateTotalTime();
	}

	_setupSound() {
		const audioContext = this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const audioSource = this.audioSource = audioContext.createMediaElementSource(this.audio);
		const brownNoise = (function() {
			const bufferSize = 4096;
			let lastOut = 0.0;
			const node = audioContext.createScriptProcessor(bufferSize, 1, 1);
			node.onaudioprocess = function(e) {
				const output = e.outputBuffer.getChannelData(0);
				for (let i = 0; i < bufferSize; i++) {
					const white = Math.random() * 2 - 1;
					output[i] = (lastOut + (0.02 * white)) / 1.02;
					lastOut = output[i];
					output[i] *= 0.5; // (roughly) compensate for gain
				}
			}
			return node;
		})();

		brownNoise.connect(audioContext.destination);

		const distortion = audioContext.createWaveShaper();
		const biquadFilter = audioContext.createBiquadFilter();
		biquadFilter.type = 'lowpass';
		biquadFilter.frequency.value = 500;
		biquadFilter.gain.value = 5;

		audioSource.connect(distortion);
		distortion.connect(biquadFilter);
		biquadFilter.connect(audioContext.destination);
	}

	_playSoundtrack() {
		if (!this.state.audioIsPlaying) {
			this.audio.play();
			this.audioContext.resume();
			this.state.audioIsPlaying = true;
		}
	}

	_playVideo() {
		if (!this.state.videoIsPlaying) {
			this.video.play();
			this.state.videoIsPlaying = true;
		}
	}

	_pauseSoundtrack() {
		if (this.state.audioIsPlaying) {
			this.audio.pause();
			this.audioContext.suspend();
			this.state.audioIsPlaying = false;
		}
	}

	_pauseVideo() {
		if (this.state.videoIsPlaying) {
			this.video.pause();
			this.state.videoIsPlaying = false;
		}
	}

	_updateTotalTime() {
		this.elements.timeTotal.innerText = formatSeconds(this.timing.duration);
	}

	_updateWatchedTime(seconds) {
		const {watchedSeconds, prevWatchedSeconds, duration} = this.timing;
		if (Math.floor(prevWatchedSeconds) === Math.floor(watchedSeconds)) return;
		this.elements.progressBar.style.transform = `translate(${-100 + (watchedSeconds / duration * 100)}%, 0)`;
		this.elements.timeWatched.innerText = formatSeconds(watchedSeconds);
	}

	_updateTiming() {
		const {timing} = this;
		const currentFrameTimestamp = new Date();

		if (!timing.lastFrameTimestamp) {
			timing.lastFrameTimestamp = currentFrameTimestamp;
		}

		timing.prevWatchedSeconds = timing.watchedSeconds;
		timing.watchedSeconds += (currentFrameTimestamp - timing.lastFrameTimestamp) / 1000;
		timing.lastFrameTimestamp = currentFrameTimestamp;

		this._updateWatchedTime();
	}

	_updateCanvas() {
		const {elements, virtualContext, timing} = this;
		const {width, height} = elements.canvas;

		const findFrameData = (time) => ({start, end}) => start <= time && end > time;
		const currentFrameData = this.timeline.find(findFrameData(timing.watchedSeconds));

		virtualContext.clearRect(0, 0, width, height);

		if (currentFrameData.type === 'video') {
			this._playVideo();
			this.textWasDrawn = false;
			virtualContext.drawImage(this.video, 0, 0, width, height);
		}

		if (currentFrameData.type === 'subtitles') {
			this._pauseVideo();
			this._drawSubtitles(currentFrameData.text);
		}

		this._applyEffects();
	}

	_drawSubtitles(text) {
		if (this.textWasDrawn) return;

		const {virtualContext, elements} = this;
		const {width, height} = elements.canvas;

		virtualContext.fillStyle = '#000000';
		virtualContext.font = '20px Oranienbaum';
		virtualContext.fillRect(0, 0, width, height);
		virtualContext.fillStyle = '#ffffff';

		const heightStart = height * 0.1;
		const widthStart = width * 0.05;
		const lineHeight = 28;

		text
			.split('\n')
			.map((row, i) => {
				virtualContext.fillText(row, widthStart, heightStart + i * lineHeight);
			});

		this.textWasDrawn = true;
	}

	_applyEffects() {
		const {context, elements} = this;
		const {width, height} = elements.virtualCanvas;

		context.fillStyle = '#ffffff';
		context.clearRect(0, 0, width, height);
		context.drawImage(elements.virtualCanvas, 0, 0, width, height);
		context.globalCompositeOperation = 'color';
		context.fillRect(0, 0, width, height);

		context.globalCompositeOperation = 'source-over';
		drawRandomArtifact(context, width, height);
		drawRandomArtifact(context, width, height);
		drawRandomArtifact(context, width, height);
	}

	_applyGrayscale(pixelData) {
		const pixels = pixelData.data;
		const pixelsLength = pixels.length;
		const brightnessCoefficient = getRandom(0.9, 1.1);

		for (let i = 0; i < pixelsLength; i += 4) {
			const r = pixels[i];
			const g = pixels[i + 1];
			const b = pixels[i + 2];
			const a = pixels[i + 3];
			const average = (0.21 * r + 0.72 * g + 0.07 * b) * brightnessCoefficient;

			pixels[i] = pixels[i + 1] = pixels[i + 2] = average;
		}

		return pixelData;
	}

	_drawFrame() {
		if (!this.state.isPlaying) return;

		window.requestAnimationFrame(() => {
			this._updateTiming();
			this._updateCanvas();
			this._drawFrame();
		});
	}

	// Public methods

	play() {
		const {elements,} = this;

		this.lastFrameTimestamp = new Date();
		this.state.isPlaying = true;

		elements.playButton.classList.remove(classes.playButton.paused);
		elements.playButton.classList.add(classes.playButton.playing);

		this._playSoundtrack();
		this._playVideo();
		this._drawFrame();
	}

	pause() {
		const {elements} = this;

		this.state.isPlaying = false;

		elements.playButton.classList.remove(classes.playButton.playing);
		elements.playButton.classList.add(classes.playButton.paused);

		this._pauseSoundtrack();
		this._pauseVideo();
	}
}


function loadVideo(url) {
	return new Promise((resolve, reject) => {
		ensureFileLoaded(url)
			.then((result) => {
				const video = document.createElement('video');
				video.defaultMuted = true;
				video.addEventListener('error', reject);
				video.addEventListener('canplaythrough', (event) => {
					resolve(video);
				});
				video.src = url;
			})
			.catch(reject);
	});
}

function loadAudio(url) {
	return new Promise((resolve, reject) => {
		ensureFileLoaded(url)
			.then((result) => {
				const audio = document.createElement('audio');
				audio.addEventListener('error', reject);
				audio.addEventListener('canplaythrough', (event) => {
					audio.loop = true;
					resolve(audio);
				});
				audio.src = url;
			})
			.catch(reject);
	});
}

function loadTextFile(url) {
	return fetch(url).then((response) => response.text());
}

function ensureFileLoaded(url) {
	return fetch(url).then((response) => response.blob());
}

function parseSubtitles(source) {
	return source
		.split('\n\n')
		.map((slide) => {
			const data = slide.split('\n');
			const timing = data[1].split(' --> ');
			const result = {
				id: null,
				start: null,
				end: null,
				duration: null,
				text: null,
			};

			result.id = parseInt(data[0], 10);
			result.start = formattedTimeToSeconds(timing[0]);
			result.duration = formattedTimeToSeconds(timing[1]) - result.start;
			result.end = result.start + result.duration;
			result.text = data.slice(2).join('\n');
			
			return result;
		});
}

function computeTimeline(parsedSubtitles, totalDuration) {
	// subtitles affects original timing,
	// so every time we show subtitles we just memorize their duration
	// and then consider it in further computations.
	let passedSubtitlesTime = 0;

	return parsedSubtitles.reduce((result, slide, index, array) => {
		const nextSlide = array[index + 1];
		const prevSlide = (array[index - 1] || {
			start: 0,
			end: 0,
			duration: 0,
			isSynthethic: true,
		});

		const prevEnd = prevSlide.end + passedSubtitlesTime;
		const currentStart = slide.start + passedSubtitlesTime;
		const currentEnd = slide.end + passedSubtitlesTime;
		const nextStart = nextSlide && nextSlide.start + passedSubtitlesTime;

		if (prevSlide.end < slide.start) {
			result.push({
				start: prevEnd,
				end: currentStart,
				type: 'video',
			});
		}

		result.push({
			start: currentStart,
			end: currentEnd,
			type: 'video',
		});

		result.push({
			start: currentEnd,
			end: currentEnd + slide.duration,
			type: 'subtitles',
			text: slide.text,
		});

		passedSubtitlesTime += slide.duration;

		if (!nextSlide) {
			result.push({
				start: slide.end + passedSubtitlesTime,
				end: totalDuration,
				duration: totalDuration - slide.end + passedSubtitlesTime,
				type: 'video',
			});
		}

		return result;
	}, []);
}

function drawRandomArtifact(context, width, height) {
	const center = {
		x: getRandomInt(0, width),
		y: getRandomInt(0, height),
	};

	const coefficient = 2.5;

	const firstPoint = {
		x: getRandomInt(center.x - coefficient, center.x + coefficient),
		y: getRandomInt(center.y - coefficient, center.y + coefficient),
	};

	const secondPoint = {
		x: getRandomInt(center.x - coefficient, center.x + coefficient),
		y: getRandomInt(center.y - coefficient, center.y + coefficient),
	};

	const baseColor = getRandomInt(0, 150);
	context.strokeStyle = `rgb(${baseColor}, ${baseColor}, ${baseColor})`;
	context.lineWidth = 10;
	context.beginPath();
		context.moveTo(firstPoint.x, firstPoint.y);
		context.quadraticCurveTo(
			center.x,
			center.y,
			secondPoint.x,
			secondPoint.y
		);
	context.stroke();
}
