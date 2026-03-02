<h1 align="center"> Brev.ly </h1>

<p align="center">Modern URL shortener with analytics, built with TypeScript & Fastify 🚀</p>

<p align="center"> 
    <a href="#-about">About</a>&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;
    <a href="#-tech-stack">Tech Stack</a>&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;
    <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;
    <a href="#-getting-started">Quick Start</a>&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;
    <a href="#-license">License</a>
</p>

<p align="center"> 
    <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

### 💻 About

**Brev.ly** is a production-ready URL shortener with real-time analytics, custom shortcodes, and CSV export. Shorten any URL in seconds and track access stats.

**Key capabilities:**
- Create shortened URLs
  - **Optional** custom shortcodes (`brev.ly/abc123`)
  - **Auto-generated** Base62 shortcodes when omitted
- Delete links
- Real-time access counter
- List all links with analytics

### 🚀 Tech Stack

This project was developed with the following technologies:

#### Backend
- Fastify e Zod
- PostgreSQL
- Drizzle ORM
- Scalar UI
- AWS ECR e CDN (Cloudflare R2 )
- Git e Github

#### DevOps
- Docker
- Docker compose
- GitHub Actions (CI/CD)

### 🚧 Features

- [x] Create shortened links
  - [x] Validate shortened URL format
  - [x] Prevent duplicate shortcodes
  - [x] Generate Base62 shortcodes automatically
- [x] Delete links
- [x] Redirect from short URL to original
- [x] List all registered URLs
- [x] Increment access counter
- [x] Export links to CSV
  - [x] Serve CSV via CDN (Cloudflare R2)
  - [x] Generate unique random filenames
  - [x] Optimize listing performance
  - [x] Include: original URL, short URL, clicks, created date
- [x] Dockerized application following best practices


### 💡 Quick Start

To run the project, follow these steps:

```bash
# 1. Clone & Install
git clone <repo> brevly
cd brevly/server
```

```bash
# 2. Start with Docker (Recommended)
docker-compose up -d
```

**Local Development**

`npm install` Install dependencies

`npm run db:migrate` Apply migrations

`npm run dev` Start development server

**Endpoints**

| Method | Description |
|---|---|
| `POST` `/links` | Create short URL. |
| `GET` `/links` | List all links. |
| `GET` `/links/export` | Export links. |
| `DELETE` `/links/:shortcode` | Delete link. |
| `GET` `/:shortcode` | Redirect to original. |

### 📜 License

This project is MIT licensed.

--- 

<div align="center"> This is a project from the Tech Developer 360 Postgraduate Program • Modified and enhanced with additional features by KetCode </div>