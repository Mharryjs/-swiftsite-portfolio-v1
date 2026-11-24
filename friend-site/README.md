# SwiftSite portfolio (friend site)

This folder is a separate website from the other SwiftSite in the project root.
Do not mix the two: upload only the files in this folder.

## Files
```
index.html      Home
about.html      About
services.html   Services (Pakistan / USA prices)
projects.html   Projects (filters)
contact.html    Contact (form sends email through FormSubmit)
admin.html      Admin panel (hidden: no button on the website)
style.css
script.js
```

## Opening the admin panel
There is no admin button anywhere on the website.

- Computer: press **Windows + Ctrl + Shift + M** on any page.
- Phone, or if the shortcut does not respond: type `/admin.html` after the website address.

Then:
- **6247** → "Welcome Harry" → name `MHARRYJS` + password `Mharryjs123@`
- **7426** → "Welcome Mharryjs 😎👑" → the panel opens directly

The panel locks again every time you leave it.

## What the admin controls
- **Images:** logo, Home page photo, About page photo, and a picture for every project.
  Upload a file or paste a direct image link. "Original photo" restores the built-in portrait.
- Brand name, your name, role, location
- Home page text and the first About paragraph
- Prices in PKR and USD (each one fills in the other)
- Projects: add, edit, delete, demo link, GitHub link
- Email, WhatsApp, phone, GitHub, Instagram, LinkedIn (an empty field removes the link)
- Chatbot: on/off, name, greeting, contact reply, custom answers

Changes save by themselves about 2 seconds after you stop typing. Wait for
**✓ Live for everyone** before closing the page. The panel reads the data back
from the cloud before it shows that message.

## Cloud storage
Settings are stored at textdb.dev under a key used only by this website
(the address is in `script.js`). Things to know:

- It is a free service with no guarantee.
- The address is visible in `script.js`. Anyone who has it can read or change the settings.
- Uploaded pictures are stored inside the settings. Many large uploads can make saving fail.
  The panel shows the data size. Image links (for example `https://i.postimg.cc/...`) take almost no space.

## Security
The PIN, name and password are written in `admin.html`, and the login page can be reached by
anyone who knows the address. The lock keeps casual visitors out. It is not real security.

## Deploy on Vercel
Upload this folder as a static site. No build step is needed.
