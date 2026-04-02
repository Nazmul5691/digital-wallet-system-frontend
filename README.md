
# Digital Wallet Frontend

A secure, role-based, and user-friendly frontend application for a Digital Wallet System (similar to bKash or Nagad) built with **React.js**, **Redux Toolkit**, and **RTK Query**.

This frontend consumes a backend API to enable **Users**, **Agents**, and **Admins** to perform financial operations and manage wallets seamlessly.

---

## 📌 Project Overview

The Digital Wallet Frontend provides:

- Public landing pages introducing the wallet service
- Role-based dashboards with tailored features for Users, Agents, and Admins
- Robust state management with Redux Toolkit & RTK Query
- Responsive design and polished UX
- Secure JWT-based authentication

---

## 🛠️ Tech Stack

**Frontend:**

- React.js + TypeScript
- Redux Toolkit & RTK Query
- React Router
- Tailwind CSS
- Toast Notifications (`sonner` or any toast library)

**Backend (for reference / API consumption):**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt for authentication

---

## 📌 Features

### 1️⃣ Public Landing Section
Accessible without login, including:

- **Home Page**: Landing page with sticky navbar, hero banner, CTA buttons, footer, skeleton loaders, and responsive design.
- **About Page**: Service story, mission, and team details
- **Features Page**: List of features with icons/visuals
- **Pricing Page** (optional): Service fees and subscription tiers
- **Contact Page**: Inquiry form (simulated submission)
- **FAQ Page**: Frequently asked questions

### 2️⃣ Authentication

- Role-based registration (User / Agent)
- Login with JWT authentication
- Role-based redirection after login
- Persisted authentication state
- Logout functionality

### 3️⃣ User Dashboard

- Wallet overview with balance and quick actions
- Deposit, withdraw, and send money functionality
- Transaction history with pagination and filtering
- Profile management (update name, phone, password)

### 4️⃣ Agent Dashboard

- Cash-in/out summary and recent activity
- Add/withdraw money for users
- View all handled transactions
- Profile management

### 5️⃣ Admin Dashboard

- Overview with total users, agents, transactions
- Manage users (view, block/unblock)
- Manage agents (approve/suspend)
- View all transactions with filters
- Profile management

### 6️⃣ General Features

- Role-based navigation menu
- Loading indicators and global error handling
- Form validations (required, numeric, positive amounts)
- Pagination for long lists
- Dynamic charts, cards, tables for data visualization
- Toast notifications for feedback
- Guided tour (5+ steps) highlighting key features
- Dark/light theme toggle
- Fully responsive design
- Accessibility-friendly and performant

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm / yarn
- Backend API running or accessible

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nazmul5691/digital-wallet-frontend.git
cd digital-wallet-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create `.env` file:

```env
VITE_API_BASE_URL=https://digital-wallet-system-backend-one.vercel.app/api
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```
src/
├─ assets/          # Icons, images, logos
├─ components/      # Reusable UI components
├─ constants/       # Roles, config constants
├─ pages/           # Public pages & role-based dashboards
├─ redux/           # Store, slices, RTK Query APIs
├─ routes/          # React Router configuration
├─ styles/          # Tailwind/SCSS files
└─ utils/           # Helper functions, axios instance
```

---

## 📌 Live Deployment

**Frontend URL:** [https://digital-wallet-system-frontend-six.vercel.app](https://digital-wallet-system-frontend-six.vercel.app)  
**Backend URL:** [https://digital-wallet-system-backend-one.vercel.app](https://digital-wallet-system-backend-one.vercel.app)

---

## ⚡ Notes

- Ensure backend is deployed and CORS is configured to allow frontend domain.
- JWT tokens are stored in **httpOnly cookies** for security.
- Guided tour runs once for new users and can be restarted via settings.

---

## 📜 License

MIT License
