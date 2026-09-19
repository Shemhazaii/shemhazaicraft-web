import {ReactNode} from "react";
import {Footer} from "@/features/landing-page/components/footer";
import CustomHeader from "@/features/exit-page/components/custom-header";

interface PublicLayoutProps {
    children: ReactNode,
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>

            <div className=" min-h-lvh w-full ">
                <CustomHeader />
                <main role="main" className="mx-auto flex justify-center lg:w-4/5">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
}