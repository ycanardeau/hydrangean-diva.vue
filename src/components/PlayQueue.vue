<script setup lang="ts">
import MiniPlayer from '@/components/MiniPlayer.vue';
import PlayQueueTable from '@/components/PlayQueueTable.vue';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';

defineProps<{
	playerStore: PlayerStore;
	playQueueStore: PlayQueueStore;
}>();

const miniPlayerSize = {
	width: 16 * 25,
	height: 9 * 25,
};
</script>

<template>
	<PlayQueueTable :play-queue-store="playQueueStore" />

	<div
		:style="{
			blockSize: `${miniPlayerSize.height}px`,
		}"
	/>

	<template v-if="!playQueueStore.isEmpty">
		<MiniPlayer
			:player-store="playerStore"
			:play-queue-store="playQueueStore"
		/>
	</template>
</template>
