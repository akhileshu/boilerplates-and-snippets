## 📁 Environment File Setup

This repo uses multiple `.env` files to separate configuration from secrets. Follow the conventions below to ensure security and clarity.

### 🔑 File Overview

| File           | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `.env`         | `DATABASE_URL`|
| `.env.local`   | Developer-specific secrets (tokens, passwords, etc.) |
| `.env.example` | Template showing all required env variable names     |

### ✅ Best Practices

* **Never commit secrets** in `.env` or `.env.local`
* Keep `.env.local` and `.env` **empty** in the repo
* `.env.example` must be **complete but without values**

### 🛡️ .gitignore Rule

```bash
# Ignore all env files
.env*

# But keep the example
!.env.example
```

### 🧪 Usage in Prisma

For Prisma to correctly read `DATABASE_URL`, use `.env`.

---
### update db name
POSTGRES_DB: ex :`dev-board` in compose.yml , in db url (.env)
