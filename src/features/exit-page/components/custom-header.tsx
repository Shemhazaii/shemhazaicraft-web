import {ArrowLeft, Sparkles} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CustomHeader() {

    return (
        <header className="border-b  bg-background backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <Image
                            src={"/minecraft.svg"}
                            alt={"Company Logo"}
                            width={24}
                            height={24}
                        />
                        <span className="font-black text-xl tracking-wider to-foreground">
                        Shemhazai<span className="">Craft</span>
                    </span>
                    </div>
                </Link>

                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm  transition-colors duration-200 group px-3 py-1.5 rounded-md hover:bg-accent hidden lg:flex"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Back to the page</span>
                </Link>
            </div>
        </header>
    )
}