"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  CircleUser,
  Gavel,
  HandCoins,
  Handshake,
  Heater,
  icons,
  Menu,
  Siren,
  Swords,
  TableOfContents,
  TicketSlash,
  UserRoundSearch,
  Users,
} from "lucide-react";
function Sidebar() {
  const navItems = [
    {
      name: "About Us",
      href: "/about-us",
      icons: <UserRoundSearch size={16} />,
    },
    {
      name: "Player Eligibility",
      href: "/player-eligibility",
      icons: <HandCoins size={16} />,
    },
    {
      name: "Team Composition",
      href: "/team-composition",
      icons: <Users size={16} />,
    },
    { name: "Match Rules", href: "/match-rules", icons: <Swords size={16} /> },
    {
      name: "Cheating Policy",
      href: "/cheating-policy",
      icons: <Heater size={16} />,
    },
    { name: "Penalties", href: "/penalties", icons: <Gavel size={16} /> },
    {
      name: "Contact Us",
      href: "/contact-us",
      icons: <CircleUser size={16} />,
    },
    {
      name: "Terms & Conditions",
      href: "/terms-conditions",
      icons: <Handshake size={16} />,
    },
    {
      name: "Refunds & Cancellations",
      href: "/refunds-cancellations",
      icons: <TicketSlash size={16} />,
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
      icons: <Siren size={16} />,
    },
    { name: "FAQ", href: "/faq", icons: <TableOfContents size={16} /> },
  ];
  return (
    <div className="dark">
      <Sheet className="">
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className={"max-w-md dark"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>

            <div className="font-sans">
              <nav>
                <ul className="space-y-2 my-4">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-2 py-1  transition-transform duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gray-800 rounded-md cursor-pointer"
                    >
                      <Link href={item.href}>
                        <div className="flex items-center text-lg hover:text-yellow-400">
                          <span className="font-medium text-sm flex items-center gap-2 ">
                            <span className="text-yellow-400">
                              {item.icons}
                            </span>
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Sidebar;
