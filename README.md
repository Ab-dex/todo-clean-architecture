# Next.js Project with Onion Architecture

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The project follows the principles of **Onion Architecture**, a design pattern that promotes a separation of concerns and enables scalability, maintainability, and testability.

## Project Summary

This project is designed using **Onion Architecture**, which organizes the code into layers that provide a clean separation between core business logic, application services, and external infrastructure (like database or API). The layers are structured as follows:

- **Core Layer (Inner Layer)**: Contains the core business logic and domain models (e.g., `ITodo`, `ModalType`).
- **Application Layer**: Contains services or use cases that interact with the domain models and coordinate business logic.
- **Infrastructure Layer**: Deals with external services, like database access (using `sqlite.db`), API requests, and libraries like `drizzle-kit` for migration.
- **Presentation Layer (Outer Layer)**: This is where the UI and React components reside. It contains the Next.js pages, components, and hooks for managing state.

### File Structure

Here’s an overview of the file structure:

```
/app
  /_contexts      # Context providers for application state management
  /_components    # Reusable React components (e.g., buttons, inputs)
  /_actions       # Functions to interact with backend (e.g., CRUD for todos)
  /_contexts/context.types.ts  # Types for application state and actions
  /domain         # Core domain models (e.g., ITodo, ModalType)
  /pages          # Next.js page components
  /utils          # Utility functions and helpers
/public           # Static assets (images, fonts, etc.)
/asests           # App assets (images)
/di               # Dependency injecttion container aand associated bindings
/drizzle          # All drizzle configurations and types
  /migrations     # All database migrations created
/src
  /utils          # Utility functions
  /application    # Application layer of the onion architecture containing use cases and its interfaces
  /domain           # All domain entities including models, dtos and repository interfaces for contract with daatabase
  /infraastructure  # Infrastructure layer including the concrete implementation of domain repositories. 
  /interface-adaapters # Here lies the controllers
```

The project follows a modular structure, allowing easy modifications and extensions as per the Onion Architecture. Each layer has a clear responsibility, minimizing dependencies and making testing easier.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Db Setup

To set up the file system storage that integrates with the application, follow these steps:

1. Create a `sqlite.db` file at the root of the project.
2. Run the command: `npx drizzle-kit generate` (This is required if the already generated migration is deleted. Ensure to remove `target: "es5"` from `tsconfig` as it does not run well with Drizzle).
3. Run `npx drizzle-kit migrate` to migrate the generated table to the `sqlite.db` file.

## Onion Architecture Setup

This application follows the **Onion Architecture** to structure the project into layers with clear responsibilities:

- **Core Layer**: Contains domain models (e.g., `ITodo`), representing the core business logic.
- **Application Layer**: Contains use cases and application services that interact with the core models and provide business logic.
- **Infrastructure Layer**: Handles communication with external systems like databases (SQLite) and external APIs.
- **Presentation Layer**: Manages the React components, views, and UI state using Next.js.

### Challenges with Docker

While Docker is a great solution for containerizing applications, setting it up with Next.js and integrating it with SQLite and Drizzle has proven tricky. If you're not following the standard Next.js app structure, you might encounter issues.

For the Docker setup, use the following steps:

1. Run `docker compose up` to start the application in Docker. This should run smoothly.
2. If you plan to bind volumes, avoid doing it directly in `/app`. Instead, use `/src` to prevent overriding your build files in `/app`, which could prevent the final Docker command from running properly.

Note: An alternative method is available in a separate branch, where Docker is used with a different database setup (Dockerized db with `libsql`). This allows the use of server actions, which works more smoothly in server-side operations.

### Database File Permissions

In this project, I had to change the permissions and ownership of both the `sqlite.db` file and the containing `/app` directory in order to allow the application to have write access to the database file. This was necessary to avoid permission issues when interacting with the SQLite database within the Docker container.

To ensure proper access, the `sqlite.db` file is set to be owned by the `nextjs` user and the `nodejs` group. Additionally, the directory containing the database was given appropriate read, write, and execute permissions for the user and group.