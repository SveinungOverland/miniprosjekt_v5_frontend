// Type imports
import News from '../types/news'
import Comment from '../types/comment'
import User from '../types/user'




export enum StatusCodes {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    SERVER_ERROR = 500
}


interface ApiResponse {
    status: StatusCodes,
    status_message: string,
    token?: string
}


interface DataResponse<T> extends ApiResponse {
    data: T
}


export interface UserResponse extends DataResponse<User> { }

export interface NewsResponse extends DataResponse<News[]> { }


export interface CommentsResponse extends DataResponse<Comment[]> { }