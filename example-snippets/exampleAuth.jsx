import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function ExampleAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const actionCodeSettings = { url: "YOUR_HANDLER_URL" }; // Update with your node.js application handler URL

  // Handle Google login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        // Handle success (e.g., redirect)
      })
      .catch(() => {
        setError("Error occurred during Google login.");
      });
  };

  // Handle password reset
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        // Handle success (e.g., notify user)
      })
      .catch(() => {
        setError("Error sending password reset email.");
      });
  };

  // Handle email login
  const handleEmailLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          sendEmailVerification(auth.currentUser, actionCodeSettings);
          setError("Please verify your email.");
        } else {
          // Handle successful login
        }
      })
      .catch(() => {
        setError("Error logging in with email.");
      });
  };

  // Handle email signup
  const handleEmailSignUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser, actionCodeSettings);
        setError("Verification email sent! Please check your inbox.");
      })
      .catch(() => {
        setError("Error during sign-up.");
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleEmailLogin}>Login</button>
      <button onClick={handleEmailSignUp}>Sign Up</button>
      <button onClick={handleResetPassword}>Forgot Password</button>

      <button onClick={handleGoogleLogin}>Login with Google</button>

      {error && <div>{error}</div>}
    </div>
  );
}
