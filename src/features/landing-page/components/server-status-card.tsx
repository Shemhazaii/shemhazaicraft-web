"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Signal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useServerStatus } from "@/hooks/server-status";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

export default function ServerStatusCard() {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const { servers, loading, error } = useServerStatus(true);



    return (
        <Card className="w-full p-5 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primary rounded-sm"></span>
                    <h2 className="text-xs font-bold tracking-wider uppercase">
                        Server Status
                    </h2>
                </div>
                <Link
                    href="#"
                    className="text-xs font-semibold text-primary hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                    View all servers <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {!loading ? (
                    <motion.div
                        key="server-list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {servers.map((server) => {
                            const isOnline = server.status.state === "ONLINE";

                            return (
                                <motion.div
                                    key={server.server}

                                    whileHover={{ scale: 1.01 }}
                                    className={`relative flex gap-3.5 p-3 rounded-lg border bg-background/40 backdrop-blur-sm transition-colors ${
                                        isOnline
                                            ? "border-emerald-500/30 hover:border-emerald-500/60"
                                            : "border-red-500/30 hover:border-red-500/60"
                                    }`}
                                >
                                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-800">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/shemhazaicraft/${server.status.objectKey}`}
                                            alt={server.server}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-1">
                                            <h3 className="font-bold text-sm truncate">
                                                {server.status.server}
                                            </h3>
                                            <Badge
                                                variant="outline"
                                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1.5 shrink-0 ${
                                                    isOnline
                                                        ? "dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500/40"
                                                        : "dark:bg-red-950/40 dark:text-red-400 dark:border-red-500/40"
                                                }`}
                                            >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                isOnline ? "bg-emerald-400" : "bg-red-400"
                            }`}
                        />
                                                {server.status.state}
                                            </Badge>
                                        </div>

                                        <p className="text-[11px] text-slate-400 truncate">
                                            {server.status.description}
                                        </p>

                                        {/* Footer Card: Players & Ping */}
                                        <div className="flex items-center justify-between text-xs mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5" />
                                                <span className="font-medium">
                          {server.status.playersOnline} /{" "}
                                                    {server.status.playersMax}
                        </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Signal
                                                    className={`w-3.5 h-3.5 ${
                                                        isOnline
                                                            ? server.status.latency! < 80
                                                                ? "text-emerald-400"
                                                                : "text-amber-400"
                                                            : "text-slate-600"
                                                    }`}
                                                />
                                                <span
                                                    className={`font-semibold ${
                                                        isOnline
                                                            ? server.status.latency! < 80
                                                                ? "text-emerald-400"
                                                                : "text-amber-400"
                                                            : "text-slate-600"
                                                    }`}
                                                >
                          {isOnline ? `${server.status.latency}ms` : "-"}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="skeleton-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <Skeleton className="h-26.5 w-full rounded-lg" />
                        <Skeleton className="h-26.5 w-full rounded-lg" />
                        <Skeleton className="h-26.5 w-full rounded-lg" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}