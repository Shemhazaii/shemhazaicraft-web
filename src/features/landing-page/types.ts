export interface ModpackCardProps {
    id: string;
    name: string;
    description: string;
    slug: string;
    version: string;
    minecraftVersion: string;
    loader: string;
    fileName: string;
    fileSize: number;
    thumbnailObjectKey: string;
    onDownload?: () => void;
    onViewVersions?: () => void;
}

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    slug: string;
    thumbnailUrl: string;
    publishedAt: string;

}

export interface NewsCardProps {
    news: NewsItem[];
    viewAllHref: string;
}