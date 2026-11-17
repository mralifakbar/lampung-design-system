# Donut

Kelompok: Grafik. https://lampung.kartadinata.app/docs/components/donut

Cincin yang dibagi menjadi paling banyak empat segmen untuk menunjukkan bagian dari satu keseluruhan, dengan total di tengah dan daftar berlabel di sampingnya. Daftar membawa angkanya; cincin menunjukkan proporsi sekilas.

## Pakai saat
- Dua sampai empat bagian dari satu keseluruhan ketika pembaca peduli pada pembagian kasarnya: warung per nilai kebersihan, anggaran per pos.
- Tile dasbor ketika total sama pentingnya dengan pembagiannya (total berada di lubang tengah).

## Pakai yang lain saat
- Bagian dari keseluruhan dalam baris sempit atau dengan banyak kategori: pakai [Percentage bar](percentage-bar.md).
- Membandingkan ukuran secara tepat atau lebih dari empat bagian: pakai [Bar chart](bar-chart.md). Batang lebih mudah dibandingkan daripada sudut.
- Kemajuan satu nilai menuju target: pakai [Progress ring](progress-ring.md).
- Perubahan dari waktu ke waktu: pakai [Line chart](line-chart.md).

## Letaknya
Di `.chart-card`, cincin di kiri (168 px) dan daftar di kanan; di ponsel daftar turun ke bawah cincin. Setengah lebar di dasbor.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.donut-chart` | Komponennya: cincin dan legenda berdampingan, turun ke bawah di bawah 400 px. Digambar oleh `data-lds-chart` dengan `type: "donut"`, atau ditulis manual dengan bagian di bawah. |
| `.donut > svg > circle.donut__seg` | Satu lingkaran per bagian (r 64 dalam viewBox 168, diputar agar bagian pertama dimulai di atas); `stroke-dasharray` mengatur panjangnya, `stroke-dashoffset` awalnya, `--series-n` warnanya. |
| `.donut__label` | Total (`b`) dan apa yang dihitungnya (`span`), di tengah lubang. |
| `ul.donut-legend` | Satu `li` per bagian: swatch `i`, nama, nilai `b`, porsi `em`. Urutannya sama dengan cincin. |
| `.donut-chart--thin` | Cincin 10 px untuk kartu kecil. |
| `svg.donut` | Wajib. viewBox 168 x 168, diputar -90 derajat agar segmen pertama dimulai di atas. `role="img"` + `aria-label`. |
| `circle` | Wajib. Satu per segmen, r 64, `fill: none`, stroke 14 px (diatur oleh `.donut circle`). Panjang lewat `stroke-dasharray`, posisi lewat `stroke-dashoffset`, warna lewat `--series-n`. |
| `label tengah` | Total dan satuannya, diposisikan absolut di tengah svg (gaya inline; belum ada class). |
| `daftar` | Wajib. Swatch, label, dan nilai per segmen, dengan urutan yang sama seperti cincin. |

## Markup

**Digambar dari data, dengan daftar legenda.** Cincin, total, dan legenda berisi nilai serta porsi setiap bagian berasal dari satu config. Arahkan kursor ke segmen atau baris legenda: keduanya menonjol. Ganti bulan: segmen bergerak ke ukuran barunya dari posisinya sekarang. Segmen menyapu masuk saat pertama terlihat.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="dn-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="dn-q">Dari mana akun baru portal layanan berasal?</div><div class="chart-card__sub">Akun baru menurut sumber</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Bulan" data-lds-segmented data-lds-chart-for="dn-src" style="width: 200px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" data-set="nov">November</button><button type="button" class="seg__btn" aria-pressed="false" data-set="oct">Oktober</button></div></div>
  </div>
  <div id="dn-src" data-lds-chart='{"type":"donut","label":"Asal 1.284 akun baru portal layanan bulan ini: mesin pencari 42%, buletin email 26%, loket kelurahan 19%, lainnya 13%.","unit":"akun baru","center":"1.284","segments":[{"name":"Mesin pencari","value":540},{"name":"Buletin email","value":334},{"name":"Loket kelurahan","value":244},{"name":"Lainnya","value":166,"color":"neutral"}],"sets":{"nov":{"center":"1.284","label":"Akun baru November menurut sumber.","segments":[{"name":"Mesin pencari","value":540},{"name":"Buletin email","value":334},{"name":"Loket kelurahan","value":244},{"name":"Lainnya","value":166,"color":"neutral"}]},"oct":{"center":"1.106","label":"Akun baru Oktober menurut sumber.","segments":[{"name":"Mesin pencari","value":402},{"name":"Buletin email","value":361},{"name":"Loket kelurahan","value":198},{"name":"Lainnya","value":145,"color":"neutral"}]}}}'></div>
</section>
```

**Cincin tipis di kartu kecil.** `thin: true` menggambar cincin 10 px; `size` membuatnya lebih kecil. Di bawah sekitar 400 px legenda turun ke bawah cincin.
```html
<section class="chart-card" style="max-width: 440px;" aria-labelledby="dn-b"><div><div class="chart-card__q" id="dn-b">Ke mana anggaran posyandu dipakai?</div><div class="chart-card__sub">Rencana belanja, November</div></div><div data-lds-chart='{"type":"donut","label":"Anggaran posyandu bulanan Rp 3,2 juta: honor kader 45%, makanan tambahan 22%, transport 12%, sisanya 21%.","unit":"bulan ini","center":"Rp 3,2 jt","thin":true,"size":148,"format":{"prefix":"Rp ","suffix":" rb"},"segments":[{"name":"Honor kader","value":1440},{"name":"Makanan tambahan","value":704},{"name":"Transport","value":384},{"name":"Lainnya","value":672,"color":"neutral"}]}'></div></section>
```

**Nilai kebersihan per wilayah.** Ganti wilayah: segmen bergerak ke ukuran barunya selama 480 ms dengan kurva in-out.
```html
<div class="chart-card" style="max-width: 520px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Bagaimana sebaran nilai kebersihan?</div><div class="chart-card__sub">Hasil pemeriksaan warung makan, triwulan III</div></div>
    <div class="seg" role="group" aria-label="Wilayah" data-lds-segmented style="width: 180px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" aria-pressed="true" onclick="const c = this.closest('.chart-card'); c.querySelectorAll('circle').forEach(e => { const [d, o] = e.dataset.a.split('|'); e.style.strokeDasharray = d; e.style.strokeDashoffset = o; }); c.querySelectorAll('b[data-a]').forEach(e => e.textContent = e.dataset.a); c.querySelector('[data-total]').textContent = '42';">Wilayah 1</button>
      <button class="seg__btn" aria-pressed="false" onclick="const c = this.closest('.chart-card'); c.querySelectorAll('circle').forEach(e => { const [d, o] = e.dataset.b.split('|'); e.style.strokeDasharray = d; e.style.strokeDashoffset = o; }); c.querySelectorAll('b[data-b]').forEach(e => e.textContent = e.dataset.b); c.querySelector('[data-total]').textContent = '42';">Wilayah 2</button>
    </div>
  </div>
  <div class="cluster" style="--gap: 28px;">
    <div style="position: relative; width: 168px; height: 168px; flex: none;">
      <svg class="donut" viewBox="0 0 168 168" style="width: 168px; height: 168px; transform: rotate(-90deg);" role="img" aria-label="Nilai kebersihan: A 12, B 18, C 9, D atau lebih rendah 3 dari 42 warung">
      <circle cx="84" cy="84" r="64" style="stroke: var(--series-1); stroke-dasharray: 112.89 289.23; stroke-dashoffset: 0.00;" data-a="112.89 289.23|0.00" data-b="74.60 327.53|0.00"></circle>
      <circle cx="84" cy="84" r="64" style="stroke: var(--series-2); stroke-dasharray: 170.34 231.79; stroke-dashoffset: -114.89;" data-a="170.34 231.79|-114.89" data-b="151.19 250.93|-76.60"></circle>
      <circle cx="84" cy="84" r="64" style="stroke: var(--series-3); stroke-dasharray: 84.17 317.95; stroke-dashoffset: -287.23;" data-a="84.17 317.95|-287.23" data-b="122.47 279.66|-229.79"></circle>
      <circle cx="84" cy="84" r="64" style="stroke: var(--series-4); stroke-dasharray: 26.72 375.40; stroke-dashoffset: -373.40;" data-a="26.72 375.40|-373.40" data-b="45.87 356.25|-354.25"></circle>
      </svg>
      <div class="center" style="position: absolute; inset: 0;"><div><div style="font: var(--type-title-2); color: var(--text-strong); font-variant-numeric: tabular-nums;" data-total>42</div><div style="font: var(--type-footnote); color: var(--text-subtle);">warung</div></div></div>
    </div>
    <div class="stack" style="--gap: 10px; flex: 1; min-width: 160px;">
      <div class="cluster" style="flex-wrap: nowrap; --gap: 10px; font: var(--type-subhead); color: var(--text-default);"><span style="width: 10px; height: 10px; border-radius: 3px; flex: none; background: var(--series-1);"></span><span style="flex: 1;">A</span><b style="font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums;" data-a="12" data-b="8">12</b></div>
      <div class="cluster" style="flex-wrap: nowrap; --gap: 10px; font: var(--type-subhead); color: var(--text-default);"><span style="width: 10px; height: 10px; border-radius: 3px; flex: none; background: var(--series-2);"></span><span style="flex: 1;">B</span><b style="font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums;" data-a="18" data-b="16">18</b></div>
      <div class="cluster" style="flex-wrap: nowrap; --gap: 10px; font: var(--type-subhead); color: var(--text-default);"><span style="width: 10px; height: 10px; border-radius: 3px; flex: none; background: var(--series-3);"></span><span style="flex: 1;">C</span><b style="font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums;" data-a="9" data-b="13">9</b></div>
      <div class="cluster" style="flex-wrap: nowrap; --gap: 10px; font: var(--type-subhead); color: var(--text-default);"><span style="width: 10px; height: 10px; border-radius: 3px; flex: none; background: var(--series-4);"></span><span style="flex: 1;">D atau lebih rendah</span><b style="font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums;" data-a="3" data-b="5">3</b></div>
    </div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `data change` | Atur `stroke-dasharray` dan `stroke-dashoffset` baru; keduanya bertransisi. Perbarui daftar, total, dan `aria-label`. |
| `one segment is 100 %` | Tampilkan cincin utuh dengan warna itu dan sebutkan di daftar. |
| `loading, empty, error` | Lihat [state grafik](chart-states.md); donut yang sedang dimuat berupa lingkaran `.skel` (`border-radius: 50%`). |

## Gerak dan mikrointeraksi
- Panjang dan posisi segmen bertransisi selama `--d-considered` (480 ms) dengan `--ease-inout`; opasitas selama `--d-fast` untuk peredupan hover yang Anda tambahkan.
- Saat pertama terlihat (digambar dari data, atau `data-lds-grow`): setiap segmen menyapu dari nol ke panjangnya selama 480 ms dengan `--ease-inout`.
- Mengarahkan kursor ke segmen atau baris legenda memudarkan segmen lain ke 35 % dan baris lain ke 55 % selama `--d-fast`.
- Reduced motion: tanpa sapuan; perubahan berlangsung 120 ms.

## Aksesibilitas
- `role="img"` pada svg dengan setiap bagian dan totalnya di `aria-label`.
- Daftar di samping cincin adalah teks asli berisi angkanya; itulah versi yang aksesibel dan yang tepat.
- Segmen dipisahkan oleh celah 2 unit dan oleh urutan, bukan hanya warna.

## Lakukan
- Urutkan segmen menurut maknanya (A sampai D) atau ukurannya, dimulai dari atas.
- Taruh total di lubang tengah dan angkanya di daftar.

## Hindari
- Memakai lebih dari empat segmen; gabungkan yang terkecil ke Lainnya.
- Memberi label segmen langsung di cincin.
- Memakai diagram pai penuh atau 3D.

## Perilaku (HTML biasa)
`data-lds-chart='{ "type": "donut", "segments": [{ "name": "Mesin pencari", "value": 540 }], "center": "1.284", "unit": "akun baru", "label": "…" }'` atau `drawChart(el, config)`; memanggilnya lagi dengan jumlah bagian yang sama akan menggerakkan segmen. `data-lds-chart-for` pada kontrol periode mengganti `sets`. Markup `.donut-chart` yang ditulis manual mendapat hover yang saling terhubung dari `init()`.

## Terkait
[Percentage bar](percentage-bar.md) · [Gauge](gauge.md) · [Bar chart](bar-chart.md) · [Chart principles](chart-principles.md)
