# Task Management App

## Overview

This project includes a Directus configuration and a Svelte project integrated with Flowbite. 

## Setup

### 1. Directus Configuration

1. **Clone Directus**:
   - Follow Directus setup instructions to install Directus.
   - Copy the configuration files from the `directus-config` folder to your Directus project directory.

2. **Configure Directus**:
   - Update the Directus configuration as needed (e.g., database settings).
   - Ensure the .env file in the Directus directory is properly configured with your database and other environment settings.

3. **Database Setup**:
   - Create a new database for Directus. You can use MySQL, PostgreSQL, or another supported database.


### 2. Svelte Project with Flowbite Integration

1. **Clone the Repository**:
   - Clone this repository to your local machine:
     ```bash
     git clone https://github.com/rakesh-baddipadaga/taskmangement.git
     ```

2. **Navigate to Project Directory**:
   - Change to the Svelte project directory:
     ```bash
     cd your-repository
     ```

3. **Install Dependencies**:
   - Install the required dependencies:
     ```bash
     npm install
     ```

4. **Run the Project**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:8080` to view the application.

## Additional Instructions

- **Database Setup**: Ensure that the Directus database is properly set up and connected.
- **Environment Variables**: Configure any necessary environment variables for Directus and Svelte.
- **Build and Deploy**: For production, build the Svelte project using `npm run build` and deploy accordingly.
