/* =========================================================
   SwiftSite — shared script (all pages)
   Modules: Store · Layout · Motion · Projects · Services
            Skills · Contact · Admin
   ========================================================= */
(() => {
"use strict";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PAGE = document.body.dataset.page || "home";

/* ---------- ICONS ---------- */
const I = {
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 2 .8"/></svg>',
  gh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4 1.4-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.4 6-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.5 12.5 0 0 0-6.5 0C6 1.6 4.9 2 4.9 2a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.4 9c0 5.2 3 6.3 6 6.6a3 3 0 0 0-.9 2.4V22"/></svg>',
  li:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
  code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  server:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
  wp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M4.5 8l4.5 12 3-8 3 8 4.5-12M7 8h4M14 8h4"/></svg>',
  spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 4h2l2.5 11h11L21 7H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></svg>',
  cog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/></svg>',
  py:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c-4 0-4 1.7-4 3v2h4v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5V6c0-1.5-1.5-3-5-3z"/><path d="M12 21c4 0 4-1.7 4-3v-2h-4v-1h6c2 0 3-1.5 3-4"/></svg>',
};

/* ---------- STORE (localStorage config — controlled from Admin) ---------- */
/* ☁️ CLOUD SYNC — paste your Firebase Realtime Database URL here (see README).
   Example: "https://swiftsite-12345-default-rtdb.firebaseio.com"
   When set, every admin Save goes live for ALL visitors on ALL devices. */
// Built-in cloud storage (textdb.dev) — already connected, works on every device automatically.
const CLOUD_DB_URL_FILE = "https://textdb.dev/api/data/swiftsite-mharryjs-7f3c9a21-4b8e-4d2a-9e61-c05a1b7d8f42";
const CLOUD_DB_URL = CLOUD_DB_URL_FILE || (() => { try { return localStorage.getItem("swiftsite_cloud") || ""; } catch { return ""; } })();
const isTextDB = u => /textdb\.dev/.test(u);
const cloudURL = (u = CLOUD_DB_URL) => (/jsonblob\.com/.test(u) || isTextDB(u)) ? u : u.replace(/\/$/, "") + "/swiftsite.json";
const cloudPut = (body, u = CLOUD_DB_URL) => isTextDB(u)
  ? fetch(u, { method:"POST", headers:{ "Content-Type":"text/plain" }, body })   // simple request, no CORS preflight
  : fetch(cloudURL(u), { method:"PUT", headers:{ "Content-Type":"application/json", "Accept":"application/json" }, body });
const readJSON = async r => { const t = await r.text(); try { return JSON.parse(t); } catch { return null; } };

const KEY = "swiftsite_config_v2";
const DEFAULTS = {
  logo: "",               // data URL or image URL. Empty = assets/logo.png
  phone: "", email: "", whatsapp: "", location: "",
  instagram: "https://www.instagram.com/swif.site",
  github: "", linkedin: "",
  prices: {},             // { serviceId: { pk:"", us:"" } }
  hidden: [],             // hidden project ids
  links: {},              // { projectId: { live:"", code:"" } }
  hiddenServices: [],
  adminPass: "",          // custom password (optional)
  images: {},             // { projectId: dataURL / URL }
  homeImg: "", aboutImg: "", // optional photos: Home (moving circle) / About (big card). Empty = logo
  rate: 280,              // 1 USD = X PKR (used for auto conversion)
  bot: { enabled:true, name:"Swifty", greeting:"", contact:"", faqs:[], geminiKey:"", model:"gemini-2.5-flash" }
};
const Store = {
  get(){ try{ return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }catch{ return { ...DEFAULTS }; } },
  set(c){ try{ localStorage.setItem(KEY, JSON.stringify(c)); return true; }catch{ return false; } },
  reset(){ localStorage.removeItem(KEY); }
};
let CFG = Store.get();

const FALLBACK_LOGO = "data:image/svg+xml;utf8," + encodeURIComponent(
 `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a4a38"/><stop offset="1" stop-color="#1d3528"/></linearGradient></defs><circle cx="60" cy="60" r="56" fill="url(#g)"/><circle cx="60" cy="60" r="49" fill="none" stroke="#c6a664" stroke-width="1"/><text x="60" y="73" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="42" fill="#e6d3a3">Ss</text></svg>`);
const logoSrc = () => CFG.logo || "assets/logo.png";
const logoImg = (alt = "SwiftSite logo") =>
  `<img data-logo src="${logoSrc()}" alt="${alt}" width="120" height="120" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_LOGO}'">`;
function refreshLogos(){ $$("img[data-logo]").forEach(img => { img.style.opacity = ""; img.onerror = () => { img.onerror = null; img.src = FALLBACK_LOGO; }; img.src = logoSrc(); }); }

/* Optional photos set in admin. Home = the moving circle in the hero, About = the large card. Empty = the logo stays. */
function applyImages(){
  const orb = $(".orb-logo img");
  if (orb && CFG.homeImg){
    const badge = orb.closest(".logo-badge");
    orb.removeAttribute("data-logo"); orb.style.opacity = "";
    // a broken photo falls back to the logo
    orb.onerror = () => { orb.onerror = () => { orb.onerror = null; orb.src = FALLBACK_LOGO; }; badge.classList.remove("is-photo"); orb.src = logoSrc(); };
    badge.classList.add("is-photo");
    orb.src = CFG.homeImg;
  }
  const card = $(".portrait-card");
  if (card && CFG.aboutImg){
    const ph = document.createElement("img");
    ph.className = "portrait-photo"; ph.alt = "SwiftSite"; ph.decoding = "async";
    ph.onload = () => card.classList.add("has-photo");
    ph.onerror = () => ph.remove();
    ph.src = CFG.aboutImg;
    card.prepend(ph);
  }
}

const igHandle = () => { const m = (CFG.instagram || "").match(/instagram\.com\/([^/?#]+)/i); return m ? m[1] : ""; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

/* Contact channels -> { text, href } or null (Coming Soon) */
function channel(key){
  const v = (CFG[key] || "").trim();
  if (!v) return null;
  switch (key){
    case "email": return { text:v, href:`mailto:${v}` };
    case "phone": return { text:v, href:`tel:${v.replace(/[^\d+]/g,"")}` };
    case "whatsapp": return { text:v, href:`https://wa.me/${v.replace(/\D/g,"")}` };
    case "location": return { text:v, href:"" };
    case "instagram": return { text:"@" + (igHandle() || "instagram"), href:v };
    default: return { text:v.replace(/^https?:\/\/(www\.)?/,""), href:v };
  }
}
const soonOr = (key, cls = "") => {
  const c = channel(key);
  if (!c) return `<span class="v soon">Coming Soon</span>`;
  return c.href ? `<a class="v ${cls}" href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.text)}</a>` : `<span class="v">${esc(c.text)}</span>`;
};

/* ---------- LAYOUT: header, footer, extras ---------- */
const NAV = [
  ["home","index.html","Home"],["about","about.html","About"],["projects","projects.html","Projects"],
  ["services","services.html","Services"],["contact","contact.html","Contact"]
];

function renderLayout(){
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
  <nav class="wrap nav" aria-label="Main">
    <a href="index.html" class="brand" aria-label="SwiftSite home">
      <span class="logo-badge">${logoImg()}</span>
      <span class="brand-text"><strong>SwiftSite</strong><small>MODERN WEBSITES • SMART SOLUTIONS</small></span>
    </a>
    <ul class="nav-links">${NAV.map(([k,h,t]) => `<li><a href="${h}" class="${k===PAGE?"active":""}" ${k===PAGE?'aria-current="page"':""}>${t}</a></li>`).join("")}</ul>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-primary btn-sm">Let's Build Something ${I.arrow}</a>
      <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </nav>`;
  const mobile = document.createElement("div");
  mobile.className = "mobile-menu";
  mobile.innerHTML = NAV.map(([k,h,t],i) => `<a class="m-link ${k===PAGE?"active":""}" href="${h}" style="transition-delay:${.05+i*.05}s">${t}<small>0${i+1}</small></a>`).join("") +
    `<a href="contact.html" class="btn btn-primary">Let's Build Something ${I.arrow}</a>`;
  document.body.prepend(mobile);
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="index.html" class="brand"><span class="logo-badge">${logoImg()}</span><span class="brand-text"><strong>SwiftSite</strong></span></a>
        <p>Modern Websites • Smart Solutions</p>
        <p class="blurb">Full-stack developer designing and building web products with care — from interface to infrastructure.</p>
      </div>
      <div><h4>Navigation</h4><ul>${NAV.map(([,h,t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h4>Contact</h4><ul>
        <li>Email — ${footVal("email")}</li>
        <li>Phone — ${footVal("phone")}</li>
        <li>WhatsApp — ${footVal("whatsapp")}</li>
      </ul></div>
      <div><h4>Social</h4><ul>
        <li>Instagram — ${footVal("instagram")}</li>
        <li>GitHub — ${footVal("github")}</li>
        <li>LinkedIn — ${footVal("linkedin")}</li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 SwiftSite. All rights reserved.</span>
      <span>Designed &amp; coded by Mharryjs</span>
    </div>
  </div>`;
  document.body.append(footer);

  const top = document.createElement("button");
  top.className = "to-top"; top.setAttribute("aria-label","Back to top"); top.innerHTML = I.up;
  document.body.append(top);
  top.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

  if (CFG.instagram){
    const ig = document.createElement("a");
    ig.className = "ig-float"; ig.href = CFG.instagram; ig.target = "_blank"; ig.rel = "noopener";
    ig.innerHTML = `${I.ig}<span>@${esc(igHandle())}</span>`; ig.setAttribute("aria-label","SwiftSite on Instagram");
    document.body.append(ig);
  }
  const toast = document.createElement("div"); toast.className = "toast"; document.body.append(toast);
}
function footVal(k){
  const c = channel(k);
  if (!c) return `<em>Coming Soon</em>`;
  return c.href ? `<a href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.text)}</a>` : `<span>${esc(c.text)}</span>`;
}
function toast(msg){
  const t = $(".toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ---------- NAV behaviour ---------- */
function initNav(){
  const header = $(".site-header"), burger = $(".burger"), top = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    top.classList.toggle("show", y > 600);
  };
  onScroll(); window.addEventListener("scroll", onScroll, { passive:true });
  const toggle = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggle(!document.body.classList.contains("menu-open")));
  $$(".mobile-menu a").forEach(a => a.addEventListener("click", () => toggle(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });

  // Smooth page transitions for internal .html links
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute("href");
    if (!/\.html(#.*)?$/.test(href)) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = href; }, 280);
  });
  // In-page anchors
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = $(a.getAttribute("href")); if (!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior:"smooth", block:"start" });
  }));
}
window.addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("is-leaving"); });

/* ---------- MOTION ---------- */
function initReveal(){
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold:.12, rootMargin:"0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));
}

// 3D scroll: .scene elements rotate gently in X as they travel through the viewport
function initScroll3D(){
  const scenes = $$(".scene"), para = $$("[data-speed]");
  if (!scenes.length && !para.length) return;
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let ticking = false;
  const update = () => {
    const vh = innerHeight;
    scenes.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = Math.max(-1, Math.min(1, ((r.top + r.height/2) - vh/2) / vh)); // -1..1
      const rx = p * 7, tz = -Math.abs(p) * 60, s = 1 - Math.abs(p) * .03;
      el.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px) scale(${s.toFixed(3)})`;
    });
    para.forEach(el => {
      const sp = parseFloat(el.dataset.speed);
      el.style.translate = `0 ${(scrollY * sp).toFixed(1)}px`;
    });
    ticking = false;
  };
  update();
  addEventListener("scroll", () => { if (!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive:true });
  addEventListener("resize", update);
}

// Hover tilt for cards
function initTilt(root = document){
  if (matchMedia("(hover:none)").matches) return;
  $$("[data-tilt]", root).forEach(el => {
    if (el._tilt) return; el._tilt = true;
    const max = parseFloat(el.dataset.tilt) || 5;
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(1100px) rotateY(${x*max}deg) rotateX(${-y*max}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

// Hero stage mouse parallax
function initHeroStage(){
  const stage = $(".stage"); if (!stage) return;
  const inner = $(".stage-inner", stage), chips = $$(".tech-chip", stage);
  if (matchMedia("(hover:none)").matches) return;
  const hero = stage.closest("section");
  hero.addEventListener("mousemove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    inner.style.transform = `rotateY(${x*10}deg) rotateX(${-y*8}deg)`;
    chips.forEach(c => { const d = parseFloat(c.dataset.z || 20); c.style.translate = `${x*d}px ${y*d}px`; });
  });
  hero.addEventListener("mouseleave", () => { inner.style.transform = ""; chips.forEach(c => c.style.translate = ""); });
}

function initMarquee(){
  const t = $(".marquee-track"); if (!t) return;
  const items = ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Python","FastAPI","Django","Node.js","Express","PostgreSQL","MongoDB","Redis","Git","GitHub","Docker","AWS","AI / ML"];
  const html = items.map(i => `<span class="marquee-item">${i}</span>`).join("");
  t.innerHTML = html + html;
}

/* ---------- PROJECTS ---------- */
const PROJECTS = [
  { id:"p01", title:"Professional Business Website", cat:"Web Development", f:["websites"], label:"Concept",
    tech:["HTML","CSS","JavaScript"], mock:"site",
    desc:"Responsive premium business website with modern UI, animations and interactive components.",
    feat:["Fully responsive layout","Scroll-based reveal animations","Interactive service & contact sections","Accessible semantic markup"] },
  { id:"p02", title:"E-Commerce Platform", cat:"Full-Stack", f:["fullstack","python"], label:"Prototype",
    tech:["HTML","CSS","JavaScript","Python","PostgreSQL"], mock:"shop",
    desc:"Modern e-commerce experience with product browsing, authentication and scalable backend architecture.",
    feat:["Product catalogue & filtering","User authentication","Cart and checkout flow","Relational data model in PostgreSQL"] },
  { id:"p03", title:"Admin Dashboard", cat:"Web Application", f:["fullstack","python","backend"], label:"Demo",
    tech:["JavaScript","Python","FastAPI","PostgreSQL"], mock:"dash",
    desc:"Clean administrative dashboard for managing users, content and application data.",
    feat:["Role-based user management","Content CRUD screens","Charts & data tables","FastAPI REST backend"] },
  { id:"p04", title:"AI Assistant", cat:"AI Application", f:["ai","python"], label:"Concept",
    tech:["Python","FastAPI","AI APIs","JavaScript"], mock:"chat",
    desc:"Intelligent assistant interface designed for conversational AI and automation.",
    feat:["Streaming chat interface","AI API integration","Conversation history","Task automation hooks"] },
  { id:"p05", title:"Voice Assistant", cat:"Voice AI", f:["ai","python"], label:"Concept",
    tech:["JavaScript","Python","AI APIs"], mock:"voice",
    desc:"Voice-driven assistant concept with conversational interaction and smart commands.",
    feat:["Speech-to-text input","Natural spoken responses","Custom smart commands","Mobile-first interface"] },
  { id:"p06", title:"SaaS Platform", cat:"SaaS", f:["saas","fullstack"], label:"Concept",
    tech:["React","Next.js","Node.js","PostgreSQL"], mock:"saas",
    desc:"Modern SaaS application concept with authentication, dashboard and scalable architecture.",
    feat:["Authentication & onboarding","Workspace dashboard","Subscription-ready structure","Scalable API layer"] },
  { id:"p07", title:"Automation System", cat:"Automation", f:["automation","python"], label:"Concept",
    tech:["Python","APIs"], mock:"auto",
    desc:"Automation-focused system concept designed to reduce repetitive digital tasks.",
    feat:["Scheduled jobs","Third-party API workflows","Logging & error reports","Configurable task pipelines"] },
  { id:"p08", title:"REST API Platform", cat:"Backend", f:["backend","python"], label:"Demo",
    tech:["Python","FastAPI","PostgreSQL"], mock:"api",
    desc:"Structured backend API architecture with authentication, validation and database integration.",
    feat:["JWT authentication","Pydantic request validation","Auto-generated API docs","PostgreSQL with migrations"] },
  { id:"p09", title:"School Management System", cat:"Web Application", f:["fullstack","python"], label:"Concept",
    tech:["HTML","CSS","JavaScript","Python","PostgreSQL"], mock:"school",
    desc:"Complete management system concept for students, teachers, admissions and administration.",
    feat:["Student & teacher records","Admissions workflow","Attendance and results","Admin reporting"] },
  { id:"p10", title:"Restaurant Website", cat:"Business Website", f:["websites"], label:"Concept",
    tech:["HTML","CSS","JavaScript"], mock:"resto",
    desc:"Elegant restaurant website concept with menu, contact information and responsive design.",
    feat:["Digital menu layout","Reservation call-to-action","Location & hours section","Responsive, image-led design"] },
];
const FILTERS = [["all","All"],["websites","Websites"],["fullstack","Full-Stack"],["python","Python"],["ai","AI"],["backend","Backend"],["saas","SaaS"],["automation","Automation"]];

const bar = u => `<div class="browser-bar"><i></i><i></i><i></i><span>${u}</span></div>`;
function mockup(type){
  const P = n => Array.from({length:n},()=>'<div class="m-p"></div>').join("");
  switch(type){
    case "site": return `<div class="browser">${bar("business-concept.local")}<div class="bview">
      <div class="m-nav"><span class="dotlogo"></span><span class="links"><i></i><i></i><i></i></span></div>
      <div class="m-row" style="align-items:stretch"><div style="flex:1"><div class="m-h" style="width:90%"></div><div class="m-h" style="width:65%"></div>${P(2)}<span class="m-btn"></span> <span class="m-btn g"></span></div>
      <div class="m-img" style="flex:1;height:90px"></div></div>
      <div class="m-row" style="margin-top:10px">${'<div class="m-card" style="flex:1;height:30px"></div>'.repeat(3)}</div></div></div>`;
    case "shop": return `<div class="browser">${bar("shop-prototype.local")}<div class="bview">
      <div class="m-nav"><span class="dotlogo"></span><span class="links"><i></i><i></i><i style="width:10px;background:var(--gold)"></i></span></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${Array.from({length:4},(_,i)=>`<div class="m-card"><div class="m-img" style="height:58px;${i%2?'background:linear-gradient(145deg,#e6d3a3,#f6f2e8)':''}"></div><div class="m-p" style="width:80%"></div><div class="m-p" style="width:40%;background:var(--gold)"></div></div>`).join("")}</div>
      <div class="m-row" style="margin-top:10px;justify-content:space-between"><div style="width:40%">${P(2)}</div><span class="m-btn" style="width:60px"></span></div></div></div>`;
    case "dash": return `<div class="laptop"><div class="laptop-screen"><div class="bview" style="display:flex;gap:8px;height:160px">
      <div class="m-side"><i></i><i></i><i></i><i></i><i></i></div>
      <div style="flex:1"><div class="m-row">${'<div class="m-card" style="flex:1"><div class="m-p" style="width:50%"></div><div class="m-h" style="width:40%;height:7px"></div></div>'.repeat(3)}</div>
      <div class="m-card" style="margin-top:6px"><div class="m-chart">${[40,60,35,80,55,90,70,45,85,60].map(h=>`<i style="height:${h}%"></i>`).join("")}</div></div>
      <div class="m-card" style="margin-top:6px">${P(3)}</div></div></div></div><div class="laptop-base"></div></div>`;
    case "chat": return `<div class="browser">${bar("assistant-concept.local")}<div class="bview" style="display:flex;gap:8px">
      <div style="width:28%;border-right:1px solid #eee5d3;padding-right:6px">${'<div class="m-card" style="height:16px;margin-bottom:5px"></div>'.repeat(5)}</div>
      <div style="flex:1;display:flex;flex-direction:column"><div class="m-bubble"></div><div class="m-bubble me" style="width:55%"></div><div class="m-bubble" style="width:65%;height:22px"></div><div class="m-bubble me" style="width:40%"></div>
      <div class="m-card" style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;height:18px"><div class="m-p" style="width:50%;margin:0"></div><span style="width:10px;height:10px;border-radius:50%;background:var(--gold)"></span></div></div></div></div>`;
    case "voice": return `<div class="phone"><div style="text-align:center;margin-top:18px"><div class="m-p" style="width:50%;margin:0 auto"></div>
      <div style="width:64px;height:64px;border-radius:50%;margin:18px auto;background:radial-gradient(circle at 35% 30%,#fff,var(--sage));border:1px solid var(--gold);box-shadow:0 0 0 8px rgba(169,191,166,.25)"></div>
      <div class="wave">${[0,.1,.2,.3,.4,.5,.6].map(d=>`<i style="animation-delay:${d}s"></i>`).join("")}</div>
      <div class="m-bubble" style="width:80%;margin:8px auto"></div><div class="m-bubble me" style="width:60%;margin:4px auto"></div></div></div>`;
    case "saas": return `<div class="pair"><div class="browser" style="width:260px">${bar("app.saas-concept")}<div class="bview" style="height:150px">
      <div class="m-row" style="justify-content:space-between;margin-bottom:8px"><div class="m-h" style="width:40%"></div><span class="m-btn g"></span></div>
      <div class="m-row">${'<div class="m-card" style="flex:1;height:34px"></div>'.repeat(3)}</div>
      <div class="m-card" style="margin-top:6px"><div class="m-chart" style="height:44px">${[30,50,45,70,60,85,75,95].map(h=>`<i style="height:${h}%"></i>`).join("")}</div></div></div></div>
      <div class="phone" style="width:96px;height:190px"><div class="m-h" style="width:60%;margin-top:14px"></div>${'<div class="m-card" style="height:26px;margin-top:6px"></div>'.repeat(3)}<span class="m-btn g" style="width:100%"></span></div></div>`;
    case "auto": return `<div class="browser" style="background:#1f3328">${bar("~/automation — python")}<div class="term">
      <div><span class="m">$</span> python run_pipeline.py --schedule daily</div><div class="g">→ loading tasks.yaml</div>
      <div>✓ fetch_reports ........ <span class="m">done</span></div><div>✓ transform_data ....... <span class="m">done</span></div>
      <div>✓ sync_to_api .......... <span class="m">done</span></div><div>✓ notify_team .......... <span class="m">done</span></div>
      <div class="g">pipeline finished — next run scheduled</div></div></div>`;
    case "api": return `<div class="browser">${bar("api.local/docs")}<div class="bview">
      ${[["GET","/users","#7f9a7d"],["POST","/auth/login","#c6a664"],["PUT","/users/{id}","#3f6b52"],["DELETE","/items/{id}","#b8826f"],["GET","/items","#7f9a7d"]].map(([m,p,c])=>`<div class="m-card m-row" style="margin-bottom:5px;padding:5px 7px"><b style="background:${c};color:#fff;padding:1px 5px;border-radius:3px;font-size:.45rem;min-width:30px;text-align:center">${m}</b><span style="font-family:ui-monospace,monospace;font-size:.5rem">${p}</span><span style="margin-left:auto;width:8px;height:8px;border-radius:50%;border:1px solid #cfc6b0"></span></div>`).join("")}
      </div></div>`;
    case "school": return `<div class="laptop"><div class="laptop-screen"><div class="bview" style="height:160px">
      <div class="m-row" style="justify-content:space-between;margin-bottom:8px"><div class="m-row"><span class="dotlogo" style="width:14px;height:14px;border-radius:50%;background:var(--mint);border:1px solid var(--gold)"></span><div class="m-h" style="width:70px;margin:0"></div></div><span class="m-btn"></span></div>
      <div class="m-row">${["Students","Teachers","Admissions","Classes"].map(t=>`<div class="m-card" style="flex:1"><div style="font-size:.42rem;color:#7f9a7d">${t}</div><div class="m-h" style="width:60%;height:6px;background:var(--gold)"></div></div>`).join("")}</div>
      <div class="m-card" style="margin-top:6px">${Array.from({length:4},()=>`<div class="m-row" style="padding:2px 0;border-bottom:1px solid #eee5d3"><span style="width:10px;height:10px;border-radius:50%;background:var(--sage)"></span><div class="m-p" style="flex:1"></div><div class="m-p" style="width:20%"></div></div>`).join("")}</div>
      </div></div><div class="laptop-base"></div></div>`;
    case "resto": return `<div class="pair"><div class="browser" style="width:250px">${bar("restaurant-concept.local")}<div class="bview" style="height:150px;padding:0">
      <div style="height:80px;background:linear-gradient(135deg,#2a4a38,#1d3528);padding:12px;color:#e6d3a3;font-family:Georgia,serif;font-style:italic;font-size:.8rem">Olive &amp; Thyme<div class="m-p" style="width:40%;background:rgba(230,211,163,.5)"></div><span class="m-btn g"></span></div>
      <div style="padding:8px" class="m-row">${'<div class="m-card" style="flex:1"><div class="m-img" style="height:26px;background:linear-gradient(145deg,#e6d3a3,#a9bfa6)"></div><div class="m-p"></div></div>'.repeat(3)}</div></div></div>
      <div class="phone" style="width:96px;height:190px;padding:0;padding-top:14px"><div style="padding:8px;font-family:Georgia,serif;font-style:italic;font-size:.55rem;color:#2a4a38">Menu</div>${Array.from({length:5},()=>`<div class="m-row" style="padding:3px 8px"><div class="m-p" style="flex:1"></div><div class="m-p" style="width:14px;background:var(--gold)"></div></div>`).join("")}</div></div>`;
  }
  return "";
}

const visibleProjects = () => PROJECTS.filter(p => !CFG.hidden.includes(p.id));
function projectCard(p, i){
  const l = CFG.links[p.id] || {};
  const live = l.live ? `<a class="btn btn-primary btn-sm" href="${esc(l.live)}" target="_blank" rel="noopener">Live Site ${I.arrow}</a>` : "";
  const code = l.code ? `<a class="btn btn-ghost btn-sm" href="${esc(l.code)}" target="_blank" rel="noopener">View Code</a>`
                      : `<button class="btn btn-ghost btn-sm is-soon" data-soon="Source code">View Code · Coming Soon</button>`;
  return `<article class="project reveal" data-d="${i%2+1}" data-f="${p.f.join(" ")}">
    <div class="project-card glass gold-edge" data-tilt="4">
      <div class="preview"><span class="status-pill">${l.live ? "Live" : p.label}</span>${(CFG.images||{})[p.id] ? `<img class="proj-img" src="${esc(CFG.images[p.id])}" alt="${esc(p.title)} preview" loading="lazy">` : mockup(p.mock)}</div>
      <div class="project-body">
        <div class="project-meta"><span>${p.cat}</span><em>${p.id.replace("p","No. ")}</em></div>
        <h3>${p.title}</h3><p>${p.desc}</p>
        <div class="tags">${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="project-actions"><button class="btn btn-primary btn-sm" data-open="${p.id}">View Project ${I.arrow}</button>${live}${code}</div>
      </div>
    </div></article>`;
}

function initProjects(){
  const grid = $("#project-grid");
  if (!grid) return;
  const limit = parseInt(grid.dataset.limit || "0", 10);
  const list = limit ? visibleProjects().slice(0, limit) : visibleProjects();
  grid.innerHTML = list.length ? list.map(projectCard).join("") : `<p class="lead">Projects are being updated — coming soon.</p>`;

  const bar = $("#filters");
  if (bar){
    bar.innerHTML = FILTERS.map(([k,t]) => {
      const n = k === "all" ? list.length : list.filter(p => p.f.includes(k)).length;
      return `<button class="filter ${k==="all"?"on":""}" data-filter="${k}">${t}<sup>${n}</sup></button>`;
    }).join("");
    bar.addEventListener("click", e => {
      const b = e.target.closest("[data-filter]"); if (!b) return;
      $$(".filter", bar).forEach(x => x.classList.toggle("on", x === b));
      const k = b.dataset.filter;
      $$(".project", grid).forEach(card => {
        const show = k === "all" || card.dataset.f.split(" ").includes(k);
        if (show){ card.classList.remove("hide"); card.classList.add("fade", "in"); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove("fade"))); }
        else card.classList.add("hide");
      });
    });
  }
  grid.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if (o) openProject(o.dataset.open);
    const s = e.target.closest("[data-soon]"); if (s) toast(`${s.dataset.soon} — coming soon.`);
  });
  initTilt(grid);
}

function buildModal(){
  const m = document.createElement("div");
  m.className = "modal"; m.id = "project-modal"; m.setAttribute("role","dialog"); m.setAttribute("aria-modal","true");
  m.innerHTML = `<div class="modal-box"><button class="modal-close" aria-label="Close">×</button><div class="modal-content"></div></div>`;
  document.body.append(m);
  const close = () => { m.classList.remove("open"); document.body.style.overflow = ""; };
  m.addEventListener("click", e => { if (e.target === m || e.target.closest(".modal-close")) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && m.classList.contains("open")) close(); });
  return m;
}
function openProject(id){
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  const m = $("#project-modal") || buildModal();
  const l = CFG.links[p.id] || {};
  $(".modal-content", m).innerHTML = `
    <span class="eyebrow">${p.cat} · ${p.label}</span>
    <h3>${p.title}</h3>
    <p class="lead" style="font-size:1rem">${p.desc}</p>
    <div class="preview" style="margin-top:24px;height:260px">${(CFG.images||{})[p.id] ? `<img class="proj-img" src="${esc(CFG.images[p.id])}" alt="${esc(p.title)}">` : mockup(p.mock)}</div>
    <div class="grid2">
      <div><h5>Technology</h5><div class="tags">${p.tech.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
           <h5 style="margin-top:18px">Status</h5>${l.live ? `<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${esc(l.live)}">Open Live Project ${I.arrow}</a>` : `<span class="status-soon">Coming Soon</span>`}</div>
      <div><h5>Key Features</h5><ul class="feat">${p.feat.map(f=>`<li>${f}</li>`).join("")}</ul></div>
    </div>
    <p style="margin-top:24px;font-size:.8rem;color:var(--muted)">This is a ${p.label.toLowerCase()} built to demonstrate skills — not a client project.</p>`;
  m.classList.add("open"); document.body.style.overflow = "hidden";
}

/* ---------- SERVICES ---------- */
const SERVICES = [
  { id:"s01", name:"Frontend Development", icon:"code", desc:"Modern, responsive interfaces that are fast, accessible and pleasant to use on every screen size.", tech:["HTML","CSS","JavaScript","TypeScript","React","Next.js"] },
  { id:"s02", name:"Backend Development", icon:"server", desc:"Reliable backend systems with clean APIs, solid data models and secure authentication.", tech:["Python","FastAPI","Django","Node.js","Express"] },
  { id:"s03", name:"Full-Stack Applications", icon:"layers", desc:"Complete applications, planned and delivered end-to-end — from the first screen to production.", tech:["Frontend","Backend","Database","Authentication","APIs","Deployment"] },
  { id:"s04", name:"WordPress", icon:"wp", desc:"Professional WordPress builds for businesses that want an easy-to-manage website.", tech:["Business Websites","Landing Pages","Custom WordPress Solutions","Responsive Designs"] },
  { id:"s05", name:"AI Applications", icon:"spark", desc:"AI-powered products that solve real problems — integrated thoughtfully, not as a gimmick.", tech:["Assistants","Chat Systems","Voice Interfaces","Automation","RAG Applications","AI API Integrations"] },
  { id:"s06", name:"E-Commerce", icon:"cart", desc:"Modern shopping experiences with the admin tools and backend needed to run them.", tech:["Product Websites","Shopping Experiences","Admin Panels","Backend Systems"] },
  { id:"s07", name:"Automation", icon:"cog", desc:"Python and API based automation systems that take repetitive digital work off your plate.", tech:["Python","REST APIs","Schedulers","Data Pipelines","Integrations"] },
  { id:"s08", name:"Cloud & Deployment", icon:"cloud", desc:"Deployment and production setup — servers, domains, SSL and monitoring done properly.", tech:["Docker","Nginx","AWS","CI/CD","DNS","SSL / HTTPS"] },
];
let currency = localStorage.getItem("swiftsite_currency") || "pk";
function priceHTML(s){
  const all = CFG.prices[s.id] || {}, rate = Number(CFG.rate) || 280;
  let pr = all[currency];
  if (!pr && currency === "pk" && all.us) pr = Math.round(all.us * rate / 100) * 100;
  if (!pr && currency === "us" && all.pk) pr = Math.round(all.pk / rate);
  const lbl = currency === "pk" ? "Pakistan · PKR" : "USA · USD";
  if (!pr) return `<div class="price"><small>${lbl}</small><strong class="req">Price on request</strong></div>`;
  const val = currency === "pk" ? `Rs ${Number(pr).toLocaleString("en-PK")}` : `$${Number(pr).toLocaleString("en-US")}`;
  return `<div class="price"><small>${lbl} · Starting from</small><strong>${isNaN(Number(pr)) ? esc(pr) : val}</strong></div>`;
}
function initServices(){
  const grid = $("#service-grid"); if (!grid) return;
  const limit = parseInt(grid.dataset.limit || "0", 10);
  const compact = grid.dataset.compact === "true";
  let list = SERVICES.filter(s => !CFG.hiddenServices.includes(s.id));
  if (limit) list = list.slice(0, limit);
  const draw = () => {
    grid.innerHTML = list.map((s,i) => `
      <article class="service glass gold-edge reveal in" data-d="${i%2+1}" data-tilt="3">
        <div class="s-top"><span class="s-ico">${I[s.icon]}</span><span class="s-num">${String(i+1).padStart(2,"0")}</span></div>
        <h3>${s.name}</h3><p>${s.desc}</p>
        <ul>${s.tech.map(t=>`<li>${t}</li>`).join("")}</ul>
        <div class="s-foot">${compact ? "" : priceHTML(s)}<a href="contact.html?service=${encodeURIComponent(s.name)}" class="btn btn-ghost btn-sm">Discuss Project ${I.arrow}</a></div>
      </article>`).join("");
    initTilt(grid);
  };
  draw();
  const sw = $("#price-switch");
  if (sw){
    const knob = $(".knob", sw), btns = $$("button", sw);
    const place = () => {
      const b = btns.find(x => x.dataset.cur === currency) || btns[0];
      btns.forEach(x => x.classList.toggle("on", x === b));
      knob.style.width = b.offsetWidth + "px"; knob.style.transform = `translateX(${b.offsetLeft - 5}px)`;
    };
    btns.forEach(b => b.addEventListener("click", () => { currency = b.dataset.cur; localStorage.setItem("swiftsite_currency", currency); place(); draw(); }));
    place(); addEventListener("resize", place);
  }
}

/* ---------- SKILLS (about) ---------- */
const SKILLS = [
  ["frontend","Frontend","Interfaces people enjoy using.",["HTML","CSS","JavaScript","TypeScript","React","Next.js"]],
  ["python","Python","Readable, well-structured backend code.",["Python Basics","Object-Oriented Programming","FastAPI","Django","Django REST Framework"]],
  ["node","Node.js","Real-time and API-driven services.",["Node.js","Express.js","REST APIs","WebSockets","Authentication","JWT","OAuth"]],
  ["data","Databases","Data models that scale with the product.",["SQL","PostgreSQL","MySQL","MongoDB","Redis"]],
  ["tools","Tools & Workflow","A clean, repeatable way of working.",["Git","GitHub","Linux","Bash","VS Code","npm / pnpm"]],
  ["devops","DevOps & Cloud","Shipping to production with confidence.",["Docker","Docker Compose","CI/CD","Nginx","SSH","AWS","Cloud Deployment","DNS","SSL / HTTPS","Monitoring"]],
  ["ai","AI & Data","Practical machine learning and LLM tooling.",["NumPy","Pandas","Matplotlib","Scikit-learn","Machine Learning","AI APIs","LLMs","Embeddings","Vector Databases","RAG","AI Agents","Voice AI"]],
  ["security","Web Security","Security considered from day one.",["Web Security","HTTPS","CORS","XSS","CSRF","SQL Injection Protection","Secure Authentication","API Key / Secret Management"]],
  ["cs","Computer Science","The fundamentals behind good software.",["Data Structures","Algorithms","OOP","Design Patterns","System Design","Networking","Operating System Basics","Debugging","Testing"]],
];
function initSkills(){
  const wrap = $("#skills"); if (!wrap) return;
  const nav = $("#skills-nav");
  nav.innerHTML = SKILLS.map(([id,t]) => `<a href="#sk-${id}">${t}</a>`).join("");
  wrap.innerHTML = SKILLS.map(([id,t,d,items],i) => `
    <div class="skill-group reveal" id="sk-${id}">
      <header><span class="idx">${String(i+1).padStart(2,"0")}</span><h3>${t}</h3><p>${d}</p></header>
      <div class="skill-cards">${items.map(s => `<div class="skill-card"><i>${s.replace(/[^A-Za-z0-9]/g,"").slice(0,2).toUpperCase()}</i>${s}</div>`).join("")}</div>
    </div>`).join("");
  const links = $$("a", nav);
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }
  }), { rootMargin:"-45% 0px -50% 0px" });
  $$(".skill-group", wrap).forEach(g => io.observe(g));
  links.forEach(a => a.addEventListener("click", e => { e.preventDefault(); $(a.getAttribute("href")).scrollIntoView({ behavior:"smooth" }); }));
}

/* ---------- CONTACT ---------- */
function initContact(){
  const list = $("#info-list");
  if (list){
    const rows = [["Phone","phone",I.phone],["Email","email",I.mail],["WhatsApp","whatsapp",I.wa],["Location","location",I.pin],["Instagram","instagram",I.ig],["GitHub","github",I.gh],["LinkedIn","linkedin",I.li]];
    list.innerHTML = rows.map(([t,k,ic]) => `<div class="info"><span class="l"><i>${ic}</i>${t}</span>${soonOr(k)}</div>`).join("");
  }
  const form = $("#contact-form"); if (!form) return;
  const svc = new URLSearchParams(location.search).get("service");
  if (svc){ const sel = form.projectType; const opt = [...sel.options].find(o => o.text === svc); if (opt) sel.value = opt.value; }
  const rules = {
    name: v => v.trim().length >= 2 || "Please enter your name.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
    projectType: v => !!v || "Please choose a project type.",
    message: v => v.trim().length >= 15 || "Please write at least 15 characters.",
  };
  const check = el => {
    const r = rules[el.name](el.value), f = el.closest(".field");
    f.classList.toggle("err", r !== true); $(".msg", f).textContent = r === true ? "" : r;
    return r === true;
  };
  Object.keys(rules).forEach(n => {
    form[n].addEventListener("blur", () => check(form[n]));
    form[n].addEventListener("input", () => { if (form[n].closest(".field").classList.contains("err")) check(form[n]); });
  });
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(n => check(form[n])).every(Boolean);
    const note = $("#form-note");
    if (!ok){ form.classList.add("shake"); setTimeout(() => form.classList.remove("shake"), 450); return; }
    const text = `Hello SwiftSite 👋\n\nName: ${form.name.value.trim()}\nEmail: ${form.email.value.trim()}\nProject: ${form.projectType.value}\n\n${form.message.value.trim()}`;
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch {}
    const h = igHandle();
    if (h){
      window.open(`https://ig.me/m/${h}`, "_blank", "noopener");
      note.innerHTML = `<strong>Contact form integration is coming soon.</strong><br>${copied ? "Your message has been copied —" : "Please copy your message and"} paste it into the Instagram chat that just opened (@${esc(h)}).`;
    } else {
      note.innerHTML = `<strong>Contact form integration is coming soon.</strong>`;
    }
    note.classList.add("show");
  });
}

/* ---------- ADMIN ---------- */
const ADMIN = { pin:"6247", secret:"7426", name:"MHARRYJS", pass:"Mharryjs123@" };
const INSULT = "BSDK — Aap MHARRYJS website ke owner nahi ho! Jao gand marwao, boss se lund ka sir! 😤";
let insultShown = sessionStorage.getItem("ss_insult") === "1";

const pwField = (id, ph, extra = "") => `<div class="pw"><input id="${id}" type="password" placeholder="${ph}" autocomplete="off" ${extra}><button type="button" class="eye" data-eye="${id}" aria-label="Show password">${I.eye}</button></div>`;

function buildAdmin(){
  const m = document.createElement("div");
  m.className = "modal"; m.id = "admin-modal";
  m.innerHTML = `<div class="modal-box admin-box"><button class="modal-close" aria-label="Close">×</button>
    <div class="lock-step on" data-step="1">
      <span class="logo-badge">${logoImg()}</span>
      <span class="eyebrow">Step 1 of 2</span><h3>Admin Access</h3><p class="sub">Enter the 4-digit security PIN.</p>
      ${pwField("a-pin","••••",'inputmode="numeric" maxlength="4" class="pin"')}
      <div class="lock-msg" id="msg1"></div>
    </div>
    <div class="lock-step" data-step="2">
      <span class="logo-badge">${logoImg()}</span>
      <span class="eyebrow">Step 2 of 2</span><h3>Owner Login</h3><p class="sub">Confirm your name and password.</p>
      <div class="pw"><input id="a-name" type="text" placeholder="Name" autocomplete="off"></div>
      ${pwField("a-pass","Password")}
      <div class="lock-msg" id="msg2"></div>
      <button class="btn btn-primary" id="a-login" style="width:100%;justify-content:center">Unlock Admin ${I.arrow}</button>
    </div>
    <div class="admin-panel" id="admin-panel"></div>
  </div>`;
  document.body.append(m);

  // Every time admin is closed it locks again — password needed next time
  function relock(){
    const panel = $("#admin-panel"); panel.classList.remove("on"); panel.innerHTML = "";
    const pin = $("#a-pin"); pin.disabled = false; pin.value = "";
    ["#msg1","#msg2"].forEach(s => { $(s).className = "lock-msg"; $(s).textContent = ""; });
    $("#a-name").value = ""; $("#a-pass").value = "";
    $$(".lock-step", m).forEach(s => s.classList.toggle("on", s.dataset.step == "1"));
  }
  const close = () => { m.classList.remove("open"); document.body.style.overflow = ""; setTimeout(relock, 300); };
  addEventListener("pageshow", e => { if (e.persisted){ m.classList.remove("open"); relock(); } });
  m.addEventListener("click", e => {
    if (e.target === m || e.target.closest(".modal-close")) close();
    const eye = e.target.closest("[data-eye]");
    if (eye){ const inp = $("#" + eye.dataset.eye); const show = inp.type === "password"; inp.type = show ? "text" : "password"; eye.innerHTML = show ? I.eyeOff : I.eye; }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && m.classList.contains("open")) close(); });

  const step = n => $$(".lock-step", m).forEach(s => s.classList.toggle("on", s.dataset.step == n));
  const pin = $("#a-pin"), msg1 = $("#msg1");
  pin.addEventListener("input", () => {
    pin.value = pin.value.replace(/\D/g, "");
    if (pin.value.length < 4){ if (!msg1.classList.contains("good")) { msg1.className = "lock-msg"; msg1.textContent = ""; } return; }
    if (pin.value === ADMIN.secret){
      msg1.className = "lock-msg good"; msg1.textContent = "Welcome Mharryjs 😎👑";
      pin.disabled = true;
      setTimeout(() => { $$(".lock-step", m).forEach(s => s.classList.remove("on")); renderPanel(); }, 1300);
      return;
    }
    if (pin.value === ADMIN.pin){
      msg1.className = "lock-msg good"; msg1.textContent = "Welcome Harry 👑 — aapka intezaar tha, sir!";
      pin.disabled = true;
      setTimeout(() => { step(2); $("#a-name").focus(); }, 1400);
    } else {
      msg1.className = "lock-msg bad";
      msg1.textContent = INSULT;
      pin.parentElement.classList.add("shake"); setTimeout(() => pin.parentElement.classList.remove("shake"), 450);
      setTimeout(() => { pin.value = ""; }, 500);
    }
  });
  const login = () => {
    const msg2 = $("#msg2");
    const pass = CFG.adminPass || ADMIN.pass;
    if ($("#a-name").value.trim().toUpperCase() === ADMIN.name && $("#a-pass").value === pass){
      msg2.className = "lock-msg good"; msg2.textContent = "Access granted.";
      setTimeout(() => { $$(".lock-step", m).forEach(s => s.classList.remove("on")); renderPanel(); }, 500);
    } else {
      msg2.className = "lock-msg bad"; msg2.textContent = "Ghalat naam ya password — dobara koshish karein.";
      const box = $('[data-step="2"]', m); box.classList.add("shake"); setTimeout(() => box.classList.remove("shake"), 450);
    }
  };
  $("#a-login").addEventListener("click", login);
  $("#a-pass").addEventListener("keydown", e => { if (e.key === "Enter") login(); });
  return m;
}

function openAdmin(){
  const m = $("#admin-modal") || buildAdmin();
  m.classList.add("open"); document.body.style.overflow = "hidden";
  if (!$("#admin-panel").classList.contains("on")) setTimeout(() => $("#a-pin").focus(), 300);
}

function faqRow(f = {}, i = 0){
  return `<div class="a-faq"><input data-fq="k" value="${esc(f.k||"")}" placeholder="keywords"><textarea data-fq="a" rows="2" placeholder="Answer">${esc(f.a||"")}</textarea><button class="a-del" data-faqdel title="Delete">${I.trash}</button></div>`;
}
function renderPanel(){
  const p = $("#admin-panel"); let draft = JSON.parse(JSON.stringify(CFG));
  draft.bot = { ...DEFAULTS.bot, ...(draft.bot || {}) };
  const field = (k, label, ph) => `<div class="a-row"><label for="f-${k}">${label}</label><input id="f-${k}" data-k="${k}" value="${esc(draft[k]||"")}" placeholder="${ph}"><button class="a-del" data-del="${k}" title="Delete">${I.trash}</button></div>`;
  p.innerHTML = `
    <div class="admin-head"><div><span class="eyebrow">Control Panel</span><h3>Welcome back, Harry</h3></div>
      <button class="btn btn-ghost btn-sm" id="a-logout">Lock</button></div>
    ${CLOUD_DB_URL_FILE ? "" : `<div class="lock-msg bad" style="margin-bottom:18px;text-align:left">⚠️ Changes are NOT reaching other phones yet. Your website code has no cloud link.<br>Open <b>☁️ Cloud Sync</b>, do Steps 1–2, then copy the Step 3 line and send it to your developer (or paste it in js/script.js yourself). Until then, changes appear on this device only.</div>`}
    <div class="a-tabs">${[["brand","🖼 Images"],["cloud","☁️ Cloud Sync"],["bot","AI Chatbot"],["contact","Contact & Social"],["prices","Prices"],["projects","Projects"],["services","Services"],["security","Security"]].map(([k,t],i)=>`<button data-tab="${k}" class="${i?"":"on"}">${t}</button>`).join("")}</div>

    <div class="a-sec on" data-sec="brand">
      <div class="logo-up"><span class="logo-badge"><img id="a-logo-prev" src="${draft.logo||"assets/logo.png"}" onerror="this.onerror=null;this.src='${FALLBACK_LOGO}'" alt="Logo preview"></span>
        <div><strong style="font-family:var(--f-head)">Website Logo</strong><p class="a-note" style="margin:4px 0 10px">PNG / JPG / SVG / WebP — shown in a circle on all pages.</p>
        <label class="btn btn-primary btn-sm" style="cursor:pointer">Upload New Logo<input type="file" id="a-logo-file" accept="image/*" hidden></label>
        <button class="btn btn-ghost btn-sm" id="a-logo-del">${I.trash} Delete Logo</button></div></div>
      <div class="a-row"><label for="a-logo-url">Or logo URL</label><input id="a-logo-url" placeholder="https://i.postimg.cc/.../logo.png" value="${draft.logo && !draft.logo.startsWith("data:") ? esc(draft.logo) : ""}"><span></span></div>
    </div>

    <div class="a-sec on" data-sec="brand">
      ${[["homeImg","Home page image","Shown in the moving circle on the Home page. Empty = your logo."],["aboutImg","About page image","Fills the large card on the About page. Empty = your logo."]].map(([k,t,d]) => `
      <div class="logo-up"><span class="logo-badge"><img data-siteprev="${k}" src="${esc(draft[k] || draft.logo || "assets/logo.png")}" onerror="this.onerror=null;this.src='${FALLBACK_LOGO}'" alt="${t} preview" style="${draft[k] ? "width:100%;height:100%;object-fit:cover" : ""}"></span>
        <div><strong style="font-family:var(--f-head)">${t}</strong><p class="a-note" style="margin:4px 0 10px">${d}</p>
        <label class="btn btn-primary btn-sm" style="cursor:pointer">Upload Image<input type="file" data-siteimg="${k}" accept="image/*" hidden></label>
        <button class="btn btn-ghost btn-sm" data-siteimgdel="${k}">${I.trash} Delete Image</button></div></div>
      <div class="a-row"><label>Or image URL</label><input data-imgurl="${k}" placeholder="https://i.postimg.cc/.../photo.jpg" value="${draft[k] && !draft[k].startsWith("data:") ? esc(draft[k]) : ""}"><span></span></div>`).join("")}
      <p class="a-note">Project pictures are in the Projects tab. Press Save Changes after choosing an image.</p>
    </div>

    <div class="a-sec" data-sec="cloud">
      <div class="logo-up" style="display:block">
        <strong style="font-family:var(--f-head)">${CLOUD_DB_URL_FILE ? "🟢 Live for everyone" : CLOUD_DB_URL ? "🟡 Connected on this device only — finish step 3" : "🔴 Not connected"}</strong>
        <p class="a-note" style="margin:6px 0 0">When connected, every <b>Save</b> (from phone or computer) updates the website for every visitor, everywhere.</p>
      </div>
      <p class="a-note"><b>Step 1.</b> Create free cloud storage — choose one:</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px"><button class="btn btn-primary btn-sm" id="c-blob">⚡ Create free cloud (1 click)</button></div>
      <div class="a-row"><label for="c-url">Or Firebase URL</label><input id="c-url" placeholder="https://xxxx-default-rtdb.firebaseio.com" value="${esc(CLOUD_DB_URL)}"><button class="btn btn-ghost btn-sm" id="c-connect">Connect</button></div>
      <p class="a-note"><b>Step 2.</b> Press Save Changes (uploads all current settings).</p>
      <p class="a-note"><b>Step 3 (only once).</b> Open <code>js/script.js</code>, replace the line <code>const CLOUD_DB_URL_FILE = "";</code> with this, then upload the website again:</p>
      <textarea id="c-line" readonly rows="3" style="width:100%;padding:14px;border-radius:14px;border:1px solid var(--gold);background:#fff;font-family:ui-monospace,monospace;font-size:.82rem;resize:none;margin:8px 0">${CLOUD_DB_URL ? `const CLOUD_DB_URL_FILE = "${esc(CLOUD_DB_URL)}";` : "— Press “Create free cloud” or “Save Changes” first —"}</textarea>
      <button class="btn btn-primary btn-sm" id="c-copy">📋 Copy line</button>
      <p class="a-note">After this one-time step you never touch code again — use Admin from any phone or computer.</p>
    </div>

    <div class="a-sec a-bot" data-sec="bot">
      <label class="a-switch"><input type="checkbox" id="b-on" ${draft.bot.enabled?"checked":""}> Chatbot enabled on website</label>
      <div class="logo-up" style="display:block">
        <strong style="font-family:var(--f-head)">🤖 Google Gemini AI</strong>
        <p class="a-note" style="margin:4px 0 12px">Add a Gemini API key so the chatbot can answer <em>any</em> question. Free key: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style="color:var(--green);font-weight:600">aistudio.google.com/app/apikey</a></p>
        <div class="a-row"><label for="b-key">Gemini API key</label>${pwField("b-key","AIza...", `value="${esc(draft.bot.geminiKey||"")}"`)}<button class="a-del" data-botdel="b-key" title="Delete key">${I.trash}</button></div>
        <div class="a-row"><label for="b-model">Model</label><select id="b-model">${["gemini-2.5-flash","gemini-2.5-flash-lite","gemini-2.0-flash","gemini-2.5-pro"].map(mo=>`<option ${draft.bot.model===mo?"selected":""}>${mo}</option>`).join("")}</select><span></span></div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px"><button class="btn btn-ghost btn-sm" id="b-test">Test key</button><span class="a-note" id="b-test-msg" style="margin:0">Status: ${draft.bot.geminiKey ? "🟢 Key added" : "⚪ No key — using built-in answers"}</span></div>
        <p class="a-note">⚠️ Anyone can read this key in the browser. In Google Cloud → Credentials, restrict it to your website domain.</p>
      </div>
      <div class="a-row"><label for="b-name">Bot name</label><input id="b-name" value="${esc(draft.bot.name||"")}" placeholder="Swifty"><span></span></div>
      <div class="a-row"><label for="b-greet">Greeting</label><textarea id="b-greet" placeholder="Leave empty for the default greeting">${esc(draft.bot.greeting||"")}</textarea><button class="a-del" data-botdel="b-greet">${I.trash}</button></div>
      <div class="a-row"><label for="b-contact">Contact reply</label><textarea id="b-contact" placeholder="Default: abhi sirf Instagram par contact ho sakta hai…">${esc(draft.bot.contact||"")}</textarea><button class="a-del" data-botdel="b-contact">${I.trash}</button></div>
      <h5 style="margin:22px 0 6px;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--sage-d)">Custom answers</h5>
      <p class="a-note" style="margin:0 0 8px">Keywords are comma separated, e.g. <em>discount, offer</em>. Custom answers are checked first.</p>
      <div id="b-faqs">${(draft.bot.faqs||[]).map((f,i)=>faqRow(f,i)).join("")}</div>
      <button class="btn btn-primary btn-sm" id="b-add" style="margin-top:12px">+ Add New AI Message</button>
    </div>

    <div class="a-sec" data-sec="contact">
      ${field("phone","Phone","+92 ...")}${field("whatsapp","WhatsApp","+92 3xx xxxxxxx")}${field("email","Email","you@domain.com")}
      ${field("location","Location","City, Country")}${field("instagram","Instagram URL","https://www.instagram.com/...")}
      ${field("github","GitHub URL","https://github.com/...")}${field("linkedin","LinkedIn URL","https://linkedin.com/in/...")}
      <p class="a-note">Empty fields show “Coming Soon” on the website. Contact form messages go to the Instagram account above.</p>
    </div>

    <div class="a-sec" data-sec="prices">
      <div class="a-row"><label for="a-rate">1 USD = PKR</label><input id="a-rate" type="number" min="1" value="${esc(draft.rate||280)}"><span></span></div>
      <p class="a-note" style="margin:6px 0 14px">✨ Auto-convert: type a price in 🇵🇰 PKR and USD fills automatically — or type in 🇺🇸 USD and PKR fills automatically.</p>
      <div class="a-price" style="border:0;color:var(--sage-d);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase"><span>Service</span><span>🇵🇰 PKR</span><span>🇺🇸 USD</span><span></span></div>
      ${SERVICES.map(s => { const pr = draft.prices[s.id] || {}; return `<div class="a-price"><span>${s.name}</span><input data-price="${s.id}" data-cur="pk" value="${esc(pr.pk||"")}" placeholder="e.g. 25000"><input data-price="${s.id}" data-cur="us" value="${esc(pr.us||"")}" placeholder="e.g. 150"><button class="a-del" data-delprice="${s.id}" title="Delete price">${I.trash}</button></div>`; }).join("")}
      <p class="a-note">Leave empty to show “Price on request”. Visitors switch Pakistan / USA on the Services page.</p>
    </div>

    <div class="a-sec" data-sec="projects">
      ${PROJECTS.map(pr => { const l = draft.links[pr.id] || {}; const off = draft.hidden.includes(pr.id); const im = (draft.images||{})[pr.id]; return `<div class="a-proj ${off?"off":""}" data-pid="${pr.id}"><img class="a-thumb" data-thumb="${pr.id}" src="${im?esc(im):""}" alt="" style="${im?"":"opacity:.35"}"><span style="min-width:150px">${pr.title}</span>
        <span class="a-img-btns"><label>🖼 Image<input type="file" accept="image/*" hidden data-projimg="${pr.id}"></label><button type="button" data-imgdel="${pr.id}">${I.trash.replace('<svg','<svg width="12" height="12"')}</button></span>
        <input data-link="${pr.id}" data-t="live" placeholder="Live URL (optional)" value="${esc(l.live||"")}"><input data-link="${pr.id}" data-t="code" placeholder="Code URL (optional)" value="${esc(l.code||"")}">
        <button class="btn btn-ghost btn-sm" data-hide="${pr.id}">${off?"Restore":"Delete"}</button></div>`; }).join("")}
      <p class="a-note">Add a real URL to turn “Coming Soon” into a working button. Deleted projects are hidden from the site.</p>
    </div>

    <div class="a-sec" data-sec="services">
      ${SERVICES.map(s => { const off = draft.hiddenServices.includes(s.id); return `<div class="a-proj ${off?"off":""}"><span>${s.name}</span><button class="btn btn-ghost btn-sm" data-hidesvc="${s.id}">${off?"Restore":"Delete"}</button></div>`; }).join("")}
    </div>

    <div class="a-sec" data-sec="security">
      <p class="a-note" style="margin-bottom:12px">Change the step-2 admin password (saved on this browser).</p>
      ${pwField("a-newpass","New password (leave empty to keep current)")}
      <button class="btn btn-ghost btn-sm" id="a-reset">${I.trash} Reset all website settings</button>
    </div>

    <div class="admin-foot"><span class="a-note">Settings are stored in this browser (localStorage). For changes visible to all visitors, connect a backend — integration coming soon.</span>
      <span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" id="a-export">⬇ site-config.json</button><button class="btn btn-gold" id="a-save">Save Changes</button></span></div>
    <p class="a-note">Cloud sync: <strong>${CLOUD_DB_URL ? "🟢 Connected — changes go live for everyone" : "🔴 Not connected — changes stay on this browser"}</strong></p>`;
  p.classList.add("on");

  p.onclick = e => {
    const t = e.target.closest("button, label"); if (!t) return;
    if (t.dataset.tab){ $$(".a-tabs button", p).forEach(b => b.classList.toggle("on", b === t)); $$(".a-sec", p).forEach(s => s.classList.toggle("on", s.dataset.sec === t.dataset.tab)); }
    if (t.dataset.del){ const inp = $(`[data-k="${t.dataset.del}"]`, p); inp.value = ""; draft[t.dataset.del] = ""; toast(`${t.dataset.del} deleted — press Save`); }
    if (t.dataset.delprice){ $$(`[data-price="${t.dataset.delprice}"]`, p).forEach(i => i.value = ""); delete draft.prices[t.dataset.delprice]; }
    if (t.dataset.hide){ const id = t.dataset.hide, row = t.closest(".a-proj"); const off = draft.hidden.includes(id);
      draft.hidden = off ? draft.hidden.filter(x => x !== id) : [...draft.hidden, id]; row.classList.toggle("off", !off); t.textContent = off ? "Delete" : "Restore"; }
    if (t.dataset.hidesvc){ const id = t.dataset.hidesvc, row = t.closest(".a-proj"); const off = draft.hiddenServices.includes(id);
      draft.hiddenServices = off ? draft.hiddenServices.filter(x => x !== id) : [...draft.hiddenServices, id]; row.classList.toggle("off", !off); t.textContent = off ? "Delete" : "Restore"; }
    if (t.id === "a-logo-del"){ draft.logo = ""; $("#a-logo-prev").src = "assets/logo.png"; $("#a-logo-url").value = ""; }
    if (t.dataset.siteimgdel){
      const k = t.dataset.siteimgdel, pv = $(`[data-siteprev="${k}"]`, p);
      draft[k] = ""; pv.style.cssText = "";
      pv.onerror = () => { pv.onerror = null; pv.src = FALLBACK_LOGO; };
      pv.src = draft.logo || "assets/logo.png";
      $(`[data-imgurl="${k}"]`, p).value = "";
      toast("Image removed — press Save Changes");
    }
    if (t.id === "a-logout"){ p.classList.remove("on"); $("#a-pin").disabled = false; $("#a-pin").value = ""; $("#msg1").className = "lock-msg"; $("#msg1").textContent = ""; $("#a-pass").value = ""; $("#msg2").textContent = ""; $("#msg2").className = "lock-msg"; $('[data-step="1"]').classList.add("on"); }
    if (t.id === "a-reset" && confirm("Reset all SwiftSite settings to default?")){ Store.reset(); location.reload(); }
    if (t.id === "a-save") save();
    if (t.id === "a-export"){
      const pub = { ...Store.get() }; delete pub.adminPass;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(pub, null, 2)], { type:"application/json" }));
      a.download = "site-config.json"; a.click(); URL.revokeObjectURL(a.href);
      toast("Upload this file next to index.html on your hosting");
    }
    if (t.dataset.imgdel){ draft.images = draft.images || {}; delete draft.images[t.dataset.imgdel]; const th = $(`[data-thumb="${t.dataset.imgdel}"]`, p); th.src = ""; th.style.opacity = .35; toast("Image removed — press Save"); }
    if (t.id === "c-copy"){ const l = $("#c-line"); l.select(); navigator.clipboard?.writeText(l.value); toast("Copied ✓ — paste it in js/script.js"); }
    if (t.id === "c-connect"){
      const u = $("#c-url").value.trim();
      if (!/^https:\/\/.+/.test(u)){ toast("Enter a valid https URL"); return; }
      toast("Testing connection…");
      fetch(cloudURL(u), { cache:"no-store" }).then(r => {
        if (!r.ok) throw 0;
        localStorage.setItem("swiftsite_cloud", u); $("#c-line").value = `const CLOUD_DB_URL_FILE = "${u}";`;
        toast("Connected ✓ — now press Save Changes, then do Step 3");
      }).catch(() => toast("Could not connect — check URL / database rules"));
    }
    if (t.id === "c-blob"){
      toast("Creating cloud storage…");
      fetch("https://jsonblob.com/api/jsonBlob", { method:"POST", headers:{ "Content-Type":"application/json", "Accept":"application/json" }, body:JSON.stringify({ savedAt:0 }) })
        .then(r => { if (!r.ok) throw 0; const id = r.headers.get("x-jsonblob-id") || (r.headers.get("location") || "").split("/").pop(); if (!id) throw 0; return "https://jsonblob.com/api/jsonBlob/" + id; })
        .then(u => { localStorage.setItem("swiftsite_cloud", u); $("#c-url").value = u; $("#c-line").value = `const CLOUD_DB_URL_FILE = "${u}";`; toast("Cloud created ✓ — press Save Changes, then Step 3"); })
        .catch(() => toast("Auto-create failed — use the Firebase option (see README)"));
    }
    if (t.id === "b-test"){
      const msg = $("#b-test-msg"); msg.textContent = "Testing…";
      askGemini([{ role:"user", parts:[{ text:"Reply with only: OK" }] }], $("#b-key").value.trim(), $("#b-model").value, "Reply briefly.")
        .then(() => msg.textContent = "🟢 Key works!")
        .catch(err => msg.textContent = "🔴 " + err.message);
    }
    if (t.id === "b-add"){ $("#b-faqs").insertAdjacentHTML("beforeend", faqRow()); $("#b-faqs .a-faq:last-child input").focus(); }
    if (t.hasAttribute("data-faqdel")) t.closest(".a-faq").remove();
    if (t.dataset.botdel) $("#" + t.dataset.botdel).value = "";
  };
  // Price auto conversion PKR <-> USD
  p.oninput = e => {
    const rate = Number($("#a-rate").value) || 280;
    const inp = e.target.closest("[data-price]");
    if (inp){
      const other = $(`[data-price="${inp.dataset.price}"][data-cur="${inp.dataset.cur === "pk" ? "us" : "pk"}"]`, p);
      const v = Number(inp.value.replace(/[^\d.]/g, ""));
      if (!inp.value.trim() || !v){ other.value = ""; return; }
      other.value = inp.dataset.cur === "pk" ? Math.max(1, Math.round(v / rate)) : Math.round(v * rate / 100) * 100;
    }
    if (e.target.id === "a-rate"){
      $$('[data-cur="us"][data-price]', p).forEach(us => {
        const pk = $(`[data-price="${us.dataset.price}"][data-cur="pk"]`, p);
        if (Number(us.value)) pk.value = Math.round(us.value * rate / 100) * 100;
      });
    }
  };
  // Project preview images (compressed to JPEG ~900px to fit localStorage)
  p.onchange = e => {
    // Home / About photo (shrunk to ~700px JPEG so the cloud save stays small)
    const si = e.target.closest("[data-siteimg]");
    if (si){
      const file = si.files[0], key = si.dataset.siteimg; si.value = "";
      if (!file) return;
      const fr = new FileReader();
      fr.onload = () => {
        const im = new Image();
        im.onerror = () => toast("This image could not be opened — try a JPG or PNG.");
        im.onload = () => {
          const k = Math.min(1, 700 / Math.max(im.width, im.height)), c = document.createElement("canvas");
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          const ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(im, 0, 0, c.width, c.height);
          draft[key] = c.toDataURL("image/jpeg", .8);
          const pv = $(`[data-siteprev="${key}"]`, p); pv.style.cssText = "width:100%;height:100%;object-fit:cover"; pv.src = draft[key];
          $(`[data-imgurl="${key}"]`, p).value = "";
          toast("Image ready — press Save Changes");
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
      return;
    }
    const inp = e.target.closest("[data-projimg]"); if (!inp || !inp.files[0]) return;
    const id = inp.dataset.projimg, r = new FileReader();
    r.onload = () => { const img = new Image(); img.onload = () => {
      const k = Math.min(1, 900 / img.width), c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      draft.images = draft.images || {}; draft.images[id] = c.toDataURL("image/jpeg", .72);
      const th = $(`[data-thumb="${id}"]`, p); th.src = draft.images[id]; th.style.opacity = 1;
      toast("Image added — press Save Changes");
    }; img.src = r.result; };
    r.readAsDataURL(inp.files[0]);
    inp.value = "";
  };
  $("#a-logo-file").addEventListener("change", e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Downscale to 320px to keep storage small; keeps aspect ratio (no stretching)
      const img = new Image();
      img.onload = () => {
        const S = 200, c = document.createElement("canvas"); c.width = c.height = S;
        const ctx = c.getContext("2d"), k = Math.min(S / img.width, S / img.height);
        const w = img.width * k, h = img.height * k;
        ctx.drawImage(img, (S - w) / 2, (S - h) / 2, w, h);
        draft.logo = c.toDataURL("image/png");
        $("#a-logo-prev").src = draft.logo; $("#a-logo-url").value = "";
        toast("Logo ready — press Save Changes");
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  const save = async () => {
    $$("[data-k]", p).forEach(i => draft[i.dataset.k] = i.value.trim());
    const url = $("#a-logo-url").value.trim();
    const pageLink = v => /^https?:\/\/(www\.)?postimg\.cc\//i.test(v);
    if (pageLink(url) || $$("[data-imgurl]", p).some(i => pageLink(i.value.trim()))){
      toast("That postimg link is a page, not the picture. Right-click the picture → Copy image address (https://i.postimg.cc/…)");
      return;
    }
    if (url) draft.logo = url;
    $$("[data-imgurl]", p).forEach(i => {
      const v = i.value.trim(), k = i.dataset.imgurl;
      if (/^https?:\/\//i.test(v)) draft[k] = v;
      else if (!v && /^https?:/i.test(draft[k] || "")) draft[k] = "";   // link box emptied = image removed
    });
    draft.prices = {};
    $$("[data-price]", p).forEach(i => { const v = i.value.trim(); if (!v) return; (draft.prices[i.dataset.price] ||= {})[i.dataset.cur] = v.replace(/[^\d.]/g,"") || v; });
    draft.links = {};
    $$("[data-link]", p).forEach(i => { const v = i.value.trim(); if (!v) return; if (!/^https?:\/\//i.test(v)) return; (draft.links[i.dataset.link] ||= {})[i.dataset.t] = v; });
    const np = $("#a-newpass").value; if (np) draft.adminPass = np;
    draft.rate = Number($("#a-rate").value) || 280;
    draft.bot = {
      enabled: $("#b-on").checked,
      name: $("#b-name").value.trim() || "Swifty",
      greeting: $("#b-greet").value.trim(),
      contact: $("#b-contact").value.trim(),
      geminiKey: $("#b-key").value.trim(),
      model: $("#b-model").value,
      faqs: $$("#b-faqs .a-faq").map(r => ({ k: $('[data-fq="k"]', r).value.trim(), a: $('[data-fq="a"]', r).value.trim() })).filter(f => f.k && f.a)
    };
    draft.savedAt = Date.now();
    const okLocal = Store.set(draft);
    const pub = { ...draft }; delete pub.adminPass;   // never publish the password
    let cloud = false;
    if (CLOUD_DB_URL){
      toast("Saving to cloud…");
      try { const r = await cloudPut(JSON.stringify(pub)); cloud = r.ok; } catch {}
    }
    if (!CLOUD_DB_URL && !localStorage.getItem("swiftsite_cloud")){
      toast("Creating cloud storage…");
      try {
        const r = await fetch("https://jsonblob.com/api/jsonBlob", { method:"POST", headers:{ "Content-Type":"application/json", "Accept":"application/json" }, body:JSON.stringify(pub) });
        const id = r.ok && (r.headers.get("x-jsonblob-id") || (r.headers.get("location") || "").split("/").pop());
        if (id){ localStorage.setItem("swiftsite_cloud", "https://jsonblob.com/api/jsonBlob/" + id); }
      } catch {}
    }
    if (!CLOUD_DB_URL && localStorage.getItem("swiftsite_cloud")){ try { cloud = (await cloudPut(JSON.stringify(pub), localStorage.getItem("swiftsite_cloud"))).ok; } catch {} }
    if (cloud && !CLOUD_DB_URL_FILE){
      const line = `const CLOUD_DB_URL_FILE = "${localStorage.getItem("swiftsite_cloud") || CLOUD_DB_URL}";`;
      $$(".a-tabs button", p).forEach(b => b.classList.toggle("on", b.dataset.tab === "cloud"));
      $$(".a-sec", p).forEach(s => s.classList.toggle("on", s.dataset.sec === "cloud"));
      $("#c-line").value = line; $("#c-line").select();
      toast("Saved to cloud ✓ — copy the line and send it to your developer");
      return;
    }
    if (cloud){
      // verify by reading it back
      try { const chk = await readJSON(await fetch(cloudURL() + "?t=" + Date.now(), { cache:"no-store" })); cloud = chk && chk.savedAt === draft.savedAt; } catch { cloud = false; }
    }
    if (cloud) toast("Saved ✓ — live for every visitor on every device 🌍");
    else if (okLocal) toast(CLOUD_DB_URL ? "Cloud save failed — saved on this device only" : "Saved on this device only — connect cloud (README) for everyone");
    else { toast("Could not save — image files may be too large."); return; }
    setTimeout(() => location.reload(), 1600);
  };
}

function initAdmin(){
  // Hidden admin: there is no button on the website.
  // Open with Windows + Ctrl + Shift + M, or by adding #admin to the address (phones).
  let winKey = false;
  const viaHash = () => {
    if (location.hash !== "#admin") return;
    history.replaceState(null, "", location.pathname + location.search);   // so #admin works again next time
    openAdmin();
  };
  document.addEventListener("keydown", e => {
    if (e.key === "Meta" || e.key === "OS"){ winKey = true; return; }
    const win = e.metaKey || winKey || (e.getModifierState && (e.getModifierState("Meta") || e.getModifierState("OS")));
    if (win && e.ctrlKey && e.shiftKey && (e.code === "KeyM" || String(e.key).toLowerCase() === "m")){ e.preventDefault(); openAdmin(); }
  });
  document.addEventListener("keyup", e => { if (e.key === "Meta" || e.key === "OS") winKey = false; });
  addEventListener("blur", () => { winKey = false; });
  addEventListener("hashchange", viaHash);
  viaHash();
}
// Keep other open tabs in sync when admin saves
addEventListener("storage", e => { if (e.key === KEY) location.reload(); });

/* ---------- AI CHATBOT (rule-based, bilingual: English + Roman Urdu) ---------- */
const URDU_WORDS = ["kya","kia","hai","hain","ha","ho","kaise","kese","kaisy","kahan","kidhar","mein","ma","me","karo","kro","karna","krna","bhai","jani","yar","yaar","yr","aap","ap","apka","apki","tum","kitna","kitne","kitni","batao","btao","bata","chahiye","chaiye","nahi","nhi","han","haan","kon","kaun","kab","kyun","kyu","sakta","skta","sakte","salam","assalam","aoa","walaikum","shukriya","shukria","acha","achaa","theek","thik","mujhe","mjhe","hum","banwana","banana","bnana","wala","wali","paise","rupay","rupees","sirf","abhi","abi"];
const isUrdu = t => { const w = t.toLowerCase().match(/[a-z]+/g) || []; return w.filter(x => URDU_WORDS.includes(x)).length >= 1; };
const has = (t, arr) => arr.some(k => t.includes(k));
const pg = (href, label) => `<a href="${href}">${label}</a>`;

function botReply(raw){
  const t = " " + raw.toLowerCase().trim() + " ";
  const ur = isUrdu(raw);
  const B = { ...DEFAULTS.bot, ...(CFG.bot || {}) };
  const L = (en, u) => ur ? u : en;
  const ig = CFG.instagram ? `<a href="${esc(CFG.instagram)}" target="_blank" rel="noopener">Instagram @${esc(igHandle())}</a>` : "Instagram";

  // 1. custom admin answers
  for (const f of B.faqs || []){
    const keys = f.k.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
    if (keys.some(k => t.includes(k))) return { text: esc(f.a) };
  }
  // 2. built-in intents
  if (has(t, ["contact","rabta","raabta","whatsapp","whatsap","email","e-mail","gmail","phone","number","call","reach","message kar","msg","dm","kahan baat","baat kar","kese milo","instagram","insta"])){
    if (B.contact) return { text: esc(B.contact), links: CFG.instagram ? [[CFG.instagram,"Open Instagram ↗",1]] : [] };
    return { text: L(
      `Right now you can contact SwiftSite only through ${ig}. 📩\nWhatsApp, email and phone are coming soon — sir will add them later.`,
      `Abhi tak aap sirf ${ig} par hi contact kar sakte hain. 📩\nWhatsApp, email aur phone baad mein sir add kar denge — baaki sab jald aa raha hai.`),
      links: CFG.instagram ? [[CFG.instagram,"Open Instagram ↗",1],["contact.html","Contact page"]] : [["contact.html","Contact page"]] };
  }
  if (has(t, [" hi "," hello"," hey","salam","assalam"," aoa ","good morning","good evening"," hy "])) return { text: L(
    `Hello! 👋 I'm ${esc(B.name)}, SwiftSite's assistant. Ask me about services, projects, skills, pricing or how to get in touch.`,
    `Walaikum Assalam! 👋 Main ${esc(B.name)} hoon, SwiftSite ka assistant. Services, projects, skills, price ya contact — jo poochna hai poochiye.`) };
  if (has(t, ["price","pricing","cost","rate","charges","kitna","kitne","paise","budget","fee","rupay","rupees","dollar","usd","pkr"])){
    const set = SERVICES.filter(s => CFG.prices[s.id] && (CFG.prices[s.id].pk || CFG.prices[s.id].us));
    const list = set.map(s => { const p = CFG.prices[s.id]; return `• ${s.name}: ${p.pk ? "Rs " + Number(p.pk).toLocaleString("en-PK") : "—"} / ${p.us ? "$" + p.us : "—"}`; }).join("\n");
    return { text: set.length ? L(`Starting prices (Pakistan / USA):\n${list}\n\nFinal price depends on project scope — send details on ${ig}.`, `Starting prices (Pakistan / USA):\n${list}\n\nFinal price project ke scope par depend karti hai — details ${ig} par bhejein.`)
      : L(`Pricing depends on the project scope, so every quote is custom. You can switch between 🇵🇰 Pakistan and 🇺🇸 USA pricing on the Services page, or send your idea on ${ig} for a quote.`,
          `Price project ke scope par depend karti hai, har quote custom hota hai. Services page par 🇵🇰 Pakistan aur 🇺🇸 USA pricing dekh sakte hain, ya apna idea ${ig} par bhej kar quote le lein.`),
      links:[["services.html","Services & pricing"]] };
  }
  if (has(t, ["wordpress"," wp "])) return { text: L("Yes — SwiftSite builds WordPress business websites, landing pages and custom responsive WordPress solutions.","Ji haan — SwiftSite WordPress business websites, landing pages aur custom responsive WordPress solutions banata hai."), links:[["services.html","Services"]] };
  if (has(t, ["chatbot","ai ","a.i","artificial","rag","llm","gpt","voice","assistant","automation","automate"])) return { text: L("SwiftSite builds AI applications: assistants, chat systems, voice interfaces, RAG apps, AI API integrations and Python automation. This chat itself is a small example 🙂","SwiftSite AI applications banata hai: assistants, chat systems, voice interfaces, RAG apps, AI API integrations aur Python automation. Yeh chat bhi ek chhoti si example hai 🙂"), links:[["services.html","AI services"],["projects.html","AI projects"]] };
  if (has(t, ["ecommerce","e-commerce","online store","shop","store","dukaan"])) return { text: L("E-commerce is one of the services: product websites, shopping experiences, admin panels and backend systems.","E-commerce bhi service mein shamil hai: product websites, shopping experience, admin panels aur backend systems."), links:[["services.html","E-Commerce"]] };
  if (has(t, ["service","offer","kya karte","kya banate","build","banwana","banana","bnana","website chahiye","website bana","app bana","kaam"])) return { text: L(
    "SwiftSite offers 8 services:\n• Frontend Development\n• Backend Development\n• Full-Stack Applications\n• WordPress\n• AI Applications\n• E-Commerce\n• Automation\n• Cloud & Deployment",
    "SwiftSite ki 8 services hain:\n• Frontend Development\n• Backend Development\n• Full-Stack Applications\n• WordPress\n• AI Applications\n• E-Commerce\n• Automation\n• Cloud & Deployment"), links:[["services.html","View services"]] };
  if (has(t, ["project","portfolio","work","kaam dikhao","example","demo","sample"])) return { text: L(
    "There are 10 projects & concepts — business website, e-commerce, admin dashboard, AI assistant, voice assistant, SaaS, automation, REST API, school management and a restaurant site. They're concepts/demos, not client work, and live links are coming soon.",
    "10 projects & concepts hain — business website, e-commerce, admin dashboard, AI assistant, voice assistant, SaaS, automation, REST API, school management aur restaurant website. Yeh concepts/demos hain, client work nahi, live links jald aayenge."), links:[["projects.html","View projects"]] };
  if (has(t, ["skill","technology","tech","stack","language","python","react","javascript","node","django","fastapi","sql","docker","aws"])) return { text: L(
    "Stack: HTML, CSS, JavaScript, TypeScript, React, Next.js • Python, FastAPI, Django • Node.js, Express • PostgreSQL, MySQL, MongoDB, Redis • Docker, Nginx, AWS, CI/CD • AI/ML, LLMs, RAG • Web security.",
    "Stack: HTML, CSS, JavaScript, TypeScript, React, Next.js • Python, FastAPI, Django • Node.js, Express • PostgreSQL, MySQL, MongoDB, Redis • Docker, Nginx, AWS, CI/CD • AI/ML, LLMs, RAG • Web security."), links:[["about.html","Full skills"]] };
  if (has(t, ["who","owner","about","kon ho","kaun","developer","harry","mharryjs","swiftsite kya"])) return { text: L(
    "SwiftSite is the personal studio of Mharryjs — a full-stack developer building modern websites, web apps and AI tools. Tagline: Modern Websites • Smart Solutions.",
    "SwiftSite Mharryjs ka personal studio hai — ek full-stack developer jo modern websites, web apps aur AI tools banata hai. Tagline: Modern Websites • Smart Solutions."), links:[["about.html","About"]] };
  if (has(t, ["time","how long","deadline","kitne din","kab tak","delivery","days"])) return { text: L(`Timeline depends on the scope — a landing page is quick, a full-stack app takes longer. Share your requirements on ${ig} for an honest estimate.`, `Time scope par depend karta hai — landing page jaldi ban jata hai, full-stack app mein zyada time lagta hai. Apni requirements ${ig} par bhejein, sahi estimate mil jayega.`) };
  if (has(t, ["location","where","kahan se","city","pakistan","country","based"])) return { text: L("Location details are coming soon. SwiftSite works with clients in Pakistan and worldwide (USA pricing available).","Location details jald aayengi. SwiftSite Pakistan aur worldwide clients ke saath kaam karta hai (USA pricing bhi available hai).") };
  if (has(t, ["hire","start","project start","work together","order","book","shuru"])) return { text: L(`Great! 🎉 Send your idea, budget and timeline on ${ig} — or fill the form on the Contact page.`, `Zabardast! 🎉 Apna idea, budget aur timeline ${ig} par bhej dein — ya Contact page ka form fill kar dein.`), links:[["contact.html","Contact"]] };
  if (has(t, ["thank","thanks","shukriya","shukria","jazak"])) return { text: L("You're welcome! 😊 Anything else?","Koi baat nahi! 😊 Aur kuch poochna hai?") };
  if (has(t, ["bye","allah hafiz","khuda hafiz","goodbye"])) return { text: L("Goodbye! Hope to build something great with you. ✨","Allah Hafiz! Umeed hai jald saath kaam karenge. ✨") };
  if (has(t, ["admin","password","pin"])) return { text: L("Sorry, I can't share anything about the admin area. 🔒","Maaf kijiye, admin ke baare mein kuch share nahi kar sakta. 🔒") };
  return { text: L(
    `I'm not sure about that yet. I can help with services, projects, skills, pricing or contact. For anything else, message on ${ig}.`,
    `Is baare mein abhi pakka nahi bata sakta. Main services, projects, skills, price ya contact mein madad kar sakta hoon. Baaki sawal ${ig} par pooch lein.`) };
}

/* Gemini API (Google Generative Language REST) */
async function askGemini(contents, key, model, system){
  if (!key) throw new Error("No API key");
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model || "gemini-2.5-flash")}:generateContent`, {
    method:"POST",
    headers:{ "Content-Type":"application/json", "x-goog-api-key":key },
    body: JSON.stringify({ systemInstruction:{ parts:[{ text:system }] }, contents, generationConfig:{ temperature:.7, maxOutputTokens:700 } })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data.error && data.error.message) || `HTTP ${r.status}`);
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
  if (!text) throw new Error("Empty response");
  return text;
}
function siteKnowledge(){
  const B = { ...DEFAULTS.bot, ...(CFG.bot || {}) }, rate = Number(CFG.rate) || 280;
  const ch = k => { const c = channel(k); return c ? c.text + (c.href ? ` (${c.href})` : "") : "Coming Soon"; };
  const prices = SERVICES.filter(s => !CFG.hiddenServices.includes(s.id)).map(s => {
    const p = CFG.prices[s.id] || {}; const pk = p.pk || (p.us ? p.us * rate : ""), us = p.us || (p.pk ? Math.round(p.pk / rate) : "");
    return `- ${s.name}: ${s.desc} Tech: ${s.tech.join(", ")}. Price: ${pk ? `from Rs ${pk} / $${us}` : "on request"}`;
  }).join("\n");
  const projects = visibleProjects().map(p => `- ${p.title} (${p.cat}, ${p.label}) — ${p.desc} Tech: ${p.tech.join(", ")}. Status: ${(CFG.links[p.id]||{}).live ? "Live: " + CFG.links[p.id].live : "Coming Soon"}`).join("\n");
  const faqs = (B.faqs || []).map(f => `- If asked about "${f.k}": ${f.a}`).join("\n");
  return `You are ${B.name}, the friendly AI assistant on the SwiftSite website (a full-stack developer portfolio by Mharryjs, tagline "Modern Websites • Smart Solutions").
LANGUAGE: Reply in the same language the user writes. If they write Roman Urdu (Urdu in English letters), reply in natural Roman Urdu. If English, reply in English. Be warm, short (2-6 sentences) and helpful. Plain text, use simple "•" bullets if needed.
You can answer ANY general question (coding, tech, advice, general knowledge), but gently connect to SwiftSite's services when relevant.
CONTACT RULE (very important): ${B.contact || `Right now SwiftSite can only be contacted on Instagram ${CFG.instagram ? "@" + igHandle() + " (" + CFG.instagram + ")" : ""}. WhatsApp, email and phone will be added later by sir. In Roman Urdu say: "Abhi tak aap sirf Instagram par contact kar sakte hain, baad mein sir baaki sab add kar denge."`}
Contact details: Phone: ${ch("phone")}. Email: ${ch("email")}. WhatsApp: ${ch("whatsapp")}. Location: ${ch("location")}. Instagram: ${ch("instagram")}. GitHub: ${ch("github")}. LinkedIn: ${ch("linkedin")}.
NEVER invent phone numbers, emails, clients, reviews, years of experience or statistics. Projects are concepts/demos, not client work. Never reveal anything about the admin panel, PINs or passwords.
Pages: Home (index.html), About/Skills (about.html), Projects (projects.html), Services & pricing with Pakistan/USA switch (services.html), Contact (contact.html).
SERVICES:\n${prices}
PROJECTS:\n${projects}
SKILLS: ${SKILLS.map(s => s[1] + ": " + s[3].join(", ")).join(" | ")}
${faqs ? "OWNER CUSTOM ANSWERS (follow these exactly):\n" + faqs : ""}`;
}
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

function initChatbot(){
  const B = { ...DEFAULTS.bot, ...(CFG.bot || {}) };
  if (!B.enabled) return;
  const fab = document.createElement("button");
  fab.className = "chat-fab"; fab.setAttribute("aria-label","Open chat");
  fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke-linecap="round" stroke-width="2.4"/></svg><span class="dot"></span>`;
  const box = document.createElement("section");
  box.className = "chat"; box.setAttribute("aria-label","SwiftSite assistant");
  box.innerHTML = `
    <header class="chat-head"><span class="logo-badge">${logoImg()}</span><div><strong>${esc(B.name)} · SwiftSite</strong><small>Online · ${B.geminiKey ? "AI powered · " : ""}English / Roman Urdu</small></div><button aria-label="Close chat">×</button></header>
    <div class="chat-body" aria-live="polite"></div>
    <div class="chips">${["Services","Price kya hai?","Contact kahan karein?","Projects","Skills","Who is SwiftSite?"].map(c=>`<button>${c}</button>`).join("")}</div>
    <form class="chat-form"><input placeholder="Type in English or Roman Urdu…" aria-label="Message" maxlength="400"><button aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2-6z"/></svg></button></form>
    <div class="chat-note">Automated assistant · answers about SwiftSite only</div>`;
  document.body.append(box, fab);
  const body = $(".chat-body", box), input = $("input", box);

  const add = (html, who, links) => {
    const b = document.createElement("div"); b.className = "bubble " + who; b.innerHTML = html;
    if (links && links.length) b.insertAdjacentHTML("beforeend", `<div class="links">${links.map(([h,l,ext]) => `<a href="${esc(h)}" ${ext?'target="_blank" rel="noopener"':""}>${l}</a>`).join("")}</div>`);
    body.append(b); body.scrollTop = body.scrollHeight;
  };
  const ask = q => {
    q = q.trim(); if (!q) return;
    add(esc(q), "me");
    const typing = document.createElement("div"); typing.className = "bubble bot typing"; typing.innerHTML = "<i></i><i></i><i></i>";
    body.append(typing); body.scrollTop = body.scrollHeight;
    const r = botReply(q);
    const fallback = () => setTimeout(() => { typing.remove(); add(r.text, "bot", r.links); history.push({ role:"model", parts:[{ text:r.text.replace(/<[^>]+>/g,"") }] }); }, 500 + Math.min(900, r.text.length * 4));
    history.push({ role:"user", parts:[{ text:q }] });
    if (!B.geminiKey) return fallback();
    askGemini(history.slice(-12), B.geminiKey, B.model, siteKnowledge())
      .then(text => { typing.remove(); add(fmt(text), "bot", r.links); history.push({ role:"model", parts:[{ text }] }); })
      .catch(() => { history.pop(); history.push({ role:"user", parts:[{ text:q }] }); fallback(); });
  };
  const history = [];
  let greeted = false;
  const toggle = open => {
    document.body.classList.toggle("chat-open", open);
    if (open && !greeted){
      greeted = true;
      add(B.greeting ? esc(B.greeting) : `Assalam o Alaikum! 👋 I'm <strong>${esc(B.name)}</strong>, SwiftSite's assistant.\nAsk me anything about the website — English ya Roman Urdu, dono chalegi.`, "bot");
    }
    if (open) setTimeout(() => input.focus(), 300);
  };
  fab.addEventListener("click", () => toggle(!document.body.classList.contains("chat-open")));
  $(".chat-head button", box).addEventListener("click", () => toggle(false));
  $(".chips", box).addEventListener("click", e => { const b = e.target.closest("button"); if (b) ask(b.textContent); });
  $("form", box).addEventListener("submit", e => { e.preventDefault(); ask(input.value); input.value = ""; });
}

/* ---------- REMOTE CONFIG (makes admin changes visible everywhere) ---------- */
async function loadRemote(){
  const get = async url => {
    const c = new AbortController(), t = setTimeout(() => c.abort(), 3000);
    try { const r = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), { cache:"no-store", signal:c.signal }); return r.ok ? await readJSON(r) : null; }
    catch { return null; } finally { clearTimeout(t); }
  };
  let remote = CLOUD_DB_URL ? await get(cloudURL()) : null;
  if (!remote || !remote.savedAt) remote = await get("site-config.json");
  if (!remote || typeof remote !== "object" || !remote.savedAt) return;
  const local = Store.get();
  if ((local.savedAt || 0) > (remote.savedAt || 0) && !CLOUD_DB_URL) return; // owner's newer local draft
  CFG = { ...DEFAULTS, ...remote, adminPass: local.adminPass,
    prices: remote.prices || {}, links: remote.links || {}, images: remote.images || {},
    hidden: remote.hidden || [], hiddenServices: remote.hiddenServices || [],
    bot: { ...DEFAULTS.bot, ...(remote.bot || {}), faqs: (remote.bot && remote.bot.faqs) || [] } };
}

/* ---------- BOOT ---------- */
function boot(){
renderLayout();
refreshLogos();
applyImages();
initNav();
initMarquee();
initSkills();
initProjects();
initServices();
initContact();
initReveal();
initScroll3D();
initHeroStage();
initTilt();
initAdmin();
initChatbot();
}
loadRemote().catch(() => {}).finally(() => { try { boot(); } catch (err) { console.error("SwiftSite boot error:", err); } finally { ready(); } });

// Visitors already on the page get admin changes automatically (checks every 45s)
if (CLOUD_DB_URL){
  setInterval(async () => {
    if (document.hidden || $("#admin-modal.open")) return;
    try {
      const r = await fetch(cloudURL() + "?t=" + Date.now(), { cache:"no-store" }); if (!r.ok) return;
      const d = await readJSON(r);
      if (d && d.savedAt && d.savedAt > (CFG.savedAt || 0)) location.reload();
    } catch {}
  }, 45000);
}

const loader = $(".loader");
function ready(){ document.body.classList.add("is-ready"); if (loader) setTimeout(() => loader.classList.add("done"), 250); }
setTimeout(ready, 4000); // safety: never keep the page hidden
})();
