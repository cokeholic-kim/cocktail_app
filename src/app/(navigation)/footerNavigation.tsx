import Image from "next/image";
import Link from "next/link";

export function FooterNavigation() {
    return (
      <header className="bottom-0 w-full h-3 md:h-8 z-10 p-5 flex justify-between items-start ease-in transition-all bg-slate-500">
        <div className="w-10 md:w-20 cursor-pointer overflow-hidden rounded-full">
        </div>
        <div>
          <Link href={"/"}>
            ingredients
            </Link>
            <Link href={"/posts"} className="mx-1">
            drink
            </Link>
            <Link href={"/posts"} className="mx-1">
            my
            </Link>
        </div>
      </header>
    );
  }

