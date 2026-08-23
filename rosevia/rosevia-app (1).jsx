import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, Menu, X, Heart, Minus, Plus, ChevronRight } from "lucide-react";

/* ---------------------------------------------------------------- */
/* Tokens                                                            */
/* ---------------------------------------------------------------- */
const C = {
  bg: "#FFF8FA",
  pink: "#E8A9B8",
  pinkSoft: "#F6DDE3",
  ink: "#252124",
  white: "#FFFFFF",
  mute: "#777174",
  pinkDeep: "#D48CA0",
  line: "rgba(37,33,36,0.12)",
  lineSoft: "rgba(37,33,36,0.07)",
};
const serif = { fontFamily: '"Bodoni Moda", "Times New Roman", serif' };
const sans = { fontFamily: '"DM Sans", sans-serif' };

/* ---------------------------------------------------------------- */
/* Images (verified Unsplash direct links)                           */
/* ---------------------------------------------------------------- */
const img = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
const IMG = {
  hero: img("1688509453728-8f612a267393", 1400, 1750),
  satin: img("1543583869-c9da01598801", 900, 1125),
  satinTall: img("1543583869-c9da01598801", 1100, 1400),
  satinWide: img("1543583869-c9da01598801", 1200, 1500),
  knit: img("1759229874914-c1ffdb3ebd0c", 900, 1125),
  knitTall: img("1759229874914-c1ffdb3ebd0c", 1100, 1400),
  knitWide: img("1759229874914-c1ffdb3ebd0c", 1200, 1500),
  shirt: img("1574201635302-388dd92a4c3f", 900, 1125),
  shirtTall: img("1574201635302-388dd92a4c3f", 1100, 1400),
  shirtWide: img("1574201635302-388dd92a4c3f", 1200, 1500),
  pants: img("1767631338127-8cd80ee2f9df", 900, 1125),
  pantsTall: img("1767631338127-8cd80ee2f9df", 1100, 1400),
  pantsWide: img("1767631338127-8cd80ee2f9df", 1200, 1500),
};

/* ---------------------------------------------------------------- */
/* Product data                                                      */
/* ---------------------------------------------------------------- */
const PRODUCTS = [
  { id: "rose-satin-dress", name: "Rosé Satin Dress", price: 49, category: "dresses", isNew: true, color: "Rosé", colorHex: C.pink,
    img: IMG.satin, img2: IMG.knit, gallery: [IMG.satinTall, IMG.satinWide, IMG.knitTall, IMG.shirtTall],
    desc: "A fluid satin slip cut on the bias, made to skim rather than cling. Finished with delicate adjustable straps and a soft cowl back for evenings that call for a little shine, worn quietly." },
  { id: "blush-knit-top", name: "Blush Knit Top", price: 32, category: "tops", isNew: true, color: "Blush", colorHex: C.pink,
    img: IMG.knit, img2: IMG.shirt, gallery: [IMG.knitTall, IMG.knitWide, IMG.shirtTall, IMG.pantsTall],
    desc: "A fine-gauge knit top with raglan sleeves and a softly rolled neckline. Lightweight enough to layer, substantial enough to wear on its own." },
  { id: "ivory-everyday-shirt", name: "Ivory Everyday Shirt", price: 38, category: "tops", isNew: true, color: "Ivory", colorHex: "#F6EFE9",
    img: IMG.shirt, img2: IMG.pants, gallery: [IMG.shirtTall, IMG.shirtWide, IMG.knitTall, IMG.pantsTall],
    desc: "The shirt you reach for on repeat. Cut from brushed cotton with a relaxed shoulder and a slightly cropped length, made to be tucked, tied, or worn open." },
  { id: "soft-pink-mini-skirt", name: "Soft Pink Mini Skirt", price: 35, category: "bottoms", isNew: true, color: "Soft Pink", colorHex: C.pinkSoft,
    img: IMG.pants, img2: IMG.satin, gallery: [IMG.pantsTall, IMG.pantsWide, IMG.satinTall, IMG.knitTall],
    desc: "A clean-lined mini with a hidden side zip and a subtle A-line shape. Sits just above the knee, tailored enough for the studio, soft enough for the weekend." },
  { id: "rose-cardigan", name: "Rose Cardigan", price: 45, category: "tops", isNew: false, color: "Rose", colorHex: C.pink,
    img: IMG.knit, img2: IMG.shirt, gallery: [IMG.knitTall, IMG.knitWide, IMG.shirtTall, IMG.pantsTall],
    desc: "An open-front cardigan in a soft brushed knit, with dropped shoulders and horn-style buttons. Layers over everything in the edit." },
  { id: "cream-wide-leg-pants", name: "Cream Wide-Leg Pants", price: 52, category: "bottoms", isNew: false, color: "Cream", colorHex: "#F1E7DD",
    img: IMG.pants, img2: IMG.shirt, gallery: [IMG.pantsTall, IMG.pantsWide, IMG.shirtTall, IMG.knitTall],
    desc: "High-waisted trousers with a fluid drape and a clean front crease. Cut wide through the leg for a silhouette that moves easily from desk to dinner." },
  { id: "satin-slip-dress", name: "Satin Slip Dress", price: 55, category: "dresses", isNew: false, color: "Rosé", colorHex: C.pink,
    img: IMG.satin, img2: IMG.pants, gallery: [IMG.satinWide, IMG.satinTall, IMG.knitTall, IMG.shirtTall],
    desc: "A midi-length slip in liquid satin, cut on the bias for a fluid line. Thin straps, a low back, and a hem that catches the light as you move." },
  { id: "soft-blush-blazer", name: "Soft Blush Blazer", price: 68, category: "tops", isNew: false, color: "Blush", colorHex: C.pink,
    img: IMG.knit, img2: IMG.pants, gallery: [IMG.knitWide, IMG.knitTall, IMG.pantsTall, IMG.satinTall],
    desc: "A softly tailored blazer with a single button and a gently rolled lapel. Structured enough to anchor an outfit, soft enough to wear all day." },
  { id: "everyday-ribbed-top", name: "Everyday Ribbed Top", price: 29, category: "tops", isNew: false, color: "Ivory", colorHex: "#F6EFE9",
    img: IMG.shirt, img2: IMG.knit, gallery: [IMG.shirtWide, IMG.shirtTall, IMG.knitTall, IMG.pantsTall],
    desc: "A fitted ribbed top in a soft stretch knit, with a scoop neck and long sleeves. The quiet base layer for nearly everything else in the edit." },
  { id: "pearl-detail-dress", name: "Pearl Detail Dress", price: 59, category: "dresses", isNew: false, color: "Rosé", colorHex: C.pink,
    img: IMG.satin, img2: IMG.shirt, gallery: [IMG.satinTall, IMG.satinWide, IMG.shirtTall, IMG.knitTall],
    desc: "A fitted midi dress finished with delicate pearl buttons at the shoulder. Understated by day, quietly dressed-up by night." },
];
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const related = (current, n) => {
  const pool = PRODUCTS.filter((p) => p.id !== current.id);
  const same = pool.filter((p) => p.category === current.category);
  const rest = pool.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, n);
};
const money = (n) => "$" + n.toFixed(2).replace(/\.00$/, "");

/* ---------------------------------------------------------------- */
/* Reveal-on-scroll                                                  */
/* ---------------------------------------------------------------- */
function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small building blocks                                             */
/* ---------------------------------------------------------------- */
function Eyebrow({ children, center }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase ${center ? "justify-center" : ""}`} style={{ color: C.mute, ...sans }}>
      <span style={{ width: 22, height: 1, background: C.pinkDeep, display: "inline-block" }} />
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "solid", className = "", type = "button" }) {
  const base = "inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-semibold transition-colors duration-300 border";
  const styles = {
    solid: { background: C.ink, color: C.white, borderColor: C.ink },
    outline: { background: "transparent", color: C.ink, borderColor: C.ink },
    pink: { background: C.pinkDeep, color: C.white, borderColor: C.pinkDeep },
  };
  const [hover, setHover] = useState(false);
  const hoverStyles = {
    solid: { background: C.white, color: C.ink, borderColor: C.ink },
    outline: { background: C.ink, color: C.white, borderColor: C.ink },
    pink: { background: "transparent", color: C.pinkDeep, borderColor: C.pinkDeep },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${base} ${className}`}
      style={{ ...sans, ...(hover ? hoverStyles[variant] : styles[variant]) }}
    >
      {children}
    </button>
  );
}

function WishHeart({ active, onClick, size = 16 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle wishlist"
      className="flex items-center justify-center"
    >
      <Heart size={size} strokeWidth={1.4} color={C.ink} fill={active ? C.pinkDeep : "none"} style={{ stroke: active ? C.pinkDeep : C.ink }} />
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* Product Card                                                      */
/* ---------------------------------------------------------------- */
function ProductCard({ p, wished, toggleWish, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal>
      <div className="group cursor-pointer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div
          onClick={() => onOpen(p.id)}
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/5", background: C.pinkSoft }}
        >
          {p.isNew && (
            <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.16em] uppercase px-2.5 py-1.5" style={{ background: C.white, ...sans }}>
              New In
            </span>
          )}
          <span
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.85)", opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(-6px)" }}
          >
            <WishHeart active={wished} onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }} />
          </span>
          <img
            src={p.img}
            alt={p.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hover ? "scale(1.05)" : "scale(1)", opacity: hover ? 0 : 1, transitionProperty: "transform, opacity" }}
          />
          <img
            src={p.img2}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hover ? 1 : 0 }}
          />
        </div>
        <div className="flex justify-between items-start pt-4 gap-2">
          <div>
            <h3 className="text-[14.5px] font-medium" style={sans}>{p.name}</h3>
            <span className="block text-[11px] mt-1" style={{ color: C.mute, ...sans }}>
              {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
            </span>
          </div>
          <span className="text-[14px] whitespace-nowrap" style={{ color: C.mute, ...sans }}>{money(p.price)}</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */
/* Header / Nav                                                      */
/* ---------------------------------------------------------------- */
function Header({ navigate, cartCount, setMobileOpen, setSearchOpen, view }) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { label: "Home", view: "home" },
    { label: "Shop", view: "shop", filter: "all" },
    { label: "New In", view: "shop", filter: "new" },
    { label: "About", view: "about" },
    { label: "Contact", view: "contact" },
  ];

  return (
    <header
      className="sticky top-0 z-40 transition-shadow duration-300"
      style={{ background: C.bg, borderBottom: `1px solid ${stuck ? C.line : "transparent"}` }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex items-center justify-between h-[76px] md:h-[92px]">
        <button onClick={() => navigate("home")} className="text-[22px] md:text-[26px]" style={{ ...serif, letterSpacing: "0.04em" }}>
          Rosévia
        </button>

        <nav className="hidden lg:flex gap-10">
          {NAV.map((item) => {
            const active = view === item.view && (item.filter === undefined || item.view !== "shop");
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.view, { filter: item.filter })}
                className="relative text-[12px] tracking-[0.14em] uppercase font-medium py-1 group"
                style={{ ...sans, color: active ? C.pinkDeep : C.ink }}
              >
                {item.label}
                <span
                  className="absolute left-0 bottom-0 h-px w-full transition-transform duration-300 origin-left"
                  style={{ background: C.pinkDeep, transform: active ? "scaleX(1)" : "scaleX(0)" }}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 md:gap-6">
          <button onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={19} strokeWidth={1.4} color={C.ink} /></button>
          <button onClick={() => navigate("contact")} aria-label="Account" className="hidden sm:block"><User size={19} strokeWidth={1.4} color={C.ink} /></button>
          <button onClick={() => navigate("bag")} aria-label="Shopping bag" className="relative">
            <ShoppingBag size={19} strokeWidth={1.4} color={C.ink} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{ background: C.pinkDeep, color: C.white, ...sans }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden flex flex-col gap-[5px] w-[22px]" aria-label="Open menu">
            <span style={{ height: 1, width: "100%", background: C.ink }} />
            <span style={{ height: 1, width: "100%", background: C.ink }} />
            <span style={{ height: 1, width: "100%", background: C.ink }} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ open, setOpen, navigate }) {
  const NAV = [
    { label: "Home", view: "home" },
    { label: "Shop", view: "shop" },
    { label: "New In", view: "shop", filter: "new" },
    { label: "About", view: "about" },
    { label: "Contact", view: "contact" },
    { label: "Shopping Bag", view: "bag" },
  ];
  return (
    <>
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ background: "rgba(37,33,36,0.35)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />
      <nav
        className="fixed top-0 right-0 h-full z-50 overflow-y-auto transition-transform duration-500"
        style={{ width: "min(84vw,380px)", background: C.white, transform: open ? "translateX(0)" : "translateX(100%)", padding: "32px 30px", boxShadow: "-8px 0 30px rgba(0,0,0,0.08)" }}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-[24px]" style={serif}>Rosévia</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} strokeWidth={1.3} color={C.ink} /></button>
        </div>
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => { navigate(item.view, { filter: item.filter }); setOpen(false); }}
            className="block w-full text-left text-[24px] py-3.5"
            style={{ ...serif, borderBottom: `1px solid ${C.lineSoft}` }}
          >
            {item.label}
          </button>
        ))}
        <p className="text-[12px] mt-8" style={{ color: C.mute, ...sans }}>Quietly beautiful, since day one.</p>
      </nav>
    </>
  );
}

function SearchOverlay({ open, setOpen }) {
  const inputRef = useRef(null);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 250); }, [open]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center transition-opacity duration-300"
      style={{ background: "rgba(37,33,36,0.4)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[640px] mt-[92px] mx-6 p-8 transition-transform duration-300"
        style={{ background: C.bg, borderBottom: `1px solid ${C.line}`, transform: open ? "translateY(0)" : "translateY(-14px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Rosévia…"
          className="w-full bg-transparent border-0 border-b py-2 text-[26px] focus:outline-none"
          style={{ ...serif, borderColor: C.ink }}
        />
        <button onClick={() => setOpen(false)} className="mt-4 text-[11px] tracking-[0.14em] uppercase" style={{ color: C.mute, ...sans }}>
          Close ✕
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Footer                                                             */
/* ---------------------------------------------------------------- */
function FooterLink({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block text-left text-[14px] py-1.5 relative w-fit"
      style={sans}
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px transition-all duration-300" style={{ background: C.ink, width: hover ? "100%" : "0%" }} />
    </button>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="pt-16 md:pt-20 pb-8" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div className="col-span-2 md:col-span-1">
            <span className="block text-[24px] mb-3" style={serif}>Rosévia</span>
            <p className="italic text-[15px]" style={{ ...serif, color: C.mute }}>Quietly beautiful.</p>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-4" style={{ color: C.mute, ...sans }}>Shop</h4>
            <FooterLink onClick={() => navigate("shop")}>All Pieces</FooterLink>
            <FooterLink onClick={() => navigate("shop", { filter: "new" })}>New In</FooterLink>
            <FooterLink onClick={() => navigate("about")}>About</FooterLink>
            <FooterLink onClick={() => navigate("contact")}>Contact</FooterLink>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-4" style={{ color: C.mute, ...sans }}>Support</h4>
            <FooterLink onClick={() => navigate("contact")}>Shipping</FooterLink>
            <FooterLink onClick={() => navigate("contact")}>Returns</FooterLink>
            <FooterLink onClick={() => navigate("contact")}>Privacy</FooterLink>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-4" style={{ color: C.mute, ...sans }}>Follow</h4>
            <FooterLink>Instagram</FooterLink>
            <FooterLink>Pinterest</FooterLink>
            <FooterLink>TikTok</FooterLink>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-[12px]" style={{ borderTop: `1px solid ${C.line}`, color: C.mute, ...sans }}>
          <span>© 2026 Rosévia. All rights reserved.</span>
          <span>Designed quietly, worn everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* HOME PAGE                                                          */
/* ---------------------------------------------------------------- */
function HomePage({ navigate, openProduct, wishlist, toggleWish }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-8 md:pt-14">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-0 items-center">
          <div className="md:pr-14 order-2 md:order-1 pt-8 md:pt-0">
            <Eyebrow>The New Edit</Eyebrow>
            <h1 className="mt-6" style={{ ...serif, fontSize: "clamp(46px,6vw,84px)", lineHeight: 0.98 }}>
              Quietly<br />beautiful.
            </h1>
            <p className="mt-6 mb-9 max-w-[340px] text-[17px] leading-relaxed" style={{ color: C.mute, ...sans }}>
              Timeless pieces for everyday moments.
            </p>
            <Btn onClick={() => navigate("shop")}>Explore Collection</Btn>
          </div>
          <div className="relative order-1 md:order-2">
            <img src={IMG.hero} alt="Rosévia editorial" className="w-full object-cover" style={{ height: "min(72vh,700px)" }} />
            <div
              className="hidden md:block absolute p-5 text-[14px] italic"
              style={{ left: -26, bottom: 50, background: C.white, writingMode: "vertical-rl", ...serif, boxShadow: "0 12px 30px rgba(37,33,36,0.08)" }}
            >
              Rosévia — SS26
            </div>
          </div>
        </div>
      </section>

      {/* New Edit grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
              <div>
                <Eyebrow>Shop the Edit</Eyebrow>
                <h2 className="mt-4" style={{ ...serif, fontSize: "clamp(32px,3.6vw,50px)" }}>The New Edit</h2>
              </div>
              <p className="max-w-[320px] text-[15px] leading-relaxed" style={{ color: C.mute, ...sans }}>
                Pieces designed to live beautifully in your everyday wardrobe.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-11">
            {PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} p={p} wished={wishlist.includes(p.id)} toggleWish={toggleWish} onOpen={openProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-24 items-center">
          <Reveal><img src={IMG.satinWide} alt="Editorial detail" className="w-full object-cover h-[340px] md:h-[560px]" /></Reveal>
          <Reveal>
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2 className="mt-6 mb-6" style={{ ...serif, fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.08 }}>Less, but better.</h2>
            <p className="mb-8 max-w-[440px] text-[16px] leading-[1.75]" style={{ color: C.mute, ...sans }}>
              Rosévia is built around the idea that the most beautiful pieces don't need to shout. Clean silhouettes, soft tones and effortless details create a wardrobe that feels distinctly yours.
            </p>
            <button onClick={() => navigate("about")} className="relative text-[12px] tracking-[0.14em] uppercase font-semibold pb-1 group">
              Our Story
              <span className="absolute left-0 bottom-0 h-px w-full transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" style={{ background: C.ink }} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: "Dresses", n: "01", img: IMG.satinTall, filter: "dresses", tall: true },
              { label: "Tops", n: "02", img: IMG.knit, filter: "tops" },
              { label: "Bottoms", n: "03", img: IMG.pants, filter: "bottoms" },
            ].map((cat) => (
              <CategoryCard key={cat.label} cat={cat} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="relative text-center py-24 md:py-36 overflow-hidden">
        <span
          className="absolute pointer-events-none select-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-55%)", ...serif, fontSize: "min(46vw,520px)", color: C.pinkSoft, lineHeight: 1 }}
        >
          R
        </span>
        <Reveal>
          <h2 className="relative z-10 mx-auto max-w-[900px] italic px-6" style={{ ...serif, fontSize: "clamp(28px,5vw,58px)", lineHeight: 1.25 }}>
            "Made for the moments<br />you remember."
          </h2>
        </Reveal>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

function CategoryCard({ cat, navigate }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal className={cat.tall ? "md:row-span-2" : ""}>
      <button
        onClick={() => navigate("shop", { filter: cat.filter })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative overflow-hidden block w-full text-left"
        style={{ height: cat.tall ? 460 : 260 }}
      >
        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: hover ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(37,33,36,0) 45%, rgba(37,33,36,0.45) 100%)" }} />
        <div className="absolute left-6 bottom-6 text-white z-10">
          <span className="text-[10px] tracking-[0.18em] uppercase opacity-85" style={sans}>{cat.n}</span>
          <h3 className="text-[28px] mt-1" style={serif}>{cat.label}</h3>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase mt-3 transition-all duration-300"
            style={{ ...sans, opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(6px)" }}
          >
            Shop Now <ChevronRight size={12} />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20 text-center" style={{ background: C.pinkSoft }}>
      <div className="max-w-[1320px] mx-auto px-6">
        <Eyebrow center>Join Us</Eyebrow>
        <h2 className="mt-4" style={{ ...serif, fontSize: "clamp(28px,3.4vw,42px)" }}>Stay in the Loop</h2>
        <p className="max-w-[420px] mx-auto my-5 leading-relaxed" style={{ color: C.mute, ...sans }}>
          Be the first to know about new collections, quiet launches and everything Rosévia.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); setEmail(""); }}
          className="flex max-w-[440px] mx-auto"
          style={{ borderBottom: `1px solid ${C.ink}` }}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 bg-transparent py-3.5 px-1 text-[14px] focus:outline-none"
            style={sans}
          />
          <button type="submit" className="text-[11px] tracking-[0.16em] uppercase font-semibold py-3.5 px-1" style={sans}>Join Us</button>
        </form>
        <p className="text-[12px] mt-4 transition-opacity duration-300" style={{ color: C.pinkDeep, opacity: sent ? 1 : 0, ...sans }}>
          You're on the list — welcome to Rosévia.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* SHOP PAGE                                                          */
/* ---------------------------------------------------------------- */
function ShopPage({ openProduct, wishlist, toggleWish, initialFilter }) {
  const [filter, setFilter] = useState(initialFilter || "all");
  const [sort, setSort] = useState("featured");
  useEffect(() => { setFilter(initialFilter || "all"); }, [initialFilter]);

  let list = [...PRODUCTS];
  if (filter === "new") list = list.filter((p) => p.isNew);
  else if (filter !== "all") list = list.filter((p) => p.category === filter);
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  else if (sort === "high") list.sort((a, b) => b.price - a.price);

  const filters = [
    { label: "All", value: "all" },
    { label: "New In", value: "new" },
    { label: "Dresses", value: "dresses" },
    { label: "Tops", value: "tops" },
    { label: "Bottoms", value: "bottoms" },
  ];

  return (
    <>
      <section className="pt-14 pb-10" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Eyebrow>Shop All</Eyebrow>
          <h1 className="mt-5" style={{ ...serif, fontSize: "clamp(36px,5vw,60px)" }}>All Pieces</h1>
          <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed" style={{ color: C.mute, ...sans }}>
            Thoughtfully chosen pieces for your everyday wardrobe.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-8">
            <div className="flex flex-wrap gap-2.5">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className="px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
                  style={{
                    ...sans,
                    border: `1px solid ${filter === f.value ? C.ink : C.line}`,
                    background: filter === f.value ? C.ink : "transparent",
                    color: filter === f.value ? C.white : C.ink,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 text-[12px] bg-transparent focus:outline-none"
              style={{ ...sans, border: `1px solid ${C.line}` }}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
          <div className="text-[12px] mb-6" style={{ color: C.mute, ...sans }}>{list.length} piece{list.length === 1 ? "" : "s"}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-11">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} wished={wishlist.includes(p.id)} toggleWish={toggleWish} onOpen={openProduct} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* PRODUCT DETAIL PAGE                                                */
/* ---------------------------------------------------------------- */
function AccordionItem({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-[12px] tracking-[0.1em] uppercase font-semibold text-left" style={sans}>
        {title}
        <span className="relative w-3 h-3 flex-shrink-0">
          <span className="absolute left-0 top-1/2 w-full h-px -translate-y-1/2" style={{ background: C.ink }} />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-transform duration-300" style={{ background: C.ink, transform: open ? "translateX(-50%) rotate(90deg)" : "translateX(-50%) rotate(0)", opacity: open ? 0 : 1 }} />
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: open ? 220 : 0 }}>
        <p className="pb-5 text-[14px] leading-[1.7] max-w-[440px]" style={{ color: C.mute, ...sans }}>{children}</p>
      </div>
    </div>
  );
}

function ProductPage({ productId, navigate, openProduct, cart, addToCart, wishlist, toggleWish }) {
  const product = getProduct(productId) || PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => { setActiveImg(0); setSize("M"); setQty(1); setJustAdded(false); window.scrollTo(0, 0); }, [productId]);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const wished = wishlist.includes(product.id);

  return (
    <>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="text-[12px] pt-6" style={{ color: C.mute, ...sans }}>
          <button onClick={() => navigate("shop")} className="hover:underline">Shop</button>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 pt-10">
          <div>
            <div className="overflow-hidden mb-4" style={{ aspectRatio: "4/5", background: C.pinkSoft }}>
              <img src={product.gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="overflow-hidden transition-opacity duration-200"
                  style={{ width: 76, height: 96, opacity: activeImg === i ? 1 : 0.5, borderBottom: `2px solid ${activeImg === i ? C.pinkDeep : "transparent"}` }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-[460px]">
            <Eyebrow>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Eyebrow>
            <h1 className="mt-4 mb-3" style={{ ...serif, fontSize: "clamp(28px,3.6vw,40px)" }}>{product.name}</h1>
            <div className="text-[19px] mb-6" style={{ color: C.pinkDeep, ...sans }}>{money(product.price)}</div>
            <p className="mb-8 text-[15px] leading-[1.75]" style={{ color: C.mute, ...sans }}>{product.desc}</p>

            <div className="mb-7">
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={sans}>Color</span>
                <span className="text-[12px]" style={{ color: C.mute, ...sans }}>{product.color}</span>
              </div>
              <span className="inline-flex w-[26px] h-[26px] rounded-full items-center justify-center" style={{ border: `1px solid ${C.ink}` }}>
                <span className="w-5 h-5 rounded-full block" style={{ background: product.colorHex }} />
              </span>
            </div>

            <div className="mb-7">
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={sans}>Size</span>
                <span className="text-[12px]" style={{ color: C.mute, ...sans }}>{size}</span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="w-[46px] h-[46px] flex items-center justify-center text-[12px] transition-colors duration-150"
                    style={{ ...sans, border: `1px solid ${size === s ? C.ink : C.line}`, background: size === s ? C.ink : "transparent", color: size === s ? C.white : C.ink }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className="block text-[11px] tracking-[0.14em] uppercase font-semibold mb-3.5" style={sans}>Quantity</span>
              <div className="flex items-center w-fit" style={{ border: `1px solid ${C.line}` }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 flex items-center justify-center"><Minus size={14} /></button>
                <span className="w-10 text-center text-[14px]" style={sans}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-11 flex items-center justify-center"><Plus size={14} /></button>
              </div>
            </div>

            <div className="flex gap-3 mb-7">
              <Btn
                variant={justAdded ? "pink" : "solid"}
                className="flex-1"
                onClick={() => { addToCart({ id: product.id, name: product.name, price: product.price, img: product.img, size, color: product.color, qty }); setJustAdded(true); setTimeout(() => setJustAdded(false), 1800); }}
              >
                {justAdded ? "Added to Bag" : "Add to Bag"}
              </Btn>
              <button
                onClick={() => toggleWish(product.id)}
                className="w-14 h-14 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ border: `1px solid ${C.ink}`, background: wished ? C.ink : "transparent" }}
              >
                <Heart size={18} strokeWidth={1.4} color={wished ? C.white : C.ink} fill={wished ? C.white : "none"} />
              </button>
            </div>

            <div className="flex items-center gap-2.5 py-4 text-[12.5px]" style={{ borderTop: `1px solid ${C.lineSoft}`, color: C.mute, ...sans }}>
              Free shipping on orders over $75.
            </div>

            <div className="mt-2">
              <AccordionItem title="Description" defaultOpen>
                Designed in a soft, considered palette with clean lines and minimal hardware — made to move easily from one part of your day to the next.
              </AccordionItem>
              <AccordionItem title="Materials">
                Crafted from responsibly sourced fabrics, finished with attention to drape, weight and hand-feel. Care instructions are included on the garment label.
              </AccordionItem>
              <AccordionItem title="Size & Fit">
                Model wears a size S and is 175cm tall. This piece is designed to sit true-to-size with a relaxed, easy silhouette.
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                Free shipping on orders over $75. Easy returns within 30 days of delivery, in original condition with tags attached.
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <Eyebrow center>Complete the Look</Eyebrow>
              <h2 className="mt-4" style={{ ...serif, fontSize: "clamp(24px,3vw,36px)" }}>You May Also Like</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-11">
            {related(product, 4).map((p) => (
              <ProductCard key={p.id} p={p} wished={wishlist.includes(p.id)} toggleWish={toggleWish} onOpen={openProduct} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* BAG PAGE                                                           */
/* ---------------------------------------------------------------- */
function BagPage({ cart, updateQty, removeItem, navigate }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = cart.length === 0 || subtotal >= 75 ? 0 : 6;
  const total = subtotal + shipping;
  const [checking, setChecking] = useState(false);

  return (
    <>
      <section className="pt-14 pb-8" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Eyebrow>Your Bag</Eyebrow>
          <h1 className="mt-5" style={{ ...serif, fontSize: "clamp(34px,5vw,54px)" }}>Shopping Bag</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="mb-4" style={{ ...serif, fontSize: 28 }}>Your bag is quiet, for now.</h2>
              <p className="mb-8" style={{ color: C.mute, ...sans }}>Explore the edit and find something worth carrying home.</p>
              <Btn onClick={() => navigate("shop")}>Shop All Pieces</Btn>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1.7fr_1fr] gap-14 md:gap-20 items-start">
              <div>
                {cart.map((item, i) => (
                  <div key={i} className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr_auto] gap-5 md:gap-6 py-7 items-center" style={{ borderBottom: `1px solid ${C.line}` }}>
                    <img src={item.img} alt={item.name} className="object-cover" style={{ width: "100%", height: 130, background: C.pinkSoft }} />
                    <div>
                      <div className="text-[16px] mb-1.5" style={sans}>{item.name}</div>
                      <div className="text-[12px] mb-3.5" style={{ color: C.mute, ...sans }}>Size {item.size} · {item.color}</div>
                      <div className="text-[14px] mb-4" style={sans}>{money(item.price)}</div>
                      <div className="flex items-center w-fit mb-3.5" style={{ border: `1px solid ${C.line}` }}>
                        <button onClick={() => updateQty(i, item.qty - 1)} className="w-9 h-10 flex items-center justify-center"><Minus size={13} /></button>
                        <span className="w-9 text-center text-[13px]" style={sans}>{item.qty}</span>
                        <button onClick={() => updateQty(i, item.qty + 1)} className="w-9 h-10 flex items-center justify-center"><Plus size={13} /></button>
                      </div>
                      <button onClick={() => removeItem(i)} className="text-[11px] tracking-[0.1em] uppercase w-fit" style={{ color: C.mute, borderBottom: `1px solid ${C.mute}`, ...sans }}>
                        Remove
                      </button>
                    </div>
                    <div className="col-span-2 sm:col-span-1 text-[15px] sm:text-right mt-2 sm:mt-0" style={sans}>{money(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="p-8 md:p-10" style={{ background: C.pinkSoft }}>
                <h3 className="text-[20px] mb-6" style={serif}>Order Summary</h3>
                <div className="flex justify-between py-3 text-[14px]" style={{ borderBottom: "1px solid rgba(37,33,36,0.1)", color: C.mute, ...sans }}>
                  <span>Subtotal</span><span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between py-3 text-[14px]" style={{ borderBottom: "1px solid rgba(37,33,36,0.1)", color: C.mute, ...sans }}>
                  <span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span>
                </div>
                <div className="flex justify-between pt-5 text-[16px] font-medium" style={sans}>
                  <span>Total</span><span>{money(total)}</span>
                </div>
                <div className="mt-6">
                  <Btn
                    className="w-full"
                    variant={checking ? "outline" : "solid"}
                    onClick={() => { setChecking(true); setTimeout(() => setChecking(false), 2200); }}
                  >
                    {checking ? "Demo — no payment taken" : "Checkout"}
                  </Btn>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* ABOUT PAGE                                                         */
/* ---------------------------------------------------------------- */
function AboutPage() {
  const values = [
    { tag: "Simplicity", title: "Clean by design", body: "Every piece starts with a silhouette we could strip back further — and then we strip it back further still." },
    { tag: "Femininity", title: "Soft, never fussy", body: "Softness that comes from fabric and cut, not from decoration. Nothing shouts; everything is considered." },
    { tag: "Quality", title: "Made to keep", body: "We choose fabrics for how they wear in, not just how they photograph — pieces meant to outlast a season." },
  ];
  return (
    <>
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center pt-10 pb-20 md:pb-28">
        <Reveal className="order-1"><img src={IMG.hero} alt="Rosévia portrait" className="w-full object-cover h-[360px] md:h-[560px]" /></Reveal>
        <Reveal className="order-2">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="mt-5 mb-6" style={{ ...serif, fontSize: "clamp(34px,5.5vw,58px)", lineHeight: 1.05 }}>The Story of<br />Rosévia.</h1>
          <p className="max-w-[420px] text-[16px] leading-[1.75]" style={{ color: C.mute, ...sans }}>
            Rosévia began with a simple question: what would clothing look like if it never tried too hard? The answer became a wardrobe of soft tones, clean lines, and pieces you reach for without thinking twice.
          </p>
        </Reveal>
      </section>

      <section className="grid md:grid-cols-3" style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        {values.map((v, i) => (
          <Reveal key={v.tag} className="p-10 md:p-12" style={{ borderBottom: i < 2 ? `1px solid ${C.line}` : undefined, borderRight: "1px solid " + (i < 2 ? C.line : "transparent") }}>
            <div className="italic text-[14px] mb-4" style={{ ...serif, color: C.pinkDeep }}>{v.tag}</div>
            <h3 className="text-[22px] mb-3.5" style={serif}>{v.title}</h3>
            <p className="text-[14.5px] leading-[1.7]" style={{ color: C.mute, ...sans }}>{v.body}</p>
          </Reveal>
        ))}
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 items-center">
          <Reveal><img src={IMG.knitTall} alt="Knitwear detail" className="w-full object-cover h-[300px] md:h-[440px]" /></Reveal>
          <Reveal>
            <Eyebrow>Timeless Clothing</Eyebrow>
            <h2 className="my-5" style={{ ...serif, fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.15 }}>Pieces that outlive the trend cycle.</h2>
            <p className="max-w-[440px] text-[15.5px] leading-[1.8]" style={{ color: C.mute, ...sans }}>
              We design in small, considered collections rather than chasing every trend. A Rosévia piece is meant to sit in your closet for years, not weeks — worn on repeat, never out of place.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-16 items-center">
          <Reveal className="order-2 md:order-1">
            <Eyebrow>Everyday Elegance</Eyebrow>
            <h2 className="my-5" style={{ ...serif, fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.15 }}>Dressed up is just dressed, quietly.</h2>
            <p className="max-w-[440px] text-[15.5px] leading-[1.8]" style={{ color: C.mute, ...sans }}>
              Elegance, to us, isn't an occasion — it's a Tuesday. We design for the version of you that shows up fully, in the same soft palette, whether it's a morning coffee run or dinner across town.
            </p>
          </Reveal>
          <Reveal className="order-1 md:order-2"><img src={IMG.pantsTall} alt="Styling detail" className="w-full object-cover h-[300px] md:h-[440px]" /></Reveal>
        </div>
      </section>

      <section className="relative text-center py-24 overflow-hidden">
        <span className="absolute pointer-events-none select-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-55%)", ...serif, fontSize: "min(40vw,440px)", color: C.pinkSoft, lineHeight: 1 }}>R</span>
        <Reveal>
          <h2 className="relative z-10 mx-auto max-w-[760px] italic px-6" style={{ ...serif, fontSize: "clamp(24px,4vw,46px)", lineHeight: 1.3 }}>
            Quietly beautiful — <br />that's the whole idea.
          </h2>
        </Reveal>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* CONTACT PAGE                                                       */
/* ---------------------------------------------------------------- */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-14 pb-8" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1 className="mt-5" style={{ ...serif, fontSize: "clamp(34px,5vw,56px)" }}>Let's Talk.</h1>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-24 py-14">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); setForm({ name: "", email: "", message: "" }); }}>
          <div className="mb-7">
            <label className="block text-[11px] tracking-[0.14em] uppercase font-semibold mb-3" style={{ color: C.mute, ...sans }}>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border-0 border-b py-2 text-[15px] focus:outline-none" style={{ borderColor: C.line, ...sans }} />
          </div>
          <div className="mb-7">
            <label className="block text-[11px] tracking-[0.14em] uppercase font-semibold mb-3" style={{ color: C.mute, ...sans }}>Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border-0 border-b py-2 text-[15px] focus:outline-none" style={{ borderColor: C.line, ...sans }} />
          </div>
          <div className="mb-7">
            <label className="block text-[11px] tracking-[0.14em] uppercase font-semibold mb-3" style={{ color: C.mute, ...sans }}>Message</label>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full bg-transparent border-0 border-b py-2 text-[15px] focus:outline-none resize-y" style={{ borderColor: C.line, ...sans }} />
          </div>
          <Btn type="submit">Send Message</Btn>
          <p className="text-[13px] mt-4 transition-opacity duration-300" style={{ color: C.pinkDeep, opacity: sent ? 1 : 0, ...sans }}>Thank you — we'll be in touch shortly.</p>
        </form>

        <div className="pt-2">
          <h2 className="mb-6" style={{ ...serif, fontSize: "clamp(26px,3vw,34px)" }}>We'd love<br />to hear from you.</h2>
          <p className="max-w-[380px] mb-10 leading-[1.75]" style={{ color: C.mute, ...sans }}>
            Whether it's a question about an order, a fit, or just to say hello — our team reads every message.
          </p>
          <div className="py-5" style={{ borderTop: `1px solid ${C.line}` }}>
            <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ color: C.mute, ...sans }}>Email</span>
            <a href="mailto:hello@rosevia.com" className="text-[16px]" style={serif}>hello@rosevia.com</a>
          </div>
          <div className="py-5" style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
            <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ color: C.mute, ...sans }}>Instagram</span>
            <span className="text-[16px]" style={serif}>@rosevia</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* ROOT APP                                                           */
/* ---------------------------------------------------------------- */
export default function RoseviaApp() {
  const [view, setView] = useState("home");
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [shopFilter, setShopFilter] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const navigate = (v, opts = {}) => {
    if (opts.filter !== undefined) setShopFilter(opts.filter);
    else if (v === "shop") setShopFilter("all");
    setView(v);
    window.scrollTo(0, 0);
  };
  const openProduct = (id) => { setProductId(id); setView("product"); window.scrollTo(0, 0); };

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === item.id && c.size === item.size && c.color === item.color);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty };
        return copy;
      }
      return [...prev, item];
    });
  };
  const updateQty = (i, qty) => setCart((prev) => prev.map((c, idx) => (idx === i ? { ...c, qty: Math.max(1, qty) } : c)));
  const removeItem = (i) => setCart((prev) => prev.filter((_, idx) => idx !== i));
  const toggleWish = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", ...sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: ${C.pinkSoft}; }
      `}</style>

      <Header navigate={navigate} cartCount={cartCount} setMobileOpen={setMobileOpen} setSearchOpen={setSearchOpen} view={view} />
      <MobileNav open={mobileOpen} setOpen={setMobileOpen} navigate={navigate} />
      <SearchOverlay open={searchOpen} setOpen={setSearchOpen} />

      <main>
        {view === "home" && <HomePage navigate={navigate} openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} />}
        {view === "shop" && <ShopPage openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} initialFilter={shopFilter} />}
        {view === "product" && <ProductPage productId={productId} navigate={navigate} openProduct={openProduct} cart={cart} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} />}
        {view === "about" && <AboutPage />}
        {view === "contact" && <ContactPage />}
        {view === "bag" && <BagPage cart={cart} updateQty={updateQty} removeItem={removeItem} navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}
