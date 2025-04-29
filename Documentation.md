Got it! Since you’re using a **custom backend instead of Firebase**, we’ll revise the documentation accordingly. Here's your **updated Developer Documentation**, now reflecting:

- Backend integration (not Firebase)
- Images in the `public/` directory
- Use of vanilla CSS + Bootstrap
- Next.js project structure

---

# 🧑‍💻 Developer Documentation

This document outlines the structure and conventions of the project, making it easy for developers to collaborate efficiently. The setup prioritizes simplicity, modularity, and scalability.

---

## 📁 Project Structure & Directory Guide

### `public/`
This folder contains all **static assets** such as images, icons, and other media.  
Assets in this directory are accessible at runtime via URLs like `/images/logo.png`.  
Can be used with native `<img>` tags or the `next/image` component.

---

### `src/lib/`
This directory houses:
- **API integration logic** to connect with the backend server
- Utility functions and services (e.g., request handlers, authentication logic using Axios or Fetch)
- Environment variables (`.env.local`) should be used to store sensitive API keys or base URLs.

---

### `src/styles/`
This directory manages all stylesheets.
- **Primary styling** is handled using **vanilla CSS**
- **Bootstrap** and other CSS libraries may be used for responsive and utility styling

---

### `src/pages/`
Handles all **route-based pages** of the application, powered by Next.js’ file-based routing system.  
Includes pages such as:
- `Home`
- `About`
- `Contact`
- `Policy`
- `Products`
  
Each file inside `pages/` represents a route in the app.

---

### `src/authentication/`
This directory contains all **authentication-related screens**, such as:
- `Login`
- `Register`
- `ForgotPassword`


---

### `src/dashboards/`
The system includes **role-based dashboards** based on `user.role`:
- Admin Dashboard
- User Dashboard


### `src/components/`
Houses **reusable UI components** to promote clean and maintainable code.  

