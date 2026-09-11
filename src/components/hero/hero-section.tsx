import Image from "next/image";

export default function HeroSection() {
    return (
        <div className=" min-h-125 w-full bg-[#0b0f19] text-white overflow-hidden absolute top-20">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center opacity-60"
                />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_100%)]" />

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
            </div>

        </div>
    )
}