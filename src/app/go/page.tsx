import ExitComponent from "@/features/exit-page/components/exit-component";
import {headers} from "next/headers";
import {userAgent} from "next/server";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Go({ searchParams }: PageProps){

    const { link } = await searchParams;

    const reqHeaders = await headers();
    const { os } = userAgent({ headers: reqHeaders });

    const detectedOS = os.name || 'Unknown';
    return (
        <>
            {
                <ExitComponent link={link} OS={ detectedOS} />
            }
        </>
            )
}