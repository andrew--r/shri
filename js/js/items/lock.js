import ColoredGameItem from '../coloredGameItem';

/**
 * Key
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 */
export default class Lock extends ColoredGameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'lock',
			colors: {
				red: {
					url: 'img/lockRed.png',
				},
				green: {
					url: 'img/lockGreen.png',
				},
				blue: {
					url: 'img/lockBlue.png',
				},
			},
		}));
	}
}
