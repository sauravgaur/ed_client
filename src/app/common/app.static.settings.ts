export class AppSettings {
    public static PAGE_DATA_LIMIT: number = 10;
    public static PAGE_PAGE: number = 1;
    public static PAGE_TOTAL: number = -1;
    public static PAGE_CURRENT_PAGE: number = 1;

    public static STATUS_SUCCESS: string = "success";
    public static STATUS_FAIL: string = "failure";
    public static FILE_IMAGE_TYPE_ALLOWED = "image/jpg,image/jpeg,image/png";

    public static DATE_FORMAT = 'dd-MMM-yyyy';
    public static DATE_FORMAT_FIELD = 'dd-MM-yyyy';
    public static DATE_PATTERN_YYYY_MM_DD = '^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$';
    public static DATE_PATTERN_DD_MM_YYYY = '^((((0[1-9]|[1-2][0-9]|3[0-1])-(0[13578]|(10|12))))|((0[1-9]|[1-2][0-9])-02)|(((0[1-9]|[1-2][0-9]|30)-(0[469]|11))))-[0-9]{4}$';
    public static DOWNLOAD_FILE_PATH = "file/downloadFile"
    public static UPLOAD_FILE_PATH = "file/upload"
    public static MANAGER_AND_ABOVE = "21"
    public static ASST_MANAGER_AND_ABOVE = "22"
    public static SR_ENGINEER_DESIGNATION = "32"
    public static PROJECT_MANAGER_DESIGNATION_CODE = "13"
    public static STSTEM_DEPT = ["M230", "M200"]
    public static ENABLE_DEVELOP_BY_STATUS = "5"

    public static ENABLE_DISCARD_FLAG = 6;

    public static PRINT_ENABLE = 'Y02927'
    public static XVC_DOWNLOAD_FILE_PATH = "xvc/cardStamp/downloadFile"
    public static XVC_UPLOAD_FILE_PATH = "xvc/cardStamp/upload"

    public static BACKGROUND_CALL = "BackgroundCall"
    public static BARCODE_NO: number = 894693500000
    public static TOAST_FREEZ_TIME = 3000
    public static TOAST_CLOSE_BUTTON_TRUE = true
    public static TOAST_PROGRESSBAR_TRUE = true
    public static TOAST_CLOSE_BUTTON_FALSE = false
    public static TOAST_PROGRESSBAR_FALSE = false
}