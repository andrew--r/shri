import Door0 from './doors/door0';
import Door1 from './doors/door1';
import Door2 from './doors/door2';
import Box from './box';

/**
 * @class App
 * @param {Element} el
 */
export default function App() {
	const doors = [
		new Door0(0, onUnlock),
		new Door1(1, onUnlock),
		new Door2(2, onUnlock),
		new Box(3, onUnlock),
	];

	this.doors = doors;

	/**
	 * Callback вызывается в коде двери
	 * Тут даем возможность открыть следующие двери
	 */
	function onUnlock() {
		let previousUnlocked;

		// Даем открыть следующую дверь
		for (let i = 0; i < doors.length; i++) {
			if (!doors[i].isLocked) {
				previousUnlocked = true;
			} else {
				if (previousUnlocked && doors[i].isLocked) {
					doors[i].enable();
					break;
				}
			}
		}
	}
}
