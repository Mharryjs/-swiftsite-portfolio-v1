/* =========================================================
   SwiftSite portfolio (friend site) — script.js
   Shared by: index, about, services, projects, contact, admin
   Cloud storage here is SEPARATE from the other SwiftSite.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. SETTINGS + CLOUD ---------- */
  var CLOUD = "https://textdb.dev/api/data/swiftsite-portfolio-friend-9d4e2b71-c6a8-4f13-b5e0-2a7f81c3d946";
  var KEY = "ss_friend_cfg_v1";
  var PHOTO = "https://i.postimg.cc/HW78RRv3/Mharryjs.jpg"; // original portrait (Home + About)
  var GITHUB = "https://github.com/Mharryjs";
  var PAGE = document.body.getAttribute("data-page") || "";
  function px(id) { return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id + ".jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"; }

  var SERVICES = [["web", "Website Development"], ["ai", "AI Integration"], ["ecom", "E-Commerce Solutions"], ["ui", "UI/UX Design"], ["perf", "Performance Optimization"], ["maint", "Website Maintenance"]];

  var DEFAULTS = {
    v: 2, savedAt: 0,
    logo: "", photoHome: "", photoAbout: "",          // "" = built-in SS logo / original portrait
    brand: "SwiftSite", name: "Mharry JS", role: "Full-Stack Developer", location: "Pakistan",
    email: "sswiftsite@gmail.com", phone: "0313 3073742", whatsapp: "923133073742",
    github: GITHUB, instagram: "", linkedin: "",
    heroTitle: "I'M Mharryjs", heroRole: "Deep Learning Engineer",
    heroDesc: "I build stunning, high-performance websites and digital experiences that drive results.",
    aboutText: "A passionate Full-Stack Web Developer and AI Integration Specialist based in Pakistan, working under the SwiftSite brand to deliver cutting-edge digital solutions.",
    rate: 280,
    prices: { web: { us: "150", pk: "" }, ai: { us: "300", pk: "" }, ecom: { us: "400", pk: "" }, ui: { us: "120", pk: "" }, perf: { us: "100", pk: "" }, maint: { us: "50", pk: "" } },
    projects: [
      { id: "p1", title: "Business Landing Page", cat: "web", desc: "A high-converting landing page for a tech startup with animations and lead capture forms.", tech: ["HTML", "CSS", "JS"], img: px(7181184), demo: "", github: GITHUB },
      { id: "p2", title: "AI Customer Support Bot", cat: "ai", desc: "An intelligent chatbot integrated into a business website using OpenAI API for 24/7 support.", tech: ["React", "Node.js", "OpenAI"], img: px(16380905), demo: "", github: GITHUB },
      { id: "p3", title: "Online Fashion Store", cat: "ecom", desc: "A complete e-commerce platform with cart, checkout, payment gateway, and admin dashboard.", tech: ["React", "MongoDB", "Stripe"], img: px(6956903), demo: "", github: GITHUB },
      { id: "p4", title: "Restaurant Website", cat: "web", desc: "Modern restaurant website with online reservation system, menu display, and contact forms.", tech: ["HTML", "CSS", "PHP"], img: px(12181619), demo: "", github: GITHUB },
      { id: "p5", title: "AI Content Generator", cat: "ai", desc: "Web app that generates SEO-optimized blog posts, product descriptions, and social media content.", tech: ["Python", "FastAPI", "GPT-4"], img: px(1229860), demo: "", github: GITHUB },
      { id: "p6", title: "Electronics Shop", cat: "ecom", desc: "Feature-rich electronics e-commerce store with product comparisons and review system.", tech: ["React", "Node.js", "MySQL"], img: px(29502371), demo: "", github: GITHUB }
    ],
    bot: { enabled: true, name: "Swifty", greeting: "", contact: "", faqs: [] }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* Saved data + defaults -> one complete settings object */
  function merge(d) {
    d = (d && typeof d === "object") ? d : {};
    var c = Object.assign(clone(DEFAULTS), d);
    c.bot = Object.assign(clone(DEFAULTS.bot), d.bot || {});
    if (!Array.isArray(c.bot.faqs)) c.bot.faqs = [];
    c.prices = Object.assign(clone(DEFAULTS.prices), d.prices || {});
    if (!Array.isArray(c.projects)) c.projects = clone(DEFAULTS.projects);
    // Data saved by the first admin version: restore the original images / GitHub links once
    if (!d.v && Array.isArray(d.projects)) {
      c.projects.forEach(function (p) {
        var def = DEFAULTS.projects.filter(function (x) { return x.id === p.id; })[0];
        if (def) { if (!p.img) p.img = def.img; if (!p.github) p.github = def.github; }
      });
    }
    if (c.name === "Mharryjs") c.name = DEFAULTS.name;
    if (!c.savedAt && d.ts) c.savedAt = d.ts;          // data written by the earlier cloud-sync.js
    if (d.photo && d.photo !== PHOTO) { if (!c.photoHome) c.photoHome = d.photo; if (!c.photoAbout) c.photoAbout = d.photo; }
    delete c.photo;
    c.v = 2;
    return c;
  }

  function parse(t) { try { return JSON.parse(t); } catch (e) { return null; } }
  function cloudGet() {
    return fetch(CLOUD + "?t=" + Date.now(), { cache: "no-store" }).then(function (r) {
      if (r.status === 404) return null;                 // nothing saved yet
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text().then(parse);
    });
  }
  function cloudPut(data) {
    var body = typeof data === "string" ? data : JSON.stringify(data);
    // text/plain = simple request, so the browser sends no CORS preflight
    return fetch(CLOUD, { method: "POST", headers: { "Content-Type": "text/plain" }, body: body })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return true; });
  }

  var toastTimer = null;
  window.showToast = function (msg, type) {
    var t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.className = "toast show " + (type || "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, type === "error" ? 8000 : 3800);
  };

  window.SSCloud = { get: cloudGet, put: cloudPut, merge: merge, KEY: KEY, PHOTO: PHOTO, SERVICES: SERVICES };
  if (PAGE === "admin") return;          // admin.html only needs the data layer above

  /* ---------- 2. HELPERS ---------- */
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safeUrl(u) { u = String(u || "").trim(); return /^https?:\/\//i.test(u) ? u : ""; }
  function imgUrl(u) { u = String(u || "").trim(); return /^(https?:\/\/|data:image\/)/i.test(u) ? u : ""; }
  function num(v) { var n = parseFloat(String(v == null ? "" : v).replace(/[^\d.]/g, "")); return isFinite(n) && n > 0 ? n : 0; }

  var CFG = merge((function () { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } })());

  /* ---------- 3. PROJECTS ---------- */
  var CAT = { web: "Web", ai: "AI", ecom: "E-Commerce" }, EMO = { web: "💼", ai: "🤖", ecom: "🛍️" };
  var currentFilter = "all";
  function renderProjects(filter) {
    if (filter) currentFilter = filter;
    var grid = document.getElementById("projectsGrid"); if (!grid) return;
    var list = (CFG.projects || []).filter(function (p) { return currentFilter === "all" || p.cat === currentFilter; });
    if (!list.length) { grid.innerHTML = '<div class="empty-projects">📭 No projects here yet.</div>'; return; }
    grid.innerHTML = list.map(function (p) {
      var img = imgUrl(p.img), demo = safeUrl(p.demo), gh = safeUrl(p.github);
      return '<article class="project-card">' +
        '<div class="project-thumb thumb-' + (CAT[p.cat] ? p.cat : "web") + '"><span class="project-cat">' + (CAT[p.cat] || "Project") + "</span>" +
          '<span class="p-emoji">' + (EMO[p.cat] || "🚀") + "</span>" +
          (img ? '<img src="' + esc(img) + '" alt="' + esc(p.title) + '" loading="lazy" onerror="this.remove()">' : "") + "</div>" +
        '<div class="project-body"><h3>' + esc(p.title) + "</h3><p>" + esc(p.desc) + "</p>" +
          '<div class="project-tech">' + (p.tech || []).map(function (t) { return '<span class="tech-tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<div class="project-links">' +
            (demo ? '<a class="btn-demo" href="' + esc(demo) + '" target="_blank" rel="noopener">🚀 Demo</a>'
                  : '<button class="btn-demo" type="button" data-soon>🚀 Demo · Coming Soon</button>') +
            (gh ? '<a class="btn-github" href="' + esc(gh) + '" target="_blank" rel="noopener">GitHub</a>' : "") +
          "</div></div></article>";
    }).join("");
  }

  /* ---------- 4. PRICES (Pakistan / USA) ---------- */
  var cur = "us";
  try { cur = localStorage.getItem("ss_cur") === "pk" ? "pk" : "us"; } catch (e) {}
  function bothPrices(id) {
    var p = (CFG.prices || {})[id] || {}, rate = Number(CFG.rate) || 280, us = num(p.us), pk = num(p.pk);
    if (!pk && us) pk = Math.round(us * rate / 100) * 100;
    if (!us && pk) us = Math.max(1, Math.round(pk / rate));
    return { us: us, pk: pk };
  }
  function renderPrices() {
    each("#priceSwitch button", function (b) { b.classList.toggle("on", b.getAttribute("data-cur") === cur); });
    each("[data-price]", function (el) {
      var p = bothPrices(el.getAttribute("data-price")), v = cur === "pk" ? p.pk : p.us, suffix = el.getAttribute("data-suffix") || "";
      el.innerHTML = v ? "Starting at <strong>" + (cur === "pk" ? "Rs " + v.toLocaleString("en-PK") : "$" + v.toLocaleString("en-US")) + esc(suffix) + "</strong>"
                       : "<strong>Price on request</strong>";
    });
  }

  /* ---------- 5. CHATBOT (rule based: English + Roman Urdu) ---------- */
  var UR = "kya kia hai hain ha ho kaise kese kahan kidhar mein karo kro karna bhai jani yar yaar aap ap apka kitna kitne kitni batao btao chahiye chaiye nahi nhi kon kaun kab kyun sakta skta salam assalam aoa shukriya shukria mujhe mjhe banwana banana bnana paise rupay abhi abi".split(" ");
  function isUrdu(q) { return (q.toLowerCase().match(/[a-z]+/g) || []).some(function (w) { return UR.indexOf(w) > -1; }); }
  function link(href, label) { return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>"; }

  function botReply(q) {
    var c = CFG, B = c.bot || {}, t = " " + q.toLowerCase() + " ", ur = isUrdu(q), i, f, keys;
    function L(en, u) { return ur ? u : en; }
    function has(re) { return re.test(t); }
    // 1. owner's custom answers (from admin) come first
    for (i = 0; i < (B.faqs || []).length; i++) {
      f = B.faqs[i] || {};
      keys = String(f.k || "").toLowerCase().split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      if (f.a && keys.some(function (k) { return t.indexOf(k) > -1; })) return esc(f.a);
    }
    if (has(/admin|password|passcode| pin |login/)) return L("Sorry, I can't help with that.", "Maaf kijiye, is mein madad nahi kar sakta.");
    if (has(/contact|rabta|raabta|whatsapp|email|e-mail|gmail|phone|number|call|baat kar|message|msg|instagram|insta|reach/)) {
      if (B.contact) return esc(B.contact);
      var wa = String(c.whatsapp || "").replace(/\D/g, ""), ways = [];
      if (c.email) ways.push("📧 " + link("mailto:" + c.email, c.email));
      if (wa) ways.push("💬 WhatsApp: " + link("https://wa.me/" + wa, c.phone || "+" + wa));
      if (safeUrl(c.instagram)) ways.push("📸 " + link(c.instagram, "Instagram"));
      if (!ways.length) return L("Contact details are coming soon.", "Contact details jald add hongi.");
      return L("You can reach " + esc(c.brand || "SwiftSite") + " here:", "Aap yahan contact kar sakte hain:") + "\n" + ways.join("\n");
    }
    if (has(/price|pricing|cost|rate|charges|kitna|kitne|paise|budget|fee|rupay|rupees|dollar|usd|pkr/)) {
      var lines = SERVICES.map(function (s) { var p = bothPrices(s[0]); return p.us ? "• " + s[1] + ": Rs " + p.pk.toLocaleString("en-PK") + " / $" + p.us : ""; }).filter(Boolean);
      return lines.length ? "Starting prices (Pakistan / USA):\n" + lines.join("\n") + "\n" + L("The final price depends on the project.", "Final price project par depend karti hai.")
                          : L("Prices are on request — send your project details.", "Price ke liye apne project ki details bhejein.");
    }
    if (has(/service|offer|kya karte|kya banate|build|banwana|banana|bnana|website chahiye|kaam/))
      return L("Services:", "Services:") + "\n" + SERVICES.map(function (s) { return "• " + s[1]; }).join("\n");
    if (has(/project|portfolio|work|example|demo|sample/))
      return L("You can see the work on the Projects page.", "Kaam Projects page par dekh sakte hain.") + " " + '<a href="projects.html">Projects →</a>';
    if (has(/who|owner|about|kon ho|kaun|developer|mharry|swiftsite/))
      return esc(c.brand || "SwiftSite") + L(" is the brand of ", " ka brand chalate hain ") + esc(c.name || "Mharry JS") + " — " + esc(c.role || "Full-Stack Developer") + ".";
    if (has(/ hi | hello| hey|salam|assalam| aoa /)) return L("Hello! 👋 How can I help?", "Walaikum Assalam! 👋 Kaise madad karun?");
    if (has(/thank|shukriya|shukria|jazak/)) return L("You're welcome! 😊", "Koi baat nahi! 😊");
    if (has(/bye|allah hafiz|khuda hafiz/)) return L("Goodbye! ✨", "Allah Hafiz! ✨");
    return L("I can help with services, prices, projects and contact details.", "Main services, prices, projects aur contact ke baare mein bata sakta hoon.");
  }

  var bot = (function () {
    var fab, box, body, input, title, greeted = false;
    function add(html, who) { var b = document.createElement("div"); b.className = "bubble " + who; b.innerHTML = html; body.appendChild(b); body.scrollTop = body.scrollHeight; }
    function build() {
      fab = document.createElement("button"); fab.className = "chat-fab"; fab.type = "button"; fab.setAttribute("aria-label", "Open chat"); fab.textContent = "🤖";
      box = document.createElement("div"); box.className = "chat";
      box.innerHTML = '<div class="chat-head"><strong></strong><button type="button" aria-label="Close chat">×</button></div><div class="chat-body"></div>' +
        '<form class="chat-form"><input placeholder="English ya Roman Urdu…" maxlength="300" aria-label="Message"><button type="submit" aria-label="Send">➤</button></form>';
      document.body.appendChild(box); document.body.appendChild(fab);
      body = box.querySelector(".chat-body"); input = box.querySelector("input"); title = box.querySelector("strong");
      fab.addEventListener("click", function () {
        box.classList.toggle("open");
        if (!box.classList.contains("open")) return;
        if (!greeted) {
          greeted = true;
          var B = CFG.bot || {};
          add(B.greeting ? esc(B.greeting) : "Assalam o Alaikum! 👋 Main " + esc(B.name || "Swifty") + " hoon. Services, prices, projects ya contact — English ya Roman Urdu mein poochiye.", "bot");
        }
        input.focus();
      });
      box.querySelector(".chat-head button").addEventListener("click", function () { box.classList.remove("open"); });
      box.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        var q = input.value.trim(); if (!q) return;
        add(esc(q), "me"); input.value = "";
        var r = botReply(q);
        setTimeout(function () { add(r, "bot"); }, 450);
      });
    }
    function sync() {
      var B = CFG.bot || {};
      if (B.enabled === false) { if (fab) { fab.style.display = "none"; box.classList.remove("open"); } return; }
      if (!fab) build();
      fab.style.display = "";
      title.textContent = (B.name || "Swifty") + " · " + (CFG.brand || "SwiftSite");
    }
    return { sync: sync };
  })();

  /* ---------- 6. APPLY SETTINGS TO THE PAGE ---------- */
  function setPhoto(sel, src) {
    each(sel, function (img) {
      if (img.getAttribute("src") === src) return;
      var wrap = img.closest(".profile-circle, .about-img-circle");
      function initials() { if (wrap) wrap.classList.add("no-img"); }
      // a broken custom image falls back to the original portrait, then to the initials
      img.onerror = src === PHOTO ? initials : function () { img.onerror = initials; img.src = PHOTO; };
      if (wrap) wrap.classList.remove("no-img");
      img.src = src;
    });
  }

  function apply() {
    var c = CFG, wa = String(c.whatsapp || "").replace(/\D/g, "");
    var view = Object.assign({}, c, { phone: c.phone || (wa ? "+" + wa : "") });
    var first = String(c.name || "").split(" ")[0] || "there";
    var links = {
      email: c.email ? "mailto:" + c.email : "",
      whatsapp: wa ? "https://wa.me/" + wa : "",
      whatsappChat: wa ? "https://wa.me/" + wa + "?text=" + encodeURIComponent("Hi " + first + "! I found your portfolio and would like to discuss a project.") : "",
      github: safeUrl(c.github), instagram: safeUrl(c.instagram), linkedin: safeUrl(c.linkedin)
    };

    // text: an empty or unchanged value keeps the page's own built-in text
    each("[data-t]", function (el) {
      var k = el.getAttribute("data-t"), v = view[k];
      if (el._orig === undefined) el._orig = el.innerHTML;
      if (v == null || v === "" || v === DEFAULTS[k]) el.innerHTML = el._orig; else el.textContent = v;
    });
    // links: a deleted value hides the link
    each("[data-href]", function (a) {
      var u = links[a.getAttribute("data-href")];
      if (u) { a.setAttribute("href", u); a.style.display = ""; } else a.style.display = "none";
    });
    each("[data-show]", function (el) { el.style.display = links[el.getAttribute("data-show")] ? "" : "none"; });

    // images
    setPhoto('[data-img="home"]', imgUrl(c.photoHome) || PHOTO);
    setPhoto('[data-img="about"]', imgUrl(c.photoAbout) || PHOTO);
    var logo = imgUrl(c.logo);
    each(".logo-icon", function (box) {
      var img = box.querySelector("img[data-logo]"); if (!img) return;
      if (!logo) { box.classList.remove("has-img"); img.removeAttribute("src"); return; }
      img.onload = function () { box.classList.add("has-img"); };
      img.onerror = function () { box.classList.remove("has-img"); };
      if (img.getAttribute("src") !== logo) img.src = logo;
      else if (img.complete && img.naturalWidth) box.classList.add("has-img");
    });

    renderProjects(); renderPrices(); bot.sync();
  }

  /* ---------- 7. PAGE UI ---------- */
  var navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () { if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 10); });

  var ham = document.getElementById("hamburger"), menu = document.getElementById("mobileMenu");
  if (ham && menu) {
    ham.addEventListener("click", function () { ham.classList.toggle("open"); menu.classList.toggle("open"); });
    each("#mobileMenu a", function (a) { a.addEventListener("click", function () { ham.classList.remove("open"); menu.classList.remove("open"); }); });
  }
  each(".nav-link", function (l) { if (l.getAttribute("data-page") === PAGE) l.classList.add("active"); });

  var tw = document.getElementById("typewriter");
  if (tw) {
    var roles = ["AI Integration Specialist", "Deep Learning Engineer", "Web Developer", "Problem Solver", "UI/UX Designer"], ri = 0, ci = 0, del = false;
    (function loop() {
      var w = roles[ri];
      if (!del) { tw.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(loop, 1800); return; } setTimeout(loop, 65); }
      else { tw.textContent = w.slice(0, --ci); if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } setTimeout(loop, 30); }
    })();
  }

  each(".counter", function (el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0, t0 = performance.now();
    (function tick(now) { var p = Math.min((now - t0) / 1500, 1); el.textContent = Math.floor(p * target); if (p < 1) requestAnimationFrame(tick); })(t0);
  });
  setTimeout(function () { each(".skill-bar-fill", function (b) { b.style.width = b.getAttribute("data-width") || "0"; }); }, 500);

  var filters = document.getElementById("projectFilters");
  if (filters) filters.addEventListener("click", function (e) {
    var b = e.target.closest(".filter-btn"); if (!b) return;
    each("#projectFilters .filter-btn", function (x) { x.classList.toggle("active", x === b); });
    renderProjects(b.getAttribute("data-filter"));
  });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-soon]")) window.showToast("Demo link coming soon.", ""); });

  var sw = document.getElementById("priceSwitch");
  if (sw) sw.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    cur = b.getAttribute("data-cur") === "pk" ? "pk" : "us";
    try { localStorage.setItem("ss_cur", cur); } catch (err) {}
    renderPrices();
  });

  /* Contact form -> FormSubmit (emails the address set in admin) */
  var form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    function g(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
    var name = g("cfName"), email = g("cfEmail"), subject = g("cfSubject"), service = g("cfService"), message = g("cfMessage");
    if (!name || !email || !subject || !message) { window.showToast("❌ Please fill in all required fields.", "error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.showToast("❌ Please enter a valid email address.", "error"); return; }
    var to = CFG.email || DEFAULTS.email, btn = form.querySelector(".btn-submit"), old = btn.textContent;
    btn.textContent = "⏳ Sending…"; btn.disabled = true;
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(to), {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name: name, email: email, _replyto: email, subject: subject, service: service || "Not selected", message: message, _subject: "SwiftSite website — new message from " + name, _template: "table", _captcha: "false" })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && String(d.success) === "true") { window.showToast("✅ Message sent. You'll get a reply within 24 hours.", "success"); form.reset(); }
      else window.showToast("📬 Not delivered yet: " + to + " has to confirm FormSubmit's activation email once. After that this form works.", "error");
    }).catch(function () {
      location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nService: " + service + "\n\n" + message);
      window.showToast("📧 Your email app opened — press Send there.", "success");
    }).then(function () { btn.textContent = old; btn.disabled = false; });
  });

  /* ---------- 8. HIDDEN ADMIN: Windows + Ctrl + Shift + M ---------- */
  var winKey = false;
  document.addEventListener("keydown", function (e) {
    if (e.key === "Meta" || e.key === "OS") { winKey = true; return; }
    var win = e.metaKey || winKey || (e.getModifierState && (e.getModifierState("Meta") || e.getModifierState("OS")));
    if (win && e.ctrlKey && e.shiftKey && (e.code === "KeyM" || String(e.key).toLowerCase() === "m")) {
      e.preventDefault();
      location.href = "admin.html";
    }
  });
  document.addEventListener("keyup", function (e) { if (e.key === "Meta" || e.key === "OS") winKey = false; });
  window.addEventListener("blur", function () { winKey = false; });

  /* ---------- 9. START: cached settings first, then the live ones ---------- */
  apply();
  function refresh() {
    return cloudGet().then(function (d) {
      var stamp = d && typeof d === "object" ? (d.savedAt || d.ts) : 0;
      if (stamp && stamp !== CFG.savedAt) {
        CFG = merge(d);
        try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
        apply();
      }
    }).catch(function () {});
  }
  var loader = document.getElementById("loader");
  function hideLoader() { if (loader) loader.classList.add("hidden"); }
  // keep the loader up until the live settings arrive (max 2.5s) so visitors don't see content swap
  Promise.race([refresh(), new Promise(function (r) { setTimeout(r, 2500); })]).then(function () { setTimeout(hideLoader, 300); });
  setTimeout(hideLoader, 3500);
  setInterval(function () { if (!document.hidden) refresh(); }, 60000);
})();
