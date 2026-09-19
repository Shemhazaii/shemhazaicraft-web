"use client";

import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Moon, Sun, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarWrapperProps extends React.ComponentProps<"div"> {}

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Servers", href: "/servers" },
    { name: "Modpacks", href: "/modpacks" },
    { name: "News", href: "/news" },
    { name: "Donate", href: "/donate" },
];

const NavbarWrapper = ({ className, ...props }: NavbarWrapperProps) => {
    const { setTheme } = useTheme();

    function newTab(url: string) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div
            className={cn(
                "flex items-center justify-between w-full px-4 py-3 border-b bg-background",
                className
            )}
            {...props}
        >
            {/* 1. Logo (Tampil di semua ukuran layar) */}
            <div className="flex items-center justify-start lg:w-1/3">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md z-20"
                >
                    <Image
                        src={"/minecraft.svg"}
                        alt={"Company Logo"}
                        width={32}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                    <span className="font-bold text-lg tracking-tight text-foreground">
            ShemhazaiCraft
          </span>
                </Link>
            </div>

            {/* 2. Desktop Navigation (Sembunyi di mobile, tampil di Desktop / lg) */}
            <div className="hidden lg:flex lg:w-1/3 justify-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.name}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={link.href}>{link.name}</Link>} />

                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden lg:flex lg:w-1/3 justify-end items-center gap-2">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <Sun className="h-[1.2rem] w-[1.2rem] block rotate-0 transition-all dark:hidden dark:-rotate-90" />
                                <Moon className="h-[1.2rem] w-[1.2rem] hidden rotate-90 transition-all dark:block dark:rotate-0" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="flex flex-col p-2 w-28 gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start"
                                        onClick={() => setTheme("light")}
                                    >
                                        Light
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start"
                                        onClick={() => setTheme("dark")}
                                    >
                                        Dark
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start"
                                        onClick={() => setTheme("system")}
                                    >
                                        System
                                    </Button>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Button
                    onClick={()=>newTab("/go?link=https://discord.com/invite/WTa9q6SXFH")}
                    variant={"outline"}>Join Discord</Button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
                <Sheet>
                    <SheetTrigger>

                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>

                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col justify-between">
                        <div>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <Image
                                        src={"/minecraft.svg"}
                                        alt={"Company Logo"}
                                        width={24}
                                        height={24}
                                    />
                                    ShemhazaiCraft
                                </SheetTitle>
                            </SheetHeader>

                            {/* Mobile Links */}
                            <div className="flex flex-col gap-3 px-4 py-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-foreground hover:text-primary transition-colors py-2 font-medium border-b border-border/50"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Footer Actions (Theme & Discord) */}
                        <div className="flex flex-col gap-4 pt-4 border-t px-4 pb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Tema</span>
                                <div className="flex gap-1 border rounded-md p-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setTheme("light")}
                                    >
                                        <Sun className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setTheme("dark")}
                                    >
                                        <Moon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button variant={"default"} className="w-full" onClick={()=>newTab("/go?link=https://discord.com/invite/WTa9q6SXFH")}>
                                Join Discord
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default NavbarWrapper;