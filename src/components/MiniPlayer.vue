<script setup lang="ts">
import { useNostalgicDiva } from '@/components/useNostalgicDiva';
import { PlayQueueStore, RepeatMode } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
	playerStore: PlayerStore;
	playQueueStore: PlayQueueStore;
}>();

const bottomBarHeight = 68;
const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
};

const diva = useNostalgicDiva();

const handleLoaded = async (): Promise<void> => {
	if (!props.playQueueStore.interacted) {
		return;
	}

	await diva.value?.play();
};

const handlePlay = (): void => props.playerStore.onPlay();
const handlePause = (): void => props.playerStore.onPause();

const handleEnded = async (): Promise<void> => {
	switch (props.playQueueStore.repeat) {
		case RepeatMode.One:
			await diva.value?.setCurrentTime(0);
			break;

		case RepeatMode.Off:
		case RepeatMode.All:
			if (props.playQueueStore.isLastItem) {
				switch (props.playQueueStore.repeat) {
					case RepeatMode.Off:
						props.playerStore.onEnded();
						break;

					case RepeatMode.All:
						if (props.playQueueStore.hasMultipleItems) {
							await props.playQueueStore.goToFirst();
						} else {
							await diva.value?.setCurrentTime(0);
						}
						break;
				}
			} else {
				await props.playQueueStore.next();
			}
			break;
	}
};

const handleTimeUpdate = (e: Event): void => {
	if (e instanceof CustomEvent) {
		props.playerStore.onTimeUpdate(e.detail);
	}
};

onMounted(() => {
	diva.value?.addEventListener('loaded', handleLoaded);
	diva.value?.addEventListener('play', handlePlay);
	diva.value?.addEventListener('pause', handlePause);
	diva.value?.addEventListener('ended', handleEnded);
	diva.value?.addEventListener('timeupdate', handleTimeUpdate);
});

onUnmounted(() => {
	diva.value?.removeEventListener('loaded', handleLoaded);
	diva.value?.removeEventListener('play', handlePlay);
	diva.value?.removeEventListener('pause', handlePause);
	diva.value?.removeEventListener('ended', handleEnded);
	diva.value?.removeEventListener('timeupdate', handleTimeUpdate);
});
</script>

<template>
	<div
		:style="{
			position: 'fixed',
			right: 0,
			bottom: `${bottomBarHeight}px`,
			width: `${miniPlayerSize.width}px`,
			height: `${miniPlayerSize.height}px`,
			zIndex: 998,
			backgroundColor: 'rgb(39, 39, 39)',
			display: 'flex',
			flexDirection: 'column',
		}"
	>
		<div :style="{ flexGrow: 1, backgroundColor: 'black' }">
			<template v-if="playQueueStore.currentItem">
				<nostalgic-diva
					:src="playQueueStore.currentItem.url"
					ref="diva"
				/>
			</template>
		</div>
	</div>
</template>
