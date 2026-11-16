/** One syllable of aksara Lampung: a base letter plus its signs, or a word gap. */
export interface AksaraCell {
  letter?: 'a' | 'ka' | 'ga' | 'nga' | 'pa' | 'ba' | 'ma' | 'ta' | 'da' | 'na' | 'ca' | 'ja' | 'nya' | 'ya' | 'la' | 'ra' | 'sa' | 'wa' | 'ha' | 'gha';
  above?: Array<'i' | 'e' | 'é' | 'an' | 'ar' | 'ang'>;
  below?: Array<'u' | 'o' | 'au'>;
  after?: Array<'ai' | 'ah' | 'nengen'>;
  space?: boolean;
}
/** Splits Latin text into aksara Lampung syllable cells. */
export function toAksara(text: string): AksaraCell[];
/** Draws Latin text as aksara Lampung in one inline SVG string (stroked with currentColor). */
export function aksaraSvg(text: string, opts?: { title?: string; stroke?: number; pad?: number }): string;
/** Fills `[data-lds-aksara]` elements and `.aksara-band` strips under root. `init()` calls it. */
export function renderAksara(root?: ParentNode): void;
/** Default text of the decorative band: the motto on the provincial emblem. */
export const BAND_TEXT: string;
