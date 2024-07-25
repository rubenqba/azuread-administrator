import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type LogoutButtonProps = {
  tenant: string;
  flowName: string;
  redirectUrl: string;
  className?: string;
};
const LogoutButton = ({
  tenant,
  flowName,
  redirectUrl,
  className,
}: Readonly<LogoutButtonProps>) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/api/logout");
  };

  return (
    <div className={className}>
      <button onClick={handleLogout} className="text-white">Logout</button>
    </div>
  );
};

export default LogoutButton;
