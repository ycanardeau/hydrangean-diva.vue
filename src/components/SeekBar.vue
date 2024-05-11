<script setup lang="ts">
import { useNostalgicDiva } from '@/components/useNostalgicDiva';
import { PlayerStore } from '@/stores/PlayerStore';
import Slider, { SliderSlideEndEvent } from 'primevue/slider';

const props = defineProps<{
	playerStore: PlayerStore;
}>();

const diva = useNostalgicDiva();

function handleChange(e: number): void {
	const percent = e / 100;
	props.playerStore.setPercent(percent);
}

function handleMouseDown(e: MouseEvent): void {
	if (e.button === 0) {
		props.playerStore.setSeeking(true);
	}
}

const handleSlideEnd = async (e: SliderSlideEndEvent): Promise<void> => {
	const percent = e.value / 100;

	props.playerStore.setSeeking(false);

	const duration = await diva.value?.getDuration();
	if (duration !== undefined) {
		diva.value?.setCurrentTime(duration * percent);
	}
};
</script>

<template>
	<Slider
		:step="0.0000001"
		:model-value="playerStore.percent * 100"
		@change="handleChange"
		@mousedown="handleMouseDown"
		@slideend="handleSlideEnd"
	/>
</template>
