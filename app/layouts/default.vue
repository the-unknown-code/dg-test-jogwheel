<template>
	<lenis :options="{}">
		<div :class="['container']">
			<site-header />

			<page-transition>
				<slot />
			</page-transition>

			<site-footer />

			<client-only>
				<dev-only>
					<lazy-debug />
				</dev-only>
			</client-only>
		</div>
	</lenis>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 1;
}
</style>
