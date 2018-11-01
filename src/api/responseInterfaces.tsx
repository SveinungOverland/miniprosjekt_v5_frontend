// Type imports
import News from '../types/news'
import Comment from '../types/comment'




export enum StatusCodes {
    OK = 200,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}


interface ApiResponse {
    status: StatusCodes,
    status_message: string,
}


class DataResponse<T> implements ApiResponse {
    status: StatusCodes
    status_message: string
    data: T
    constructor(data: T) {
        this.status = StatusCodes.OK
        this.status_message = "Data retrieved successfully"
        this.data = data
    }
}


export class ErrorResponse {
    static create(status: StatusCodes, error_message: string): ApiResponse {
        return { status: status, status_message: error_message }
    }
}


export class NewsResponse extends DataResponse<News[]> { }


export class CommentsResponse extends DataResponse<Comment[]> { }