# Discord Clone

Welcome to the Discord Clone project! This is a fully functional Discord clone that aims to replicate the core features of the popular communication platform, Discord. Whether you're a developer looking to contribute, or a user interested in trying out the clone, we're excited to have you on board!

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- Real-time chat functionality
- Voice and video calls
- Server creation and management
- User authentication and authorization
- Message and emojis
- and more...

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or higher)
- npm (Node Package Manager) installed
- Postgres installed and running locally or remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vishal32004/Discord-clone.git
   ```

2. Change into the project directory:

   ```bash
   cd discord-clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set up the following variables:

   ```
   DATABASE_URL=YOUTDATABASEURL
   JWT_SECRET=YOURSECRETKEY
   UPLOADTHING_SECRET=UPLOADTHINGSETUP
   UPLOADTHING_APP_ID=UPLOADTHINGSETUP
   LIVEKIT_API_KEY=YOURLIVEKITKEY
   LIVEKIT_API_SECRET=YOURLIVEKITSECRETKEY
   NEXT_PUBLIC_LIVEKIT_URL=YOURLIVEKITURL
   ```

   Replace These Fields With Your Keys and values

5. Run Prisma commands:
   Run the following Prisma commands for generating necessary files and updating the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Start the application:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000` by default.

## Usage

- Register an account or log in if you already have one.
- Create or join servers.
- Explore the various channels within servers.
- Enjoy real-time text, voice, and video communication.

## Acknowledgments

- Thanks to the developers of Discord for providing inspiration for this project.
- Special thanks to the open-source community for their valuable contributions.

Happy coding! 🚀