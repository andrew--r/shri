import DoorBase from './doorBase.js';

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

		// ==== Напишите свой код для открытия сундука здесь ====
		// Для примера сундук откроется просто по клику на него
		this.popup.addEventListener('click', () => {
			this.unlock();
		});
		// ==== END Напишите свой код для открытия сундука здесь ====
	}

	showCongratulations() {
		alert('Поздравляю! Игра пройдена!'); // eslint-disable-line no-alert
	}
}
