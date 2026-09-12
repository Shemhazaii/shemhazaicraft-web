import {Card, CardContent} from "@/components/ui/card";
import {Server, Users} from "lucide-react";
import {Separator} from "@/components/ui/separator";


export default function ServerSummaryCard() {
    return(
        <Card className={"w-fit"}>
            <CardContent className="flex items-center gap-6 px-4 py-2">
                <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Players Online
            </span>
                        <span className="text-lg font-bold text-primary">16</span>
                    </div>
                </div>


                <Separator orientation="vertical" />


                <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-slate-400" />
                    <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Total Servers
            </span>
                        <span className="text-lg font-bold text-primary">3</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}