"use client"

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/assets/icon-384x384.png"
import classNames from "classnames";
import { useState } from "react";

export function TopNavigation() {
    const [menuToggle , setMenuToggle] = useState(false);

    return (
        <nav className="bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              {/* 메뉴1 */}
              <div className="flex pace-x-4">
                <div>
                  <Link
                    href={"/"}
                    className="flex items-center py-5 px-2 text-gray-700"
                  >
                    <div className="w-10 md:w-20 cursor-pointer overflow-hidden rounded-full mr-3">
                      <Image
                        src={logoImage}
                        alt="logo"
                        className="object-contain w-full "
                      />
                    </div>
                    <span className="font-bold">Home</span>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    href={"/ingredients"}
                    className="py-5 px-3 text-gray-700 hover:text-gray-900"
                  >
                    Ingredients
                  </Link>
                  <a
                    href="#"
                    className="py-5 px-3 text-gray-700 hover:text-gray-900"
                  >
                    Pricing
                  </a>
                </div>
              </div>
              {/* 메뉴2 */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" className="py-5 px-3">
                  Login
                </a>
                <a
                  href="#"
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                >
                  Signup
                </a>
              </div>
              {/* mobile menu */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setMenuToggle(!menuToggle)}>
                  {menuToggle ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className={classNames("md:hidden", { hidden: !menuToggle })}>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Pricing
            </a>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Features
            </a>
          </div>
        </nav>
    );
  }

