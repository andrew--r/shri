import Player from './player';

export default class Application {
	constructor(options = {}) {
		const baseClass = options.baseClass || 'app';
		const visiblePageClass = `${baseClass}__page_visible`;

		this.root = document.querySelector(`.${baseClass}`);
		this.form = this.root.querySelector(`.${baseClass}__form`);
		this.pages = {
			start: this.root.querySelector(`.${baseClass}__page_start`),
			main: this.root.querySelector(`.${baseClass}__page_main`),
		};

		this.links = {
			video: '',
			subtitles: '',
			soundtrack: '',
		}

		this.form.addEventListener('submit', onFormSubmit.bind(this));

		function onFormSubmit(event) {
			event.preventDefault();
			
			Object
				.keys(this.links)
				.forEach((type) => {
					this.links[type] = this.form.querySelector(`[data-link-type="${type}"]`).value;
				});

			this.pages.start.classList.remove(visiblePageClass);
			this.pages.main.classList.add(visiblePageClass);

			window.player = this.player = new Player({
				root: this.root.querySelector('.player'),
				resources: this.links,
			});
		}
	}
}
