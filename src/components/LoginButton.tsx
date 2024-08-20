import { signIn } from "next-auth/react";
import React from "react";

function LoginButton() {
  return (
    <button onClick={() => signIn("azure-ad-b2c", {}, { prompt: "login" })} className="text-white">
      Login
    </button>
  );
}

export default LoginButton;
