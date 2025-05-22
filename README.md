# CDM Nexus Web Application

## Project Description

CDM Nexus is an initiative by Colegio de Muntinlupa dedicated to providing academic support, primarily through tutoring services, for students who find mathematics challenging. This web application serves as a centralized platform for CDM Nexus, facilitating:

* **Online Courses**: Access to structured math courses, including lessons, topics, lecture materials, quizzes, and exams.
* **In-Person Tutor Scheduling**: A system for students to schedule sessions with available tutors.
* **Tutor Application System**: A process for individuals to apply to become tutors.

The application aims to enhance the learning experience and provide robust support for both students and tutors within the Colegio de Muntinlupa community.

## Tech Stack

This project is built from scratch using the following modern web technologies:

* **Backend Framework**: [Node.js](https://nodejs.org/)
* **Frontend Framework**: [Svelte 5](https://svelte.dev/) with [SvelteKit 2](https://kit.svelte.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (as indicated by `@tailwindcss/vite` and `tailwindcss` version 4 in `package-lock.json`)
* **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (configured in `drizzle.config.ts`)
* **Database**: [PostgreSQL](https://www.postgresql.org/) (referenced in `docker-compose.yml` and `drizzle.config.ts`)
* **Authentication**: Custom-built using secure practices like password hashing with Argon2 and session management (see `src/lib/server/api/auth/`).
* **Development & Build Tools**: [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
* **Testing**: [Playwright](https://playwright.dev/) for End-to-End testing (see `e2e/demo.test.ts`) and [Vitest](https://vitest.dev/) for unit testing (inferred from `vite.config.ts` and `package-lock.json`).

## Project Structure

The project follows a standard SvelteKit application structure:

``` bash
./
├── .github/                  # GitHub specific workflows (e.g., Dependabot)
├── e2e/                      # End-to-End tests (e.g., Playwright demo test)
├── src/
│   ├── app.css               # Global CSS styles
│   ├── app.d.ts              # Global TypeScript declarations
│   ├── app.html              # Main HTML template
│   ├── hooks.server.ts       # SvelteKit server hooks
│   ├── lib/
│   │   ├── components/       # Reusable Svelte components
│   │   │   ├── global/       # Globally used components (e.g., App.svelte.ts)
│   │   │   ├── routes/       # Components specific to certain routes/pages
│   │   │   └── ui/           # General UI components (buttons, inputs, etc.)
│   │   └── server/           # Server-side logic
│   │       ├── api/          # Backend API implementations
│   │       │   ├── auth/     # Authentication related APIs (password, session, user management)
│   │       │   ├── courses/  # Courses CRUD and related functionalities)
│   │       │   └── tutoring/ # Tutoring scheduling and application APIs)
│   │       └── db/           # Database related logic
│   │           ├── schema/   # Drizzle ORM schema definitions for all tables (auth, courses, tutoring)
│   │           ├── seeds/    # Database seeding scripts and data (e.g., courses.json, exams.json)
│   │           └── index.ts  # Main database client export
│   └── routes/                 # SvelteKit routes defining pages and endpoints
│       ├── (auth)/             # Authentication routes (login, signup)
│       ├── (tutoring)/         # Tutoring related routes (apply, request)
│       ├── admin/              # Admin panel routes
│       └── ...                 # Other application routes
├── static/                   # Static assets (e.g., favicon.png)
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── .npmrc                    # NPM configuration file (e.g., engine-strict)
├── .prettierignore           # Files to be ignored by Prettier
├── .prettierrc               # Prettier configuration file
├── docker-compose.yml        # Docker Compose configuration for local development (PostgreSQL service)
├── drizzle.config.ts         # Drizzle ORM configuration
├── eslint.config.js          # ESLint configuration
├── netlify.toml              # Netlify deployment configuration
├── package-lock.json         # Records exact versions of dependencies
├── package.json              # Project metadata and dependencies
├── playwright.config.ts      # Playwright E2E testing configuration
├── svelte.config.js          # SvelteKit configuration (adapters, preprocessors, etc.)
├── tsconfig.json             # TypeScript compiler options
└── vite.config.ts            # Vite build tool configuration
```

## Key Features

* **User Authentication & Authorization**:
  * Secure sign-up and login functionality.
  * Password hashing using Argon2.
  * Session management with HTTP-only cookies.
  * Password strength checking and Pwned Passwords API integration for enhanced security.
  * Password reset functionality via OTP sent to CDM email.
  * Role-based access control (Student, Tutor, Admin) defined in `userRoleEnum.ts`.

* **Course Management (Admin)**:
  * CRUD operations for courses, lessons, topics, and lecture materials.
  * Management of quizzes and exam questions associated with courses.
  * Ability to publish/unpublish courses and their components.

* **Online Learning Platform (Student/Tutor)**:
  * Browse available courses.
  * View course structure: lessons, topics, and lecture materials (including YouTube videos).
  * Take quizzes and exams.

* **Tutoring Services**:
  * **Tutor Application**: Students can apply to become tutors; admins can review and manage these applications.
  * **Tutor Scheduling**: (Details to be expanded based on implementation)
    * Tutors can set their availability.
    * Students can request tutoring sessions.
    * Admins can oversee schedules and events.
  * Relevant schema includes `applications`, `events`, `schedules`, and `timeslots`.

* **Admin Dashboard**:
  * Overview of platform statistics (e.g., number of users, courses, tutors).
  * Management panels for users, courses, and tutoring applications.

## Database

* **Type**: PostgreSQL
* **ORM**: Drizzle ORM
* **Schema**:

  Defined in `src/lib/server/db/schema/` directory, organized by feature (auth, courses, tutoring). This includes enums for roles, statuses, etc.
* **Migrations**:

  Managed by Drizzle Kit (commands typically run via npm scripts).

* **Seeding**:

  Initial data for courses, questions, etc., is provided in `src/lib/server/db/seeds/data/` and loaded via scripts in `src/lib/server/db/seeds/index.ts`.

## Authentication

Authentication is handled server-side with robust security measures:

* User registration and login using CDM-specific email addresses (`@cdm.edu.ph`).
* Passwords are hashed using **Argon2** via `@node-rs/argon2`.
* Session tokens are generated (`generateSessionToken` in `src/lib/server/api/auth/utils.ts`) and stored as HTTP-only cookies (`sessionCookieName` in `src/lib/server/api/auth/session.ts`). Session validation and refresh logic is present.
* Password reset uses a token-based system with OTPs sent to the user's email (`passwordResetSessionCookieName` and related functions in `src/lib/server/api/auth/passwordReset.ts`).
* User roles (`admin`, `tutor`, `student`) are defined and used for authorization.
* Auth-related API logic is located in `src/lib/server/api/auth/`.

## API Endpoints

The backend API is organized by resource and functionality:

* `/api/auth/*`: Handles user registration, login, logout, password reset, and session management. (Code in `src/lib/server/api/auth/`)
* `/api/courses/*`: Manages CRUD operations for courses, lessons, topics, lecture materials, quizzes, and exams. (Code in `src/lib/server/api/courses/`)
* `/api/tutoring/*`: Handles tutor applications, event management, and scheduling. (Code in `src/lib/server/api/tutoring/`)

Specific endpoint definitions are co-located with their respective SvelteKit routes in the `src/routes/` directory, typically in `+page.server.ts` or `+server.ts` files.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (Check `.nvmrc` or `package.json` engines for specific version, though not explicitly found in snippets, `engine-strict=true` in `.npmrc` suggests version specificity is important).
* A Node.js package manager: npm, pnpm, or yarn.
* [PostgreSQL](https://www.postgresql.org/) server.
* [Docker](https://www.docker.com/) (Optional, for running PostgreSQL via `docker-compose.yml`).

### Environment Variables

Create a `.env` file in the root of the project. You can use `.env.example` as a template if one exists (not explicitly found in snippets, but common practice).
The `docker-compose.yml` and `drizzle.config.ts` refer to the following variables:

* `DATABASE_URL`: The connection string for your PostgreSQL database.
  * Example: `postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>`
* `DB_USER`: PostgreSQL username.
* `DB_PASSWORD`: PostgreSQL password.
* `DB_NAME`: PostgreSQL database name.
* `DB_PORT`: Port for the PostgreSQL service (e.g., `5432`).

Other environment variables might be required by the application (e.g., for email services, API keys). Consult the code or other developers for a complete list.

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd cdm-nexus # or your project's root directory
    ```

2. Install dependencies (using npm as an example, based on `package-lock.json`):

    ```bash
    npm install
    ```

### Database Setup

1. **Start PostgreSQL Server**:
    * If using Docker:

        ```bash
        docker-compose up -d
        ```

    * Otherwise, ensure your local or remote PostgreSQL server is running and accessible.

2. **Run Database Migrations**:
    Drizzle ORM is used for schema management. Migrations apply schema changes to the database.
    (Assuming a script in `package.json` like `npm run db:migrate` or similar, which would typically execute `drizzle-kit migrate`)

    ```bash
    # Example command, actual script might differ:
    npm run migrate # or npx drizzle-kit migrate
    ```

    Check `package.json` for the exact Drizzle migration command. The `drizzle-kit` dependency is present.

3. **Seed the Database** (Optional, but recommended for development):
    The project includes seeding scripts to populate the database with initial data (courses, users, etc.).
    (Assuming a script in `package.json` like `npm run db:seed`)

    ```bash
    # Example command, actual script might differ:
    npm run seed
    ```

    The seed data is located in `src/lib/server/db/seeds/data/` and logic in `src/lib/server/db/seeds/index.ts`.

### Running the Development Server

```bash
npm run dev
```

This will start the Vite development server, typically accessible at <http://localhost:5173> (or another port if specified).

### Running Tests

* **End-to-End Tests (Playwright):**

  (Assuming a script like test:e2e in package.json)

  ```bash
  npm run test:e2e # or npx playwright test
  ```

  Configuration is in playwright.config.ts. Demo test in e2e/demo.test.ts.

* **Unit/Integration Tests (Vitest):**

  (Assuming a script like test:unit or test in package.json)

  ``` bash
  npm run test # or npm run test:unit
  ```

  Vitest is listed as a dev dependency.

## Deployment

The project is configured for deployment on Netlify, as indicated by the netlify.toml file and the @sveltejs/adapter-netlify dependency.

The typical build command (as specified in netlify.toml) is:

``` bash
npm run build
```

Netlify will use the build directory as the publish directory.

## Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting to maintain code quality and consistency.

* **ESLint:** Configuration is in eslint.config.js. It uses plugins for TypeScript and Svelte.
* **Prettier:** Configuration is in .prettierrc and .prettierignore. It's set up to work with Svelte and Tailwind CSS.

To lint and format your code (assuming scripts in package.json):

``` bash
# Example commands
npm run lint
npm run format
```

## Contributing

As this project is being developed collaboratively, please adhere to the established coding standards and practices.

* Follow the project's ESLint and Prettier configurations.
* Write clear and concise commit messages.
* Ensure any new features or bug fixes are accompanied by relevant tests.
* Discuss significant changes or new features with the team before implementation.
