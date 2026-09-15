import {api} from "@/lib/http-common";
import {ModpackCardProps} from "@/features/landing-page/types";

const getModpack = async (): Promise<ModpackCardProps[]> => {
    return await api.get("/api/v1/modpacks/latest")
}

const ModpackService = {
    getModpack
}

export default ModpackService;