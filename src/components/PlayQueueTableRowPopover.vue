<script setup lang="ts">
import { PlayQueueItemStore } from '@/stores/PlayQueueItemStore';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';

const props = defineProps<{
	playQueueStore: PlayQueueStore;
	item: PlayQueueItemStore;
}>();

const menu = ref();

const toggle = (event: MouseEvent): void => {
	menu.value.toggle(event);
};

const handleClickPlayFirst = async (): Promise<void> => {
	await props.playQueueStore.playFirst([props.item.clone()]);
};

const handleClickPlayNext = async (): Promise<void> => {
	await props.playQueueStore.playNext([props.item.clone()]);
};

const handleClickAddToPlayQueue = async (): Promise<void> => {
	await props.playQueueStore.addItems([props.item.clone()]);
};

const handleClickMoveToTop = (): void => {
	props.playQueueStore.moveItem(props.item, 0);
};

const handleClickMoveToBottom = (): void => {
	props.playQueueStore.moveItem(
		props.item,
		props.playQueueStore.items.length - 1,
	);
};

const handleClickRemoveToTop = (): void => {
	props.playQueueStore.removeItemsAbove(props.item);
};

const handleClickRemoveOthers = (): void => {
	props.playQueueStore.removeOtherItems(props.item);
};

const items = ref<MenuItem[]>([
	{
		label: 'Play first',
		command: handleClickPlayFirst,
	},
	{
		label: 'Play next',
		command: handleClickPlayNext,
	},
	{
		label: 'Add to play queue',
		icon: 'pi pi-plus',
		command: handleClickAddToPlayQueue,
	},
	{
		separator: true,
	},
	{
		label: 'Move to the top',
		icon: 'pi pi-arrow-up',
		command: handleClickMoveToTop,
	},
	{
		label: 'Move to the bottom',
		icon: 'pi pi-arrow-down',
		command: handleClickMoveToBottom,
	},
	{
		separator: true,
	},
	{
		label: 'Remove to the top',
		command: handleClickRemoveToTop,
	},
	{
		label: 'Remove others',
		command: handleClickRemoveOthers,
	},
]);
</script>

<template>
	<Button icon="pi pi-ellipsis-h" severity="secondary" @click="toggle" />
	<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
