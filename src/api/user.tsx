import jwt_decode from 'jwt-decode'

// Response imports
import { UserResponse } from './responseInterfaces'

import API, { Methods } from './api'


export const getVerifiedUsername = (): string | null => {
    let token: string | null = localStorage.getItem('token')
    return token ? JSON.parse(jwt_decode(token)).username : null
}
    

export const postUser =  async (newUser: {username: string, password: string}) : Promise<UserResponse> =>
    API.fetch<UserResponse>('/api/user', Methods.POST, newUser)



export const getUser = async (username: string): Promise<UserResponse> => 
    API.fetch<UserResponse>(`/api/user/${username}`, Methods.GET)


export const deleteUser = async (username: string): Promise<{}> =>
    API.fetch<{}>('/api/user', Methods.DELETE)