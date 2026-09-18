import { Client } from "@stomp/stompjs";
import {ServerStatusResponse} from "@/types/server";

export function createServerStatusClient(
    onMessage: (status: ServerStatusResponse) => void
) {

    const client = new Client({
        brokerURL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws`,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("WebSocket connected");

            client.subscribe("/topic/server-status", (message) => {
                const status: ServerStatusResponse = JSON.parse(message.body);
                onMessage(status);
            });
        },

        onDisconnect: () => {
            console.log("WebSocket disconnected");
        },

        onStompError: (frame) => {
            console.error("STOMP error:", frame);
        },
    });

    client.activate();

    return client;
}