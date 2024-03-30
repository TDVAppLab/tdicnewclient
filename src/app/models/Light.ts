export interface Light {

    id_article: string;
    id_light: number;
    light_type: string;
    title: string;
    short_description: string;
    color: number;
    intensity: number;
    px: number;
    py: number;
    pz: number;
    distance: number;
    decay: number;
    power: number;
    shadow: number;
    tx: number;
    ty: number;
    tz: number;
    skycolor: number;
    groundcolor: number;
    is_lensflare: boolean;
    lfsize: number;
    file_data: any;
    light_object: any;
    
}