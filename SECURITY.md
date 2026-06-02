# Security checklist — JN Parts website

## Required environment variables (production)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form submissions |
| `CLOUDINARY_*` | Image hosting (if uploads used) |
| `UPLOAD_API_SECRET` | **Required** to allow `POST /api/upload` |

## Upload API

Public uploads are **disabled by default**. To upload from an admin tool:

```http
POST /api/upload
Authorization: Bearer <UPLOAD_API_SECRET>
Content-Type: multipart/form-data
```

Without a valid secret, requests receive `401 Unauthorized`.

## Headers (middleware)

- Content-Security-Policy
- Strict-Transport-Security (production)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy

## Deployment

1. Set all secrets in Vercel/hosting dashboard — never commit `.env`.
2. Run `npm audit` before each release; keep `next` patched.
3. Do not expose `UPLOAD_API_SECRET` or `CLOUDINARY_API_SECRET` to the client.

## Contact form

- Honeypot field (`website`) blocks basic bots.
- Input length limits and email validation on submit.
