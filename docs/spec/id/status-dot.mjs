export default {
  summary: 'Titik berwarna 8 px diikuti kata-kata, untuk kondisi langsung sebuah sistem, layanan atau koneksi. Kata-kata menyebut kondisinya; titik membantu memindai.',
  when: [
    'Kesehatan atau kondisi sesuatu yang sedang berjalan: layanan aktif, sinkronisasi tertunda, siaran rapat warga sedang berlangsung.',
    'Kolom status di tabel atau daftar, saat titik mempercepat pemindaian ("Berjalan", "Berhenti").',
  ],
  whenNot: [
    ['Status sebuah catatan (Draf, Terlambat, Disetujui)', 'badge'],
    ['Jumlah item yang menunggu', 'count'],
    ['Seseorang sedang online', 'avatar', 'Pakai `.avatar__presence` pada avatar'],
    ['Pesan bahwa seluruh aplikasi sedang offline', 'banner'],
  ],
  where: 'Inline, di tempat kondisinya dibaca: di sel tabel, di ujung baris list, di header card, di footer ("Semua layanan berjalan"). Titik selalu datang sebelum kata-katanya.',
  anatomy: [
    ['.status', 'Wajib. Baris flex inline, jarak 8 px, teks isi 14 px.'],
    ['i', 'Wajib. Titik 8 px, netral secara bawaan.'],
    ['.status--ok|warn|down|live', 'Kondisinya: success, warning, danger, atau success dengan denyut singkat.'],
    ['text', 'Wajib. Kondisinya dalam kata-kata.'],
  ],
  examples: [
    {
      title: 'Kondisi',
      desc: 'Netral untuk tidak diketahui atau berhenti, lalu ok, warning, down dan live.',
      html: `<div class="docs-col" style="max-width: 320px;">
  <span class="status"><i aria-hidden="true"></i>Belum dimulai</span>
  <span class="status status--ok"><i aria-hidden="true"></i>Semua layanan berjalan</span>
  <span class="status status--warn"><i aria-hidden="true"></i>Sinkronisasi data pajak tertunda</span>
  <span class="status status--down"><i aria-hidden="true"></i>Pembayaran tidak tersedia</span>
  <span class="status status--live"><i aria-hidden="true"></i>Sedang berlangsung</span>
</div>`,
    },
    {
      title: 'Di dalam daftar',
      desc: 'Di ujung setiap baris, agar kondisinya sejajar.',
      html: `<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Loket pelayanan A</div><div class="lrow__sub">32 antrean</div></div><span class="status status--live"><i aria-hidden="true"></i>Buka</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Loket pelayanan B</div><div class="lrow__sub">28 antrean</div></div><span class="status status--warn"><i aria-hidden="true"></i>Buka terlambat</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Loket pelayanan C</div><div class="lrow__sub">Tutup</div></div><span class="status"><i aria-hidden="true"></i>Selesai</span></div>
</div>`,
    },
  ],
  variants: [
    ['status', 'Titik netral: tidak diketahui, selesai, mati.'],
    ['status--ok', 'Berjalan, sehat, terhubung.'],
    ['status--warn', 'Menurun, tertunda, mulai terlambat.'],
    ['status--down', 'Berhenti, gagal, tidak tersedia.'],
    ['status--live', 'Sedang berlangsung; titik berdenyut tiga kali saat muncul.'],
  ],
  motion: [
    '`status--live` memancarkan ring dari titik (`lds-live`, 1,8 detik dengan `--ease-inout`) tiga kali, lalu diam. Denyut tanpa henti berubah menjadi gangguan.',
    'Perubahan kondisi mengganti warna titik secara langsung; ganti kata-katanya dengan [text morph](text-morph) jika terjadi di depan mata.',
    'Reduced motion: denyut diputar sekali dalam 1 ms (praktis tidak ada).',
  ],
  a11y: [
    'Titik memakai `aria-hidden="true"`; kata-katanya adalah kondisinya.',
    'Jika kondisi berubah saat halaman terbuka dan itu penting (layanan mati), umumkan dengan baris `role="status"`, bukan dengan menjadikan setiap titik live region.',
  ],
  do: [
    'Tulis kondisinya dengan kata-kata sederhana ("Pembayaran tidak tersedia").',
    'Pakai empat makna yang sama di semua tempat.',
  ],
  dont: [
    'Menampilkan titik tanpa kata-kata.',
    'Memakainya untuk status catatan seperti Draf atau Lunas; pakai [badge](badge).',
    'Membuat denyut live berulang tanpa henti.',
  ],
};
