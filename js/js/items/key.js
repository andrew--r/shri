import GameItem from '../gameItem';
import {Vector2d} from '../helpers';


/**
 * Key
 *
 * @param {Vector2d} options.size
 * @param {Vector2d} options.position
 * @param {String} color - 'red', 'green' or 'blue'
 */
export default class Key extends GameItem {
	constructor(options) {
		super(Object.assign({}, options, {
			name: 'key',
			baseClass: 'door-key',
			size: options.size || new Vector2d(32, 32),
			defaultPosition: options.defaultPosition || new Vector2d(0, 0),
		}));

		this.color = options.color || 'red';

		this.classes.initialized = `${this.classes.base}_initialized`;
		this.classes.red = `${this.classes.base}_red`;
		this.classes.green = `${this.classes.base}_green`;
		this.classes.blue = `${this.classes.base}_blue`;

		this.render(() => {
			this.node.classList.add(this.classes[this.color]);
		});
	}

	initialize() {
		super.initialize();
	}

	destroy() {
		super.destroy();
	}
}
