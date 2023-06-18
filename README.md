# AnonPlay

AnonPlay is a web application built with Next.js, Tailwind CSS, Pusher, and Hyperbeam. It enables users to join private rooms anonymously and establish peer-to-peer connections for built-in chat and cloud computer streaming. The app is designed to facilitate group watch parties, allowing users to collectively control and interact with a shared cloud computer.

## Features

- Anonymous user authentication: Users can join private rooms without the need for registration or login.
- Peer-to-peer connections: The app establishes secure connections between users for real-time chat and cloud computer streaming.
- Chat functionality: Users can chat with other participants in the room during streaming sessions.
- Cloud computer streaming: Participants can collectively control the cloud computer, including pausing, playing, and navigating.

## Technologies Used

- Next.js: A React framework for building server-rendered applications.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Pusher: A real-time communication platform for implementing chat functionality.
- Hyperbeam: A library for establishing peer-to-peer connections for cloud computer streaming.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cloud-streaming-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cloud-streaming-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:
   - Create a `.env.local` file in the root directory of the project.
   - Define the following environment variables:
     ```
     PUSHER_APP_ID=YOUR_PUSHER_APP_ID
     PUSHER_KEY=YOUR_PUSHER_KEY
     PUSHER_SECRET=YOUR_PUSHER_SECRET
     PUSHER_CLUSTER=YOUR_PUSHER_CLUSTER
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to access the app.

## Usage

1. Join a room:
   - Access the web app through the provided URL.
   - Enter a room ID or create a new one.
   - You will be assigned an anonymous username upon joining the room.

2. Interact with the cloud computer:
   - Use the provided controls to pause, play, and navigate the cloud computer.
   - Your actions will be synced with other participants in real-time.

3. Chat with other participants:
   - Utilize the chat functionality to communicate with other users in the room.
   - Enter your message in the input field and press Enter to send it.
   - Chat messages will be displayed in real-time to all participants.

## Contributing

Contributions to the Cloud Streaming App are welcome! If you find any bugs, have feature requests, or would like to make improvements, please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)

