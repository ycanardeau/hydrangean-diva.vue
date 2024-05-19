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

const items = ref<MenuItem[]>([
	{
		label: 'Play first',
		command: () => props.item.playFirst(),
	},
	{
		label: 'Play next',
		command: () => props.item.playNext(),
	},
	{
		label: 'Add to play queue',
		icon: 'pi pi-plus',
		command: () => props.item.addToPlayQueue(),
	},
	{
		separator: true,
	},
	{
		label: 'Move to the top',
		icon: 'pi pi-arrow-up',
		command: () => props.item.moveToTop(),
		disabled: () => !props.item.canMoveToTop,
	},
	{
		label: 'Move to the bottom',
		icon: 'pi pi-arrow-down',
		command: () => props.item.moveToBottom(),
		disabled: () => !props.item.canMoveToBottom,
	},
	{
		separator: true,
	},
	{
		label: 'Remove to the top',
		command: () => props.item.removeToTop(),
		disabled: () => !props.item.canRemoveToTop,
	},
	{
		label: 'Remove others',
		command: () => props.item.removeOthers(),
		disabled: () => !props.item.canRemoveOthers,
	},
]);
</script>

<template>
	<Button icon="pi pi-ellipsis-h" severity="secondary" @click="toggle" />
	<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
