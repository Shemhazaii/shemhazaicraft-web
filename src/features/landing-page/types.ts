export interface ModpackCardProps {
    title: string;
    version: string;
    tag: string;
    description: string;
    gameVersion: string;
    loader: string;
    size: string;
    imageUrl: string;
    onDownload?: () => void;
    onViewVersions?: () => void;
}

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
}

export interface NewsCardProps {
    news: NewsItem[];
    viewAllHref: string;
}