import { PlayQueueItemStore } from '@/stores/PlayQueueItemStore';

export class PlayQueueItemStoreFactory {
	create(
		...props: ConstructorParameters<typeof PlayQueueItemStore>
	): PlayQueueItemStore {
		return new PlayQueueItemStore(...props);
	}
}
