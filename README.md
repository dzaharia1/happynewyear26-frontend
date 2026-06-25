# 🐱 Champagne's Midnight Meow (Frontend) 🥂

> *Ring in the year 2026 with the coolest cats in the apartment!*

Welcome to **Champagne's Midnight Meow**, a multiplayer virtual space built to celebrate New Year's Eve 2026. Step into Dan & Martha's apartment, customize your cat profile, and hang out with other cats in real-time!

---

## 📸 Snapshots from the Feline Rave

Here's a sneak peek at what the cats are up to:

<p align="center">
  <img src="https://projects.adanmade.app/projects/midnightmeow/onboarding1.png" width="45%" alt="Cat Selection Screen" />
  <img src="https://projects.adanmade.app/projects/midnightmeow/onboarding2.png" width="45%" alt="Color Schemes Galore" />
</p>

<p align="center">
  <img src="https://projects.adanmade.app/projects/midnightmeow/ingame1.png" width="30%" alt="Exploring the apartment" />
  <img src="https://projects.adanmade.app/projects/midnightmeow/ingame2.png" width="30%" alt="Cat chats" />
  <img src="https://projects.adanmade.app/projects/midnightmeow/ingame3.png" width="30%" alt="Virtual hangout" />
</p>

---

## 🐾 Feline Features

- **🎮 Smooth Grid Movement:** Navigate the cozy apartment using Arrow Keys or `WASD`.
- **📱 Mobile-Ready D-Pad:** Playing on a phone? Tap and slide using our custom on-screen joystick and controller interface.
- **💬 Real-Time Cat Chat:** Send messages that float above your cat's head to share New Year's resolutions (or just scream *MEOW*).
- **🌈 Colorful Fur Coats:** Stand out from the crowd! Choose from 7 color schemes: Brown, Blue, Green, Orange, Pink, White, or Black.
- **✉️ Discover Secret Items:** Wander near the fig tree or the Wassily chair, and use the **Grab** button to read the mysterious letter left by Dan and Martha.

---

## 🛠️ Architecture & Tech Stack

This frontend is designed as a super-responsive, retro-themed SPA:

- **Core:** React (v18) + Vite for blazing-fast local runs and hot-module reloading.
- **Styling:** `styled-components` for modular, custom CSS layouts, pixel-art positioning, and keyframe animations.
- **Sockets:** `socket.io-client` for persistent, low-latency state synchronization with the backend.

---

## 🚀 Run the Feline Party Locally

First, make sure you have [Node.js](https://nodejs.org) installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your environment:**
   Create a `.env` file in the `frontend` root:
   ```env
   VITE_BACKEND_URL=http://localhost:3106
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Have fun!** Open the browser URL (usually `http://localhost:5173`) and start meowing!
