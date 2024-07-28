<script setup lang="ts">
import HydrangeanDiva from '@/components/HydrangeanDiva.vue';
import { PlayQueueItemStoreFactory } from '@/factories/PlayQueueItemStoreFactory';
import { PlayQueueStoreFactory } from '@/factories/PlayQueueStoreFactory';
import { PlayerStoreFactory } from '@/factories/PlayerStoreFactory';
import { PlayerStore } from '@/stores/PlayerStore';
import { ref } from 'vue';

const playerStoreFactory = new PlayerStoreFactory();
const playQueueItemStoreFactory = new PlayQueueItemStoreFactory();
const playQueueStoreFactory = new PlayQueueStoreFactory(
	playQueueItemStoreFactory,
);

const playerStore = ref(playerStoreFactory.create());
const playQueueStore = ref(playQueueStoreFactory.create());
</script>

<template>
	<HydrangeanDiva
		:player-store="playerStore"
		:play-queue-store="playQueueStore"
	/>
</template>

<style scoped></style>
