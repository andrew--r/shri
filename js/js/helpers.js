export class Vector2d {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static sum(first, second) {
		return new Vector2d(first.x + second.x, first.y + second.y);
	}
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
