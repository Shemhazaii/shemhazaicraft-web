import { useState, useEffect, SetStateAction} from "react";
import {ServerStatusResponse} from "@/types/server";

import {createServerStatusClient} from "@/lib/websocket";
import serverService from "@/features/landing-page/services/server-service";

export function useServerStatus(isPing:boolean) {
    const [servers, setServers] = useState<ServerStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 1. Fetch data awal via HTTP
        serverService.fetchServersWithPing(isPing)
            .then((data: SetStateAction<ServerStatusResponse[]>) => setServers(data))
            .catch((err: { message: SetStateAction<string | null>; }) => setError(err.message))
            .finally(() => setLoading(false));

        // 2. Hubungkan STOMP WebSocket untuk update real-time
        const client = createServerStatusClient((incomingStatus) => {
            setServers((prevServers) => {
                // Jika server sudah ada di state, update data server tersebut
                const exists = prevServers.some((s) => s.server === incomingStatus.server);
                if (exists) {
                    return prevServers.map((s) =>
                        s.server === incomingStatus.server ? incomingStatus : s
                    );
                }
                // Jika server baru, tambahkan ke list
                return [...prevServers, incomingStatus];
            });
        });

        // 3. Cleanup: Deactivate client saat komponen unmount
        return () => {
            client.deactivate();
        };
    }, []);

    return { servers, loading, error };
}