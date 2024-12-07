This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Db Setup
To setup a file system storage that integrates with the appication, follow the steps:

1. create "sqlite.db"  at the root of the project
2. Run the command: `npx drizzle-kit generate` (This is required if the already generated migration is deleted. Ensure to remove target: "es5" from tsconfig as it does not run well with drizzle)
3. Run `npx drizzle-kit migrate` to migrate the generated table to sqlite.db file.

## Onion Architecture Setup
Please you'll have to forgive me, I am short of time and can't start configuring the containers and injections manually so I'd rather use a library that will help provide decorators for me.
Also, in this implementation, due to using a local sqlite.db file with better-sqlite3, I can only call db related logic in client components. Hence the use of route handlers here for basic setup. I have created an alternative method in a separate branch but it uses db from a docker container and a libsql library instead. There, I am able to use server actions coonveniently.

## The frustration with docker
- Apparently, docker setup has it's own issues if not going the traditional way of a simple nextjs application. Long story short, run "docker compose up" and tis application should run peacefully for now. However, if you want to bind volumes, please not directly in "/app". Maybe use "/src" instead so it doesn't override your actual build files in "/app" which will effectively prevent the last command in dockerfile from running with docker compose up.