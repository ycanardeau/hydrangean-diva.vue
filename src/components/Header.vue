<script setup lang="ts">
import AddVideoButton from '@/components/AddVideoButton.vue';
import { PlayQueueStore } from '@/stores/PlayQueueStore';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const commitHash =
	typeof import.meta.env.VITE_COMMIT_HASH === 'string'
		? import.meta.env.VITE_COMMIT_HASH
		: undefined;

defineProps<{
	playQueueStore: PlayQueueStore;
}>();
</script>

<template>
	<div
		:style="{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 1000 }"
	>
		<Toolbar>
			<template #start>
				<template v-if="commitHash">
					<a
						:href="`https://github.com/ycanardeau/hydrangean-diva.vue/tree/${commitHash}`"
						target="_blank"
					>
						<Button
							:label="commitHash.slice(0, 7)"
							severity="secondary"
						/>
					</a>
				</template>
			</template>

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
