import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import {PlayNowDialog} from "@/features/landing-page/components/play-now-dialog";
import {ModpackCardProps} from "@/features/landing-page/types";

export default function Title(modpackData:ModpackCardProps) {

    return(
        <div>
            <div className="  text-primary">WELCOME TO</div>
            <h1 className="text-6xl font-bold text-white">REALCRAFT <span className={"text-primary"}>SMP</span></h1>
            <div>A modded Minecraft SMP Server experience with friends.</div>
            <div>Build, play, and grow together.</div>
            <div className="mt-5 flex justify-start gap-5">
                <PlayNowDialog {...modpackData} />
                <Button className={"py-5"} variant={"outline"}>VIEW SERVERS</Button>

            </div>
        </div>
    )

}