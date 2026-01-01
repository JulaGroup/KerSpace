"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import "../styles/globals.css";
import Image from "next/image";
const NavBar = () => {
  const router = useRouter();
  const isDashboard = useSelectedLayoutSegment();

  const [activePage, setActivePage] = useState("");
  // const [showSignIn, setShowSignIn] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    setActivePage(window.location.pathname.split("/")[1]);
    // if (isLoaded) {
    //   setShowSignIn(false);
    //   setShowSignUp(false);
    // }
  }, []);

  const handleClick = (page: string) => {
    setActivePage(page);
  };

  // function handleSignIn() {
  //   setShowSignIn(true);
  // }

  // function handleSignUp() {
  //   setShowSignUp(true);
  // }

  //Password:@123MUha
  return (
    isDashboard !== "(dashboard)" && (
      <nav className="w-full bg-white px-4 py-2 flex justify-between items-center">
        {/* {showSignIn && <SignInCompo setShowSignIn={setShowSignIn} />}
        {showSignUp && <SignUpCompo setShowSignUp={setShowSignUp} />} */}
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <div className="list flex gap-14 font-semibold text-lg max-sm:hidden">
          <Link
            className={`hover-underline-animation text-black ${
              activePage === "" ? "active-link" : ""
            }`}
            href="/"
            onClick={() => handleClick("")}
          >
            Home
          </Link>
          <Link
            className={`hover-underline-animation text-black ${
              activePage === "properties" ? "active-link" : ""
            }`}
            href="/properties"
            onClick={() => handleClick("properties")}
          >
            Properties
          </Link>
          <Link
            className={`hover-underline-animation text-black ${
              activePage === "agents" ? "active-link" : ""
            }`}
            href="/agents"
            onClick={() => handleClick("agents")}
          >
            Agents
          </Link>
          <Link
            className={`hover-underline-animation text-black ${
              activePage === "blog" ? "active-link" : ""
            }`}
            href="/blog"
            onClick={() => handleClick("blog")}
          >
            Blog
          </Link>
        </div>
        <div className="flex gap-5 justify-center">
          <button
            className="bg-blue-600 py-2 hover:bg-blue-500 duration-150 ease-in transition px-3 text-white rounded-lg"
            onClick={() => router.push("/dashboard")}
          >
            Go To Dashboard
          </button>

          <div className="flex gap-3 max-sm:hidden">
            <button
              onClick={() => router.push("/auth?mode=login")}
              className="button-31"
              role="button"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth?mode=signup")}
              className="button-31"
              role="button"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    )
  );
};

export default NavBar;
