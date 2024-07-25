"use client";

import { useSession, signIn } from "next-auth/react";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-white">
            Home
          </a>
          <a href="/users" className="ml-4 text-white">
            Users
          </a>
        </div>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">
                Hello, {session.user?.name ?? "dear user"}!
              </span>
                <LogoutButton
                  tenant="dardeus3"
                  flowName="B2C_1_ONE"
                  redirectUrl="http://localhost:3000"
                  className="inline-block"
                />
            </>
          ) : (
            <button onClick={() => signIn()} className="text-white">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
