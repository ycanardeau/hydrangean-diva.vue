<script setup lang="ts">
import { useNostalgicDiva } from '@/components/useNostalgicDiva';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';

const props = defineProps<{
	playQueueStore: PlayQueueStore;
}>();

const menu = ref();

const toggle = (event: MouseEvent): void => {
	menu.value.toggle(event);
};

const diva = useNostalgicDiva();

const handleClickSkipBack10 = async (): Promise<void> => {
	const currentTime = await diva.value?.getCurrentTime();

	if (currentTime !== undefined) {
		await diva.value?.setCurrentTime(currentTime - 10);
	}
};

const handleClickSkipForward30 = async (): Promise<void> => {
	const currentTime = await diva.value?.getCurrentTime();

	if (currentTime !== undefined) {
		await diva.value?.setCurrentTime(currentTime + 30);
	}
};

const handleClickRemoveFromPlayQueue = async (): Promise<void> => {
	if (props.playQueueStore.currentItem !== undefined) {
		await props.playQueueStore.removeItems([
			props.playQueueStore.currentItem,
		]);
	}
};

const items = ref<MenuItem[]>([
	{
		label: 'Skip back 10 seconds',
		command: handleClickSkipBack10,
	},
	{
		label: 'Skip forward 30 seconds',
		command: handleClickSkipForward30,
	},
	{
		separator: true,
	},
	{
		label: 'Remove from play queue',
		icon: 'pi pi-arrow-times',
		command: handleClickRemoveFromPlayQueue,
	},
]);
</script>

<template>
	<Button icon="pi pi-ellipsis-h" severity="secondary" @click="toggle" />
	<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
