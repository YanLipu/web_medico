# 🏥 Medical Frontend Application

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-3.x-00DC82.svg)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6.svg)

A modern, responsive frontend application built with Nuxt 3 for efficient management of a medical clinic.

## 📑 Table of Contents

- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
- [🖥️ Key Screens](#️-key-screens)
  - [🔐 Login Screen](#-login-screen)
  - [🏠 Dashboard Home Screen](#-dashboard-home-screen)
  - [📝 New Consultation Form](#-new-consultation-form)
  - [👤 User Registration Screen](#-user-registration-screen)
- [⚙️ Setup](#️-setup)
- [🏃‍♂️ Development Server](#️-development-server)
- [🏭 Production](#-production)
- [📄 License](#-license)
- [🔗 Links](#-links)

## 🚀 Getting Started

This guide will help you set up and run the frontend project locally, allowing you to interact with the UI, make modifications, and implement new features.

### 📋 Prerequisites

To run this project, you need to have the following dependencies installed:

- **Node.js**: 16.x or later
- **npm**: 7.x or later (or yarn/pnpm/bun)

## 🖥️ Key Screens

### 🔐 Login Screen

Users must log in with their email and password to access the application.

![Login Screen](https://i.imgur.com/Qptm5yR.png)

### 🏠 Dashboard Home Screen

After logging in, users can view the location and details of their next scheduled consultation.

![Dashboard Home Screen](https://i.imgur.com/FwSUwaE.png)

### 📝 New Consultation Form

This screen allows users to create a new consultation by entering patient and doctor IDs. Name-based input is currently under development.

![New Consultation Form](https://i.imgur.com/J6V54J4.png)

### 👤 User Registration Screen

Only users with 'nurse' and 'doctor' roles have access to register new users.

![User Registration Screen](https://i.imgur.com/Z3elbL6.png)

## ⚙️ Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🏃‍♂️ Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏭 Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🔗 Links

- [Nuxt 3 Documentation](https://nuxt.com/docs/getting-started/introduction)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

Made with ❤️ by [José Yan Lipu]
