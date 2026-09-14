"use client";

import {useEffect, useState} from "react";
import type {ServerStatusResponse} from "@/types/server";
import {createServerStatusClient} from "@/lib/websocket";

export function useServerStatus(
    initialServers: ServerStatusResponse[] = []
) {
    const [servers, setServers] = useState<ServerStatusResponse[]>(initialServers);

    useEffect(() => {
        if (initialServers.length > 0) {
            setServers(initialServers);
        }
    }, [initialServers]);

    useEffect(() => {
        const client = createServerStatusClient(async (update: ServerStatusResponse) => {
            let clientPing = 0;
            const targetServer = update.status;
            const pingUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/servers/status`;

            const startTime = performance.now();
            try {
                await fetch(pingUrl);
                clientPing = Math.round(performance.now() - startTime);
            } catch (error) {
                console.error(`Gagal ping ke ${targetServer.server}:`, error);
                clientPing = 0;
            }

            const totalLatency = targetServer.latency + clientPing;

            update.status = {
                ...targetServer,
                latency: totalLatency,
            };

            setServers((current) => {
                const exists = current.some((item) => item.server === update.server);

                if (exists) {
                    return current.map((item) =>
                        item.server === update.server ? update : item
                    );
                } else {
                    return [...current, update];
                }
            });
        });

        return () => {
            client.deactivate();
        };
    }, []);
    return servers;
}

