import GameItem from '../gameItem';
import {Vector2d} from '../helpers';

/**
 * Face
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 */
export default class Face extends GameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'face',
			sprite: {
				url: 'img/hudPlayer_green.png',
			},
		}));
	}
}
