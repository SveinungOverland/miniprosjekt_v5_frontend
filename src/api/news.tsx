// Response imports
import { NewsResponse, ErrorResponse, StatusCodes } from './responseInterfaces'

// Test data imports
import { all_time } from '../testdata/news'




export enum NewsEnum {
    all_time,
    month,
    week,
    today,
    newest
}

export const getNews = (type: NewsEnum): Promise<NewsResponse> => new Promise((resolve, reject) => {
    switch(type) {
        case NewsEnum.all_time:
            setTimeout(() => resolve(new NewsResponse(all_time)), 1000)
            break
        default:
            setTimeout(() => reject(ErrorResponse.create(StatusCodes.NOT_FOUND, "This has not been implemented yet")), 1000)
            break
    }
})