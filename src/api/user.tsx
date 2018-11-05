// Response imports
import { UserResponse } from './responseInterfaces'

import API, { Methods } from './api'



export const postUser =  async (newUser: {username: string, password: string}) : Promise<UserResponse> =>
    API.fetch<UserResponse>('/api/user', Methods.POST, newUser)



export const getUser = async (username: string): Promise<UserResponse> => 
    API.fetch<UserResponse>(`/api/user/${username}`, Methods.GET)


export const deleteUser = async (username: string): Promise<{}> =>
    API.fetch<{}>('/api/user', Methods.DELETE)