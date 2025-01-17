export interface Blog {
    id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    featured: boolean;
    publicationDate: Date;
    imageUrl?: string;
}
