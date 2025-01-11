

declare type SuccessfullResponse<T> = {
    message: 'success';
    token: string
    data: T;
}


declare type ErrorResponse<T> = {
    message: string | 'error | fail';
    code: number;
    token?: string;
    user?: T;
}


declare type ApiResponse<T> = SuccessfullResponse<T> | ErrorResponse;