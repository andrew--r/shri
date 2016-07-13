import {Vector2d} from './helpers';

/**
 * class GameItem
 *
 * @param {Vector2d} options.size - size of item in pixels
 * @param {Vector2d} options.defaultPosition - initial item position on screen
 *
 * @param {Number} options.rotate - rotate angle in degrees
 * @param {Number} options.scale - scale factor
 *
 * @param {String} options.baseClass - base DOM element class
 * @param {String} options.name - item name
 *
 * @param {Object} options.sprite
 * @param {String} options.sprite.url
 * @param {String} options.sprite.size - background-size value
 * @param {String} options.sprite.repeat - background-repeat value
 *
 * @param {Number} zIndex
 */

export default class GameItem {
	constructor(options) {
		if (!options.name) throw new Error('Name must be specified to create an item');
		const defaultClass = 'game-item';
		this.id = Math.round(Math.random() * new Date());
		this.isInitialized = false;

		this.node = document.createElement('div');
		this.size = options.size || new Vector2d(32, 32);

		this.classes = {
			base: options.baseClass || defaultClass,
			initialized: `${options.baseClass || defaultClass}_initialized`,
			transitionDisabled: `${options.baseClass || defaultClass}_transition-disabled`,
		};

		this.defaultPosition = options.defaultPosition || new Vector2d(0, 0);
		this.translate = new Vector2d(0, 0);

		this.rotate = options.rotate || 0;
		this.scale = options.scale || 1;

		const {node, classes} = this;

		if (options.zIndex === undefined) {
			this.zIndex = 1;
		} else {
			this.zIndex = options.zIndex;
		}

		if (options.sprite) {
			this.sprite = options.sprite;
		}

		node.style.position = 'absolute';
		node.style.zIndex = this.zIndex;
		node.setAttribute('data-id', this.id);
		node.setAttribute('data-item-name', options.name);

		if (classes.base) {
			node.classList.add(classes.base);
		}
	}

	initialize() {
		this.render(() => {
			this.node.classList.add(this.classes.initialized);
		});
	}

	destroy() {
		const {node, classes} = this;

		window.requestAnimationFrame(() => {
			node.setAttribute('style', '');
			node.classList.remove(classes.initialized);
			this.isInitialized = false;
		});
	}

	get coordinates() {
		return Vector2d.sum(this.defaultPosition, this.translate);
	}

	setRotate(angle) {
		this.rotate = angle;
	}

	setScale(value) {
		this.scale = value;
	}

	setSprite({url, size, repeat}) {
		if (!this.sprite) this.sprite = {};

		if (url) this.sprite.url = url;
		if (size) this.sprite.size = size;
		if (repeat) this.sprite.repeat = repeat;
	}

	/**
	 * Updates item position
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	setPosition(x, y) {
		this.position = new Vector2d(x, y);
	}

	/**
	 * Updates item translate
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	setTranslate(x, y) {
		this.translate = new Vector2d(x, y);
	}

	updateSize() {
		const {node, size} = this;

		node.style.width = `${size.x}px`;
		node.style.height = `${size.y}px`;
	}

	updatePosition() {
		const {node, defaultPosition} = this;

		node.style.left = `${defaultPosition.x}px`;
		node.style.top = `${defaultPosition.y}px`;
	}

	updateTransform() {
		const {node, translate, scale, rotate} = this;

		node.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale}) rotate(${rotate}deg)`; // eslint-disable-line max-len
	}

	updateSprite() {
		const {node, sprite} = this;
		if (!sprite) return;

		if (sprite.url) node.style.backgroundImage = `url(${sprite.url})`;
		if (sprite.size) node.style.backgroundSize = sprite.size;
		if (sprite.repeat) node.style.backgroundRepeat = sprite.repeat;
	}

	render(callback) {
		window.requestAnimationFrame(() => {
			this.updateSprite();
			this.updateSize();
			this.updatePosition();
			this.updateTransform();

			if (typeof callback === 'function') {
				callback();
			}
		});
	}

	disableTransition() {
		this.node.classList.add(this.classes.transitionDisabled);
	}

	enableTransition() {
		this.node.classList.remove(this.classes.transitionDisabled);
	}

	show() {
		window.requestAnimationFrame(() => {
			this.node.classList.remove(this.classes.hidden);
		});
	}

	hide() {
		window.requestAnimationFrame(() => {
			this.node.classList.add(this.classes.hidden);
		});
	}

	/**
	 * Adds events listeners, supports multiple events at a time, e. g. on('click mousedown', ...)
	 *
	 * @param {String} eventsNames
	 * @param {Function} handler
	 */
	on(eventsNames, handler) {
		eventsNames
			.split(' ')
			.map((eventName) => this.node.addEventListener(eventName, handler));
	}

	/**
	 * Removes events listeners
	 *
	 * @param {String} eventsNames
	 * @param {String} handler
	 */
	off(eventsNames, handler) {
		eventsNames
			.split(' ')
			.map((eventName) => this.node.removeEventListener(eventName, handler));
	}
}
