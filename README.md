# KërSpaces Property Management Platform

Welcome to **KërSpaces**, a cutting-edge property management and real estate platform designed to connect users with their ideal homes, offices, and lands. Built with a modern tech stack, KërSpaces provides a seamless experience for Browse listings, managing properties, and interacting with real estate professionals.

---

## ✨ Features

- **Extensive Property Listings:** Browse a diverse range of properties, complete with high-quality images, detailed descriptions, and clear status badges.
- **Immersive Property Details:** Dive deep into each listing with comprehensive details, including virtual tours and precise location information.
- **Effortless Bookings:** Easily **book appointments** to visit properties directly through the platform (login required).
- **Information Requests:** Get all your questions answered by **requesting more information** on any listing (login required).
- **Personalized Favorites:** **Save (like) your favorite properties** to revisit them anytime (login required).
- **Intuitive Authentication:** A **responsive, two-column login/register page** ensures a smooth onboarding experience.
- **Role-Based Access:** Smart routing directs **admins to the property management dashboard** and **standard users to the main property listings**.
- **Comprehensive Dashboard:** Admins can **manage properties with full CRUD (Create, Read, Update, Delete) capabilities**.
- **Instant Feedback:** Enjoy **toast notifications** for clear and timely user feedback.
- **Modern UI:** A clean and contemporary interface, powered by **Tailwind CSS** and featuring crisp **Lucide icons**.

---

## 🚀 Tech Stack

KërSpaces is built on a robust and scalable foundation:

- **Frontend Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API Communication:** Axios & Fetch
- **Authentication:** JWT (stored in localStorage)
- **Notifications:** Sonner
- **Icons:** Lucide React

---

## 👨‍💻 Getting Started

Follow these steps to set up and run KërSpaces locally:

1.  **Clone the Repository:**
    ```sh
    git clone <your-repo-url>
    cd SunjKerr # Or your project directory name
    ```
2.  **Install Dependencies:**
    ```sh
    npm install
    ```
3.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
4.  **Backend API:**
    - Ensure your backend API is running and accessible at `https://kerspace-server.onrender.com`. You may need to update API endpoints within the KërSpaces codebase if your backend is hosted elsewhere.

---

## 📂 Folder Structure

The project is organized for clarity and maintainability:

- `app/` - Core Next.js pages, layouts, and API routes.
- `components/` - Reusable UI components and functional modules.
- `contexts/` - React context providers (e.g., `AuthContext`) for global state management.
- `hooks/` - Custom React hooks to encapsulate reusable logic.
- `lib/` - Utility functions and mock data for development.
- `types/` - TypeScript type definitions for robust code.
- `public/` - Static assets like images and SVGs.

---

<h2>🔒 Authentication Flow</h2>

KërSpaces implements a secure authentication system:

- Users must be logged in to access features like booking appointments, requesting information, and saving properties to their favorites.
- Upon successful login, a JSON Web Token (JWT) is securely stored in the user's `localStorage`.
- Admin users are automatically redirected to the dedicated dashboard after signing in, while standard users land on the property Browse page.
- All new user registrations default to a standard 'user' role.

---

<h2>🎨 Customization</h2>

Feel free to personalize KërSpaces to fit your brand:

- **Branding & Aesthetics:** Easily update logos, images, and color schemes by modifying files in `components/Header.tsx`, `app/auth/page.tsx`, and the `public/` directory.
- **Property Types:** Extend or modify the available property categories and attributes by editing `types/property.ts`.

---

<h2>📜 License</h2>
Coming Soon
