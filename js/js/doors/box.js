import {Vector2d} from '../helpers';
import DoorBase from '../doorBase.js';
import Jewel from '../items/jewel';

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Box extends DoorBase {
	constructor(number, onUnlock) {
		super(number, onUnlock);

		this.popupContent = this.popup.querySelector('.popup__content');

		this.initializeLock();
		this.initializeKey();
	}

	showCongratulations() {
		alert('Поздравляю! Игра пройдена!'); // eslint-disable-line no-alert
	}

	initializeLock() {
		const gameFieldSize = new Vector2d(
			this.popupContent.clientWidth,
			this.popupContent.clientHeight
		);
		const jewelLockSize = new Vector2d(196, 196);

		this.jewelLock = new Jewel({
			currentColor: 'blueEmpty',
			rotate: -30,
			size: jewelLockSize,
			defaultPosition: new Vector2d(
				gameFieldSize.x / 2 - jewelLockSize.x / 2,
				gameFieldSize.y / 2 - jewelLockSize.y / 2
			),
		});

		this.popupContent.appendChild(this.jewelLock.node);
		this.jewelLock.initialize();
	}

	initializeKey() {
		const {popupContent} = this;
		const gameFieldSize = new Vector2d(
			popupContent.clientWidth,
			popupContent.clientHeight
		);
		const jewelKeySize = new Vector2d(64, 64);

		this.jewelKey = new Jewel({
			currentColor: 'blueFilled',
			size: jewelKeySize,
			defaultPosition: new Vector2d(
				gameFieldSize.x / 2 - jewelKeySize.x / 2,
				gameFieldSize.y / 2 - jewelKeySize.y / 2
			),
		});

		const interactionState = {
			activePointers: [],
			initialDistance: null,
		};

		const onPointerDown = (event) => {
			const {activePointers} = interactionState;
			if (activePointers.length === 2) return;

			const position = new Vector2d(event.clientX, event.clientY);

			interactionState.activePointers.push({
				id: event.pointerId,
				initialPosition: position,
				position,
			});

			if (activePointers.length === 2) {
				interactionState.initialScale = this.jewelKey.scale;
				interactionState.baseVector = Vector2d.normalize(
					activePointers[0].initialPosition,
					activePointers[1].initialPosition
				);
				interactionState.initialDistance = Vector2d.distance(
					activePointers[0].initialPosition,
					activePointers[1].initialPosition
				);
			}
		};

		const onPointerUp = (event) => {
			const {activePointers} = interactionState;
			const filterById = (id) => (pointer) => pointer.id !== id;
			interactionState.activePointers = activePointers.filter(filterById(event.pointerId));
		};

		const onPointerMove = (event) => {
			const {activePointers, initialDistance} = interactionState;
			if (activePointers.length !== 2) return;
			const findById = (id) => (item) => item.id === id;
			const currentPointerState = activePointers.filter(findById(event.pointerId))[0];
			currentPointerState.position = new Vector2d(event.clientX, event.clientY);

			const currentDistance = Vector2d.distance(
				activePointers[0].position,
				activePointers[1].position
			);

			const userScale = currentDistance / initialDistance;
			const currentScale = interactionState.initialScale - 1;
			const finalScale = userScale > 1 ? currentScale + userScale : currentScale * userScale;

			const currentAngle = Vector2d.angle(
				interactionState.baseVector,
				Vector2d.normalize(activePointers[0].position, activePointers[1].position)
			);

			this.jewelKey.setScale(finalScale); // eslint-disable-line max-len
			this.jewelKey.setRotate(currentAngle);
			this.jewelKey.render();

			const scaleMatches = finalScale > 2.8 && finalScale < 3.2;
			const angleMatches = currentAngle > -35 && currentAngle < -25;
			if (scaleMatches && angleMatches) {
				this.unlock();
			}
		};

		popupContent.appendChild(this.jewelKey.node);
		popupContent.addEventListener('pointerdown', onPointerDown);
		popupContent.addEventListener('pointermove', onPointerMove);
		['pointerup', 'pointercancel'].map((name) => popupContent.addEventListener(name, onPointerUp));

		this.jewelKey.initialize();
	}
}
