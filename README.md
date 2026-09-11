# Website Ultah — Savira 💐

## Cara jalankan di komputer sendiri
```
npm install
npm run dev
```
Buka link yang muncul di terminal (biasanya http://localhost:5173).

## Yang WAJIB kamu edit sebelum kasih ke Savira
Semua ada di **src/data.js**, sudah diberi komentar jelas:
1. `photos` → ganti semua link `FOTO_...` dengan link foto asli Savira.
2. `birthdayDate` → isi tanggal ulang tahun aslinya.
3. `pin` → boleh diganti PIN lain kalau mau.
4. `letters`, `openingLetter`, `timeline`, `reasons`, `gallery` → isi teksnya bebas kamu sempurnakan sendiri.
5. Lagu latar sudah pakai file kamu (`public/music/our-song.mp3`) — kalau mau ganti, taruh file baru di folder itu dan ubah `music: '/music/nama-file.mp3'` di data.js.

## Deploy ke Vercel
1. Push folder ini ke repo GitHub baru.
2. Buka vercel.com → New Project → import repo itu.
3. Framework preset otomatis kedeteksi "Vite" — langsung klik Deploy.

Selesai, link Vercel-nya itu yang dikirim ke Savira.
