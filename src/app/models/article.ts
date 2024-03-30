export interface Article {
    id_article: string;
    id_assy: number;

    title: string;
    short_description: string;
    long_description: string;
    meta_description: string;
    meta_category: string;

    status: number;


    gammaOutput: boolean;
    
    outputEncoding: number;
    toneMapping: number;
    exposure: number;
    environment: string;

    id_attachment_for_eye_catch: string | null;

    bg_color: string;

    isStarrySky: boolean;
}


export interface ArticleScreenInfoUpdDto {
    id_article: string;
    
    outputEncoding: number;
    toneMapping: number;
    exposure: number;
    environment: string;
    bg_color: string;
}