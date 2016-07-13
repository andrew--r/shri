import pep from 'pepjs'; // polyfills PointerEvents specification
import App from './app';

// Start the app
window.app = new App(document.querySelector('.app'));
