import { PlayerType } from '@aigamo/nostalgic-diva';

export interface PlayQueueItemDto {
	readonly url: string;
	readonly type: PlayerType;
	readonly videoId: string;
	readonly title: string;
}

export class PlayQueueItemStore {
	static nextId = 1;

	readonly id: number;
	isSelected = false;

	constructor(
		readonly url: string,
		readonly type: PlayerType,
		readonly videoId: string,
		readonly title: string,
	) {
		this.id = PlayQueueItemStore.nextId++;
	}

	static fromDto(dto: PlayQueueItemDto): PlayQueueItemStore {
		return new PlayQueueItemStore(
			dto.url,
			dto.type,
			dto.videoId,
			dto.title,
		);
	}

	unselect(): void {
		this.isSelected = false;
	}

	toggleSelected(): void {
		this.isSelected = !this.isSelected;
	}

	toDto(): PlayQueueItemDto {
		return {
			url: this.url,
			type: this.type,
			videoId: this.videoId,
			title: this.title,
		};
	}

	clone(): PlayQueueItemStore {
		return PlayQueueItemStore.fromDto(this.toDto());
	}
}
