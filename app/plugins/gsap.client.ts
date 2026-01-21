import gsap from 'gsap';
import { Draggable, InertiaPlugin } from 'gsap/all';
import Tempus from 'tempus';

export default defineNuxtPlugin(() => {
	gsap.registerPlugin(Draggable, InertiaPlugin);
	gsap.defaults({ ease: 'none' });

	// merge rafs
	gsap.ticker.lagSmoothing(0);
	gsap.ticker.remove(gsap.updateRoot);
	Tempus?.add(
		(time) => {
			gsap.updateRoot(time / 1000);
		},
		{ priority: 0 }
	);
});
