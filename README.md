# SwiftSite — Full-Stack Developer Portfolio

Multi-page portfolio built with **HTML5, CSS3 and Vanilla JavaScript**. No frameworks.

```
swiftsite/
├── index.html      Home
├── about.html      About / Skills
├── projects.html   Projects (filters + modal)
├── services.html   Services (PK / USA pricing)
├── contact.html    Contact (validated form → Instagram DM)
├── css/style.css
├── js/script.js
└── assets/ logo.png · images/ · icons/
```

## Logo
Save your logo as `assets/logo.png`, **or** upload it from the Admin panel.

## Admin panel
There is no admin button on the website. Press **Windows + Ctrl + Shift + M** on any page,
or add `#admin` to the address (for example `index.html#admin`) — use that on a phone.

The **Images** tab sets the logo, the Home page image (the moving circle) and the About page image.
Project pictures are in the Projects tab.

1. Enter the 4-digit PIN. Once it's correct, the next step opens automatically.
2. Enter the owner name and password.
3. From the panel you can change the logo, contact and social links (WhatsApp, email, phone, location,
   Instagram, GitHub, LinkedIn), set Pakistan and USA prices, add live and code URLs to projects,
   delete or restore projects and services, change the password, then **Save**.

⚠️ Your settings are saved in the browser's `localStorage`, so changes only appear on the device where
you saved them. Anyone can also read the credentials in `js/script.js`, so they are not real security.
To make changes appear for every visitor and to protect the admin panel properly, you need a backend
(for example Firebase, Supabase or a small API).

## ☁️ Show admin changes to EVERY visitor (important)
By default the admin panel saves only in *your* browser. There are two ways to make changes appear everywhere:

### Option 1 — Firebase (automatic, free)
1. Go to https://console.firebase.google.com → **Add project**.
2. Open **Build → Realtime Database → Create database** (test mode).
3. Copy the database URL, e.g. `https://swiftsite-12345-default-rtdb.firebaseio.com`.
4. Open `js/script.js` and paste it here: `const CLOUD_DB_URL = "PASTE_URL_HERE";`
5. Upload the site again. The admin panel footer will now show 🟢 **Connected**. Every **Save**
   goes live for all visitors on every phone and computer.

Rules tip: allow `.read: true` for everyone. Write access stays open unless you add Firebase Auth,
so keep the database URL private.

### Option 2 — site-config.json (manual, no account)
1. Make your changes in admin and press **Save**.
2. Click **⬇ site-config.json**.
3. Upload that file next to `index.html` on your hosting. All visitors will load it.

## Contact form
The form checks each field. Then it copies the message and opens an Instagram DM to the account
set in the admin panel. The form itself does not send email.

## Run
Open `index.html` in a browser, or serve the folder with any static host.
