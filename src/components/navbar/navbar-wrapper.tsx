"use client"

import React from "react";
import {useTheme} from "next-themes";
import {cn} from "cn";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Moon, Sun} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"


interface NavbarWrapperProps extends React.ComponentProps<"div">{
}

const NavbarWrapper = ({
                           className,
                           ...props
                       }:NavbarWrapperProps) => {

    const { setTheme } = useTheme();

    return (
        <div className={cn(className,"lg:flex justify-between")} {...props}>
            <div className="flex w-1/3 justify-start items-center">
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md z-20">
                    <Image src={"/minecraft.svg"} alt={"Company Logo"} width={32} height={32} className="h-8 w-auto object-contain" />
                    <span className="font-bold text-lg tracking-tight text-foreground">ShemhazaiCraft</span>
                </Link>
            </div>
            <div className="flex w-1/3 justify-center">
                <NavigationMenu>
                    <NavigationMenuList >
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Home</Link>} />
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Servers</Link>} />
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">Modpacks</Link>} />
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">News</Link>} />
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/docs">About</Link>} />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex w-1/3 justify-end">
                <NavigationMenu>
                    <NavigationMenuList >
                        <NavigationMenuItem>
                            <NavigationMenuTrigger >
                                <Sun className=" h-[1.2rem] w-[1.2rem] block rotate-0 transition-all dark:hidden dark:-rotate-90" />
                                <Moon className=" h-[1.2rem] w-[1.2rem] hidden rotate-90 transition-all dark:block dark:rotate-0" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink onClick={()=> setTheme("light")}>Light</NavigationMenuLink>
                                <NavigationMenuLink onClick={()=> setTheme("dark")}>Dark</NavigationMenuLink>
                                <NavigationMenuLink onClick={()=> setTheme("system")}>System</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant={"outline"}>Join Discord</Button>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );

}

export default NavbarWrapper;