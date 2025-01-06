# Firebase Email Actions Handler

A minimal Node.js application that wraps Firebase Authentication to handle email actions like password reset, email verification, and email recovery. Built with Express.js and Firebase, this app automates the process of handling these emails, saving time and effort in any Firebase-related projects.

### Features

- **Automates Firebase Email Actions**: Handles password reset, email verification, and email recovery.
- **Express.js API**: Lightweight server for routing.
- **Pre-built HTML Templates**: For common email actions.
- **Reusable**: Easily integrate into other Firebase-based apps.
- **Self-hostable**: Dockerized for easy deployment and scaling.

### Usage

This app automates the handling of Firebase email actions (like password reset or email verification).

If you prefer not to set up your own server, you can use the hosted version. Just follow these steps:

1. **Create a Firebase Project**
   - Go to the Firebase console and create a new Firebase project.
2. **Enable Email/Password Authentication**

   - Navigate to **Authentication** > **Sign-in method** > **Email/Password**, and enable it.

3. **Add Your Node.js App URL to Firebase**

   - In the Firebase console, go to **Settings** > **Authorized Domains**, and add your Node.js application URL (either my hosted URL or your custom domain).

4. **Update Action URL in Firebase Console**
   - In the **Templates** section of Firebase Authentication, click the **edit icon** for the email actions.
   - Customize the action URL by entering the following format:
     ```
     https://your-nodejs-hosting-url/__/auth/action
     ```
   - Save the settings.

#### Frontend Integration

Once your Node.js app is up and running, you need to configure the Firebase authentication to redirect users to this app for email actions.

1. **Firebase Initialization**
   Initialize Firebase in your frontend application. You can follow the [Firebase documentation](https://firebase.google.com/docs/web/setup) for this.

2. **Set Email Action URL in Firebase**
   In your frontend code, you only need to set the Firebase email action URLs to point to your Node.js app:

   ```javascript
   const actionCodeSettings = {
     url: "https://your-nodejs-hosting-url", // Replace with your hosted Node.js app URL
   };
   ```

3. **Example Snippet**
   You can use the example snippet provided in the `example-snippets` folder to get an idea of how it should work.

---

### Installation

To install and run the app locally, follow these steps:

1. **Clone the Repo:**

   ```bash
   $ git clone https://github.com/samay15jan/firebase-email-handler
   ```

2. **Install Dependencies:**

   ```bash
   $ cd firebase-email-handler && npm install
   ```

3. **Run the App:**
   ```bash
   $ npm start
   ```

#### Hosting Your Own Dockerized Version

You can also deploy your own instance of the app by running it in a Docker container. Here's how:

1. **Clone the Repo**

   ```bash
   $ git clone https://github.com/samay15jan/firebase-email-handler
   ```

2. **Build the Docker Image**

   - Navigate to the project directory and build the Docker image:

   ```bash
   $ cd firebase-email-handler
   $ docker build -t firebase-email-handler .
   ```

3. **Push to Docker Hub (Optional)**

- If you'd like to share your image, you can push it to Docker Hub which is easy if u want to host it later:

  ```bash
  $ docker push your-dockerhub-username/firebase-email-handler
  ```

4. **Run the Docker Container**

- You can run the app locally or on your cloud provider (e.g., Google Cloud, Azure, or Render):

  ```bash
  $ docker run -p 3000:3000 firebase-email-handler
  ```

5. **Deploy to Cloud Hosting**

- You can use cloud platforms such as **Render**, **Google Cloud**, or **Azure** to deploy your Docker container.

### License

[MIT License](https://github.com/samay15jan/firebase-email-handler/blob/main/LICENSE)

---

### Notes:

- **For More Information**: Refer to the official [Firebase Documentation](https://firebase.google.com/docs/auth) for detailed guidance on Firebase Authentication and email handling.

---
