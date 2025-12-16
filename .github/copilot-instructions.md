# Copilot Instructions for Dentalium-Store

## Architecture Overview

This is a Next.js-based e-commerce platform for medical products with a backend using MongoDB for data persistence. The app uses Next.js API routes for server-side logic and JWT for authentication.

- **Pages Router**: Uses Next.js pages directory for routing (`pages/`).
- **Backend**: MongoDB Atlas for database, Next.js API routes in `pages/api/`.
- **Authentication**: JWT-based login for admin panel.
- **Data Storage**: Products, orders, and settings stored in MongoDB collections.
- **Components**: Reusable UI components in `components/` directory.

## Key Patterns

- **Database Connection**: Use `lib/mongodb.js` for MongoDB client connection.
- **API Routes**: Handle CRUD operations in `pages/api/` with JWT auth headers.
- **Authentication**: Use JWT tokens stored in localStorage for admin sessions.
- **Image Handling**: Images stored as base64 or URLs in database.
- **Styling**: Inline styles with JavaScript objects, no external CSS files.
- **State Management**: React hooks (`useState`, `useEffect`) with API fetches.

## Development Workflow

- **Local Development**: `npm run dev` starts development server.
- **Database**: Set up MongoDB Atlas and add URI to `.env.local`.
- **Deployment**: Push to GitHub main branch for automatic Vercel deployment.
- **Admin Customization**: Access `/admin` with JWT authentication to modify products and site branding.

## Examples

- **Adding a Product**: POST to `/api/products` with product data and auth token.
- **Customizing Logo**: PUT to `/api/settings` with logoUrl field.
- **Admin Login**: POST to `/api/auth/login` with username/password, store JWT in localStorage.
- **Fetching Data**: Use fetch with Authorization header: `Bearer ${token}`.

## File Structure

- `lib/mongodb.js`: MongoDB connection utility.
- `pages/api/products.js`: CRUD for products.
- `pages/api/auth/`: Login and verify endpoints.
- `pages/api/orders.js`: Order management.
- `pages/api/settings.js`: Site settings management.
- `components/Logo.js`: Displays logo from settings.
- `pages/admin.js`: Admin interface with API integration.

Keep API calls authenticated and handle errors gracefully. Data is now server-side persistent.