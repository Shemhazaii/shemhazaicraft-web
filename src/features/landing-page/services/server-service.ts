import { ServerStatusResponse } from "@/types/server";

async function fetchServersWithPing(isPing:boolean): Promise<ServerStatusResponse[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${apiUrl}/api/v1/servers/status`);

    if (!res.ok) {
        throw new Error("Failed to fetch server status");
    }

    const data: ServerStatusResponse[] = await res.json();

    return Promise.all(
        isPing ?         data.map(async (item) => {
            const pingUrl = `${apiUrl}/api/v1/servers/status`;
            const startTime = performance.now();
            let clientPing = 0;

            try {
                await fetch(pingUrl);
                clientPing = Math.round(performance.now() - startTime);
            } catch (error) {
                console.error(`Gagal ping ke ${item.server}:`, error);
            }

            return {
                server: item.server,
                status: {
                    ...item.status,
                    latency: (item.status.latency || 0) + clientPing,
                },
            };
        }): data
    );
}


const serverService = { fetchServersWithPing };

export default serverService;