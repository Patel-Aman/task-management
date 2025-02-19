# Task Management Application

A modern task management application built with Next.js, Redux Toolkit, and TypeScript. Features a responsive UI with a kanban-style board, dark mode support, and comprehensive task management capabilities.

## 🚀 Features

- **Task Management**

  - Create, read, update, and delete tasks
  - Task status tracking (Pending, In Progress, Completed)
  - Task search and pagination

- **User Interface**

  - Responsive design
  - Light mode support
  - Modern UI components using shadcn/ui
  - Loading states and error handling

- **Technical Features**
  - Type-safe development with TypeScript
  - State management with Redux Toolkit
  - Form validation using Zod
  - API integration with Axios
  - Containerized development environment with Docker

## 🛠️ Tech Stack

- **Frontend**

  - Next.js 14
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - shadcn/ui
  - React Hook Form + Zod
  - Axios

- **Development**
  - Docker
  - Jest
  - React Testing Library

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Patel-Aman/task-management
   cd task-management/frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   pnpm run dev
   ```

## 🐳 Docker Setup

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   └── [shadcn-ui components]
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── ThemeToggle.tsx
│   └── UserMenu.tsx
├── pages/
│   ├── _app.tsx
│   ├── tasks/
│   │   ├── index.tsx
│   │   ├── new.tsx
│   │   └── edit/[id].tsx
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
│       └── taskSlice.ts
├── types/
│   └── task.ts
└── styles/
    └── globals.css
```

## 🔄 API Endpoints

```
POST /tasks         - Create a new task
GET /tasks          - Fetch all tasks with pagination
GET /tasks/:id      - Fetch a single task
PUT /tasks/:id      - Update a task
DELETE /tasks/:id   - Delete a task

Query Parameters for GET /tasks:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search in title and description
- status: Filter by status (pending/in-progress/completed)
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 💻 Development

### Prerequisites

- Node.js 22+
- pnpm
- Docker (optional)

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for components and Redux slices
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Next.js](https://nextjs.org/) documentation
- [Redux Toolkit](https://redux-toolkit.js.org/) documentation
- [Tailwind CSS](https://tailwindcss.com/) for styling
