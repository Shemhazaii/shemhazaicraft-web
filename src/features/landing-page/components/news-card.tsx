import {Card} from "@/components/ui/card";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {NewsCardProps} from "@/features/landing-page/types";






export function NewsCard(newsData : NewsCardProps) {
    return (
        <Card className=" p-5 rounded-xl flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-primary rounded-sm" />
                        <h2 className="text-xs font-bold tracking-wider  uppercase">
                            Latest News
                        </h2>
                    </div>
                    <Link
                        href={newsData.viewAllHref || "#"}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                        View all news <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* List News */}
                <div className="space-y-3">
                    {newsData.news.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-800">
                                    <Image                                  src={item.imageUrl}
                                                                            alt={item.title}
                                                                            fill
                                                                            className="object-cover" />
                                </div>

                                <div className="min-w-0">
                                    <h4 className="font-semibold text-sm  truncate group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 truncate">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <span className="text-[11px] text-slate-500 shrink-0 font-medium ml-2">
                {item.date}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

