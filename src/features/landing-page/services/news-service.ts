import {api} from "@/lib/http-common";
import {NewsItem} from "@/features/landing-page/types";

const getNews  = async () : Promise<NewsItem[]> => {
    return await api.get("/api/v1/news")
}

const NewsService = {
    getNews
}

export default NewsService;