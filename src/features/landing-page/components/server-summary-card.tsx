"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Server, Users} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useServerStatus} from "@/hooks/server-status";
import {Skeleton} from "@/components/ui/skeleton";
import {AnimatePresence, motion} from "framer-motion";


export default function ServerSummaryCard() {

    const { servers, loading, error } = useServerStatus(false);


    const totalServers = servers.length;
    const totalPlayers = servers.reduce(
        (acc, item) => acc + (item.status?.playersOnline || 0),
        0
    );

    const isDataReady = !loading;

    return(
        <Card className={"w-fit"}>
            <CardContent className="flex items-center gap-6 px-4 py-2">
                <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Players Online
            </span>
                        <span className="text-lg font-bold text-primary">
                          <AnimatePresence mode="wait">
                            {isDataReady ? (
                                <motion.span
                                    key="total-players"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {totalPlayers}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Skeleton className="h-6 w-6" />
                                </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                    </div>
                </div>


                <Separator orientation="vertical" />


                <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Servers
            </span>
                        <span className="text-lg font-bold text-primary">
                          <AnimatePresence mode="wait">
                            {isDataReady ? (
                                <motion.span
                                    key="total-players"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {totalServers}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Skeleton className="h-6 w-6" />
                                </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}