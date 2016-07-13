import ColoredGameItem from '../coloredGameItem';

/**
 * Key
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 * @param {String} color - 'red', 'green' or 'blue'
 */
export default class Key extends ColoredGameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'key',
			colors: {
				red: {
					url: 'img/keyRed.png',
				},
				green: {
					url: 'img/keyGreen.png',
				},
				blue: {
					url: 'img/keyBlue.png',
				},
			},
		}));
	}
}
