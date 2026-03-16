"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { BASE_URL } from "../(common)/common";
import { logWarn } from "../(common)/safeLogger";
import { useLoginContext } from "../(context)/LoginContext";

export function TopNavigation() {
    const [menuToggle, setMenuToggle] = useState(false);
    const { isLogin, setIsLogin } = useLoginContext();

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

            logWarn("Session check returned unexpected status", response.status);
        } catch (error) {
            logWarn("Session check request failed", error);
        }
    };

    useEffect(() => {
        void checkLoginSession();
    }, [setIsLogin]);

    useEffect(() => {
        if (!isLogin) {
            return;
        }

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
                logWarn("Logout API returned error", response.status);
                return;
            }

            setIsLogin(false);
            setMenuToggle(false);
        } catch (error) {
            logWarn("Logout API request failed", error);
        }
    };

    return (
        <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={"/"} className="flex items-center py-3 text-gray-700" aria-label="Home">
                            <div className="w-10 h-10 md:w-20 md:h-20 cursor-pointer overflow-hidden rounded-full mr-3">
                                <Image
                                    src="/assets/icon-384x384.png"
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </Link>
                    </div>
                    {!isLogin ? (
                        <div className="hidden md:flex items-center space-x-1">
                            <Link href={"/login"} className="inline-flex items-center min-h-[44px] px-3">
                                Login
                            </Link>
                            <Link
                                href={"/join"}
                                className="inline-flex items-center min-h-[44px] px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                            >
                                Signup
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-1">
                            <button
                                type="button"
                                className="inline-flex items-center min-h-[44px] px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    <div className="md:hidden flex items-center text-black">
                        <button
                            type="button"
                            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center"
                            aria-expanded={menuToggle}
                            aria-label={menuToggle ? "메뉴 닫기" : "메뉴 열기"}
                            onClick={() => setMenuToggle(!menuToggle)}
                        >
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
                {!isLogin ? (
                    <>
                        <Link
                            href={"/login"}
                            className="block py-3 px-4 text-sm hover:bg-gray-200 min-h-[44px]"
                            onClick={() => setMenuToggle(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href={"/join"}
                            className="block py-3 px-4 text-sm hover:bg-gray-200 min-h-[44px]"
                            onClick={() => setMenuToggle(false)}
                        >
                            Join
                        </Link>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block py-3 px-4 text-sm hover:bg-gray-200 min-h-[44px]"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
