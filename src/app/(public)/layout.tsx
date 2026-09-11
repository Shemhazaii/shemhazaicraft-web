import {ReactNode} from "react";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";
import HeroSection from "@/components/hero/hero-section";

interface PublicLayoutProps {
    children: ReactNode,
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>
            <HeroSection />
            <div className="mx-auto min-h-lvh w-full lg:w-4/5">
                <NavbarWrapper className="px-5 py-5"/>
                <main role="main" className="flex justify-center ">
                    {children}
                </main>
            </div>
        </>
    );
}