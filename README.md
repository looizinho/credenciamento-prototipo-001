# EventMaster

EventMaster is a Next.js application for event credentialing and management.

## Features

- **Event Management**: Create, view, update, and delete events.
- **User Authentication**: Secure login and registration with email/password and Google.
- **Rich Content**: Use a rich text editor for event descriptions.
- **Dashboard**: View key metrics about your events at a glance.
- **Responsive Design**: Works on all devices, from mobile to desktop.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Forms**: React Hook Form & Zod
- **Database**: MongoDB & Mongoose
- **Authentication**: NextAuth.js

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- MongoDB instance (local or remote)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd eventmaster
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the necessary environment variables. You can use the `.env.example` file as a template:

    ```bash
    cp .env.example .env.local
    ```

    Now, open `.env.local` and fill in your details:
    - `MONGODB_URI`: Your MongoDB connection string.
    - `NEXTAUTH_SECRET`: A secret key for NextAuth.js. You can generate one with `openssl rand -base64 32`.
    - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Your Google OAuth credentials (optional, for Google login).

4.  **Seed the database:**
    To populate the database with some initial sample data (a demo user, events, and contact messages), run the seed script:
    ```bash
    npm run seed
    ```
    The credentials for the demo user will be printed in the console.

### Running the Development Server

Once the setup is complete, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase.
- `npm run seed`: Populates the database with initial data.
