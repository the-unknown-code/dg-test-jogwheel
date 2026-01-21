<template>
	<main class="page-index">
		<div ref="$progress"
			class="progress"></div>
		<div id="jogwheel">
			<div class="jog-wheel left"
				ref="$jogLeft">
				<img src="/images/jog-wheel.png"
					alt="Jogwheel"
					draggable="false" />
			</div>
			<div class="fader">
				<img ref="$rail"
					class="rail"
					src="/images/fader-rail.png"
					alt="Fader"
					draggable="false" />
				<img ref="$item"
					class="item"
					src="/images/fader.png"
					alt="Fader" />
			</div>
			<div class="jog-wheel right"
				ref="$jogRight">
				<img src="/images/jog-wheel.png"
					alt="Jogwheel"
					draggable="false" />
			</div>

		</div>
	</main>
</template>

<script setup lang="ts">
import gsap, { Draggable } from 'gsap/all';

const $progress = ref<HTMLElement | null>(null);
const $jogLeft = ref<HTMLElement | null>(null);
const $jogRight = ref<HTMLElement | null>(null);
const $rail = ref<HTMLElement | null>(null);
const $item = ref<HTMLElement | null>(null);


tryOnMounted(async () => {
	await nextTick();

	Draggable.create($jogLeft.value, {
		type: 'rotation',
		inertia: true,
	});

	Draggable.create($jogRight.value, {
		type: 'rotation',
		inertia: true,
	});


	if ($rail.value && $item.value) {

		Draggable.create($item.value, {
			type: 'y',
			bounds: {
				minY: -64,
				maxY: 64,
			},
			onDrag() {
				// Normalize value (0 = bottom, 1 = top)

				const progress = gsap.utils.normalize(
					this.minY,
					this.maxY,
					this.y
				);

				const opacity = .1 - progress * .1;
				console.log('Opacity:', opacity);

				gsap.set($progress.value, {
					opacity
				});

			},
		});
	}


});
</script>

<style lang="scss" scoped>
.page-index {
	@include fill(fixed);
	background: linear-gradient(to top, #afafaf, white);
	overflow: hidden;

	.progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: .05
	}

	#jogwheel {
		position: absolute;
		width: 100%;
		aspect-ratio: 1;
		bottom: 10vw;
		display: flex;
		justify-content: center;
		align-items: center;

		img {

			display: block;
		}

		.fader {
			position: relative;
			display: flex;
			flex-direction: column;

			align-items: center;
			justify-content: center;
			z-index: 10;


			img {
				max-width: none;
			}

			.rail {
				position: relative;
				width: auto;
				height: 150px;
				pointer-events: none;
			}

			.item {
				position: absolute;
				width: 120px;
				height: auto;
				top: 50%;
				transform: translateY(-50%);
				cursor: grab;

				&:active {
					cursor: grabbing;
				}
			}
		}

		.jog-wheel {
			position: absolute;
			width: 90%;
			flex: 0 0 90%;
			aspect-ratio: 1/1;

			&.left {
				left: 0;
				transform: translateX(-50%);
			}

			&.right {
				right: 0;
				transform: translateX(50%);
			}
		}

	}

}
</style>
