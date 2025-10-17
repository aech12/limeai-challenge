# NestJS + React Docker Project

A full-stack application with NestJS backend and React frontend, both containerized with Docker.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd my-app

# Build and run containers
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Project Structure

```
my-app/
├── backend/          # NestJS server
├── frontend/         # React app
└── docker-compose.yml
```

## Available Commands

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart backend

# Build without starting
docker-compose build
```

## Development

### Backend
- Location: `backend/`
- Runs on port 3001
- Hot-reload enabled
- Edit files in `backend/src/`

### Frontend
- Location: `frontend/`
- Runs on port 3000
- Edit files in `frontend/src/`

## Environment Variables

Create a `.env` file in the root directory if needed:

```
NODE_ENV=development
```

## Troubleshooting

**Ports already in use:**
- Change ports in `docker-compose.yml` (e.g., `"3002:3000"`)

**Container won't start:**
- Check logs: `docker-compose logs backend`
- Rebuild: `docker-compose up --build`

**Frontend can't connect to backend:**
- Ensure backend service is running
- Check `REACT_APP_API_URL` environment variable

---

**Need help?** Check the logs with `docker-compose logs` or refer to the troubleshooting section above.


## Usefule docker commands

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build backend

# Run in detached mode
docker-compose up -d