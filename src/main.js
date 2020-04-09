import App from './App.svelte';

const app = new App({
	target: document.getElementById("main"),
	props: {
		title: 'New York Times movies review'
	}
});

export default app;