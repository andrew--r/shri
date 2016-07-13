import GameItem from '../gameItem';
import {Vector2d} from '../helpers';

/**
 * Hasp
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 */
export default class Hasp extends GameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'hasp',
			sprite: {
				url: 'img/stoneHalf_mid.png',
				size: 'auto 100%',
				repeat: 'repeat-x',
			},
		}));
	}
}
