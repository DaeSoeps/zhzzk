export interface Stream {
    id: string;
    title: string;
    streamerName: string;
    viewers: number;
    thumbnailUrl: string;
    category: string;
    tags: string[];
    isLive: boolean;
}

export interface Category {
    id: string;
    name: string;
    imageUrl: string;
    viewerCount: number;
}