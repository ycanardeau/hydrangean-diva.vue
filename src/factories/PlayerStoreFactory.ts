import { PlayerStore } from '@/stores/PlayerStore';

export class PlayerStoreFactory {
	create(): PlayerStore {
		return new PlayerStore();
	}
}
