import Link from "next/link";
import { Home, Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 -mt-16">
            {/* Visual / Icon Box */}
            <div className="relative mb-6 flex items-center justify-center">
                {/* Glow effect di belakang angka */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

                <div className="relative flex items-center justify-center gap-2">
          <span className="text-8xl md:text-9xl font-extrabold tracking-tighter text-slate-800 select-none">
            4
          </span>
                    {/* Compass icon menggantikan angka 0 */}
                    <div className="p-4 rounded-2xl bg-[#0b0f17] border border-slate-800 shadow-xl text-primary animate-pulse">
                        <Compass className="w-12 h-12 md:w-16 md:h-16" />
                    </div>
                    <span className="text-8xl md:text-9xl font-extrabold tracking-tighter text-slate-800 select-none">
            4
          </span>
                </div>
            </div>

            {/* Teks Information */}
            <div className="max-w-md space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-primary/30 text-primary text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    Chunk Not Generated
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Page Not Found
                </h1>

                <p className="text-sm text-slate-400 leading-relaxed">
                    Sepertinya kamu berkelana terlalu jauh ke area yang belum di-generate.
                    Halaman yang kamu cari tidak ada atau telah dipindahkan.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase px-5 h-10 gap-2 rounded-lg w-full sm:w-auto"
                >
                    <Link href="/" className={"flex items-center gap-1.5"}>
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>

                <Button

                    variant="outline"
                    className="bg-transparent text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white font-bold text-xs uppercase px-5 h-10 gap-2 rounded-lg w-full sm:w-auto"
                >
                    <Link href="javascript:history.back()" className={"flex items-center gap-1.5"}>
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Link>
                </Button>
            </div>
        </div>
    );
}