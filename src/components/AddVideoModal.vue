<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';

defineProps<{
	onSave: (e: { url: string; title: string }) => Promise<void>;
}>();

defineEmits<{
	(e: 'cancel'): void;
}>();

const visible = ref(false);

onMounted(() => {
	visible.value = true;
});

const url = ref('');
const title = ref('');
const loading = ref(false);
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Add video"
		:style="{ width: '25rem' }"
		@hide="$emit('cancel')"
	>
		<div class="flex align-items-center gap-3 mb-3">
			<label for="url" class="font-semibold w-6rem">URL</label>
			<InputText
				id="url"
				class="flex-auto"
				autocomplete="off"
				v-model:model-value="url"
				autofocus
			/>
		</div>
		<div class="flex align-items-center gap-3 mb-5">
			<label for="title" class="font-semibold w-6rem">Title</label>
			<InputText
				id="title"
				class="flex-auto"
				autocomplete="off"
				v-model:model-value="title"
			/>
		</div>
		<div class="flex justify-content-end gap-2">
			<Button
				type="button"
				label="Cancel"
				severity="secondary"
				@click="$emit('cancel')"
			></Button>
			<Button
				type="button"
				label="Save"
				@click="
					async () => {
						try {
							loading = true;

							await onSave({ url, title });
						} finally {
							loading = false;
						}
					}
				"
				:disabled="url.trim().length === 0"
				:loading="loading"
			></Button>
		</div>
	</Dialog>
</template>
