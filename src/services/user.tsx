import jwt_decode from 'jwt-decode'

// Response imports
import { UserResponse, ApiResponse } from './responseInterfaces'

import API, { Methods } from './api'


export const getVerifiedUsername = (): string | null => {
    let token: string | null = localStorage.getItem('access-token')
    let json: { username: string } | null = token ? jwt_decode(token) : null
    return json ? json.username : null
}
    
export const removeVerifiedUsername = () => {
    localStorage.removeItem('access-token')
}

export const postUser =  async (newUser: {username: string, password: string}) : Promise<UserResponse> =>
    API.fetch<UserResponse>('/api/user', Methods.POST, newUser)



export const getUser = async (username: string): Promise<UserResponse> => 
    API.fetch<UserResponse>(`/api/user/${username}`, Methods.GET)


export const deleteUser = async (username: string): Promise<{}> =>
    API.fetch<ApiResponse>('/api/user', Methods.DELETE)