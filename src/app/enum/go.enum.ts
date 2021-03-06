
export enum SUCCESS_MESSAGE_ALERT {
    ADD_SUCCESS = 1001,
    UPDATE_SUCCESS = 1002,
    APPROVE_SUCCESS = 1003,
    DELETE_SUCCESS = 1004,
    DESCARD_SUCCESS = 1005
}

export enum REDIRECT_LOGOUT_CODE {
    INVALID_TOKEN = 101,
    MISSING_TOKEN = 102,
    EXPIRED_TOKEN = 103,
}

export enum LOCAL_STORAGE_KEYS {
    token,
    CURRENT_USER,
    FCM_TOKEN,
    ID_PROOF,
    PURPOSE_LIST,
    EMPLOYEE_LIST,
    ITEM_LIST,
    SUB_ITEM_LIST,
    SETTING_PARAM,
    SIDEBAR
}