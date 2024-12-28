# Unleash AI

Unleash AI deploy on vercel: [https://unleashai.sheltonma.top](https://unleashai.sheltonma.top)

[![IMAGE ALT TEXT](http://img.youtube.com/vi/LXRpLb70-9o/0.jpg)](https://www.youtube.com/watch?v=LXRpLb70-9o "Showcasing a SaaS AI Platform with Next.js 15, Stripe, Prisma, and Clerk")

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

DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRODUCT_ID=
STRIPE_PRICE_ID=
# To temporarily disable Stripe in your application, you can set an environment variable like this:
STRIPE_ENABLED=false
```

## Key Features

- Built with **Next.js 15** framework  
- UI crafted with **Shadcn UI** and **TailwindCSS**  
- Seamless user authentication powered by **Clerk** (supports OAuth and Email login)  
- API development using **Hono.js** with RPC integration  
- Advanced image generation leveraging the **Replicate API**  
- Database management with **Prisma**  
- Secure and flexible payment integration using **Stripe**  
- Efficient data fetching and caching with **React Query**  
