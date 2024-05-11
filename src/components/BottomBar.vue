<script setup lang="ts">
import MoreOptionsPopover from '@/components/MoreOptionsPopover.vue';
import SeekBar from '@/components/SeekBar.vue';
import { useNostalgicDiva } from '@/components/useNostalgicDiva';
import { PlayQueueStore, RepeatMode } from '@/stores/PlayQueueStore';
import { PlayerStore } from '@/stores/PlayerStore';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const props = defineProps<{
	playerStore: PlayerStore;
	playQueueStore: PlayQueueStore;
}>();

const diva = useNostalgicDiva();

const handlePrevious = async (): Promise<void> => {
	if (props.playQueueStore.hasPreviousItem) {
		const currentTime = await diva.value?.getCurrentTime();
		if (currentTime === undefined || currentTime < 5) {
			await props.playQueueStore.previous();
		} else {
			await diva.value?.setCurrentTime(0);
		}
	} else {
		await diva.value?.setCurrentTime(0);
	}
};
</script>

<template>
	<div
		:style="{
			position: 'fixed',
			left: 0,
			right: 0,
			bottom: 0,
		}"
	>
		<div
			:style="{
				height: '9px',
				backgroundColor: 'white',
			}"
		/>

		<SeekBar :player-store="playerStore" />

		<Toolbar>
			<template #center>
				<template v-if="playQueueStore.shuffle">
					<Button
						icon="pi pi-sort-alt"
						class="mr-2"
						severity="secondary"
						title="Shuffle: On"
						@click="playQueueStore.toggleShuffle()"
						:disabled="true"
					/>
				</template>
				<template v-else>
					<Button
						icon="pi pi-sort-alt-slash"
						class="mr-2"
						severity="secondary"
						title="Shuffle: Off"
						@click="playQueueStore.toggleShuffle()"
						:disabled="true"
					/>
				</template>
				<Button
					icon="pi pi-step-backward"
					class="mr-2"
					severity="secondary"
					title="Previous"
					@click="handlePrevious()"
					:disabled="playQueueStore.isEmpty"
				/>
				<template v-if="playerStore.playing">
					<Button
						icon="pi pi-pause"
						class="mr-2"
						severity="secondary"
						title="Pause"
						@click="diva?.pause()"
						:disabled="!playQueueStore.canPause"
					/>
				</template>
				<template v-else>
					<Button
						icon="pi pi-play"
						class="mr-2"
						severity="secondary"
						title="Play"
						@click="diva?.play()"
						:disabled="!playQueueStore.canPlay"
					/>
				</template>
				<Button
					icon="pi pi-step-forward"
					class="mr-2"
					severity="secondary"
					title="Next"
					@click="playQueueStore.next()"
					:disabled="!playQueueStore.hasNextItem"
				/>
				<template v-if="playQueueStore.repeat === RepeatMode.Off">
					<Button
						icon="pi pi-ban"
						severity="secondary"
						title="Repeat: Off"
						@click="playQueueStore.toggleRepeat()"
				/></template>
				<template v-else-if="playQueueStore.repeat === RepeatMode.All">
					<Button
						icon="pi pi-sync"
						severity="secondary"
						title="Repeat: All"
						@click="playQueueStore.toggleRepeat()"
				/></template>
				<template v-else-if="playQueueStore.repeat === RepeatMode.One">
					<Button
						icon="pi pi-replay"
						severity="secondary"
						title="Repeat: One"
						@click="playQueueStore.toggleRepeat()"
				/></template>
			</template>

			<template #end>
				<Button
					icon="pi pi-volume-up"
					class="mr-2"
					severity="secondary"
					:disabled="true"
				/>
				<MoreOptionsPopover :play-queue-store="playQueueStore" />
			</template>
		</Toolbar>
	</div>
</template>
