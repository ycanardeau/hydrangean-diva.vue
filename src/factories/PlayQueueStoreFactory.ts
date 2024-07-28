import { PlayQueueItemStoreFactory } from '@/factories/PlayQueueItemStoreFactory';
import { PlayQueueStore } from '@/stores/PlayQueueStore';

export class PlayQueueStoreFactory {
	constructor(
		readonly playQueueItemStoreFactory: PlayQueueItemStoreFactory,
	) {}

	create(): PlayQueueStore {
		return new PlayQueueStore(this.playQueueItemStoreFactory);
	}
}
