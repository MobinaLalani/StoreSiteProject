// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { LogIn } from "lucide-react";

// export default function LoginLink() {
//   const pathname = usePathname();

//   return (
//     <Link
//       href={`/login?next=${encodeURIComponent(pathname)}`}
//       className="
//         inline-flex
//         h-10
//         items-center
//         gap-1.5
//         rounded-xl
//         px-2.5
//         text-xs
//         font-bold
//         text-slate-700
//         hover:bg-slate-100
//         sm:h-11
//         sm:px-4
//         sm:text-sm
//       "
//     >
//       <LogIn size={17} />
//       ورود
//     </Link>
//   );
// }

import Link from "next/link";

function LoginLink() {
  return (
    <Link
      href="/auth"
      className="
        inline-block
        px-4 py-2
        rounded-4xl
        border border-black
        transition-all duration-300 ease-in-out
        hover:bg-black
        hover:text-white
        hover:border-white
        hover:shadow-md
        active:scale-95
      "
    >
      ورود / عضویت
    </Link>
  );
}

export default LoginLink;