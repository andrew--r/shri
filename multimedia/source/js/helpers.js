export function formatSeconds(seconds) {
	let minutesCount = Math.floor(seconds / 60);

	return `${formatXXNumber(minutesCount)}:${formatXXNumber(Math.round(seconds % 60))}`;
}

function formatXXNumber(number) {
	let result;

	if (number < 10 && number >= 1) {
		result = `0${Math.round(number)}`;
	} else if (number < 1) {
		result = '00';
	} else {
		result = number.toString();
	}

	return result;
}

export function formattedTimeToSeconds(timeString) {
	const data = timeString.split(':');
	const hours = parseInt(data[0], 10);
	const minutes = parseInt(data[1], 10);
	const seconds = Math.round(parseFloat(data[2].replace(',', '.'), 10));

	return seconds + (minutes * 60) + (hours * 60 * 60);
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export const webgl = {
	createShader(glContext, sourceCode, shaderType) {
		const shader = glContext.createShader(shaderType);
		glContext.shaderSource(shader, sourceCode);
		glContext.compileShader(shader);
		const compiledSuccessfully = glContext.getShaderParameter(shader, glContext.COMPILE_STATUS);

		if (!compiledSuccessfully) {
			throw new Error('Could not compile shader: ', glContext.getShaderInfoLog(shader));
		}

		return shader;
	},

	createProgram(glContext, vertexShader, fragmentShader) {
		const program = glContext.createProgram();

		glContext.attachShader(program, vertexShader);
		glContext.attachShader(program, fragmentShader);

		glContext.linkProgram(program);

		const linkedSuccessfully = glContext.getProgramParameter(program, glContext.LINK_STATUS);

		if (!linkedSuccessfully) {
			throw new Error('Program failed to link: ', glContext.getProgramInfoLog(program));
		}

		return program;
	},
};
