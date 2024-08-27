import Image from "next/image";
import Link from "next/link";

export function FooterNavigation() {
    return (
      <footer className="mt-2 bottom-0 w-full z-10 fixed">
        <div className="max-w-6xl h-20 bg-gray-100 border rounded-tl-2xl rounded-tr-2xl mx-auto px-4 flex justify-between items-center">
        <Link
            href={"/"}
            className="py-5 px-3 text-gray-700 hover:text-gray-900"
          >
            홈
          </Link>
          <Link
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
          </Link>
        </div>
      </footer>
    );
  }

