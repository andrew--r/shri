import DoorBase from '../doorBase';

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
export default class Door2 extends DoorBase {
	constructor(number, onUnlock) {
		super(number, onUnlock);

		this.popup.addEventListener('click', () => {
			this.unlock();
		});
	}
}