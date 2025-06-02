# Next.js Meetups Platform

![Project Demo GIF]([placeholder.gif])

## Description

This project is a web application for discovering and managing local meetups. Users can browse a list of available meetups, view details for specific events, and add new meetups to the platform. The main goal is to provide a simple and efficient way for users to find and announce meetups related to their interests.

This application is built using Next.js, a popular React framework, which allows for server-side rendering and static site generation for optimal performance. React is used for building the interactive user interface components. MongoDB serves as the backend database, storing all meetup information. Data fetching is primarily handled using Next.js's `getStaticProps` for pre-rendering meetup lists, ensuring fast load times.

## Installation & Setup

To get this project up and running on your local machine, follow these steps:

1.  **Prerequisites:**
    *   Ensure you have Node.js (which includes npm) installed. You can download it from [nodejs.org](https://nodejs.org/). If you prefer Yarn, ensure that's installed as well.
    *   Access to a MongoDB database (either local or a cloud service like MongoDB Atlas).

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/jndev0/nextjs-meetups.git
    cd nextjs-meetups
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Configuration:**
    *   This project requires a MongoDB connection string to fetch and store meetup data.
    *   Create a `.env.local` file in the root of the project.
    *   Add your MongoDB connection string to this file:
        ```
        MONGODB_URI="your_mongodb_connection_string_here" 
        ```

5.  **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the development server, typically at `http://localhost:3000`.

## Usage

Once the application is running:
*   Open your web browser and navigate to `http://localhost:3000` to see the list of meetups.
*   Click on a meetup to view its details.
*   Navigate to `/new-meetup` to add a new meetup to the platform.

---