"use client"

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/assets/icon-384x384.png"
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLoginContext } from "../(context)/LoginContext";
import { BASE_URL } from "../(common)/common";

export function TopNavigation() {
    const [menuToggle , setMenuToggle] = useState(false);
    const { isLogin , setIsLogin } = useLoginContext();

    const checkLoginSession = async () => {
        try {
            const response = await fetch(`${BASE_URL}/my`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsLogin(true);
                return;
            }

            if (response.status === 401 || response.status === 403) {
                setIsLogin(false);
                return;
            }

            console.error(`세션 조회 실패(status: ${response.status}). 네트워크 또는 서버 오류로 기존 로그인 상태를 유지합니다.`);
        } catch (error) {
            console.error("세션 조회 중 오류가 발생했습니다:", error);
        }
    };

    useEffect(() => {
        void checkLoginSession();
    }, [setIsLogin]);

    useEffect(() => {
      if (!isLogin) return;

      const timer = setInterval(() => {
        void checkLoginSession();
      }, 600000);

      return () => clearInterval(timer);
    }, [isLogin, setIsLogin]);

    const handleLogout = async () => {
      try {
        const csrfToken = document.cookie
          .split("; ")
          .find((item) => item.startsWith("XSRF-TOKEN="))
          ?.split("=")[1];

        const headers = csrfToken
          ? { "X-CSRF-Token": decodeURIComponent(csrfToken) }
          : undefined;

        const response = await fetch(`${BASE_URL}/logout`, {
          method: "POST",
          credentials: "include",
          ...(headers ? { headers } : {}),
        });

        if (!response.ok) {
          console.error(`로그아웃 요청 실패(status: ${response.status})`);
          return;
        }

        setIsLogin(false);
      } catch (error) {
        console.error("로그아웃 API 호출 실패:", error);
      }
    };

    return (
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* logo section */}
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
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
              </div>
            </div>
            {/* auth actions */}
            {!isLogin ? (
              <div className="hidden md:flex items-center space-x-1">
                <Link href={"/login"} className="py-5 px-3">
                  Login
                </Link>
                <Link
                  href={"/join"}
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-1">
                <div
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                  onClick={handleLogout}
                >
                  logout
                </div>
              </div>
            )}
            {/* mobile menu */}
            <div className="md:hidden flex items-center text-black">
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
        <div className={classNames("md:hidden text-black", { hidden: !menuToggle })}>
        {!isLogin ? 
                (<>
                  <Link href={"/login"} className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={()=>setMenuToggle(false)}>Login</Link> 
                  <Link href={"/join"} className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={()=>setMenuToggle(false)}>Join</Link>
                </>)
                : 
                (<div onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-gray-200" >Logout</div>)
                }
        </div>
      </nav>
    );
}
