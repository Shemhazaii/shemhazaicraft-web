import Title from "@/features/landing-page/components/title";
import ServerSummaryCard from "@/features/landing-page/components/server-summary-card";
import ServerStatusCard from "@/features/landing-page/components/server-status-card";
import {ModpackCard} from "@/features/landing-page/components/modpack-card";
import {NewsCard} from "@/features/landing-page/components/news-card";
import newsService from "@/features/landing-page/services/news-service";
import modpackService from "@/features/landing-page/services/modpack-service";





export default async function Home(){


  const newsResponse = newsService.getNews();
  const newsData  = await newsResponse;


  const modpackResponse = modpackService.getModpack();
  const modpackData  = await modpackResponse;




  return (
  <>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="relative z-10 max-w-full  px-6 pt-20 pb-12">
          <Title {...modpackData[0]} />
          <div className="mt-5">
            <ServerSummaryCard />
          </div>

          <div className="mt-5">
           <ServerStatusCard />
          </div>

          <div className={"mt-5"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <ModpackCard modPackData={ modpackData} />
              <NewsCard news={newsData} viewAllHref={""}  />
            </div>
          </div>


        </div>
      </div>
    </div>
  </>
  );
}
