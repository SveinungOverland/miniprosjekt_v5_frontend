// Response imports
import { NewsResponse, ApiResponse } from './responseInterfaces'
import API, { Methods } from './api'



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
    category: string,
    poster: string // username
 }): Promise<ApiResponse> =>
    API.fetch('/api/news', Methods.POST, newNews)


export const updateNews = async (newNews: {
    header: string,
    content: string,
    peek: string,
    image: string,
    category: string,
    timestamp: string,
    poster: string, // username
}): Promise<ApiResponse> =>
    API.fetch(`/api/news/${newNews.poster}/${newNews.timestamp}`, Methods.PUT, newNews)

export const getNews = async (): Promise<NewsResponse> =>
    API.fetch<NewsResponse>('/api/news/', Methods.GET)


export const getNewsFromUsername = async (username: string): Promise<NewsResponse> =>
    API.fetch<NewsResponse>(`/api/news/${username}`, Methods.GET)


export const getSpecificNews = async (username: string, timestamp: string): Promise<NewsResponse> =>
    API.fetch<NewsResponse>(`/api/news/${username}/${timestamp}`, Methods.GET)


export const deleteNews = async (username: string, timestamp: string): Promise<ApiResponse> =>
    API.fetch(`/api/news/${username}/${timestamp}`, Methods.DELETE)