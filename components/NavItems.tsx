
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../lib/constants";

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`transition-colors duration-200 ${
  isActive(item.href)
    ? "text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#22d3ee]"
    : "text-white"
}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
