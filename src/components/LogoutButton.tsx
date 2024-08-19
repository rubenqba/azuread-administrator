import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton = ({ className }: Readonly<LogoutButtonProps>) => {

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className={className}>
      <Link onClick={handleLogout} href={'/api/logout'} className="ml-4 text-white">Logout Full</Link>
    </div>
  );
};

export default LogoutButton;
