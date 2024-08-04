"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const routes = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/events/all", name: "All Events" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9">
      <Logo />

      <nav className="h-full">
        <ul className="flex gap-x-6 text-sm h-full">
          {routes.map((route) => (
            <li
              key={route.id}
              className={cn(
                "hover:text-white transition relative flex items-center",
                { "text-white/50": pathname !== route.path },
                { "text-white": pathname === route.path }
              )}
            >
              <Link href={route.path}>{route.name}</Link>

              {pathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
