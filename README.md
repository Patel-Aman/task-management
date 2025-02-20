# Task Manager

A full-stack task management application with a RESTful API built using NestJS and MongoDB, and a modern frontend using Next.js, Redux Toolkit, and TypeScript. This application provides comprehensive task management capabilities, including pagination, search, filtering, and Docker support.

## 🚀 Features

### Backend (NestJS + MongoDB)

- Complete CRUD operations for tasks
- Data validation using DTOs
- Search and filtering capabilities
- Pagination support
- MongoDB integration
- Swagger API documentation
- Docker support
- Unit and integration tests

### Frontend (Next.js + Redux Toolkit)

- Task Management: Create, update, delete, and track task status
- Responsive design with light mode support
- Modern UI components using shadcn/ui
- Type-safe development with TypeScript
- API integration with Axios
- State management with Redux Toolkit
- Form validation using Zod
- Containerized development environment with Docker

## 🛠️ Tech Stack

### Backend

- **NestJS**
- **MongoDB**
- **TypeScript**
- **Docker**
- **Jest** (Testing)

### Frontend

- **Next.js 14**
- **Redux Toolkit**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form + Zod**
- **Axios**
- **Docker**
- **Jest + React Testing Library**

## 📦 Installation

### Prerequisites

- Node.js (v22 or later)
- MongoDB (v8)
- Docker and Docker Compose (optional but recommended)

### Clone the repository

```bash
git clone https://github.com/Patel-Aman/task-manager.git
cd task-manager
```

### Backend Setup

1. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create a `.env` file**

   ```env
   MONGODB_URI=mongodb://localhost:27017/task-manager
   PORT=5000
   ```

4. **Run the backend server**

   ```bash
   # Development mode
   pnpm run start:dev

   # Production mode
   pnpm run build
   pnpm run start:prod
   ```

### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create an environment file**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the frontend development server**
   ```bash
   pnpm run dev
   ```

## 🐳 Docker Setup

1. **Build and start the application**

   ```bash
   docker-compose up --build
   ```

2. **Stop the application**

   ```bash
   docker-compose down
   ```

3. **Stop and remove volumes**
   ```bash
   docker-compose down -v
   ```

## 🔄 API Endpoints

| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| POST   | /tasks     | Create a new task               |
| GET    | /tasks     | Fetch all tasks with pagination |
| GET    | /tasks/:id | Fetch a single task by ID       |
| PUT    | /tasks/:id | Update a task                   |
| DELETE | /tasks/:id | Delete a task                   |

### Query Parameters for GET /tasks

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search in title and description
- `status`: Filter by status (pending/in-progress/completed)

## 🧪 Running Tests

### Backend Tests

```bash
# Run unit tests
pnpm run test

# Run integration tests
pnpm run test:e2e

# Test coverage report
pnpm run test:cov
```

### Frontend Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for database
- [Next.js](https://nextjs.org/) for frontend
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
