# Video Sharing FE

[Project overview](https://github.com/tnkttruong/video_sharing)

## Tech Stack

- [ReactJS](https://reactjs.org/): A JavaScript library for building user interfaces. It's fast, scalable, and simple.
- [TypeScript](https://www.typescriptlang.org/): TypeScript is a statically compiled language to write clear and simple JavaScript code. It brings a set of new features to JavaScript such as Static Typing, Interfaces, and Generics.
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database): A NoSQL cloud database to store and sync data in real-time. It provides real-time update and scaling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Firebase Realtime Database. If not, follow this [guide](https://firebase.google.com/docs/database/setup) to create one.
- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).

## Installation

1. Clone the repository:
```
git clone git@github.com:tnkttruong/video_sharing_FE.git
```
2. Navigate into the project directory:
```
cd video_sharing_FE
```
3. Install the dependencies:
```
npm install
```

## Configuration

Update the `.env` file with your Firebase Realtime Database configuration data. You can find the template in `.env.example` file.

## Running the Application

To run the application:

```
npm run start
```

Running Tests
```
npm run test
```

## Using Docker:
docker build -f Dockerfile.dev -t fe_video_sharing_dev .

docker run  -p 3000:3000 --name video_sharing_web_container --rm -v "$(pwd)":/app  fe_video_sharing_dev:latest

Please ensure you have Docker installed. If not, follow this [guide](https://docs.docker.com/get-docker/) to install it.

## Deployment

1. SSH into your deployment server:

    ```
    ssh your_username@your_server_ip
    ```

2. Navigate to the directory where you want to deploy your application:

    ```
    cd /path/to/your/directory
    ```

3. Run the deployment script:

    ```
    ./deploy.sh
    ```
Replace `your_username` with your actual username, `your_server_ip` with the IP address of your server, and `/path/to/your/directory` with the path to the directory where you want to deploy the application. The `deploy.sh` script should be present in that directory.

You can change DEPLOY_BRANCH in deploy.sh to your desired branch 

## Troubleshooting

### Issue: Errors during `npm install`

If you encounter errors during the `npm install` step, you may try to force the installation.

#### Solution

Run the following command to force the installation:

```
npm install --force
```