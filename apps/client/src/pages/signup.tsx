import React from "react";
import { Signup } from "ui";

async function handleSignup() {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User created:", data);
    } else {
      console.error("Error creating user");
    }
  } catch (error) {
    console.error("API request error:", error);
  }
}

function SignupComponent() {
  return (
    <div>
      <Signup />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default SignupComponent;
