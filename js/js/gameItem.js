import {Vector2d} from './helpers';

/**
 * class GameItem
 *
 * @param {Vector2d} options.size - size of item in pixels
 * @param {Vector2d} options.defaultPosition - initial item position on screen
 * @param {String} options.baseClass - base DOM element class
 * @param {String} options.name - item type name
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
		};

		this.defaultPosition = options.defaultPosition || new Vector2d(0, 0);
		this.translate = new Vector2d(0, 0);

		const {node, classes} = this;

		this.render(() => {
			node.style.position = 'absolute';
			node.setAttribute('data-id', this.id);
			node.setAttribute('data-item-name', options.name);

			if (classes.base) {
				node.classList.add(classes.base);
			}
		});
	}

	initialize() {
		const {node, classes} = this;
		this.render(() => {
			this.updateSize();
			this.updatePosition();

			node.classList.add(classes.initialized);
			this.isInitialized = true;
		});
	}

	destroy() {
		const {node, classes} = this;

		this.render(() => {
			node.setAttribute('style', '');
			node.classList.remove(classes.initialized);
			this.isInitialized = false;
		});
	}

	/**
	 * Updates item position
	 *
	 * @param {Vector2d} newPosition
	 */
	setPosition(newPosition) {
		this.position = newPosition;
	}

	/**
	 * Updates item translate
	 *
	 * @param {Vector2d} newTranslate
	 */
	setTranslate(newTranslate) {
		this.translate = newTranslate;
	}

	updateSize() {
		const {node, size} = this;

		node.style.width = `${size.x}px`;
		node.style.height = `${size.y}px`;
	}

	updatePosition() {
		const {node, defaultPosition, translate} = this;

		node.style.left = `${defaultPosition.x}px`;
		node.style.top = `${defaultPosition.y}px`;

		node.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
	}

	render(callback) {
		window.requestAnimationFrame(callback);
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
