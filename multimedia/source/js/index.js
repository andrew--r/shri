import Application from './modules/application';

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
	window.application = new Application('app');
}
