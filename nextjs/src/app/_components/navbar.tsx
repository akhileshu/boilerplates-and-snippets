"use client";

// import AuthStatus from "@/app/_components/auth-status";
import { AppLink } from "@/components/app/app-link";
import { HoverDropdown } from "@/components/app/hover-dropdown";

const navLinks = [
  {
    label: "books",
    items: [
      { label: "buy books", href: "/books" },
      { label: "sell books", href: "/books/new" },
      { label: "my history", href: "/profile/history" },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="left-8 right-8 top-0 fixed p-1 flex justify-between items-center border-b bg-white z-10">
      <AppLink title="Go to homepage" className="font-bold text-lg" href="/">
        book-reseller
      </AppLink>

      <div className="flex gap-4">
        {navLinks.map((section) => (
          <HoverDropdown
            key={section.label}
            ariaLabel={`${section.label} Menu`}
            trigger={section.label}
          >
            <ul className="min-w-56 p-2 text-sm space-y-1">
              {section.items.map((item) => (
                <AppLink className="block" key={item.href} href={item.href}>
                  {item.label}
                </AppLink>
              ))}
            </ul>
          </HoverDropdown>
        ))}
        <input type="text" name="q" placeholder="Search Books..."></input>
        <AppLink href="/notifications">Notifications</AppLink>
        <AppLink href="/profile/me">My Profile</AppLink>
      </div>

      {/* <AuthStatus /> */}
    </nav>
  );
}
