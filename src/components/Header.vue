<script setup lang="ts">
import AddVideoButton from '@/components/AddVideoButton.vue';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

defineProps<{
	playQueueStore: PlayQueueStore;
}>();
</script>

<template>
	<div
		:style="{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 1000 }"
	>
		<Toolbar>
			<template #end>
				<a
					href="https://ycanardeau.github.io/hydrangean-diva/"
					target="_blank"
				>
					<Button
						icon="pi pi-external-link"
						label="React version"
						class="mr-2"
						severity="secondary"
					/>
				</a>

				<a
					href="https://github.com/ycanardeau/hydrangean-diva.vue"
					target="_blank"
				>
					<Button
						icon="pi pi-github"
						class="mr-2"
						severity="secondary"
						title="GitHub"
					/>
				</a>

				<AddVideoButton :play-queue-store="playQueueStore" />
			</template>
		</Toolbar>
	</div>
</template>
