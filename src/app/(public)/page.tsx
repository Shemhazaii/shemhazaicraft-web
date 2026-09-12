import Title from "@/features/landing-page/components/title";
import ServerSummaryCard from "@/features/landing-page/components/server-summary-card";
import ServerStatusCard from "@/features/landing-page/components/server-status-card";
import {ModpackCard} from "@/features/landing-page/components/modpack-card";
import {NewsCard} from "@/features/landing-page/components/news-card";
import {ModpackCardProps, NewsItem} from "@/features/landing-page/types";



const sampleNews: NewsItem[] = [
  {
    id: "1",
    title: "RealCraft SMP Update v1.4.0",
    description: "New quests, dungeons, and performance improvements!",
    date: "Sep 3, 2025",
    imageUrl: "/dummy.png",
  },
  {
    id: "2",
    title: "Server Maintenance Completed",
    description: "All servers are back online and running smoothly.",
    date: "Aug 30, 2025",
    imageUrl: "/dummy.png",
  },
  {
    id: "3",
    title: "New World Generation & Biomes",
    description: "Explore new biomes in the latest world reset!",
    date: "Aug 25, 2025",
    imageUrl: "/dummy.png",
  },
];

const modPackData: ModpackCardProps = {
  title : "RealCraft Modpack",
  version : "v1.4.0",
  tag : "Latest",
  description : "Custom modpack for RealCraft SMP with over 250+ mods and tons of features!",
  gameVersion : "1.21.1",
  loader : "NeoForge",
  size : "1.2 GB",
  imageUrl : "/dummy.png"
}


export default function Home() {
  return (
  <>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="relative z-10 max-w-full  px-6 pt-20 pb-12">
          <Title />
          <div className="mt-5">
            <ServerSummaryCard />
          </div>

          <div className="mt-5">
           <ServerStatusCard />
          </div>

          <div className={"mt-5"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <ModpackCard {...modPackData} />
              <NewsCard news={sampleNews} viewAllHref={""}  />
            </div>
          </div>


        </div>
      </div>
    </div>
  </>
  );
}
