<script setup lang="ts">
import PlayQueueTableRowPopover from '@/components/PlayQueueTableRowPopover.vue';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

const props = defineProps<{
	playQueueStore: PlayQueueStore;
}>();
</script>

<template>
	<DataTable
		:value="playQueueStore.items"
		dataKey="id"
		:selection="playQueueStore.selectedItems"
		:selectAll="playQueueStore.allItemsSelected"
		@select-all-change="playQueueStore.allItemsSelected = $event.checked"
		@row-select="$event.data.isSelected = true"
		@row-unselect="$event.data.isSelected = false"
	>
		<template #header>
			<div style="text-align: left">
				<div class="flex flex-row-reverse md:flex-row gap-2">
					<Button
						label="Play next"
						:disabled="
							playQueueStore.isEmpty ||
							playQueueStore.selectedItems.length === 0
						"
						@click="playQueueStore.playSelectedItemsNext()"
					/>
					<Button
						icon="pi pi-plus"
						label="Add to play queue"
						@click="playQueueStore.addSelectedItems()"
						:disabled="
							playQueueStore.isEmpty ||
							playQueueStore.selectedItems.length === 0
						"
					/>
					<Button
						icon="pi pi-times"
						label="Remove"
						@click="playQueueStore.removeSelectedItems()"
						:disabled="
							playQueueStore.isEmpty ||
							playQueueStore.selectedItems.length === 0
						"
					/>
					<Button
						icon="pi pi-trash"
						label="Clear"
						@click="playQueueStore.clear()"
						:disabled="playQueueStore.isEmpty"
					/>
				</div>
			</div>
		</template>

		<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
		<Column field="title" header="Title">
			<template #body="{ data }">
				<a :href="data.url" target="_blank">
					<Button :label="data.title" link /> </a
			></template>
		</Column>
		<Column field="actions" header="">
			<template #body="{ data }">
				<div class="flex flex-row-reverse md:flex-row gap-2">
					<Button
						icon="pi pi-play"
						label="Play"
						@click="data.play()"
					/>
					<Button
						icon="pi pi-times"
						label="Remove"
						@click="data.remove()"
					/>
					<PlayQueueTableRowPopover
						:play-queue-store="playQueueStore"
						:item="data"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>
