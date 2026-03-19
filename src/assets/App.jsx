import { useState, useEffect, useRef } from "react";
import { STRUTTURA } from "./struttura.js";
import { posts } from "./posts.js";

// ── IMMAGINI ──────────────────────────────────────────────────────────────────
// Aggiorna questi import dopo aver caricato le foto su GitHub
// Stanze
import room1  from "./assets/rooms/Bagno1.jpg";
import room2  from "./assets/rooms/Bagno2.jpg";
import room3  from "./assets/rooms/Balcone1.jpg";
import room4  from "./assets/rooms/Box1.jpg";
import room5  from "./assets/rooms/Cucina.jpg";
import room6  from "./assets/rooms/Esterno1.jpg";
import room7  from "./assets/rooms/Letto1.jpg";
import room8  from "./assets/rooms/Letto2.jpg";
import room9  from "./assets/rooms/Soggiorno.jpg";
import room10 from "./assets/rooms/Bagno3.jpg";
// Poster
import poster1 from "./assets/Cesenatico_1_web.jpg";
import poster2 from "./assets/Cesenatico_2_Web.jpg";
import poster3 from "./assets/Cesenatico_4_Web.jpg";
import poster4 from "./assets/Cesenatico_5_web.jpg";

const ROOMS_IMGS = [room1,room2,room3,room4,room5,room6,room7,room8,room9,room10];

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  bg:       "#faf8f4",
  bg2:      "#f3efe8",
  bg3:      "#ede8de",
  text:     "#1a1612",
  textMid:  "#5a5248",
  textSoft: "#9a9088",
  gold:     "#a0782a",
  border:   "rgba(160,120,42,0.15)",
  cardBg:   "#ffffff",
  shadow:   "0 4px 24px rgba(26,22,18,0.08)",
};

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ── Diagonal divider ──────────────────────────────────────────────────────────
function DiagDivider({ topColor, botColor, flip = false }) {
  return (
    <div style={{ background: botColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
        <polygon points={flip ? "0,0 1440,60 1440,0" : "0,60 1440,0 1440,60"} fill={topColor} />
      </svg>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Apartment", "Location", "Experiences", "Reviews", "Blog"];
  const ids   = ["apartment", "location", "experiences", "reviews", "blog"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,244,0.96)" : "rgba(250,248,244,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "rgba(160,120,42,0.18)" : "rgba(160,120,42,0.08)"}`,
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.2rem", color: C.gold, letterSpacing: "0.08em", fontWeight: 700, lineHeight: 1.1 }}>
            LA PERLA<br /><span style={{ fontSize: "0.72rem", letterSpacing: "0.18em" }}>DEL MARE</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desk-nav">
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`} style={{ color: C.textMid, textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.textMid}>
              {l}
            </a>
          ))}
          <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
            style={{ background: C.gold, color: "#fff", padding: "0.5rem 1.3rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
            onMouseLeave={e => e.currentTarget.style.background = C.gold}>
            BOOK NOW
          </a>
          {STRUTTURA.lingue.length > 1 && (
            <div style={{ display: "flex", gap: "0.25rem", borderLeft: `1px solid ${C.border}`, paddingLeft: "1rem" }}>
              {STRUTTURA.lingue.map((lng, i) => (
                <a key={lng.code} href={lng.url}
                  style={{ color: i === 0 ? C.gold : C.textSoft, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", padding: "0.2rem 0.3rem" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.gold}
                  onMouseLeave={e => e.currentTarget.style.color = i === 0 ? C.gold : C.textSoft}>
                  {lng.code}
                </a>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.5rem", flexDirection: "column", gap: 5 }} className="burger">
          <div style={{ width: 24, height: 2, background: C.gold }} />
          <div style={{ width: 24, height: 2, background: C.gold }} />
          <div style={{ width: 24, height: 2, background: C.gold }} />
        </button>
      </div>
      {open && (
        <div style={{ background: C.bg, padding: "1rem 1.5rem 1.5rem", borderTop: `1px solid ${C.border}` }}>
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`} onClick={() => setOpen(false)}
              style={{ display: "block", color: C.textMid, textDecoration: "none", padding: "0.65rem 0", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", borderBottom: `1px solid ${C.border}` }}>
              {l}
            </a>
          ))}
          <div style={{ marginTop: "1rem" }}>
            <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: C.gold, color: "#fff", padding: "0.7rem 1.75rem", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
              BOOK NOW
            </a>
          </div>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.burger{display:flex!important}}`}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 120); }, []);
  return (
    <section style={{ position: "relative", minHeight: "100vh", background: C.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg,#f5efe3 0%,#faf8f4 50%,#f0ece2 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-5%", right: "-3%", width: "45vw", height: "45vw", border: "1px solid rgba(160,120,42,0.1)", transform: "rotate(12deg)" }} />
        <div style={{ position: "absolute", top: "3%", right: "3%", width: "32vw", height: "32vw", border: "1px solid rgba(160,120,42,0.06)", transform: "rotate(12deg)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 2rem", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", width: "100%", paddingTop: "5rem", paddingBottom: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(18px)", transition: "all 0.7s ease 0.15s", display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.3rem" }}>
              <span style={{ display: "inline-block", width: 32, height: 1, background: C.gold }} />
              <span style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>{STRUTTURA.heroTagline}</span>
            </div>
            <h1 style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(28px)", transition: "all 0.85s ease 0.3s", fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2.6rem,5.5vw,5rem)", fontWeight: 700, color: C.text, lineHeight: 1.04, letterSpacing: "-0.02em", margin: "0 0 1.2rem" }}>
              {STRUTTURA.heroTitle}<br /><span style={{ color: C.gold, fontStyle: "italic" }}>{STRUTTURA.heroTitleItalic}</span>
            </h1>
            <p style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(24px)", transition: "all 0.85s ease 0.46s", fontSize: "clamp(0.93rem,1.8vw,1.08rem)", color: C.textMid, lineHeight: 1.82, margin: "0 0 2rem", fontFamily: "'DM Sans',sans-serif" }}>
              {STRUTTURA.heroSubtitle}
            </p>
            <div style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(24px)", transition: "all 0.85s ease 0.6s", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
                style={{ background: C.gold, color: "#fff", padding: "0.95rem 2rem", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 20px rgba(160,120,42,0.25)", transition: "all 0.25s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
                Book on Airbnb ↗
              </a>
              <a href="#apartment" style={{ border: "1.5px solid rgba(160,120,42,0.35)", color: C.textMid, padding: "0.95rem 1.75rem", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(160,120,42,0.35)"; e.currentTarget.style.color=C.textMid; }}>
                Discover more
              </a>
            </div>
            <div style={{ opacity: loaded?1:0, transition: "opacity 0.8s ease 0.78s", display: "flex", gap: "2rem", marginTop: "2.5rem", paddingTop: "1.75rem", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
              {STRUTTURA.stats.map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.3rem", color: C.gold, fontWeight: 700 }}>{v}</div>
                  <div style={{ fontSize: "0.66rem", color: C.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 1 420px", maxWidth: 420, width: "100%", opacity: loaded?1:0, transform: loaded?"translateY(0) rotate(-1deg)":"translateY(30px) rotate(-1deg)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
            <div style={{ boxShadow: "0 20px 60px rgba(26,22,18,0.15), 0 0 0 1px rgba(160,120,42,0.12)" }}>
              <img src={poster1} alt={STRUTTURA.nome} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      </div>
      <DiagDivider topColor={C.bg} botColor={C.bg2} />
    </section>
  );
}

// ── Apartment ─────────────────────────────────────────────────────────────────
function Apartment() {
  const [active, setActive] = useState(0);
  return (
    <section id="apartment" style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="apt-grid">
          <Reveal>
            <div style={{ marginBottom: "0.75rem", overflow: "hidden", boxShadow: C.shadow }}>
              <img src={ROOMS_IMGS[active]} alt={STRUTTURA.nome}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "opacity 0.35s" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0.35rem", marginBottom: "0.35rem" }}>
              {ROOMS_IMGS.slice(0,5).map((src,i) => (
                <div key={i} onClick={() => setActive(i)} style={{ cursor: "pointer", overflow: "hidden", border: active===i ? `2px solid ${C.gold}` : "2px solid transparent", transition: "border 0.2s" }}>
                  <img src={src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: active===i?"none":"brightness(0.7) saturate(0.8)", transition: "filter 0.2s" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0.35rem" }}>
              {ROOMS_IMGS.slice(5).map((src,i) => (
                <div key={i+5} onClick={() => setActive(i+5)} style={{ cursor: "pointer", overflow: "hidden", border: active===i+5 ? `2px solid ${C.gold}` : "2px solid transparent", transition: "border 0.2s" }}>
                  <img src={src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: active===i+5?"none":"brightness(0.7) saturate(0.8)", transition: "filter 0.2s" }} />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> The Apartment
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
                {STRUTTURA.aptTitle}<br /><span style={{ color: C.gold, fontStyle: "italic" }}>{STRUTTURA.aptTitleItalic}</span>
              </h2>
              <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.2rem" }}>
                {STRUTTURA.aptDescrizione}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6px", background: C.border, marginBottom: "2rem" }}>
                {STRUTTURA.amenities.map(({ icon, title, desc }) => (
                  <div key={title} style={{ background: C.cardBg, padding: "1.1rem", transition: "background 0.25s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                    onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                    <div style={{ fontSize: "1.25rem", marginBottom: "0.4rem" }}>{icon}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: C.text, fontWeight: 600, marginBottom: "0.2rem" }}>{title}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: C.textSoft }}>{desc}</div>
                  </div>
                ))}
              </div>
              <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.9rem 1.8rem", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 18px rgba(160,120,42,0.22)", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
                Check availability on Airbnb ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.apt-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Location ──────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section id="location" style={{ background: C.bg, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Strategic Location
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, maxWidth: 600, letterSpacing: "-0.02em" }}>
              In the heart of Cesenatico,<br /><span style={{ color: C.gold, fontStyle: "italic" }}>just steps from the sea.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="loc-grid">
          <Reveal>
            <div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1.1rem" }}>KEY DISTANCES</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6px", background: C.border }}>
                {STRUTTURA.distanze.map(({ label, time, mode }) => (
                  <div key={label} style={{ background: C.cardBg, padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                    onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem", color: C.text, fontWeight: 500 }}>{label}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: C.textSoft, marginTop: 2 }}>{mode}</div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "0.95rem", color: C.gold, fontWeight: 600, whiteSpace: "nowrap" }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1.1rem" }}>THINGS TO DO NEARBY</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6px", background: C.border }}>
                {STRUTTURA.esperienze.map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: "1rem", marginBottom: "0.6px", alignItems: "flex-start", background: C.cardBg, padding: "0.85rem 1rem", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                    onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                    <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1rem", color: C.text, fontWeight: 600, marginBottom: "0.2rem" }}>{title}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: C.textMid, lineHeight: 1.65 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={120}>
          <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="poster-grid">
            {[poster2, poster4].map((src, i) => (
              <div key={i} style={{ overflow: "hidden", boxShadow: C.shadow }}>
                <img src={src} alt="La Perla del Mare Cesenatico" style={{ width: "100%", display: "block", transition: "transform 0.55s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.loc-grid{grid-template-columns:1fr!important;gap:2rem!important}.poster-grid{grid-template-columns:1fr!important}}`}</style>
      <DiagDivider topColor={C.bg} botColor={C.bg2} flip />
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="experiences" style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Simple from start to finish</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Your stay by the sea,<br /><span style={{ color: C.gold, fontStyle: "italic" }}>hassle-free.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: "3.1rem", left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg,transparent,${C.border},${C.border},transparent)`, pointerEvents: "none" }} />
          {STRUTTURA.steps.map(({ n, t, b }) => (
            <Reveal key={n} delay={parseInt(n)*60}>
              <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                <div style={{ width: 50, height: 50, border: `1px solid ${C.border}`, margin: "0 auto 1.3rem", display: "flex", alignItems: "center", justifyContent: "center", background: C.cardBg, position: "relative", zIndex: 1, boxShadow: C.shadow }}>
                  <span style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", color: C.gold, fontSize: "0.88rem", fontWeight: 700 }}>{n}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.12rem", color: C.text, marginBottom: "0.6rem", fontWeight: 600 }}>{t}</h3>
                <p style={{ fontSize: "0.85rem", color: C.textMid, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", margin: 0 }}>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" style={{ background: C.bg, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Real Experiences</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              What our guests<br /><span style={{ color: C.gold, fontStyle: "italic" }}>are saying.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5px", background: C.border }}>
          {STRUTTURA.testimonianze.map(({ quote, name, origin }) => (
            <Reveal key={name} delay={80}>
              <div style={{ background: C.cardBg, padding: "2.25rem", height: "100%", boxSizing: "border-box", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                <div style={{ color: C.gold, fontSize: "0.9rem", letterSpacing: "0.06em", marginBottom: "1rem" }}>{"★★★★★"}</div>
                <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.05rem", color: C.text, lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.75rem" }}>"{quote}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.1rem" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", color: C.text, fontSize: "0.85rem", fontWeight: 600 }}>{name}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", color: C.textSoft, fontSize: "0.75rem", marginTop: 3 }}>{origin}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <div style={{ marginTop: "2.25rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ color: C.textSoft, fontSize: "0.73rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>On Airbnb</div>
            {["★ 4.96 / 5", "27 Reviews", "Superhost"].map(b => (
              <div key={b} style={{ border: `1px solid ${C.border}`, padding: "0.3rem 0.85rem", fontSize: "0.72rem", color: C.gold, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.08em", background: C.cardBg }}>{b}</div>
            ))}
          </div>
        </Reveal>
      </div>
      <DiagDivider topColor={C.bg} botColor={C.bg2} flip />
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
        <Reveal>
          <div style={{ boxShadow: "0 20px 60px rgba(26,22,18,0.12), 0 0 0 1px rgba(160,120,42,0.1)", overflow: "hidden" }}>
            <img src={poster3} alt={STRUTTURA.nome} style={{ width: "100%", display: "block", transition: "transform 0.6s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Our Story
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.7rem,3vw,2.7rem)", color: C.text, fontWeight: 700, lineHeight: 1.15, marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
              {STRUTTURA.aboutTitolo}<br /><span style={{ color: C.gold, fontStyle: "italic" }}>{STRUTTURA.aboutTitoloItalic}</span>
            </h2>
            <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1rem" }}>{STRUTTURA.aboutTesto1}</p>
            <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.75rem" }}>{STRUTTURA.aboutTesto2}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {STRUTTURA.aboutPunti.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: C.gold, fontSize: "0.6rem", marginTop: "0.3rem", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "0.87rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────
function Blog() {
  const [aperto, setAperto] = useState(null);
  const visibili = posts.filter(p => p.attivo).sort((a, b) => new Date(b.data) - new Date(a.data));
  return (
    <section id="blog" style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Stories Storie & Consigli Tips
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Discover Cesenatico<br /><span style={{ color: C.gold, fontStyle: "italic" }}>through our eyes.</span>
            </h2>
          </div>
        </Reveal>
        {aperto === null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "stretch" }} className="blog-grid">
            {visibili.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <div onClick={() => setAperto(post.id)}
                  style={{ background: C.cardBg, padding: "2rem", cursor: "pointer", height: "100%", boxSizing: "border-box", transition: "all 0.3s ease", boxShadow: C.shadow, display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,22,18,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = C.shadow; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.border}`, padding: "0.2rem 0.6rem" }}>{post.categoria}</span>
                    <span style={{ fontSize: "0.68rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{new Date(post.data).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.25rem", color: C.text, fontWeight: 700, lineHeight: 1.2, marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>{post.titolo}</h3>
                  <p style={{ fontSize: "0.83rem", color: C.textMid, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.25rem", flex: 1 }}>{post.sommario}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: C.gold, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
                    Read more <span>↗</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
        {aperto !== null && (() => {
          const post = visibili.find(p => p.id === aperto);
          if (!post) return null;
          return (
            <Reveal>
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <button onClick={() => setAperto(null)}
                  style={{ background: "none", border: `1px solid ${C.border}`, padding: "0.45rem 1rem", fontSize: "0.72rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginBottom: "2.5rem", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}>
                  ← All articles
                </button>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.border}`, padding: "0.2rem 0.6rem" }}>{post.categoria}</span>
                  <span style={{ fontSize: "0.68rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{new Date(post.data).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>{post.titolo}</h2>
                <p style={{ fontSize: "1rem", color: C.gold, lineHeight: 1.75, fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontStyle: "italic", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${C.border}` }}>{post.sommario}</p>
                {post.contenuto.map((blocco, i) => {
                  if (blocco.tipo === "paragrafo") return <p key={i} style={{ fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.25rem" }}>{blocco.testo}</p>;
                  if (blocco.tipo === "titoletto") return <h3 key={i} style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.35rem", color: C.text, fontWeight: 700, marginBottom: "0.6rem", marginTop: "2rem", letterSpacing: "-0.01em" }}>{blocco.testo}</h3>;
                  if (blocco.tipo === "download") return (
                    <div key={i} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
                      <a href={blocco.src1} download style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
                        onMouseLeave={e => e.currentTarget.style.background = C.gold}>↓ {blocco.label1}</a>
                      <a href={blocco.src2} download style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: C.gold, padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", border: `1.5px solid ${C.gold}`, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>↓ {blocco.label2}</a>
                    </div>
                  );
                  return null;
                })}
                <div style={{ marginTop: "3rem", padding: "2rem", background: C.bg3, borderLeft: `3px solid ${C.gold}` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.1rem", color: C.text, marginBottom: "1rem", fontStyle: "italic" }}>Vuoi soggiornare a Cesenatico just steps from the sea.</p>
                  <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
                    onMouseLeave={e => e.currentTarget.style.background = C.gold}>
                    Check availability on Airbnb ↗
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })()}
      </div>
      <style>{`@media(max-width:600px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ background: C.bg, padding: "9rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,rgba(160,120,42,0.05) 0%,transparent 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(12deg)", width: "60vw", height: "60vw", border: "1px solid rgba(160,120,42,0.07)", maxWidth: 700, pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "1.3rem" }}>Ready to book?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.8rem)", color: C.text, fontWeight: 700, lineHeight: 1.05, marginBottom: "1.3rem", letterSpacing: "-0.025em" }}>
            Your seaside holiday<br /><span style={{ color: C.gold, fontStyle: "italic" }}>starts here.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "2.5rem" }}>
            Summer dates fill up fast. Check availability on Airbnb now and secure your stay in Cesenatico.
          </p>
          <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", background: C.gold, color: "#fff", padding: "1.15rem 2.75rem", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 8px 32px rgba(160,120,42,0.28)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
            Check availability on Airbnb ↗
          </a>
          <div style={{ marginTop: "1.5rem", fontSize: "0.74rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>
            Secure booking · Instant confirmation · Flexible cancellation
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.bg3, borderTop: `1px solid ${C.border}`, padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.1rem", color: C.gold, letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.9rem" }}>LA PERLA DEL MARE</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: C.textMid, lineHeight: 1.75, marginBottom: "0.65rem" }}>
              {STRUTTURA.indirizzo} · {STRUTTURA.citta} ({STRUTTURA.provincia})<br />{STRUTTURA.regione} · Italia {STRUTTURA.cap}
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: C.textSoft, lineHeight: 1.7 }}>
              Holiday apartment in Cesenatico, 400 m from the sea.<br />Near Cesena, Rimini, San Marino.
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Navigate</div>
            {[["Apartment", "Location", "Experiences", "Reviews", "Blog","blog"]].map(([l,id]) => (
              <a key={l} href={`#${id}`} style={{ display: "block", color: C.textMid, textDecoration: "none", fontSize: "0.83rem", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color=C.gold} onMouseLeave={e => e.target.style.color=C.textMid}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Book</div>
            <a href={STRUTTURA.airbnb} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: C.gold, color: "#fff", padding: "0.55rem 1.1rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="#8a6520"}
              onMouseLeave={e => e.currentTarget.style.background=C.gold}>
              Airbnb ↗
            </a>
            <div style={{ marginTop: "1.25rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", color: C.textSoft, lineHeight: 1.7 }}>Available on Airbnb.<br />Up to 6 guests.</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.72rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>© {new Date().getFullYear()} La Perla del Mare · Cesenatico · All rights reserved</div>
          <div style={{ fontSize: "0.72rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>WITH ♥ IN ROMAGNA</div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#faf8f4;color:#1a1612;-webkit-font-smoothing:antialiased;}
        ::selection{background:rgba(160,120,42,0.18);color:#1a1612;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#faf8f4;}
        ::-webkit-scrollbar-thumb{background:rgba(160,120,42,0.3);border-radius:3px;}
      `}</style>
      <Nav />
      <Hero />
      <Apartment />
      <Location />
      <HowItWorks />
      <Testimonials />
      <About />
      <Blog />
      <FinalCTA />
      <Footer />
    </>
  );
}
