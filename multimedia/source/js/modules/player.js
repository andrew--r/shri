import {
	formatSeconds,
	formattedTimeToSeconds,
	getRandomInt,
	getRandom,
} from '../helpers';


const DEFAULTS = {
	maxCollisionLineLength: 150,
};

export default class Player {
	constructor({root, resources}) {
		const baseClass = 'player';
		const classes = this.classes = {
			base: baseClass,
			stage: {
				base: `${baseClass}__stage`,
			},
			canvas: {
				base: `${baseClass}__canvas`,
			},
			subtitles: {
				base: `${baseClass}__subtitles`,
				visible: `${baseClass}__subtitles_visible`,
			},
			playButton: {
				base: `${baseClass}__control_state`,
				paused: `${baseClass}__control_state_play`,
				playing: `${baseClass}__control_state_pause`,
			},
			video: {
				base: `${baseClass}__video`,
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

		const elements = this.elements = {
			root,
			stage: root.querySelector(`.${classes.stage.base}`),
			canvas: root.querySelector(`.${classes.canvas.base}`),
			subtitles: root.querySelector(`.${classes.subtitles.base}`),
			playButton: root.querySelector(`.${classes.playButton.base}`),
			timeWatched: root.querySelector(`.${classes.time.watched}`),
			timeTotal: root.querySelector(`.${classes.time.total}`),
			progressBar: root.querySelector(`.${classes.progress.bar}`),
		};

		this.state = {
			videoIsPlaying: false,
			audioIsPlaying: false,
		};

		this.canvasContext = this.elements.canvas.getContext('2d');

		this.isPlaying = false;

		Promise
			.all([
				this._loadVideo(resources.video),
				this._loadSoundtrack(resources.soundtrack),
				this._loadSubtitles(resources.subtitles),
			])
			.then((result) => {
				this.video = result[0];
				this.soundtrack = result[1];
				this.subtitles = result[2];

				this._setupCanvas();
				this._parseSubtitles();
				this._setupTiming();
				this._setupSound();
				this._addEventListeners();

				elements.root.classList.add(`${classes.base}_initialized`);
				this.play();
			});

		this._onPlayToggle = onPlayToggle.bind(this);

		function onPlayToggle(event) {
			event.preventDefault();
			this[this.isPlaying ? 'pause': 'play']();
		}

		this.counter = 0;

		// debug only
		window.player = this;
	}

	_setupCanvas() {
		const {video, canvasContext, elements: {canvas, stage}} = this;
		const canvasSize = this.canvasSize = this._computeCanvasSize();
		const virtualCanvas = this.virtualCanvas = document.createElement('canvas');
		const virtualCanvasContext = this.virtualCanvasContext = this.virtualCanvas.getContext('2d');

		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;
		virtualCanvas.width = canvasSize.width;
		virtualCanvas.height = canvasSize.height;

		this._drawFrame();
	}

	_parseSubtitles() {
		this.subtitles = this.subtitles
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

		let passedSubtitlesTime = 0;
		let subtitlesSequenceTime = 0;

		this.timeline = this.subtitles.reduce((result, slide, index, array) => {
			const isLast = index === array.length - 1;
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

			passedSubtitlesTime += slide.duration + subtitlesSequenceTime;

			if (!nextSlide) {
				result.push({
					start: slide.end + passedSubtitlesTime,
					end: duration,
					duration: duration - slide.end + passedSubtitlesTime,
					type: 'video',
				});
			}

			return result;
		}, []);

		this._updateTotalTime();
	}

	_setupSound() {
		const audioContext = this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const audioSource = this.audioSource = audioContext.createMediaElementSource(this.elements.audio);
		const bufferSize = 4096;
		const brownNoise = (function() {
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

	_addEventListeners() {
		const {elements} = this;

		// elements.playButton.addEventListener('click', this._onPlayToggle);
		// elements.stage.addEventListener('click', this._onPlayToggle);
	}

	_removeEventListeners() {
		const {elements} = this;

		// elements.playButton.removeEventListener('click', this._onPlayButtonClick);
		// elements.stage.removeEventListener('click', this._onPlayToggle);
	}

	_loadVideo(url) {
		return new Promise((resolve, reject) => {
			const {elements} = this;
			const video = document.createElement('video');
			video.defaultMuted = true;
			video.classList.add(this.classes.video.base);
			elements.stage.appendChild(video);

			video.addEventListener('error', reject);
			video.addEventListener('canplaythrough', (event) => {
				resolve(video);
			});

			video.src = url;
		});
	}

	_loadSoundtrack(url) {
		return new Promise((resolve, reject) => {
			const {elements} = this;
			const audio = elements.audio = document.createElement('audio');
			audio.classList.add(`${this.classes.base}__audio`);
			elements.stage.appendChild(audio);

			audio.addEventListener('error', reject);
			audio.addEventListener('canplaythrough', (event) => {
				audio.loop = true;
				resolve(audio);
			});

			audio.src = url;
		});
	}

	_loadSubtitles(url) {
		return fetch(url).then((response) => {
			return response.text();
		});
	}

	_playSoundtrack() {
		if (!this.state.audioIsPlaying) {
			this.soundtrack.play();
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
			this.soundtrack.pause();
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
		// prepare canvas
		const {
			virtualCanvasContext,
			canvasSize: {
				width,
				height
			},
			timing: {
				watchedSeconds,
			},
		} = this;

		// check for what we need to display in current frame
		const findFrameData = (time) => ({start, end}) => start <= time && end > time;
		const currentFrameData = this.timeline.find(findFrameData(watchedSeconds));

		if (currentFrameData.type === 'video') {
			this._playVideo();
			this.textWasDrawn = false;
			virtualCanvasContext.drawImage(this.video, 0, 0, width, height);
		}

		if (currentFrameData.type === 'subtitles') {
			this._pauseVideo();
			this._drawSubtitles(currentFrameData.text);
		}

		this._applyEffects();
	}

	_drawSubtitles(text) {
		if (this.textWasDrawn) return;
		const {virtualCanvasContext, canvasSize: {width, height}} = this;
		virtualCanvasContext.fillStyle = '#000000';
		virtualCanvasContext.fillRect(0, 0, width, height);
		virtualCanvasContext.fillStyle = '#ffffff';

		const heightStart = height * 0.1;
		const widthStart = width * 0.05;
		const lineHeight = 28;

		virtualCanvasContext.font = '20px Oranienbaum';

		text
			.split('\n')
			.map((row, i) => {
				virtualCanvasContext.fillText(row, widthStart, heightStart + i * lineHeight);
			});

		this.textWasDrawn = true;
	}

	_applyEffects() {
		const {canvasContext, virtualCanvasContext, canvasSize: {width, height}} = this;
		const grayscalePixelData = this._applyGrayscale(virtualCanvasContext.getImageData(0, 0, width, height));
		canvasContext.putImageData(grayscalePixelData, 0, 0);

		drawRandomArtifact(canvasContext, width, height);
		drawRandomArtifact(canvasContext, width, height);
		drawRandomArtifact(canvasContext, width, height);
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
		if (!this.isPlaying) return;

		window.requestAnimationFrame(() => {
			this._updateTiming();
			this._updateCanvas();
			this._drawFrame();
		});
	}

	_computeCanvasSize(videoSize) {
		const fakeVideo = document.createElement('img');
		let result;
		fakeVideo.classList.add(this.classes.fakeVideo.base);
		fakeVideo.width = this.video.videoWidth;
		fakeVideo.height = this.video.videoHeight;
		this.elements.stage.appendChild(fakeVideo);
		result = {
			width: fakeVideo.clientWidth,
			height: fakeVideo.clientHeight,
		};
		fakeVideo.parentNode.removeChild(fakeVideo);
		return result;
	}

	// Public methods

	play() {
		const {elements, classes} = this;

		this.lastFrameTimestamp = new Date();
		this.isPlaying = true;

		elements.playButton.classList.remove(classes.playButton.paused);
		elements.playButton.classList.add(classes.playButton.playing);

		this._playSoundtrack();
		this._playVideo();
		this._drawFrame();
	}

	pause() {
		const {elements, classes} = this;

		this.isPlaying = false;

		elements.playButton.classList.remove(classes.playButton.playing);
		elements.playButton.classList.add(classes.playButton.paused);

		this._pauseSoundtrack();
		this._pauseVideo();
	}
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
