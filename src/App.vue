<script setup lang="ts">
import HydrangeanDiva from '@/components/HydrangeanDiva.vue';
import { PlayerStore } from '@/stores/PlayerStore';
import { ref } from 'vue';

const playerStore = ref(new PlayerStore());
</script>

<template>
	<HydrangeanDiva
		:player-store="playerStore"
		:play-queue-store="playerStore.playQueueStore"
	/>
</template>

<style scoped></style>
