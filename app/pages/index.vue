<template>
	<main class="page-index">
		<div id="jogwheel">
			<div ref="$jogLeft">
				<img src="/images/jog-wheel.png"
					alt="Jogwheel"
					draggable="false" />
			</div>
			<div ref="$jogRight">
				<img src="/images/jog-wheel.png"
					alt="Jogwheel"
					draggable="false" />
			</div>

		</div>
	</main>
</template>

<script setup lang="ts">
import { Draggable } from 'gsap/all';

const $jogLeft = ref<HTMLElement | null>(null);
const $jogRight = ref<HTMLElement | null>(null);


tryOnMounted(() => {
	Draggable.create($jogLeft.value, {
		type: 'rotation',
		inertia: true,
	});

	Draggable.create($jogRight.value, {
		type: 'rotation',
		inertia: true,
	});
});
</script>

<style lang="scss" scoped>
.page-index {
	@include fill(fixed);
	background: linear-gradient(to top, #afafaf, white);
	overflow: hidden;

	#jogwheel {
		position: absolute;
		width: 160vw;
		left: -30vw;
		bottom: 10vw;
		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			pointer-events: none;
			display: block;
		}

		>div {
			position: relative;
			width: 50% !important;
			flex: 0 0 50%;
			aspect-ratio: 1/1;

			&:nth-child(1) {
				left: 0;
				transform: translateX(0%);
			}

			&:nth-child(2) {
				right: 0;
				transform: translateX(0%);
			}
		}
	}
}
</style>
