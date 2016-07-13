import GameItem from '../gameItem';
import {Vector2d} from '../helpers';

const sprites = {
	regular: 'img/switchGreen.png',
	pressed: 'img/switchGreen_pressed.png',
};

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
			sprite: {
				url: sprites.regular,
			},
		}));

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

	press() {
		this.setSprite({
			url: sprites.pressed,
		});

		this.render();
	}

	release() {
		this.setSprite({
			url: sprites.regular,
		});

		this.render();
	}
}
