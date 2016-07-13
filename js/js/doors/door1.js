import {Vector2d} from '../helpers';
import DoorBase from '../doorBase';
import Hasp from '../items/hasp';
import Face from '../items/face';

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Door1 extends DoorBase {
	constructor(number, onUnlock) {
		super(number, onUnlock);

		this.popupContent = this.popup.querySelector('.popup__content');

		const gameFieldSize = new Vector2d(
			this.popupContent.clientWidth,
			this.popupContent.clientHeight
		);

		const faceSize = new Vector2d(64, 64);
		const haspSize = new Vector2d(gameFieldSize.x, 128);

		const face = new Face({
			zIndex: 1,
			size: faceSize,
			defaultPosition: new Vector2d(
				gameFieldSize.x / 2 - faceSize.x / 2,
				gameFieldSize.y / 2
			),
		});

		const hasp = new Hasp({
			zIndex: 2,
			size: haspSize,
			defaultPosition: new Vector2d(0, gameFieldSize.y / 2),
		});

		const swipeState = {
			isSwiping: false,
			startX: null,
			endX: null,
		};

		hasp.on('pointerdown', (event) => {
			hasp.node.setPointerCapture(event.pointerId);
			hasp.disableTransition();

			swipeState.isSwiping = true;
			swipeState.startX = event.clientX;
		});

		hasp.on('pointermove', (event) => {
			if (!swipeState.isSwiping) return;

			const deltaX = event.clientX - swipeState.startX;
			hasp.setTranslate(deltaX, hasp.translate.y);
			hasp.render(() => hasp.updatePosition());
		});

		hasp.on('pointerup pointercancel', () => {
			swipeState.isSwiping = false;
			hasp.enableTransition();
			hasp.setTranslate(0, 0);
			hasp.render(() => hasp.updatePosition());
		});

		face.on('pointerdown', () => this.unlock());

		this.popupContent.appendChild(face.node);
		this.popupContent.appendChild(hasp.node);
		face.initialize();
		hasp.initialize();
	}
}
