# Performance Tracker App

This is a full-stack performance tracking application designed for authenticated users to manage employees and leave performance reviews. The stack leverages modern, scalable technologies for security, maintainability, and ease of development.

---

## 📦 Tech Stack

### Frontend: Next.js 15 (App Router)

- **Next.js** for App Router, SSR, and developer ergonomics
- **Tailwind CSS** for utility-first, scalable styling
- **NextAuth.js** for robust, flexible authentication
- **React Hook Form** for type-safe, declarative form handling

### Backend: Express.js

- Minimalistic and fast routing layer
- Easy JWT handling and custom business logic

### ORM: Drizzle ORM

- Schema-first, fully typed TypeScript support
- Lightweight and flexible compared to Prisma or Sequelize

### Database: PostgreSQL

- Relational and consistent — ideal for employee-review-user relations

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js >= 20
- PostgreSQL running locally

### Environment Variables

#### Backend `.env`

```env
DATABASE_URL=postgres://user:password@localhost:5432/performance
NEXTAUTH_SECRET=your-secure-random-secret
```

#### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3456
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-random-secret
```

---

## 📁 Project Structure

```
performance-tracker/
├── backend/
│ ├── src/
│ │ ├── db/
│ │ │ ├── client.ts # Drizzle DB client setup
│ │ │ ├── schema.ts # Schema definition (users, employees, reviews)
│ │ │ ├── seed.ts # Seed script for initial data
│ │ │ └── validations/ # Yup schemas + validator
│ │ │ ├── schema.ts
│ │ │ └── validate.ts
│ │ └── index.ts # Express server & route handlers
│ └── drizzle.config.ts
├── frontend/
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── app/ # Next.js App Router
│ │ │ ├── api/ # NextAuth config: [...nextauth]/route.ts
│ │ │ ├── login/ # Login page
│ │ │ └── employees/ # Employee dashboard
│ │ ├── globals.css
│ │ └── layout.tsx # Root layout (Nav, fonts, etc.)
│ └── tailwind.config.ts
└── README.md
```

---

## ▶️ Running the App

### Backend

```bash
cd backend
npm install
npx drizzle-kit push
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

- `NextAuth.js` uses `credentials` provider and JWT strategy
- JWT token includes `user.id` as `sub`
- Token is sent via `Authorization: Bearer <token>` header
- Backend validates the token with `NEXTAUTH_SECRET` and scopes queries using `userId`

---

## 🔒 Security Features

- JWT-based stateless sessions
- API access scoped per user ID
- Passwords never stored in plaintext
- CORS enabled only for specific frontend origin

---

## 🛠 Future Improvements

- Role-based access (admin, employee, manager)
- Search, filters, pagination
- Employee performance dashboards
- File uploads (profile pictures, attachments)

---

## 🤝 Contributing

Support for PRs and contributions coming soon. Stay tuned!

---

## Author

Created by **Brandon Fillpot** as a technical showcase for full-stack engineering. Feel free to fork and build upon it!
