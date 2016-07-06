import objectFitPolyfill from 'object-fit-images';

document.createElement( "picture" );

document.addEventListener('DOMContentLoaded', () => {
	objectFitPolyfill();
});
