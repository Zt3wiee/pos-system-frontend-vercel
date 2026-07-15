# POS Frontend

A React + Vite point-of-sale frontend for managing retail sales, inventory, categories, users, and sales reports. The application has separate role-based workspaces for admins and cashiers.

## Features

- Authentication with token storage in `localStorage`
- Role-based route protection for `admin` and `cashier` users
- Admin dashboard with revenue, order, and performance summary cards
- Product inventory management with create, edit, and delete flows
- Category management
- User management for admin users
- Sales reports with recent sales and top-selling products
- Cashier sales terminal with searchable products, cart controls, tax calculation, and checkout
- Cashier order ledger with order detail modal

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4
- Axios
- Lucide React icons
- Recharts
- ESLint

## Project Structure

```text
src/
  api/                 API clients and data hooks
  assets/              Static frontend assets
  components/          Shared modals and UI components
  features/
    admin/             Admin dashboard, inventory, categories, reports, users
    auth/              Login screen
    cashier/           Sales terminal and orders page
  Layouts/             Admin and cashier shell layouts
  routes/              App routes and protected routes
  App.jsx              Router provider entry
  main.jsx             React app bootstrap
```

## Requirements

- Node.js 20 or newer recommended
- npm
- Backend API running at:

```text
http://localhost:8000/api
```

The API base URL is currently configured in `src/api/GlobalApi.js`.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Backend API Expectations

This frontend expects the backend to expose endpoints similar to:

```text
POST   /login
POST   /logout
GET    /user
GET    /users
POST   /users
PUT    /users/:id
DELETE /users/:id
GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id
GET    /categories
POST   /categories
PUT    /categories/:id
DELETE /categories/:id
POST   /sales
GET    /reports/summary
GET    /reports/daily
GET    /reports/monthly
GET    /reports/top-products
GET    /reports/orders
```

Authenticated requests use a bearer token:

```text
Authorization: Bearer <token>
```

The login response is expected to include:

```json
{
  "token": "token-value",
  "data": {
    "role": "admin"
  }
}
```

Supported roles are:

- `admin`
- `cashier`

## Routes

Public routes:

```text
/login
/
```

Admin routes:

```text
/admin/dashboard
/admin/inventory
/admin/categories
/admin/users
/admin/reports
```

Cashier routes:

```text
/cashier/sales
/cashier/orders
```

## Notes

- The frontend stores `token` and `role` in `localStorage` after login.
- `ProtectedRoutes` redirects unauthenticated or wrong-role users back to `/login`.
- The API URL is hardcoded in `src/api/GlobalApi.js`; move it to an environment variable if you need different URLs for development, staging, and production.
- The cashier sales page applies a 10% sales tax when calculating totals.
