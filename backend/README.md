# Task Manager API

A robust RESTful API built with NestJS and MongoDB for managing tasks. This application provides comprehensive task management capabilities with features like pagination, search, and filtering.

## Features

- 🚀 Complete CRUD operations for tasks
- 📝 Data validation using DTOs
- 🔍 Search and filtering capabilities
- 📄 Pagination support
- 🗄️ MongoDB integration
- 🐳 Docker support
- ✅ Unit and integration tests
- 📚 Swagger API documentation

## Prerequisites

- Node.js (v22 or later)
- MongoDB (v8)
- Docker and Docker Compose (optional)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Patel-Aman/task-management
cd task-manager/backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5000
```

## Running the Application

### Local Development

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

The API documentation is available via Swagger UI at: `http://localhost:5000/api`

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## API Endpoints

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
