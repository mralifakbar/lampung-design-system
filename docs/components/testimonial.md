# Testimonial

Kelompok: Promosi. https://lampung.kartadinata.app/docs/components/testimonial

Apa yang dikatakan satu orang sungguhan tentang layanan, dengan nama dan perannya. Sengaja tenang: kata-katanya yang membawa. Terbitkan hanya kutipan asli; selama merancang, beri label konten contoh pada placeholder di tempat pembaca melihatnya.

## Pakai saat
- Halaman landing atau halaman layanan dengan kutipan dari warga atau pengguna sungguhan yang setuju namanya dicantumkan.
- Studi kasus yang dibuka dengan ucapan penggunanya.

## Pakai yang lain saat
- Mengutip aturan, dokumen atau sumber dalam artikel: pakai [Quote](quote.md).
- Pesan dalam percakapan: pakai [Chat message](chat-message.md).
- Angka yang membuktikan sesuatu: pakai [Stat row](stat-row.md).

## Letaknya
Di [marketing section](marketing-section.md) di antara fitur dan tarif. Satu `testimonial--lg` selebar penuh, atau di samping dua kutipan yang lebih pendek; satu kolom di ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `figure.testimonial` | Wajib. Card di atas isian tenang. |
| `.testimonial--lg` | Kutipan lebih besar, sampai 36 em per baris. |
| `blockquote.testimonial__quote` | Wajib. Kata-katanya, dikutip persis. |
| `figcaption.testimonial__by` | Wajib. [Avatar](avatar.md) (foto atau inisial) dan orangnya. |
| `.testimonial__name, .testimonial__role` | Nama, lalu peran dan tempatnya. |

## Markup

**Satu kutipan utama dan satu yang pendek.** Konten contoh: orang dan kata-katanya dikarang untuk menunjukkan tata letak.
```html
<div class="docs-col" style="width: 100%;">
  <span class="badge">Konten contoh</span>
  <figure class="testimonial testimonial--lg">
    <blockquote class="testimonial__quote">Dulu mengurus izin usaha butuh tiga kali datang ke kantor. Sekarang berkas saya lengkap dalam satu malam, dari rumah.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar" aria-hidden="true">DA</span><span class="testimonial__who"><span class="testimonial__name">Dewi Anggraini</span><span class="testimonial__role">Pemilik warung makan di Kedaton, contoh</span></span></figcaption>
  </figure>
  <figure class="testimonial">
    <blockquote class="testimonial__quote">Warga kami bisa melihat sendiri laporan lampu jalan sudah sampai tahap mana.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar avatar--gray" aria-hidden="true">AH</span><span class="testimonial__who"><span class="testimonial__name">Arif Hakim</span><span class="testimonial__role">Ketua RT di Way Halim, contoh</span></span></figcaption>
  </figure>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `testimonial--lg` | Kutipan utama: 20 sampai 26 px. |

## Gerak dan mikrointeraksi
- Statis. Boleh memudar naik sekali dengan [reveal on scroll](reveal-on-scroll.md), berjarak 35 ms.

## Aksesibilitas
- `figure` dengan kutipan di `blockquote` dan orangnya di `figcaption`, agar atribusi terikat pada kata-katanya.
- Avatar inisial memakai `aria-hidden`; namanya berupa teks.

## Lakukan
- Kutip orang sungguhan dengan izin mereka dan peran mereka yang sebenarnya.
- Batasi kutipan pada apa yang diubah layanan ini bagi mereka.
- Tandai konten contoh dengan jelas selama halaman masih draf.

## Hindari
- Mengarang kutipan, nama, rating bintang atau logo instansi untuk halaman yang tayang.
- Menambah tanda kutip sebagai dekorasi atau carousel yang berputar sendiri.

## Terkait
[Quote](quote.md) · [Avatar](avatar.md) · [Marketing section](marketing-section.md) · [Stat row](stat-row.md)
