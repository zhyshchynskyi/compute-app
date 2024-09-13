## ⚡ Quick Start

### Pre-requisites

- Docker 🐳
- Docker Compose

1. **Clone the repository:**

   ```bash
   git clone https://github.com/l3vels/L3AGI.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd apps/server
   ```

3. **Setup Git Hooks**

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

4. **Create `.env` file from `.env.example` in `apps/server` directory and configure**
5. **Create `.env` file from `.env.example` in `zep` directory and configure**

6. 🐳 **Run Docker Compose:**

   ```bash
   docker compose up --build
   ```

   This will build and start both the React UI and FastAPI services.

## Access the Services

- **React UI**: Open `http://localhost:3000` in your browser.
- **FastAPI Server**: Open `http://localhost:4000` in your browser or API client.

## Directory Structure

```
.
├── apps/
│ ├── server/ # Python FastAPI Server
│ └── ui/ # React UI Application
└── docker-compose.yml # Main Docker Compose File
```

## Tech Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-6f7f6f?style=for-the-badge&logo=SQLAlchemy&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Troubleshooting

- If you encounter issues when starting the services, ensure Docker and Docker Compose are installed and up to date.
- Check the logs for any service-specific errors.

## 🚧 In Progress!

This initiative is currently in its developmental phase and might have some inconsistencies. We value your patience and comprehension. Should you face any challenges, kindly consult our list of existing issues first. If you can't find a relevant one, please open a new issue explaining the concern you faced. Your backing means a lot to us! Thank you!
