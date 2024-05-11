<script setup lang="ts">
import BottomBar from '@/components/BottomBar.vue';
import Header from '@/components/Header.vue';
import PlayQueue from '@/components/PlayQueue.vue';
import { useNostalgicDiva } from '@/components/useNostalgicDiva';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';
import { watch } from 'vue';

const props = defineProps<{
	playerStore: PlayerStore;
	playQueueStore: PlayQueueStore;
}>();

const diva = useNostalgicDiva();

watch(
	() => props.playQueueStore.currentItem,
	async (currentItem, previousItem) => {
		if (currentItem === undefined || previousItem === undefined) {
			return;
		}

		if (
			currentItem.type === previousItem.type &&
			currentItem.videoId === previousItem.videoId
		) {
			await diva.value?.setCurrentTime(0);
		}
	},
);
</script>

<template>
	<Header :play-queue-store="playQueueStore" />

	<div :style="{ paddingBlockStart: '48px' }">
		<PlayQueue
			:player-store="playerStore"
			:play-queue-store="playQueueStore"
		/>
	</div>

	<BottomBar :player-store="playerStore" :play-queue-store="playQueueStore" />
</template>
