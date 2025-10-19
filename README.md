# NestJS + React Docker Project

A full-stack application with NestJS backend and React frontend, both containerized with Docker.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

## Quick Start

```bash
# Build and run containers on the base folder
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Environment Variables

Create `.env` files for the frontend and backend based on the `.env.example` files

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
