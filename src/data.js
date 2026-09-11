// =============================================================
//  SEMUA HAL YANG BOLEH/PERLU KAMU EDIT ADA DI FILE INI.
//  Logic & tampilan ada di App.jsx dan style.css — gak perlu diutak-atik.
// =============================================================

export const CONFIG = {
  name: 'Savira',
  senderName: 'Nazriel',

  // 6 digit PIN yang harus dimasukkan sebelum masuk ke halaman utama.
  pin: '151228',

  // TODO: ganti dengan tanggal ulang tahun ASLI Savira, contoh: "15 Desember"
  birthdayDate: '[15 Desember]',

  // Nomor WhatsApp tujuan (format internasional tanpa "+"), dipakai tombol kirim jawaban.
  whatsapp: '6283853276614',

  music: '/music/our-song.mp3',

  // ---------------------------------------------------------
  // FOTO — semua masih placeholder (link internet). Ganti tiap
  // value di bawah ini dengan link foto Savira kamu sendiri.
  // Nama key sudah dibuat jelas sesuai posisi tampilnya di web.
  // ---------------------------------------------------------
  photos: {
    // Foto besar di hero section (halaman pertama setelah masuk)
    FOTO_HERO: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85',

    // Foto di dalam "surat pembuka" (satu-satunya surat yang ada fotonya)
    FOTO_SURAT_PEMBUKA: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',

    // 3 foto di galeri (bagian "Sekilas Tentang Kamu")
    FOTO_GALERI_1: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
    FOTO_GALERI_2: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85',
    FOTO_GALERI_3: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?auto=format&fit=crop&w=900&q=85',

    // Foto di bagian "Pesan Spesial"
    FOTO_SPESIAL: 'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?auto=format&fit=crop&w=1200&q=85',
  },
};

// -----------------------------------------------------------
// SURAT PEMBUKA — satu-satunya surat yang tampil di awal & ada fotonya.
// -----------------------------------------------------------
export const openingLetter = {
  title: 'Untuk kamu, sebelum semuanya dimulai...',
  body: [
    'Kalau kamu sampai di halaman ini, berarti kamu sudah membuka sesuatu yang memang aku siapkan khusus untukmu.',
    'Aku bukan orang yang pandai merangkai kata secara langsung, jadi aku pilih cara ini — supaya kamu bisa membaca pelan-pelan, sambil aku berharap kamu tersenyum di setiap barisnya.',
    'Ini baru permulaan. Masih ada beberapa surat lagi yang menunggu untuk kamu buka satu per satu.',
  ],
};

// -----------------------------------------------------------
// 8 SURAT (khusus teks, tanpa foto) — isinya bebas kamu ganti sendiri nanti.
// -----------------------------------------------------------
export const letters = [
  {
    title: 'Awal Aku Memperhatikanmu',
    body: 'Aku tidak ingat persis kapan tepatnya, tapi ada satu titik di mana aku sadar mataku berhenti sebentar lebih lama untukmu. Bukan karena ada yang mencolok, justru karena caramu jadi diri sendiri itu yang membuatku penasaran ingin tahu lebih banyak.',
  },
  {
    title: 'Alasan Kenapa Susah Berpaling',
    body: 'Ada banyak hal kecil tentangmu yang entah kenapa selalu berhasil tinggal lebih lama di pikiranku — caramu bercerita, caramu tertawa, bahkan hal-hal sederhana yang mungkin kamu sendiri tidak sadari. Aku suka mengenalmu pelan-pelan, tanpa perlu memaksa apa pun.',
  },
  {
    title: 'Keberanian yang Aku Kumpulkan',
    body: 'Butuh waktu bagiku untuk memberanikan diri sekadar menyapa atau membalas chat tanpa mikir dua kali. Tapi setiap kali kamu merespons dengan hangat, rasanya semua keraguan itu jadi terasa layak diperjuangkan.',
  },
  {
    title: 'Kalau Kamu Bertanya Kenapa Aku Mendekatimu',
    body: 'Mungkin aku tidak selalu pandai mengatakan apa yang sebenarnya kurasakan. Tapi kalau ada satu hal yang ingin kamu tahu: kamu adalah seseorang yang berhasil membuat hari-hari biasa terasa jauh lebih menarik untuk dijalani.',
  },
  {
    title: 'Doa Kecil di Hari Spesialmu',
    body: `Hari ulang tahunmu memberiku alasan untuk akhirnya menulis semua ini. Semoga usia barumu dipenuhi hal-hal baik, orang-orang yang tulus, dan lebih banyak alasan untuk tersenyum — termasuk mungkin, sedikit dariku.`,
  },
  {
    title: 'Tentang Menunggu dengan Sabar',
    body: 'Aku tidak terburu-buru. Aku hanya ingin pelan-pelan menunjukkan bahwa ketertarikanku ini tulus, bukan sekadar rasa penasaran sesaat. Aku bersedia menunggu sampai kamu merasa nyaman untuk mengenalku lebih jauh.',
  },
  {
    title: 'Kejujuran yang Ingin Aku Sampaikan',
    body: 'Aku tidak ingin membuat semua ini terasa seperti kewajiban untuk menjawab apa pun. Aku hanya ingin jujur bahwa perasaanku kepadamu tulus adanya. Apa pun jawabanmu nanti, terima kasih sudah bersedia sampai di surat ini.',
  },
  {
    title: 'Sampai di Sini, Terima Kasih',
    body: 'Kalau kamu sudah membaca sampai surat terakhir ini, aku benar-benar berterima kasih. Semoga hari spesialmu terasa sedikit lebih hangat karena ini. Selamat ulang tahun, Savira — semoga umur barumu membawa banyak cinta dan keberanian baru untuk kita berdua.',
  },
];

// -----------------------------------------------------------
// TIMELINE "PDKT" — perjalanan mendekatimu, BUKAN kenangan berdua.
// -----------------------------------------------------------
export const timeline = [
  {
    label: 'Awal Melihatmu',
    text: 'Pertama kali memperhatikanmu dari jarak yang belum berani aku dekati.',
  },
  {
    label: 'Mulai Penasaran',
    text: 'Diam-diam mencari tahu lebih banyak tentang siapa kamu sebenarnya.',
  },
  {
    label: 'Memberanikan Diri Menyapa',
    text: 'Pesan pertama yang aku ketik ulang berkali-kali sebelum akhirnya dikirim.',
  },
  {
    label: 'Semakin Ingin Mengenalmu',
    text: 'Setiap balasanmu membuatku makin yakin untuk terus mendekat, pelan-pelan.',
  },
  {
    label: 'Sampai Hari Ini',
    text: 'Berharap perjalanan ini bisa berlanjut ke bab yang lebih dekat lagi.',
  },
];

// -----------------------------------------------------------
// ALASAN KENAPA — daftar hal kecil yang bikin kagum.
// -----------------------------------------------------------
export const reasons = [
  'Senyummu yang datang tanpa banyak usaha.',
  'Cara kamu tetap jadi dirimu sendiri.',
  'Caramu bercerita tentang hal-hal kecil dengan antusias.',
  'Kesabaranmu yang jarang kamu sadari sendiri.',
  'Karena kamu adalah kamu, bukan siapa pun yang lain.',
];

// -----------------------------------------------------------
// GALERI — caption untuk 3 foto di FOTO_GALERI_1/2/3
// -----------------------------------------------------------
export const gallery = [
  { key: 'FOTO_GALERI_1', caption: 'Senyum yang bikin harianku ikut jadi lebih berwarna.' },
  { key: 'FOTO_GALERI_2', caption: 'Difoto atau tidak, kamu tetap secantik ini.' },
  { key: 'FOTO_GALERI_3', caption: 'Salah satu fotomu favoritku, kalau boleh jujur.' },
];
