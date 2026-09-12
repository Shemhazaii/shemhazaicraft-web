import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";

export default function Title() {

    return(
        <div>
            <div className="  text-primary">WELCOME TO</div>
            <h1 className="text-6xl font-bold text-white">REALCRAFT <span className={"text-primary"}>SMP</span></h1>
            <div>A modded Minecraft SMP Server experience with friends.</div>
            <div>Build, play, and grow together.</div>
            <div className="mt-5 flex justify-start gap-5">
                <Button className={"py-5"} variant={"default"}><Play />PLAY NOW</Button>
                <Button className={"py-5"} variant={"outline"}><Play />VIEW SERVERS</Button>
            </div>
        </div>
    )

}