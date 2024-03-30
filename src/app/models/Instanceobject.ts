export interface Instanceobject {

    id_article: string;
    id_instance: number;
    id_part: string;
    
    pos_x: number;
    pos_y: number;
    pos_z: number;
    scale: number;

    quaternion_x: number;
    quaternion_y: number;
    quaternion_z: number;
    quaternion_w: number;

    uuid: string | null;
}

export const getDefaultValueOfInstanceobject = (id_article : string) => {
    const ans : Instanceobject = {
        id_article: id_article ? id_article : "",
        id_instance: 0,
        id_part: "",
        
        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
        scale: 1,
        quaternion_x: 0,
        quaternion_y: 0,
        quaternion_z: 0,
        quaternion_w: 1,
        uuid: null,
    }
    return ans;
}