import { NostalgicDivaElement } from '@aigamo/nostalgic-diva';
import { Ref, ref } from 'vue';

const diva = ref<NostalgicDivaElement>();

export function useNostalgicDiva(): Ref<NostalgicDivaElement | undefined> {
	return diva;
}
