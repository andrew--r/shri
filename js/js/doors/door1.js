import {Vector2d, isBoxInsideAnother} from '../helpers';
import DoorBase from '../doorBase';
import Button from '../items/button';
import Key from '../items/key';
import Lock from '../items/lock';

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Door1 extends DoorBase {
	constructor(number, onUnlock) {
		super(number, onUnlock);
		const popupContent = this.popup.querySelector('.popup__content');

		this.popupContent = popupContent;

		this.keysInLock = [];
		this.finishedKeys = [];

		const buttonSize = new Vector2d(64, 64);
		const keySize = new Vector2d(64, 64);
		const lockSize = new Vector2d(128, 128);

		const gameFieldWidth = popupContent.clientWidth;
		const gameFieldHeight = popupContent.clientHeight;

		this._tryToInserKey = (function tryToInsertKey() {
			const {lock} = this.items;
			this.keysInLock = this.keysInLock.reduce((keys, key) => {
				if (key.color === lock.color) {
					this.finishedKeys.push(key);
					key.destroy();
				} else {
					keys.push(key);
				}

				return keys;
			}, []);

			if (this.finishedKeys.length === this.items.keys.length) {
				this.unlock();
			}
		}).bind(this);

		this.items = {
			button: new Button({
				size: buttonSize,
				defaultPosition: new Vector2d(
					gameFieldWidth * 0.5 - buttonSize.x / 2,
					gameFieldHeight - buttonSize.y
				),
				onPush: this._tryToInserKey,
			}),

			keys: ['red', 'green', 'blue'].map((color, index) => new Key({
				color,
				size: keySize,
				defaultPosition: new Vector2d(
					gameFieldWidth * (0.25 * (index + 1)) - keySize.x / 2,
					gameFieldHeight * 0.1
				),
			})),

			lock: new Lock({
				color: 'red',
				size: lockSize,
				defaultPosition: new Vector2d(
					gameFieldWidth / 2 - lockSize.x / 2,
					gameFieldHeight / 2 - lockSize.y / 2
				),
				zIndex: 0,
			}),
		};

		this.initializeButton();
		this.initializeKeys();
		this.initializeLock();
	}

	initializeButton() {
		const {button} = this.items;
		this.popupContent.appendChild(button.node);
		button.initialize();
	}

	initializeKeys() {
		const dragState = {};
		const self = this;
		let isDragging = false;

		this.items.keys.forEach((key) => {
			this.popupContent.appendChild(key.node);
			key.initialize();
		});

		this.popupContent.addEventListener('pointerdown', keyDragStart.bind(this));
		this.popupContent.addEventListener('pointermove', keyDrag.bind(this));
		this.popupContent.addEventListener('pointerup', keyDragEnd.bind(this));

		function keyDragStart(event) {
			if (event.target.getAttribute('data-item-name') !== 'key') return;

			const isTarget = (key) => key.id === parseInt(event.target.getAttribute('data-id'), 10);
			const key = self.items.keys.filter(isTarget)[0];
			dragState[event.pointerId.toString()] = {
				key,
				startPosition: new Vector2d(
					event.clientX,
					event.clientY
				),
				startTranslate: key.translate,
			};

			isDragging = true;
		}

		function keyDrag(event) {
			if (!isDragging) return;

			const {key, startPosition, startTranslate} = dragState[event.pointerId.toString()];
			key.setTranslate(new Vector2d(
				startTranslate.x + (event.clientX - startPosition.x),
				startTranslate.y + (event.clientY - startPosition.y)
			));

			key.render(() => key.updatePosition());
		}

		function keyDragEnd(event) {
			if (!isDragging) return;
			const {lock} = this.items;
			isDragging = false;
			const {key} = dragState[event.pointerId.toString()];
			dragState[event.pointerId.toString()] = undefined;

			// проверяем, находится ли ключ в замке
			const isInsideLock = isBoxInsideAnother(
				lock.coordinates,
				lock.size,
				key.coordinates,
				key.size
			);

			const findKeyWithId = (id) => (item) => item.id === id;
			const excludeKeyWithId = (id) => (item) => item.id !== id;

			if (isInsideLock) {
				if (!this.keysInLock.some(findKeyWithId(key.id))) this.keysInLock.push(key);
			} else {
				this.keysInLock = this.keysInLock.filter(excludeKeyWithId(key.id));
			}
		}
	}

	initializeLock() {
		const {lock} = this.items;
		const colorsTable = {
			red: 'green',
			green: 'blue',
			blue: 'red',
		};

		this.popupContent.appendChild(lock.node);
		lock.initialize();

		setInterval(() => {
			lock.changeColor(colorsTable[lock.color]);
		}, 150);
	}
}
