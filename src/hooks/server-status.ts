import { useState, useEffect } from "react";
import { ServerStatusResponse } from "@/types/server";
import { createServerStatusClient } from "@/lib/websocket";
import serverService from "@/features/landing-page/services/server-service";

export function useServerStatus(isPing: boolean) {
    const [servers, setServers] = useState<ServerStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        serverService.fetchServersWithPing(isPing)
            .then((data) => setServers(data))
            .catch((err) => setError(err.message || "Failed to fetch servers"))
            .finally(() => setLoading(false));


        const client = createServerStatusClient(async (incomingStatus) => {
            let updatedStatus = incomingStatus;


            if (isPing) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const startTime = performance.now();
                let clientPing = 0;

                try {
                    await fetch(`${apiUrl}/api/v1/servers/status`);
                    clientPing = Math.round(performance.now() - startTime);
                } catch (error) {
                    console.error(`Gagal ping WebSocket server ${incomingStatus.server}:`, error);
                }

                updatedStatus = {
                    ...incomingStatus,
                    status: {
                        ...incomingStatus.status,
                        latency: (incomingStatus.status.latency || 0) + clientPing,
                    },
                };
            }


            setServers((prevServers) => {
                const exists = prevServers.some((s) => s.server === updatedStatus.server);
                if (exists) {
                    return prevServers.map((s) =>
                        s.server === updatedStatus.server ? updatedStatus : s
                    );
                }
                return [...prevServers, updatedStatus];
            });
        });

        // 3. Cleanup: Deactivate client saat unmount
        return () => {
            client.deactivate();
        };
    }, [isPing]); // Tambahkan isPing ke dependency array

    return { servers, loading, error };
}