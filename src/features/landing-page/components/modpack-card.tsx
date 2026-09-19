import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Box, Download, HardDrive, Wrench} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ModpackCardProps} from "@/features/landing-page/types";
import {formatFileSize} from "@/lib/utils";
import Link from "next/link";

interface Props {
    modPackData: ModpackCardProps[];
}

export function ModpackCard(data: Props) {
    return(
        <Card className=" p-5 rounded-xl flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-4 bg-primary rounded-sm" />
                    <h2 className="text-xs font-bold tracking-wider uppercase">
                        Latest Modpack
                    </h2>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    {data.modPackData.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
                            {/* Cover Image */}
                            <div className="relative w-full sm:w-36 h-36 shrink-0 rounded-lg overflow-hidden hidden sm:block ">
                                <Image src={`/dummy.png`} alt={item.name || "Modpack Cover"} fill className="object-cover" />
                            </div>

                            {/* Details */}
                            <div className="flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                        <h3 className="font-bold text-base ">{item.name}</h3>
                                        <Badge className="dark:bg-emerald-950/60 dark:text-primary dark:border-primary/40 text-[11px] px-2 py-0.5 rounded-md font-semibold">
                                            {item.version}
                                        </Badge>
                                        <Badge className="bg-purple-950/60 dark:text-purple-400 dark:border-purple-500/40 text-[11px] px-2 py-0.5 rounded-md font-semibold">
                                            Latest
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                        {item.description || "Custom modpack for RealCraft SMP with over 250+ mods and tons of features!"}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex items-center gap-4 text-xs ">
                                        <div className="flex items-center gap-1.5">
                                            <Box className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{item.minecraftVersion}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Wrench className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{item.loader}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{formatFileSize(item.fileSize)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2.5 mt-4">
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/modpacks/${item.slug}/${item.version}/${item.fileName}`}
                                        onClick={item.onDownload}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase px-4 h-9 gap-2 rounded-lg flex items-center"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                    </Link>
                                    <Button
                                        onClick={item.onViewVersions}
                                        variant="outline"
                                        className="bg-transparent  border-slate-700/80 hover:bg-slate-800/60 hover:text-white font-bold text-xs uppercase px-4 h-9 rounded-lg"
                                    >
                                        View All Versions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </Card>
    )
}