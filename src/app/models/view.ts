export interface View {

    id_article: string;
    id_view: number;

    title: string;

    cam_pos_x: number;
    cam_pos_y: number;
    cam_pos_z: number;

    cam_lookat_x: number;
    cam_lookat_y: number;
    cam_lookat_z: number;

    cam_quat_x: number;
    cam_quat_y: number;
    cam_quat_z: number;
    cam_quat_w: number;

    obt_target_x: number;
    obt_target_y: number;
    obt_target_z: number;
}