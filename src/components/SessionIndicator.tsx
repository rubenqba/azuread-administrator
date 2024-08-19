"use client";
import { useSession } from "next-auth/react";
import React from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

function SessionIndicator() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <>
          <span className="text-white mr-4">
            Hello, {session.user?.displayName}
          </span>
          <LogoutButton className="inline-block" />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default SessionIndicator;
