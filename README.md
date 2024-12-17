# Unleash AI

Unleash AI deploy on vercel: [https://unleashai.sheltonma.top](https://unleashai.sheltonma.top)

## Installation

```shell
pnpm install
```

run

```shell
pnpm run dev
```

Environment Variables

```.env
// .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

OPENROUTER_AI_KEY=
DEFAULT_MODEL=

NEXT_PUBLIC_APP_URL=http://localhost:3000

REPLICATE_API_TOKEN=
REPLICATE_DEFAULT_MODEL_ID=
```

## Key Features

- Built with **Next.js 15** framework
- Stylish UI using **Shadcn UI** and **TailwindCSS**
- User Authentication via **Clerk** (Supports OAuth and Email)
- RESTful API built with **Hono.js**
- Image Generation powered by **Replicate API**
