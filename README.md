# 📚 Manga Library Platform

A modern and responsive manga platform that syncs and displays the latest manga updates using the **MangaDex API**.  
Built with **Next.js**, **TypeScript**, **MongoDB**, **Redis**, and **Docker**, it delivers fast browsing through cached APIs, background workers, and a clean anime-inspired UI.

## ✨ Features

- 🔄 Auto-sync latest manga updates via background worker
- 🗂️ Store and query manga metadata with MongoDB
- ⚡ Redis caching for frequently accessed API responses
- 🚀 Faster page loads with reduced database hits
- 🖼️ Cover image fetching via API endpoint
- 🌙 Clean, responsive UI for desktop and mobile

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Nginx](https://nginx.org/)
- [MangaDex API](https://api.mangadex.org/docs/)

## 🚀 Deployment

This project is deployed on my own server using **Docker Compose**, with **Redis** for caching and **Nginx** as a reverse proxy.  
Visit the website at **[Manga Library]((https://vercel.com/long-nguyens-projects-4cd06ab3/manga-lib))** 📖✨

## 🧠 Lessons Learned

Building this manga platform taught me how to design a production-style system with caching, workers, and containerised services.  
I learned how to:

- Cache hot API routes using **Redis TTLs** to reduce load and improve response times ⚡
- Coordinate **background workers** with the main API safely 🔁
- Design cache-first strategies with graceful DB fallbacks 🧠
- Run and network multiple services using **Docker Compose** 🐳
- Debug real-world infra issues (stale images, cache invalidation, proxy routing) 🔍

### 💪 Challenges

- **Stale cached data:** solved with proper TTLs and cache invalidation strategy.
- **Worker vs API race conditions:** mitigated by atomic updates and ordering rules.
- **Cold starts after deploy:** reduced using Redis warm-up patterns.

Each fix pushed my backend and system design skills further 💫

## 👩‍💻 Author

**Long Nguyen**  
A passionate software engineer who loves coding, coffee, and building cozy, useful products ☕💻

- 🌐 [LinkedIn](https://www.linkedin.com/in/longngdev/)
- 💌 [Email](mailto:longng.dev@gmail.com)


