"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Server, Users} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useEffect, useState} from "react";
import {ServerStatusResponse} from "@/types/server";
import {useServerStatus} from "@/hooks/server-status";
import {Skeleton} from "@/components/ui/skeleton";


export default function ServerSummaryCard() {

    const [initialServers, setInitialServers] = useState<ServerStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/servers/status`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch server status");
                }
                return response.json();
            })
            .then((data: ServerStatusResponse[]) => {
                setInitialServers(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const servers = useServerStatus(initialServers);


    const totalServers = servers.length;
    const totalPlayers = servers.reduce(
        (acc, item) => acc + (item.status?.playersOnline || 0),
        0
    );

    const isDataReady = !loading && (initialServers.length === 0 || servers.length > 0);

    return(
        <Card className={"w-fit"}>
            <CardContent className="flex items-center gap-6 px-4 py-2">
                <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Players Online
            </span>
                        <span className="text-lg font-bold text-primary">{isDataReady?(totalPlayers):(<Skeleton className={"h-6 w-6"} />)}</span>
                    </div>
                </div>


                <Separator orientation="vertical" />


                <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Servers
            </span>
                        <span className="text-lg font-bold text-primary">{isDataReady?(totalServers):(<Skeleton className={"h-6 w-6"} />)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}