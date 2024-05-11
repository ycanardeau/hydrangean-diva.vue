<script setup lang="ts">
import AddVideoModal from '@/components/AddVideoModal.vue';
import { PlayQueueItemStore } from '@/stores/PlayQueueItemStore';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import { findVideoService } from '@aigamo/nostalgic-diva';
import Button from 'primevue/button';
import { ref } from 'vue';

const props = defineProps<{
	playQueueStore: PlayQueueStore;
}>();

interface NoembedResult {
	title: string;
}

function isNoembedResult(value: any): value is NoembedResult {
	return (
		value !== null &&
		typeof value === 'object' &&
		'title' in value &&
		typeof value.title === 'string'
	);
}

const visible = ref(false);

const handleSave = async (e: { url: string; title: string }): Promise<void> => {
	const videoService = findVideoService(e.url);
	if (videoService !== undefined) {
		const videoId = videoService.extractVideoId(e.url);
		if (videoId !== undefined) {
			const response = await fetch(
				`https://noembed.com/embed?url=${encodeURIComponent(e.url)}`,
			);
			const jsonData = await response.json();

			props.playQueueStore.addItems([
				new PlayQueueItemStore(
					e.url,
					videoService.type,
					videoId,
					e.title ||
						(isNoembedResult(jsonData) ? jsonData.title : videoId),
				),
			]);
		}
	}

	visible.value = false;
};
</script>

<template>
	<Button icon="pi pi-plus" label="Add video" @click="visible = true" />

	<AddVideoModal
		v-if="visible"
		@cancel="visible = false"
		:on-save="handleSave"
	/>
</template>
