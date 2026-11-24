/* =========================================================
   cloud-sync.js — for swiftsite-portfolio.vercel.app ONLY
   (friend's portfolio — completely separate from the other SwiftSite)

   • Replaces projects_api.php (PHP does not run on Vercel → "Local mode")
     with a cloud store → admin changes show on EVERY device.
   • Premium SwiftSite-style admin lock:
       6247 → "Welcome Harry" → name MHARRYJS + password Mharryjs123@
       7426 → "Welcome Mharryjs 😎👑" → admin opens directly
   • Home / About design and images are NOT touched.

   INSTALL: in projects.html, just before </body>, AFTER script.js:
       <script src="cloud-sync.js"></script>
   ========================================================= */
(function () {
  "use strict";

  var CLOUD = "https://textdb.dev/api/data/swiftsite-portfolio-friend-9d4e2b71-c6a8-4f13-b5e0-2a7f81c3d946";
  var ADMIN = { pin: "6247", secret: "7426", name: "MHARRYJS", pass: "Mharryjs123@" };
  var INSULT = "BSDK — Aap MHARRYJS website ke owner nahi ho! Jao gand marwao, boss se lund ka sir! 😤";

  function toast(m, t) { if (typeof showToast === "function") showToast(m, t); }
  function readJSON(r) { return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { return null; } }); }
  function getAdmin() { try { return isAdmin; } catch (e) { return false; } }
  function setAdmin(v) { try { isAdmin = v; } catch (e) { window.isAdmin = v; } }

  /* ---------------- 1. CLOUD SYNC ---------------- */
  function setSync(on) {
    try { serverOnline = on; } catch (e) {}
    var el = document.getElementById("syncStatus");
    if (!el) return;
    el.textContent = on ? "☁️ Cloud sync ON" : "💻 Local mode";
    el.classList.toggle("sync-on", on);
    el.classList.toggle("sync-off", !on);
  }

  var lastTs = 0;
  function rerender() {
    if (typeof renderProjects !== "function") return;
    var f = "all"; try { f = currentFilter; } catch (e) {}
    renderProjects(f);
  }
  function pull(first) {
    return fetch(CLOUD + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? readJSON(r) : null; })
      .then(function (d) {
        setSync(true);
        if (d && Array.isArray(d.projects) && d.ts && d.ts !== lastTs) {
          lastTs = d.ts;
          try {
            localStorage.setItem("swiftsite_projects", JSON.stringify(d.projects));
            localStorage.setItem("swiftsite_projects_v", "2");
          } catch (e) {}
          rerender();
        }
      })
      .catch(function () { if (first) setSync(false); });
  }

  function shrink(src) {
    return new Promise(function (res) {
      if (!src || src.indexOf("data:") !== 0 || src.length < 150000) return res(src);
      var img = new Image();
      img.onload = function () {
        var k = Math.min(1, 900 / img.width), c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = function () { res(src); };
      img.src = src;
    });
  }

  function push(list) {
    toast("☁️ Saving to cloud…", "success");
    Promise.all(list.map(function (p) {
      return shrink(p.img).then(function (s) { var c = Object.assign({}, p); c.img = s; return c; });
    })).then(function (clean) {
      var ts = Date.now();
      try { localStorage.setItem("swiftsite_projects", JSON.stringify(clean)); } catch (e) {}
      return fetch(CLOUD, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ ts: ts, projects: clean }) })
        .then(function (r) {
          if (!r.ok) throw 0;
          lastTs = ts; setSync(true);
          toast("✅ Saved — ab har device aur har visitor ko dikhega 🌍", "success");
        });
    }).catch(function () { toast("⚠️ Cloud save failed — image chhoti karke dobara try karo.", "error"); });
  }

  // Override old PHP-based functions from script.js
  var newFetch = function () { return pull(true); };
  var newSave = function (list) {
    try { localStorage.setItem("swiftsite_projects", JSON.stringify(list)); } catch (e) {}
    if (getAdmin()) push(list);
  };
  try { fetchServerProjects = newFetch; } catch (e) { window.fetchServerProjects = newFetch; }
  try { saveProjects = newSave; } catch (e) { window.saveProjects = newSave; }

  pull(true);
  setInterval(function () { if (!document.hidden && !getAdmin()) pull(false); }, 45000);

  /* ---------------- 2. PREMIUM ADMIN LOCK ---------------- */
  var css = document.createElement("style");
  css.textContent =
    ".ssx-modal{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:20px;background:rgba(29,53,40,.38);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;visibility:hidden;transition:.35s ease;font-family:Inter,system-ui,sans-serif}" +
    ".ssx-modal.open{opacity:1;visibility:visible}" +
    ".ssx-box{position:relative;width:min(430px,100%);padding:40px 32px 32px;border-radius:30px;text-align:center;color:#1d3528;background:rgba(255,253,248,.96);border:1px solid rgba(198,166,100,.55);box-shadow:0 40px 80px -30px rgba(29,53,40,.45);transform:translateY(20px) scale(.97);transition:transform .45s cubic-bezier(.22,.8,.26,1)}" +
    ".ssx-modal.open .ssx-box{transform:none}" +
    ".ssx-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border-radius:50%;border:1px solid rgba(198,166,100,.5);background:#fffdf8;font-size:20px;cursor:pointer;color:#1d3528}" +
    ".ssx-close:hover{background:#1d3528;color:#f8f5ee}" +
    ".ssx-badge{width:70px;height:70px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;font:italic 30px Georgia,serif;color:#e6d3a3;background:linear-gradient(145deg,#2a4a38,#1d3528);border:1.5px solid #c6a664;box-shadow:0 0 0 6px rgba(198,166,100,.12),0 14px 28px -12px rgba(29,53,40,.5)}" +
    ".ssx-eye-brow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#7f9a7d}" +
    ".ssx-eye-brow:before{content:'';width:22px;height:1px;background:#c6a664}" +
    ".ssx-box h3{font:700 26px Manrope,Poppins,system-ui,sans-serif;letter-spacing:-.02em;margin:8px 0 4px}" +
    ".ssx-sub{color:#5f6f64;font-size:14px;margin:0 0 22px}" +
    ".ssx-step{display:none}.ssx-step.on{display:block;animation:ssxUp .4s ease}" +
    ".ssx-field{position:relative;margin-bottom:12px}" +
    ".ssx-field input{width:100%;box-sizing:border-box;padding:15px 50px 15px 18px;border-radius:14px;border:1px solid rgba(198,166,100,.45);background:#fff;font:16px Inter,system-ui,sans-serif;color:#1d3528;outline:none;transition:.25s}" +
    ".ssx-field input:focus{border-color:#c6a664;box-shadow:0 0 0 4px rgba(198,166,100,.16)}" +
    ".ssx-field input.pin{text-align:center;letter-spacing:.8em;font-size:22px;padding-left:50px}" +
    ".ssx-eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:0;border-radius:10px;background:none;cursor:pointer;font-size:17px;color:#7f9a7d}" +
    ".ssx-eye:hover{background:#e3ecdf}" +
    ".ssx-msg{min-height:20px;font-size:14px;font-weight:600;margin:4px 0 10px;text-align:left}" +
    ".ssx-msg.bad{color:#a2412f;padding:12px 14px;border-radius:12px;background:rgba(162,65,47,.08);border:1px solid rgba(162,65,47,.25)}" +
    ".ssx-msg.good{color:#3f6b52;padding:12px 14px;border-radius:12px;background:rgba(169,191,166,.28);border:1px solid rgba(63,107,82,.25);text-align:center}" +
    ".ssx-btn{width:100%;padding:15px;border:0;border-radius:999px;cursor:pointer;font:600 15px Inter,system-ui,sans-serif;color:#f8f5ee;background:linear-gradient(180deg,#2a4a38,#1d3528);box-shadow:0 12px 24px -12px rgba(29,53,40,.6);transition:.3s}" +
    ".ssx-btn:hover{transform:translateY(-2px)}" +
    ".ssx-shake{animation:ssxShake .45s}" +
    "@keyframes ssxUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
    "@keyframes ssxShake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}";
  document.head.appendChild(css);

  var m = document.createElement("div");
  m.className = "ssx-modal";
  m.innerHTML =
    '<div class="ssx-box" role="dialog" aria-modal="true">' +
      '<button class="ssx-close" aria-label="Close">×</button>' +
      '<div class="ssx-badge">Ss</div>' +
      '<div class="ssx-step on" data-s="1">' +
        '<span class="ssx-eye-brow">Step 1 of 2</span><h3>Admin Access</h3><p class="ssx-sub">Enter the 4-digit security PIN.</p>' +
        '<div class="ssx-field"><input id="ssx-pin" class="pin" type="password" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off"><button class="ssx-eye" data-eye="ssx-pin" type="button">👁</button></div>' +
        '<div class="ssx-msg" id="ssx-m1"></div>' +
      '</div>' +
      '<div class="ssx-step" data-s="2">' +
        '<span class="ssx-eye-brow">Step 2 of 2</span><h3>Owner Login</h3><p class="ssx-sub">Confirm your name and password.</p>' +
        '<div class="ssx-field"><input id="ssx-name" type="text" placeholder="Name" autocomplete="off"></div>' +
        '<div class="ssx-field"><input id="ssx-pass" type="password" placeholder="Password" autocomplete="off"><button class="ssx-eye" data-eye="ssx-pass" type="button">👁</button></div>' +
        '<div class="ssx-msg" id="ssx-m2"></div>' +
        '<button class="ssx-btn" id="ssx-login" type="button">Unlock Admin →</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(m);

  var $ = function (id) { return document.getElementById(id); };
  function step(n) { m.querySelectorAll(".ssx-step").forEach(function (s) { s.classList.toggle("on", s.dataset.s == n); }); }
  function reset() {
    $("ssx-pin").value = ""; $("ssx-pin").disabled = false;
    $("ssx-name").value = ""; $("ssx-pass").value = "";
    ["ssx-m1", "ssx-m2"].forEach(function (i) { $(i).className = "ssx-msg"; $(i).textContent = ""; });
    step(1);
  }
  function open() { reset(); m.classList.add("open"); setTimeout(function () { $("ssx-pin").focus(); }, 250); }
  function close() { m.classList.remove("open"); setTimeout(reset, 300); }
  function shake(el) { el.classList.remove("ssx-shake"); void el.offsetWidth; el.classList.add("ssx-shake"); }
  function unlock(msg) {
    setAdmin(true);
    try { sessionStorage.setItem("swiftsite_admin", "1"); } catch (e) {}
    if (typeof applyAdminUI === "function") applyAdminUI();
    close();
    toast(msg || "🔓 Admin mode ON — projects add / edit / delete karo, har jagah save hoga!", "success");
  }

  m.addEventListener("click", function (e) {
    if (e.target === m || e.target.closest(".ssx-close")) close();
    var eye = e.target.closest("[data-eye]");
    if (eye) { var i = $(eye.dataset.eye); var show = i.type === "password"; i.type = show ? "text" : "password"; eye.textContent = show ? "🙈" : "👁"; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && m.classList.contains("open")) close(); });

  $("ssx-pin").addEventListener("input", function () {
    var pin = $("ssx-pin"), msg = $("ssx-m1");
    pin.value = pin.value.replace(/\D/g, "");
    if (pin.value.length < 4) { msg.className = "ssx-msg"; msg.textContent = ""; return; }
    if (pin.value === ADMIN.secret) {
      msg.className = "ssx-msg good"; msg.textContent = "Welcome Mharryjs 😎👑"; pin.disabled = true;
      setTimeout(function () { unlock("Welcome Mharryjs 😎👑 — Admin ON"); }, 1300);
    } else if (pin.value === ADMIN.pin) {
      msg.className = "ssx-msg good"; msg.textContent = "Welcome Harry 👑 — aapka intezaar tha, sir!"; pin.disabled = true;
      setTimeout(function () { step(2); $("ssx-name").focus(); }, 1400);
    } else {
      msg.className = "ssx-msg bad"; msg.textContent = INSULT;
      shake(pin.parentElement);
      setTimeout(function () { pin.value = ""; }, 500);
    }
  });
  function login() {
    var msg = $("ssx-m2");
    if ($("ssx-name").value.trim().toUpperCase() === ADMIN.name && $("ssx-pass").value === ADMIN.pass) {
      msg.className = "ssx-msg good"; msg.textContent = "Access granted ✓";
      setTimeout(function () { unlock(); }, 600);
    } else {
      msg.className = "ssx-msg bad"; msg.textContent = "Ghalat naam ya password — dobara koshish karein.";
      shake(m.querySelector('[data-s="2"]'));
    }
  }
  $("ssx-login").addEventListener("click", login);
  $("ssx-pass").addEventListener("keydown", function (e) { if (e.key === "Enter") login(); });

  // Take over the existing Admin button (remove its old listeners)
  // Capture phase on document runs BEFORE the old button listener, so we can stop it
  if (document.getElementById("adminToggle")) {
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#adminToggle")) return;
      e.stopPropagation(); e.preventDefault();
      if (getAdmin()) {
        if (confirm("Admin mode band karna hai?")) {
          setAdmin(false);
          try { sessionStorage.removeItem("swiftsite_admin"); } catch (e) {}
          if (typeof applyAdminUI === "function") applyAdminUI();
          toast("🔒 Admin mode off.", "success");
        }
      } else open();
    }, true);
  }
  // Hide the old passcode popup completely
  var oldModal = document.getElementById("adminModal");
  if (oldModal) oldModal.style.display = "none";
})();
