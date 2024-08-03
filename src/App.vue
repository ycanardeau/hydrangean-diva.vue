<script setup lang="ts">
import HydrangeanDiva from '@/components/HydrangeanDiva.vue';
import { ObservableStateProvider } from '@/stores/ObservableStateProvider';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';
import { ref } from 'vue';

const observableStateProvider = new ObservableStateProvider();

const playerStore = ref(new PlayerStore(observableStateProvider));
const playQueueStore = ref(new PlayQueueStore(observableStateProvider));
</script>

<template>
	<HydrangeanDiva
		:player-store="playerStore"
		:play-queue-store="playQueueStore"
	/>
</template>

<style scoped></style>
