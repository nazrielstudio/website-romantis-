import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  Music2,
  Volume2,
  VolumeX,
  ChevronDown,
  Mail,
  Sparkles,
  Send,
  LockKeyhole,
  X,
  Gift,
} from 'lucide-react';
import { CONFIG, openingLetter, letters, timeline, reasons, gallery } from './data';
import { useTilt } from './useTilt';
import './style.css';

// Kelopak & partikel ambient yang melayang di background sepanjang web.
function Ambient() {
  const petals = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="ambient" aria-hidden="true">
      {petals.map((i) => (
        <span className="petal" key={i} style={{ '--i': i }} />
      ))}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('loading'); // loading -> welcomeGate -> pin -> envelope -> main
  const [pin, setPin] = useState('');
  const [musicOn, setMusicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [customAnswer, setCustomAnswer] = useState('');
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  const audioRef = useRef(null);
  const pinInputRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(CONFIG.music);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.4;
    audioRef.current.setAttribute('playsinline', '');
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Loading cinematic otomatis lanjut ke welcomeGate setelah beberapa detik.
  useEffect(() => {
    if (stage !== 'loading') return;
    const t = setTimeout(() => setStage('welcomeGate'), 4200);
    return () => clearTimeout(t);
  }, [stage]);

  // Tutup modal dengan tombol Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveLetter(null);
        setAnswer(null);
        setSurpriseOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Kunci scroll body saat ada modal terbuka.
  useEffect(() => {
    const open = activeLetter !== null || !!answer || surpriseOpen;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLetter, answer, surpriseOpen]);

  const startMusic = () => {
    audioRef.current?.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      startMusic();
    }
  };

  const enterWelcomeGate = () => {
    startMusic();
    setStage('pin');
    setTimeout(() => pinInputRef.current?.focus(), 150);
  };

  const submitPin = () => {
    if (pin === CONFIG.pin) setStage('envelope');
  };

  const scrollToId = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sendToWhatsapp = (message) => {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const heroTilt = useTilt(8);

  return (
    <div className="app">
      <Ambient />

      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.section
            key="loading"
            className="stage-screen loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-orb" />
            <motion.p
              className="loading-line"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Selamat datang, {CONFIG.name}
            </motion.p>
            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.9 }}
            >
              Happy Birthday
            </motion.h1>
            <motion.button
              className="ghost-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              onClick={() => setStage('welcomeGate')}
            >
              Lewati ♡
            </motion.button>
          </motion.section>
        )}

        {stage === 'welcomeGate' && (
          <motion.section
            key="welcomeGate"
            className="stage-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="eyebrow">SEBUAH DUNIA KECIL UNTUKMU</p>
            <h1 className="stage-title">
              Ayo masuk, <em>{CONFIG.name}</em>
            </h1>
            <p className="stage-sub">Ada sesuatu yang aku siapkan khusus untukmu malam ini.</p>
            <button className="primary-btn" onClick={enterWelcomeGate}>
              Masuk <Heart size={16} />
            </button>
          </motion.section>
        )}

        {stage === 'pin' && (
          <motion.section
            key="pin"
            className="stage-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="lock-orb">
              <LockKeyhole size={22} />
            </div>
            <p className="eyebrow">SATU RAHASIA KECIL</p>
            <h2 className="stage-title small">Masukkan angka yang mungkin sudah kamu tahu.</h2>
            <div className="pin-dots">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={pin[i] ? 'filled' : ''}>
                  {pin[i] || '•'}
                </span>
              ))}
            </div>
            <input
              ref={pinInputRef}
              className="pin-input"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              placeholder="Ketik 6 digit PIN"
              aria-label="PIN"
            />
            <button className="primary-btn" onClick={submitPin} disabled={pin.length !== 6}>
              Buka <Sparkles size={16} />
            </button>
            {pin.length === 6 && pin !== CONFIG.pin && (
              <p className="error-text">Hmm, belum tepat. Coba lagi ya 🤭</p>
            )}
          </motion.section>
        )}

        {stage === 'envelope' && (
          <motion.section
            key="envelope"
            className="stage-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!envelopeOpen ? (
              <>
                <div className="envelope-3d" onClick={() => setEnvelopeOpen(true)}>
                  <div className="envelope-back" />
                  <div className="envelope-flap" />
                  <div className="envelope-seal">♡</div>
                </div>
                <p className="eyebrow">SEBUAH SURAT UNTUKMU</p>
                <h2 className="stage-title small">Ada satu hal yang ingin kamu baca dulu...</h2>
                <button className="primary-btn" onClick={() => setEnvelopeOpen(true)}>
                  Buka Surat <Mail size={16} />
                </button>
              </>
            ) : (
              <motion.div
                className="opening-letter-card"
                initial={{ opacity: 0, y: 24, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="eyebrow">SURAT PEMBUKA</p>
                <h2>{openingLetter.title}</h2>
                <img src={CONFIG.photos.FOTO_SURAT_PEMBUKA} alt="Untuk Savira" />
                <div className="scroll-text">
                  {openingLetter.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p className="signature">— {CONFIG.senderName} ♡</p>
                </div>
                <button className="primary-btn" onClick={() => setStage('main')}>
                  Lanjut ke Halaman Utama <ChevronDown size={16} />
                </button>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {stage === 'main' && (
        <>
          <header className="nav">
            <div className="brand">♡ {CONFIG.name}</div>
            <nav className={menuOpen ? 'open' : ''}>
              <button onClick={() => scrollToId('timeline')}>Perjalanan</button>
              <button onClick={() => scrollToId('letters')}>Surat</button>
              <button onClick={() => scrollToId('gallery')}>Galeri</button>
              <button onClick={() => scrollToId('surprise')}>Kado 🎁</button>
            </nav>
            <div className="nav-actions">
              <button className="music-btn" onClick={toggleMusic} aria-label="Musik">
                {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <Music2 size={15} />
              </button>
              <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
                ☰
              </button>
            </div>
          </header>

          <main>
            {/* HERO */}
            <section className="section hero">
              <div className="hero-copy">
                <p className="eyebrow">{CONFIG.birthdayDate} · SEBUAH HARI UNTUKMU</p>
                <h1>
                  Untuk <em>{CONFIG.name}</em>,<br />
                  yang diam-diam membuat<br />
                  <span>hariku terasa lebih hangat.</span>
                </h1>
                <p className="lead">
                  Halaman ini bukan cuma tentang ucapan ulang tahun. Ini tentang seseorang yang belakangan ini
                  selalu berhasil membuatku ingin tahu lebih banyak — tentangmu.
                </p>
                <button className="primary-btn" onClick={() => scrollToId('timeline')}>
                  Mulai Baca Perjalanannya <ChevronDown size={16} />
                </button>
              </div>
              <div
                className="hero-photo"
                ref={heroTilt.ref}
                onMouseMove={heroTilt.onMouseMove}
                onMouseLeave={heroTilt.onMouseLeave}
              >
                <img src={CONFIG.photos.FOTO_HERO} alt={CONFIG.name} />
                <div className="photo-note">untukmu, {CONFIG.name} ♡</div>
              </div>
            </section>

            {/* TIMELINE PDKT */}
            <section id="timeline" className="section">
              <div className="section-head">
                <p className="eyebrow">PERJALANAN MENDEKATIMU</p>
                <h2>Belum jadi cerita bersama, tapi sudah jadi perjalanan tersendiri.</h2>
              </div>
              <div className="timeline">
                {timeline.map((t, i) => (
                  <div className={`timeline-item ${i % 2 ? 'right' : 'left'}`} key={t.label}>
                    <div className="timeline-dot">{i + 1}</div>
                    <div className="timeline-card">
                      <h3>{t.label}</h3>
                      <p>{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SURAT */}
            <section id="letters" className="section">
              <div className="section-head">
                <p className="eyebrow">KOLEKSI SURAT</p>
                <h2>Delapan surat kecil, delapan hal yang ingin aku sampaikan.</h2>
              </div>
              <div className="letter-grid">
                {letters.map((l, i) => (
                  <motion.button
                    key={l.title}
                    className="letter-card"
                    whileHover={{ y: -8, rotateZ: i % 2 ? 1.5 : -1.5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveLetter(i)}
                  >
                    <div className="mini-envelope">♡</div>
                    <small>SURAT 0{i + 1}</small>
                    <h3>{l.title}</h3>
                    <p>Klik untuk membuka...</p>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* GALERI */}
            <section id="gallery" className="section gallery">
              <div className="section-head">
                <p className="eyebrow">SEKILAS TENTANG KAMU</p>
                <h2>Beberapa fotomu yang aku suka lihat.</h2>
              </div>
              <div className="polaroids">
                {gallery.map((g, i) => (
                  <figure className={`polaroid p${i + 1}`} key={g.key}>
                    <img src={CONFIG.photos[g.key]} alt={`Foto ${i + 1}`} />
                    <figcaption>{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* ALASAN */}
            <section className="section reasons">
              <p className="eyebrow">KALAU KAMU BERTANYA KENAPA</p>
              <h2>Hal-hal kecil yang bikin aku kagum.</h2>
              <div className="reason-list">
                {reasons.map((r, i) => (
                  <div className="reason" key={r}>
                    <b>0{i + 1}</b>
                    <span>{r}</span>
                    <Heart size={18} />
                  </div>
                ))}
              </div>
            </section>

            {/* BIRTHDAY */}
            <section className="section birthday">
              <div className="cake-orb">🎂</div>
              <p className="eyebrow">HARI INI HARIMU</p>
              <h1>
                Happy Birthday,<br />
                <em>{CONFIG.name} ♡</em>
              </h1>
              <p>
                Semoga usia yang baru membawa lebih banyak alasan untuk tersenyum, lebih banyak hal baik untuk
                dikenang, dan lebih banyak keberanian untuk mimpi-mimpimu.
              </p>
              <div className="wish-quote">
                "Semoga kamu selalu menemukan cahaya, bahkan di hari yang paling sederhana."
              </div>
            </section>

            {/* PESAN SPESIAL */}
            <section className="section special">
              <div className="special-card">
                <img src={CONFIG.photos.FOTO_SPESIAL} alt="Pesan spesial" />
                <div>
                  <p className="eyebrow">SATU PESAN LAGI</p>
                  <h2>Ada satu hal yang ingin aku titipkan.</h2>
                  <p>
                    Aku tidak yakin semua kata di sini cukup untuk menjelaskan apa yang sebenarnya ingin aku
                    sampaikan. Tapi setidaknya, semoga kamu tahu — membuat ini adalah caraku bilang bahwa kamu
                    berarti.
                  </p>
                  <p>Dan apa pun jawabanmu nanti, aku tetap berharap ulang tahunmu dipenuhi kebahagiaan.</p>
                </div>
              </div>
            </section>

            {/* SURPRISE / KADO */}
            <section id="surprise" className="section surprise-section">
              <div className="section-head">
                <p className="eyebrow">SATU LAGI</p>
                <h2>Ada kado kecil untukmu 🎁</h2>
                <p className="lead center">Buka pelan-pelan, ya.</p>
              </div>
              <button className="gift-box-3d" onClick={() => setSurpriseOpen(true)}>
                <div className="gift-lid" />
                <div className="gift-body">
                  <Gift size={28} />
                </div>
                <strong>BUKA KADONYA</strong>
              </button>
            </section>

            {/* SURAT PENUTUP */}
            <section className="section final-letter">
              <div className="paper dark-paper">
                <div className="heartbeat">♡</div>
                <p className="eyebrow">SURAT TERAKHIR</p>
                <h2>Kalau kamu mau membaca satu hal lagi sampai selesai...</h2>
                <div className="scroll-text">
                  <p>
                    Aku tidak membuat semua ini untuk memaksamu menjawab apa pun. Aku membuatnya karena ada
                    seseorang yang ingin aku rayakan hari ini — kamu.
                  </p>
                  <p>
                    Mungkin aku terlalu banyak berharap, mungkin juga tidak. Tapi aku ingin jujur soal satu hal:
                    aku menyukaimu. Dan kalau perasaan ini kebetulan punya tempat di hatimu juga, mungkin kita
                    bisa mulai menulis bab yang baru.
                  </p>
                  <p className="signature">Selamat ulang tahun, {CONFIG.name}. ♡</p>
                </div>
              </div>
            </section>

            {/* PERTANYAAN */}
            <section className="section question">
              <p className="eyebrow">SATU PERTANYAAN TERAKHIR</p>
              <h1>{CONFIG.name}...</h1>
              <p className="question-lead">
                Setelah semua surat kecil ini,<br />
                aku ingin bertanya sesuatu.
              </p>
              <h2>
                Mau nggak jadi pacar aku? <span>♡</span>
              </h2>
              <div className="answer-buttons">
                <button className="primary-btn" onClick={() => setAnswer('yes')}>
                  💗 Mau
                </button>
                <button className="soft-btn" onClick={() => setAnswer('no')}>
                  🌸 Belum Siap
                </button>
                <button className="outline-btn" onClick={() => setAnswer('custom')}>
                  💌 Jawab Sesuai Hati
                </button>
              </div>
            </section>
          </main>

          <footer>
            <Heart size={16} /> dibuat dengan banyak perasaan untuk {CONFIG.name} <Heart size={16} />
          </footer>
        </>
      )}

      {/* MODAL: SURAT */}
      <AnimatePresence>
        {activeLetter !== null && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setActiveLetter(null)}
          >
            <motion.div
              className="modal-paper"
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveLetter(null)} aria-label="Tutup">
                <X size={18} />
              </button>
              <p className="eyebrow">SURAT 0{activeLetter + 1}</p>
              <h2>{letters[activeLetter].title}</h2>
              <div className="scroll-text">
                <p>{letters[activeLetter].body}</p>
                <p className="signature">— {CONFIG.senderName} ♡</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: JAWABAN */}
      <AnimatePresence>
        {answer && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setAnswer(null)}
          >
            <motion.div className="answer-modal" initial={{ y: 30 }} animate={{ y: 0 }} onMouseDown={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setAnswer(null)} aria-label="Tutup">
                <X size={18} />
              </button>

              {answer === 'yes' && (
                <>
                  <div className="big-heart">💗</div>
                  <p className="eyebrow">JAWABAN FAVORITKU</p>
                  <h2>Dia jawab mau! ♡</h2>
                  <p>Serius? Aku senang sekali. Terima kasih sudah membaca semuanya sampai di sini.</p>
                  <button className="primary-btn" onClick={() => sendToWhatsapp('Aku sudah baca semuanya... dan jawabanku: MAU ❤️')}>
                    <Send size={16} /> Kirim Jawaban
                  </button>
                </>
              )}

              {answer === 'no' && (
                <>
                  <div className="big-heart">🌸</div>
                  <p className="eyebrow">TIDAK APA-APA</p>
                  <h2>Aku mengerti. ♡</h2>
                  <p>
                    Terima kasih sudah jujur dan sudah membaca semua yang aku tulis. Mungkin cerita kita belum
                    sampai di bagian yang sama, dan itu tidak apa-apa. Aku tetap berharap ulang tahunmu indah.
                  </p>
                  <button className="soft-btn" onClick={() => setAnswer(null)}>
                    Kembali ke Website ♡
                  </button>
                </>
              )}

              {answer === 'custom' && (
                <>
                  <div className="big-heart">💌</div>
                  <p className="eyebrow">JAWABAN DARI HATIMU</p>
                  <h2>Tulis saja apa yang ingin kamu katakan.</h2>
                  <textarea
                    autoFocus
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder="Tulis jawabanmu di sini..."
                  />
                  <div className="custom-actions">
                    <button className="outline-btn" onClick={() => setAnswer(null)}>
                      Kembali
                    </button>
                    <button
                      className="primary-btn"
                      disabled={!customAnswer.trim()}
                      onClick={() => sendToWhatsapp(`Aku sudah baca semuanya. Jawabanku: ${customAnswer}`)}
                    >
                      <Send size={16} /> Kirim
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: KADO / SURPRISE 3D */}
      <AnimatePresence>
        {surpriseOpen && (
          <motion.div
            className="surprise-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="surprise-particles">
              {Array.from({ length: 40 }, (_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>

            <button className="close-btn on-dark" onClick={() => setSurpriseOpen(false)} aria-label="Tutup">
              <X />
            </button>

            <motion.div
              className="gift-open-3d"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            >
              <div className="gift-lid-open" />
              <div className="gift-box-open">
                <span>🎁</span>
              </div>
              <div className="gift-burst b1">🌸</div>
              <div className="gift-burst b2">💗</div>
              <div className="gift-burst b3">✨</div>
              <div className="gift-burst b4">🌷</div>
              <div className="gift-burst b5">💖</div>
              <div className="gift-burst b6">🌹</div>
            </motion.div>

            <div className="surprise-title">
              {'SELAMAT ULANG TAHUN'.split('').map((c, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                  {c === ' ' ? '\u00a0' : c}
                </span>
              ))}
            </div>
            <p className="surprise-note">
              Semoga hari ini dipenuhi bunga, cinta, senyum, dan semua hal baik yang kamu pantas dapatkan. ♡
            </p>
            <button className="primary-btn" onClick={() => setSurpriseOpen(false)}>
              Kembali ke Website
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
