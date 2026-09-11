import Image from "next/image";
import HeroSection from "@/components/hero/hero-section";

export default function Home() {
  return (
  <>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="relative z-10 max-w-7xl  px-6 pt-20 pb-12">
          <h3 className="text-4xl  text-primary">WELCOME TO</h3>
          <h1 className="text-4xl font-bold text-white">REALCRAFT SMP</h1>
          {/* Tambahkan elemen ui/shadcn kamu di sini */}
        </div>
      </div>
    </div>
  </>
  );
}
