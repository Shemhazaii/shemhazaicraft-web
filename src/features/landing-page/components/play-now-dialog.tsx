"use client"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Clipboard, Download, Play} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useClipboard} from "@/hooks/clipboard";
import { toast } from "@/components/ui/toast";
import {useState} from "react";
import {ModpackCardProps} from "@/features/landing-page/types";
import Link from "next/link";

export function PlayNowDialog(modpack:ModpackCardProps) {


    const { copy } = useClipboard();
    const [inputValue] = useState('nicely-pathways.tun.ply.gg');

    // Fungsi handler untuk copy + memicu toast secara aman
    const handleCopy = async () => {
        copy(inputValue);
        toast.add({
            type: "success",
            description: "IP Server berhasil disalin!",
        });
    };

    return (
        <Dialog>
            <DialogTrigger render={<Button className="py-5" variant="default"><Play />PLAY NOW</Button>} />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        START PLAYING NOW
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Ikuti langkah di bawah untuk mulai bermain di RealCraft SMP.
                    </DialogDescription>
                </DialogHeader>

                {/* Isi Modal */}
                <div className="space-y-4 py-2">
                    {/* Step 1: Modpack */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 1: Get The Modpack
                        </p>
                        <div className="p-3 bg-secondary rounded-lg border border-primary/50 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-sm">{modpack.name}</p>
                                <p className="text-xs">{modpack.version} • {modpack.minecraftVersion} • {modpack.loader}</p>
                            </div>
                            <Link
                                href={`http://localhost:30901/shemhazaicraft/modpacks/${modpack.slug}/${modpack.version}/${modpack.fileName}`}
                                className="bg-primary text-primary-foreground uppercase rounded-md px-3 py-1.5 text-xs font-semibold flex items-center gap-1">
                                <Download className="w-3.5 h-3.5" />Download
                            </Link>
                        </div>
                    </div>

                    <Separator />

                    {/* Step 2: Server IP */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 2: Add Server IP
                        </p>
                        <div className="flex gap-2">
                            <input
                                id="server-ip"
                                type="text"
                                readOnly
                                value={inputValue}
                                className="w-full bg-secondary border-primary rounded-md px-3 text-sm font-mono focus:outline-none"
                            />
                            {/* Panggil handleCopy di sini */}
                            <Button onClick={handleCopy} variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                                Copy<Clipboard className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Step 3 */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 3: Launch Minecraft and join the server
                        </p>
                        <div className="flex gap-2">
                            <p className="text-xs text-muted-foreground">
                                Launch your profile with the modpack and use the server in the copied IP.
                                Launcher Profile RealCraft SMP will be automatically created.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 flex justify-center">
                        <DialogClose render={<Button className="py-3 px-5 uppercase" variant="default">Close</Button>} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}