export class Vector2d {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static sum(first, second) {
		return new Vector2d(first.x + second.x, first.y + second.y);
	}

	static distance(first, second) {
		return Math.sqrt(Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2));
	}

	// возвращает нормализованный вектор
	static normalize(first, second) {
		return new Vector2d(second.x - first.x, second.y - first.y);
	}

	// возвращает угол между двумя нормализованными векторами
	static angle(a, b) {
		let coefficient = -1;

		if (b.y >= 0 && b.x - a.x < 0) {
			coefficient = 1;
		}

		if (b.y < 0 && b.x - a.x > 0) {
			coefficient = 1;
		}

		return coefficient * radToDeg(Math.acos((a.x * b.x + a.y * b.y) / (Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)) * Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2))))); // eslint-disable-line max-len
	} 
}

export function radToDeg(rads) {
	return rads * 180 / Math.PI;
}

export function isBoxInsideAnother(outerCoords, outerSize, innerCoords, innerSize) {
	const outerLeft = outerCoords.x;
	const outerRight = outerCoords.x + outerSize.x;
	const innerLeft = innerCoords.x;
	const innerRight = innerCoords.x + innerSize.x;
	const outerTop = outerCoords.y;
	const outerBottom = outerCoords.y + outerSize.y;
	const innerTop = innerCoords.y;
	const innerBottom = innerCoords.y + innerSize.y;

	const isHorizontallyInside = outerLeft < innerLeft && outerRight > innerRight;
	const isVerticallyInside = outerTop < innerTop && outerBottom > innerBottom;

	return isHorizontallyInside && isVerticallyInside;
}
