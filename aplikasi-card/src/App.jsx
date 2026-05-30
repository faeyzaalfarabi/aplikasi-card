import { useState } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const students = [
  {
    id: 1,
    nama: "Aulia Rahma Putri",
    sekolah: "SMA Negeri 1 Bandung",
    asal: "Bandung, Jawa Barat",
    nilaiAkhir: 92.4,
    aktif: true,
    jurusan: "IPA",
    kelas: "XII",
    inisial: "AR",
    warna: "#3b7dd8",
  },
  {
    id: 2,
    nama: "Rizky Fadhillah",
    sekolah: "SMA Negeri 3 Jakarta",
    asal: "Jakarta Selatan",
    nilaiAkhir: 85.0,
    aktif: true,
    jurusan: "IPS",
    kelas: "XI",
    inisial: "RF",
    warna: "#e05252",
  },
  {
    id: 3,
    nama: "Siti Nurhaliza",
    sekolah: "SMA Negeri 2 Surabaya",
    asal: "Surabaya, Jawa Timur",
    nilaiAkhir: 88.7,
    aktif: true,
    jurusan: "IPA",
    kelas: "XII",
    inisial: "SN",
    warna: "#3b7dd8",
  },
  {
    id: 4,
    nama: "Dimas Arya Pratama",
    sekolah: "SMA Negeri 1 Yogyakarta",
    asal: "Yogyakarta",
    nilaiAkhir: 94.1,
    aktif: true,
    jurusan: "IPA",
    kelas: "X",
    inisial: "DA",
    warna: "#e05252",
  },
  {
    id: 5,
    nama: "Mega Wulandari",
    sekolah: "SMA Negeri 5 Medan",
    asal: "Medan, Sumatera Utara",
    nilaiAkhir: 76.3,
    aktif: false,
    jurusan: "IPS",
    kelas: "XII",
    inisial: "MW",
    warna: "#3b7dd8",
  },
  {
    id: 6,
    nama: "Kevin Aditya Nugraha",
    sekolah: "SMA Negeri 2 Bekasi",
    asal: "Bekasi, Jawa Barat",
    nilaiAkhir: 89.5,
    aktif: true,
    jurusan: "IPA",
    kelas: "XI",
    inisial: "KA",
    warna: "#e05252",
  },
];

/* ─── HELPERS ───────────────────────────────────────────── */
function grade(n) {
  if (n >= 90) return { label: "A", color: "#2a7d4f" };
  if (n >= 80) return { label: "B", color: "#3b7dd8" };
  if (n >= 70) return { label: "C", color: "#e09a20" };
  return { label: "D", color: "#e05252" };
}

/* ─── CSS ───────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; }

.app {
  min-height: 100vh;
  background: #f4f6fb;
  background-image:
    radial-gradient(circle at 15% 20%, rgba(59,125,216,0.06) 0%, transparent 45%),
    radial-gradient(circle at 85% 75%, rgba(224,82,82,0.05) 0%, transparent 40%);
  padding-bottom: 80px;
}

/* ── HEADER ── */
.header {
  background: #fff;
  border-bottom: 1px solid #eaecf4;
  padding: 32px 24px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b7dd8 0%, #e05252 100%);
}
.header-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #3b7dd8;
  background: rgba(59,125,216,0.07);
  border: 1px solid rgba(59,125,216,0.15);
  padding: 4px 14px;
  border-radius: 99px;
  margin-bottom: 14px;
}
.header-title {
  font-family: 'DM Serif Display', serif;
  font-size: 34px;
  color: #0f1c3a;
  letter-spacing: -0.3px;
  line-height: 1.15;
}
.header-title em {
  font-style: italic;
  color: #3b7dd8;
}
.header-sub {
  font-size: 13.5px;
  color: #8a94aa;
  margin-top: 6px;
  font-weight: 400;
}

/* decorative dots */
.header-dots {
  position: absolute;
  right: 40px;
  top: 28px;
  display: grid;
  grid-template-columns: repeat(4, 6px);
  gap: 5px;
  opacity: 0.18;
}
.header-dots span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #3b7dd8;
  display: block;
}

/* ── FILTER ── */
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 24px 20px 8px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 7px 20px;
  border-radius: 99px;
  border: 1.5px solid #e0e4ef;
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  color: #6b748a;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.18s;
}
.filter-btn:hover { border-color: #3b7dd8; color: #3b7dd8; }
.filter-btn.active-blue { background: #3b7dd8; border-color: #3b7dd8; color: #fff; }
.filter-btn.active-red  { background: #e05252; border-color: #e05252; color: #fff; }

/* ── GRID ── */
.grid {
  max-width: 1080px;
  margin: 24px auto 0;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* ── CARD ── */
.card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid #eaecf4;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(15,28,58,0.05);
  transition: transform 0.22s, box-shadow 0.22s;
  animation: fadeUp 0.35s ease both;
  position: relative;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(15,28,58,0.1);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* colour stripe top */
.card-stripe { height: 4px; width: 100%; }

/* card header area */
.card-top {
  padding: 22px 22px 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

/* avatar */
.avatar {
  width: 62px;
  height: 62px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  color: #fff;
  flex-shrink: 0;
}
.card-info { flex: 1; min-width: 0; }
.card-name {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  color: #0f1c3a;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-school {
  font-size: 12px;
  color: #8a94aa;
  margin-top: 3px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-badges {
  display: flex;
  gap: 5px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.badge {
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 99px;
  letter-spacing: 0.3px;
}
.badge-kelas {
  background: rgba(59,125,216,0.09);
  color: #3b7dd8;
  border: 1px solid rgba(59,125,216,0.2);
}
.badge-jurusan {
  background: rgba(224,82,82,0.09);
  color: #e05252;
  border: 1px solid rgba(224,82,82,0.2);
}

/* divider */
.card-divider { height: 1px; background: #f0f2f8; margin: 0 22px; }

/* info rows */
.card-body {
  padding: 14px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.info-row { display: flex; align-items: center; gap: 10px; }
.info-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.info-label {
  font-size: 10.5px;
  color: #b0b8cc;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.info-val {
  font-size: 13px;
  color: #2b3553;
  font-weight: 600;
  margin-top: 1px;
}

/* nilai section */
.nilai-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fd;
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 4px;
  border: 1px solid #eaecf4;
}
.nilai-left { display: flex; flex-direction: column; gap: 2px; }
.nilai-label {
  font-size: 10.5px;
  color: #b0b8cc;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.nilai-num {
  font-family: 'DM Serif Display', serif;
  font-size: 26px;
  color: #0f1c3a;
  line-height: 1;
}
.nilai-grade {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Serif Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

/* status */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 99px;
  letter-spacing: 0.3px;
}
.status-pill::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.status-aktif {
  background: rgba(42,125,79,0.09);
  color: #2a7d4f;
  border: 1px solid rgba(42,125,79,0.2);
}
.status-alumni {
  background: rgba(138,148,170,0.12);
  color: #8a94aa;
  border: 1px solid rgba(138,148,170,0.2);
}

/* ── EMPTY ── */
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #b0b8cc;
  max-width: 1080px;
  margin: 0 auto;
}
.empty-icon { font-size: 44px; margin-bottom: 12px; }
.empty-text { font-size: 15px; font-weight: 500; }

/* ── FOOTER ── */
.footer {
  text-align: center;
  margin-top: 48px;
  font-size: 12px;
  color: #c8cdd8;
  letter-spacing: 0.3px;
}
`;

/* ─── CARD COMPONENT ────────────────────────────────────── */
function StudentCard({ s, idx }) {
  const g = grade(s.nilaiAkhir);
  const isBlue = s.warna === "#3b7dd8";

  return (
    <div className="card" style={{ animationDelay: `${idx * 0.07}s` }}>
      {/* top stripe */}
      <div
        className="card-stripe"
        style={{ background: `linear-gradient(90deg, ${s.warna}cc, ${s.warna}44)` }}
      />

      {/* header */}
      <div className="card-top">
        <div
          className="avatar"
          style={{ background: `linear-gradient(135deg, ${s.warna}dd, ${s.warna}88)` }}
        >
          {s.inisial}
        </div>
        <div className="card-info">
          <div className="card-name">{s.nama}</div>
          <div className="card-school">{s.sekolah}</div>
          <div className="card-badges">
            <span className="badge badge-kelas">Kelas {s.kelas}</span>
            <span className="badge badge-jurusan">{s.jurusan}</span>
          </div>
        </div>
      </div>

      <div className="card-divider" />

      {/* body */}
      <div className="card-body">
        {/* asal */}
        <div className="info-row">
          <div
            className="info-icon"
            style={{ background: isBlue ? "rgba(59,125,216,0.08)" : "rgba(224,82,82,0.08)" }}
          >
            📍
          </div>
          <div>
            <div className="info-label">Asal Daerah</div>
            <div className="info-val">{s.asal}</div>
          </div>
        </div>

        {/* nilai */}
        <div className="nilai-row">
          <div className="nilai-left">
            <div className="nilai-label">Nilai Akhir</div>
            <div className="nilai-num">{s.nilaiAkhir.toFixed(1)}</div>
          </div>
          <div className="nilai-grade" style={{ background: g.color }}>
            {g.label}
          </div>
        </div>

        {/* status & sekolah */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="info-label" style={{ marginBottom: 5 }}>Status</div>
            <span className={`status-pill ${s.aktif ? "status-aktif" : "status-alumni"}`}>
              {s.aktif ? "Aktif" : "Alumni"}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="info-label" style={{ marginBottom: 5 }}>Sekolah</div>
            <div style={{ fontSize: 11, color: "#8a94aa", fontWeight: 500, maxWidth: 130, textAlign: "right", lineHeight: 1.3 }}>
              {s.sekolah.replace("SMA Negeri", "SMAN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ───────────────────────────────────────────────── */
export default function App() {
  const [filter, setFilter] = useState("semua");

  const filtered = students.filter((s) => {
    if (filter === "aktif") return s.aktif;
    if (filter === "alumni") return !s.aktif;
    return true;
  });

  const aktifCount = students.filter((s) => s.aktif).length;
  const alumniCount = students.filter((s) => !s.aktif).length;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-dots">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="header-eyebrow">📋 Buku Tahunan</div>
          <h1 className="header-title">
            Profil <em>Siswa</em>
          </h1>
          <p className="header-sub">
            {students.length} siswa terdaftar &nbsp;·&nbsp; Tahun Ajaran 2024/2025
          </p>
        </div>

        {/* Filter */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${filter === "semua" ? "active-blue" : ""}`}
            onClick={() => setFilter("semua")}
          >
            Semua ({students.length})
          </button>
          <button
            className={`filter-btn ${filter === "aktif" ? "active-blue" : ""}`}
            onClick={() => setFilter("aktif")}
          >
            Aktif ({aktifCount})
          </button>
          <button
            className={`filter-btn ${filter === "alumni" ? "active-red" : ""}`}
            onClick={() => setFilter("alumni")}
          >
            Alumni ({alumniCount})
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-text">Tidak ada siswa ditemukan</div>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((s, i) => (
              <StudentCard key={s.id} s={s} idx={i} />
            ))}
          </div>
        )}

        <div className="footer">
          Mini Project 1 — Aplikasi Card (Array of Objects) · React JS
        </div>
      </div>
    </>
  );
}
