# Writing

https://lampung.kartadinata.app/docs/en/guide/penulisan

How to write interface copy for public services in Indonesian: clear to every citizen, polite without padding, and always telling people what happens next.

## Plain language for every citizen

Public services are used by everyone: students, farmers, traders, retirees, people using a smartphone for the first time. Write for all of them. Copy that someone with primary schooling understands still reads clearly to someone with a degree; the reverse is not true.

- One sentence, one idea. Aim for fewer than 20 words a sentence.
- Use everyday verbs: "isi", "kirim", "ubah" (fill in, send, change), not "lakukan pengisian", "melakukan pengiriman", "melakukan perubahan" (carry out the filling, perform the sending).
- Put what matters first: what to do, by when, and what happens if you do not.
- Leave official letter style out of the screen. "Dengan hormat, bersama ini kami sampaikan" (with respect, we hereby convey) has no place on a form.

## Active voice, address and capitals

**Active voice.** Say who acts. "Petugas akan memeriksa berkas Anda dalam 3 hari kerja" (an officer will check your documents within 3 working days) is clearer than "Berkas akan diperiksa" (documents will be checked). Passive is fine when the actor is unknown or does not matter.

**Address.** Address the reader as "Anda" (capital A), but sparingly. A polite imperative is often shorter: "Unggah foto KTP" (upload your ID card photo) is enough; "Anda diharapkan untuk mengunggah foto KTP Anda" (you are expected to upload your ID card photo) is padding. Do not use "kamu", "Bapak/Ibu" or "Saudara" in the interface; one form of address across the whole service is easier on people.

**Sentence case.** Titles, buttons, labels and menus capitalize only the first word and proper names: "Riwayat permohonan", not "Riwayat Permohonan". Never set whole words in capitals for emphasis.

**Punctuation.** Do not use em dashes. Split the sentence, or use a colon, a comma or parentheses. The docs build rejects em dashes. Avoid exclamation marks except for safety warnings that are truly urgent.

## Buttons and links

A button label names what happens after it is pressed. People should be able to predict the result without reading anything else on the screen.

- Use a verb and its object: `Kirim laporan` (send report), `Simpan perubahan` (save changes), `Unduh bukti bayar` (download receipt), `Batalkan permohonan` (cancel application).
- Avoid generic labels such as "Submit", "OK", "Proses" (process) or "Klik di sini" (click here).
- In a confirm dialog the button repeats the action: "Hapus draf?" (delete draft?) is answered with `Hapus draf` and `Batal`, not "Ya" and "Tidak" (yes, no).
- Link text names the destination: "Lihat syarat izin usaha" (see business permit requirements), not "selengkapnya" (more).
- One primary button per screen. See [Button](../components/button.md) for variants and order.

## Error and confirmation messages

An error message answers two questions: what happened, and what the person can do now. Do not blame the reader, do not show technical codes without an explanation, and never stop at "Terjadi kesalahan" (an error occurred).

- A field error sits right under its field: "NIK harus 16 angka. Anda mengisi 15." (the national ID number must be 16 digits; you entered 15). See [Text field](../components/text-field.md).
- A system error says what is still safe: "Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi." (the report was not sent because the connection dropped; your answers are saved; try sending again).
- A success message names the result and the wait: "Laporan terkirim. Nomor tiket LPR-20261112-0042. Petugas membalas dalam 2 hari kerja." (report sent, ticket number, an officer replies within 2 working days).
- A summary above a form uses an [Alert](../components/alert.md); color and icon only support it, the words carry the meaning.

Foto KTP belum bisa diunggah Ukuran berkas 8 MB, batasnya 5 MB. Perkecil foto atau pilih berkas lain.

In English: "Your ID card photo could not be uploaded. The file is 8 MB and the limit is 5 MB. Make the photo smaller or choose another file."

## Numbers, dates, time and currency

Use Indonesian formats in all Indonesian copy, including tables and charts.

| Kind | Write | Not |
| --- | --- | --- |
| Currency | Rp 75.000 | Rp75000, IDR 75,000, 75rb |
| Decimal | 2,5 km | 2.5 km |
| Thousands | 12.480 warga | 12,480 warga |
| Date | 12 November 2026 | 11/12/2026, 2026-11-12, Nov 12 |
| Day and date | Kamis, 12 November 2026 | Kamis 12/11 |
| Time | 08.30 WIB | 8:30 AM, jam 8.30 pagi |
| Range | 08.00 sampai 15.00 WIB | 08.00-15.00 |
| Phone number | 0721 123 456 | (0721)123456 |

Write the time zone (WIB, Western Indonesian Time) when the service can be used from outside Lampung. Numbers that change or align in a table use tabular figures. Inside a sentence, one to nine may be spelled out, except for amounts, sizes and deadlines that people scan for.

## Terms, abbreviations and inclusive language

**Abbreviations.** Spell them out on first use, then use the short form: "Nomor Induk Kependudukan (NIK)" for the national ID number, "organisasi perangkat daerah (OPD)" for a regional government office. Where space is tight, such as a column label, use abbreviations everyone knows (NIK, KTP) and explain them in the help text. Internal office abbreviations never reach a citizen's screen.

**Jargon.** Replace bureaucratic terms with what the citizen experiences: "berkas Anda sedang diperiksa" (your documents are being checked), not "dalam proses verifikasi dan validasi" (in the verification and validation process). When an official term must appear, such as the name of a document, add a short explanation.

**English terms.** Prefer the common Indonesian word: "kata sandi" (password), "unggah" (upload), "unduh" (download), "masuk" (sign in), "keluar" (sign out). Use the English term only when the Indonesian one is unfamiliar to most people or when the English word is what their device shows (for example "email", "QR"). Whatever you choose, use the same term across the whole service.

**Inclusive language.** Write "penyandang disabilitas" (persons with disabilities), not "cacat" (defective). Write "warga lanjut usia" (older residents). Use neutral roles such as "petugas" (officer) and "pemohon" (applicant). Do not guess gender, religion or marital status from a name, and do not ask for them unless the service needs them, with the reason written next to the field.

## Good and bad pairs

The copy stays in Indonesian, because that is what citizens read; the last column explains the change.

| Avoid | Write | Why |
| --- | --- | --- |
| Submit | Kirim laporan | Names the result, in Indonesian |
| Terjadi kesalahan. Silakan coba lagi. | Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi. | Says what happened and what is safe |
| Input NIK tidak valid | NIK harus 16 angka. Anda mengisi 15. | Says how to fix it |
| Data Anda telah berhasil dilakukan penyimpanan | Perubahan tersimpan | Active and short |
| Mohon Untuk Melengkapi Dokumen Persyaratan | Lengkapi dokumen persyaratan | Sentence case, imperative |
| Biaya: IDR 75,000 | Biaya: Rp 75.000 | Indonesian format |
| Jadwal: 12/11 jam 8:30 | Jadwal: Kamis, 12 November 2026, 08.30 WIB | Cannot be misread |
| Hubungi OPD terkait | Hubungi organisasi perangkat daerah (OPD) yang menangani izin ini | Abbreviation explained on first use |
| Klik di sini | Lihat syarat izin usaha | The link names its destination |

## Aksara Lampung beside the text

Aksara Lampung (had Lampung, the script of Lampung) may accompany text as a cultural accent: a service name, a section title or one decorative band. It never replaces Latin text. Content, form labels, buttons, error messages and anything people must read are always written in Latin letters.

- Put the Latin reading right next to it, or in `aria-label`. When the Latin reading is visible beside it, give the aksara `aria-hidden="true"`.
- One or two appearances per page are enough.
- Automatic transliteration suits names and short phrases. Have anything printed or official checked by a speaker or teacher of had Lampung.

How to use it is on the [Aksara Lampung](../components/aksara.md) component page.
