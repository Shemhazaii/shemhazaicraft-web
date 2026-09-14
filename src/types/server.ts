export type ServerState =
    | "ONLINE"
    | "OFFLINE"
    | "STARTING"
    | "STOPPING"
    | "UNKNOWN";

export interface ServerStatusDetail {
    server: string;
    state: ServerState;
    version?: string;
    playersOnline: number;
    playersMax: number;
    latency: number;
    objectKey?: string;
    description?: string;
    checkedAt?: string;
}

export interface ServerStatusResponse {
    server: string;
    status: ServerStatusDetail;
}
