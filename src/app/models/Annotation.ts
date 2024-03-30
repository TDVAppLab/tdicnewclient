export interface Annotation {

    id_article: string;
    id_annotation: number;

    title: string;
    description1: string;
    description2: string;
    
    status: number;

    pos_x: number;
    pos_y: number;
    pos_z: number;

}



export const getDefaultValueOfAnnotation = (id_article : string) => {
    const ans : Annotation = {
        id_article: id_article ? id_article : "",
        id_annotation: 0,

        title: '',
        description1: '',
        description2: '',
        
        status: 0,

        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
    }
    return ans;
}