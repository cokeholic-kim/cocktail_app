import Image from "next/image";
import Link from "next/link";
import logoImage from "/public/assets/icon-384x384.png"

export function TopNavigation() {
    return (
      <header className="fixed top-0 w-full h-3 md:h-8 z-10 p-5 flex justify-between items-start ease-in transition-all bg-slate-500">
        <div className="w-10 md:w-20 cursor-pointer overflow-hidden rounded-full">
          <Image src={logoImage} alt='logo' className="object-contain w-full "/>
        </div>
        <div>
          <Link href={"/"}>
            Home
            </Link>
            <Link href={"/posts"} className="mx-1">
            posts
            </Link>
        </div>
      </header>
    );
  }

