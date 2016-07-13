import ColoredGameItem from '../coloredGameItem';

/**
 * Key
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 * @param {String} color - 'red', 'green' or 'blue'
 */
export default class Jewel extends ColoredGameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'jewel',
			colors: {
				blueEmpty: {
					url: 'img/hudJewel_blue_empty.png',
				},
				blueFilled: {
					url: 'img/hudJewel_blue.png',
				},
			},
		}));
	}
}
