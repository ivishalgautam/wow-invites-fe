"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
  redirect("/login");
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`dark:bg-dark flex w-full items-center bg-primary`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="relative z-10 w-32 max-w-full">
            <Link
              href="/#"
              className={`absolute -top-6 inline-block w-full text-xl`}
            >
              <img src={"/logo.png"} alt="logo" />
            </Link>
          </div>

          <div className="flex w-full items-center justify-between px-4 py-4 lg:py-0">
            <div className="mx-auto">
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`dark:bg-dark-2 absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-primary px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                }`}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/categories">Categories</ListItem>
                  <ListItem NavLink="/templates">Templates</ListItem>
                </ul>
              </nav>
            </div>

            <div className="justify-end space-x-1 pr-16 sm:flex lg:pr-0">
              <Link
                href="/#"
                className={`text-dark rounded-md border border-transparent px-7 py-3 font-medium text-white transition-colors hover:border-white`}
              >
                Sign in
              </Link>

              <Link
                href="/#"
                className="text-text-primary rounded-md bg-primary bg-white px-7 py-3 text-base font-medium transition-all hover:bg-white/90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link
          href={NavLink}
          className={`text-body-color hover:text-dark flex py-2 font-medium text-white lg:ml-12 lg:inline-flex ${buttonVariants({ variant: "link" })}`}
        >
          {children}
        </Link>
      </li>
    </>
  );
};
