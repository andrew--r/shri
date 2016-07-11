import {Vector2d} from '../helpers';
import DoorBase from '../doorBase';
import Button from '../items/button';
import Key from '../items/key';

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
		this.classes = {
			lever: {
				base: 'door-lever',
				initialized: 'door-lever_initialized',
			},
			button: {
				base: 'door-button',
				visible: 'door-button_visible',
				pressed: 'door-button_pressed',
				initialized: 'door-button_initialized',
			},
			key: {
				base: 'door-key',
				initialized: 'door-key_initialized',
			},
		};

		const buttonSize = new Vector2d(64, 64);
		const keySize = new Vector2d(64, 64);

		const gameFieldWidth = popupContent.clientWidth;
		const gameFieldHeight = popupContent.clientHeight;

		this.items = {
			button: new Button({
				size: buttonSize,
				defaultPosition: new Vector2d(
					gameFieldWidth * 0.5 - buttonSize.x / 2,
					gameFieldHeight - buttonSize.y
				),
			}),

			keys: ['red', 'green', 'blue'].map((color, index) => new Key({
				color,
				size: keySize,
				defaultPosition: new Vector2d(
					gameFieldWidth * (0.25 * (index + 1)) - keySize.x / 2,
					gameFieldHeight * 0.1
				),
			})),
		};

		this.initializeButton();
		this.initializeKeys();
	}

	initializeButton() {
		const {popupContent} = this;
		const {button} = this.items;
		popupContent.appendChild(button.node);
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

		this.popupContent.addEventListener('pointerdown', keyDragStart);
		this.popupContent.addEventListener('pointermove', keyDrag);
		this.popupContent.addEventListener('pointerup', keyDragEnd);

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
			isDragging = false;
		}
	}
}
