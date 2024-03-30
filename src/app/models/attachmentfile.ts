export interface Attachmentfile {
    id_file: string;
    name: string;
    type_data: string;
    format_data: string;
    file_name: string;

    file_length: number;

    itemlink: string;
    license: string;

    memo: string;
    isActive: boolean;

    create_user: string;
    create_datetime: Date | null;
    latest_update_user: string;
    latest_update_datetime: Date | null;

    target_article_id: string;

}

export interface AttachmentfileEyecatchDtO {
    id_article: string;
    imgfilebin: string;
}
