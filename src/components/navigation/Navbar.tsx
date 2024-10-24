"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Image
              src="/logo.svg"
              alt="Recipe Finder"
              width={30}
              height={30}
              className="mr-2"
            />
            Recipe Finder
          </Link>
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </li>
          </ul>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-2xl">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Recipe Finder
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/about"
                  className="hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
