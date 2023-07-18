# mychat-react-app

[application online demo](https://www.wewehappy.com)


mychat-react-app is a chat application built with React 18 that allows users to communicate in real-time. It works in conjunction with the mychat-resource-server to handle authentication and manage chat-related resources.

## Features

- Real-time chat functionality with SockJS and StomJS.
- User authentication and authorization using OAuth2 or email/password authentication.
- Responsive design for optimal viewing on different devices.

## Prerequisites

- Node.js installed on your system.
- Access to the  mychat-resource-server (https://github.com/Marcwe25/mychat-ressource-server.git) or a deployed instance for authentication.

## Getting Started

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/mychat-react-app.git
   ```

2. Navigate to the project directory:

   ```shell
cd mychat-react-app
   ```

3. Install the dependencies:

   ```shell
npm install
   ```

4. Configure the myChat-resource-server:

    Open the src\utility\constsURL.js file in the project root directory and provide the necessary configuration values. Update the "server_url" variable with the URL of the  mychat-resource-server.

5. Start the development server:

```shell
npm start
```
The app will start running, and you can access it by opening http://localhost:3000 in your browser.

Usage
Register and log in to the MyChat React App using your credentials.
Start chatting with other users who are online.
Enjoy real-time communication and stay connected!
Deployment
To deploy the MyChat React App to a production environment, build the app using:

```shell
npm run build
```
This will create a build directory with optimized and minified production-ready code. You can then deploy the contents of this directory to your hosting platform or server.

Make sure to configure the appropriate environment variables for your production environment.