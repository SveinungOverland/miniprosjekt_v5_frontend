

import { NewsResponse, DataResponse } from './responseInterfaces'
import API, { Methods } from './api'


export const getCategories = async (): Promise<DataResponse<[{name: string}]>> =>
    API.fetch<DataResponse<[{name: string}]>>('/api/category', Methods.GET)


export const getFromName = async (name: string): Promise<NewsResponse> =>
    API.fetch<NewsResponse>(`/api/category/${name}`, Methods.GET)