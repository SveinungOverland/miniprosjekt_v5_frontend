// Response imports
import { NewsResponse } from './responseInterfaces'
import API, { Methods } from './api';



export enum NewsEnum {
    all_time,
    month,
    week,
    today,
    newest
}



export const postNews = async (newNews: { 
    header: string,
    content: string,
    peek: string,
    image: string,
    category: string
 }): Promise<{}> =>
    API.fetch('/api/news', Methods.POST, newNews)


export const getNewsFromUsername = async (username: string): Promise<NewsResponse> =>
    API.fetch<NewsResponse>(`/api/news/${username}`, Methods.GET)