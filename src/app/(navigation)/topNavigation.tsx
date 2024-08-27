"use client"

import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/assets/icon-384x384.png"
import classNames from "classnames";
import {  useEffect, useState } from "react";
import { useLoginContext } from "../(context)/LoginContext";
import { deleteCookie, getCookie } from "cookies-next";

export function TopNavigation() {
    const [menuToggle , setMenuToggle] = useState(false);
    const { isLogin , setIsLogin } = useLoginContext();

    useEffect(() => {
      const authToken = getCookie('Authorization');
      console.log(authToken);
      if(authToken){
        setIsLogin(true);
      }
    }, []);

    const handleLogout = () => {
      setIsLogin(false);
      deleteCookie('Authorization');
    }

    const checkCookieExpiration = () => {
      const authToken = getCookie('Authorization');
      
      if(!authToken){
        setIsLogin(false);
        deleteCookie('Authorization');
      }
    }

    if(isLogin){
      setInterval(checkCookieExpiration,600000);
    }
    
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
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                {/* <Link
                  href={"/cocktails"}
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  칵테일
                </Link>
                <Link
                  href={"/ingredients"}
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  재료 목록
                </Link>
                <Link
                  href={"/myingredients"}
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  나의 재료
                </Link> */}
              </div>
            </div>
            {/* 메뉴2 */}
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
          {/* <Link
                  href={"/cocktails"}
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={()=>setMenuToggle(false)}
                >
                  칵테일
                </Link>
                <Link
                  href={"/ingredients"}
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={()=>setMenuToggle(false)}
                >
                  재료 목록
                </Link>
                <Link
                  href={"/myingredients"}
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={()=>setMenuToggle(false)}
                >
                  나의 재료
                </Link> */}
        </div>
      </nav>
    );
  }

