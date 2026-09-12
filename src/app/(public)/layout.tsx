import {ReactNode} from "react";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";
import HeroSection from "@/features/landing-page/components/hero-section";
import {Footer} from "@/features/landing-page/components/footer";

interface PublicLayoutProps {
    children: ReactNode,
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>

            <div className=" min-h-lvh w-full ">
                <NavbarWrapper className="mx-auto px-5 py-5 lg:w-4/5"/>
                <HeroSection />
                <main role="main" className="mx-auto flex justify-center lg:w-4/5">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
}