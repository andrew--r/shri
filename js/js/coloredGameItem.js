import GameItem from './gameItem';
import {Vector2d} from './helpers';

/**
 * ColoredGameItem
 *
 * @param {String} options.currentColor
 * @param {Object} options.colors - hash with color names as keys and sprite objects as values
 */
export default class ColoredGameItem extends GameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			sprite: options.colors[options.currentColor],
		}));

		this.colors = options.colors;
		this.currentColor = options.currentColor;
		this.sprite = options.colors[options.currentColor];
	}

	switchColor(colorName) {
		if (!this.colors[colorName]) throw new Error(`${this.name} doesn't support ${colorName} color`);
		this.currentColor = colorName;
		this.sprite = this.colors[colorName];
	}
}
