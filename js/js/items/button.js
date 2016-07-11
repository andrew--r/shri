import GameItem from '../gameItem';
import {Vector2d} from '../helpers';


/**
 * Simple button
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 * @param {Function} onPush
 */
export default class Button extends GameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'button',
			baseClass: 'door-button',
			size: options.size || new Vector2d(32, 32),
			defaultPosition: options.defaultPosition || new Vector2d(0, 0),
		}));

		this.classes.initialized = `${this.classes.base}_initialized`;
		this.classes.hidden = `${this.classes.base}_hidden`;
		this.classes.pressed = `${this.classes.base}_pressed`;

		this._onPress = (function onPress() {
			this.press();
			if (options.onPush) {
				options.onPush();
			}
		}).bind(this);

		this._onRelease = (function onRelease() {
			this.release();
		}).bind(this);
	}

	initialize() {
		super.initialize();

		this.on('pointerdown', this._onPress);
		this.on('pointerup pointercancel pointerleave', this._onRelease);
	}

	destroy() {
		super.destroy();
		this.off('pointerdown', this._onPress);
		this.off('pointerup pointercancel pointerleave', this._onRelease);
	}

	show() {
		this.render(() => {
			this.node.classList.remove(this.classes.hidden);
		});
	}

	hide() {
		this.render(() => {
			this.node.classList.add(this.classes.hidden);
		});
	}

	press() {
		this.render(() => {
			this.node.classList.add(this.classes.pressed);
		});
	}

	release() {
		this.render(() => {
			this.node.classList.remove(this.classes.pressed);
		});
	}
}
