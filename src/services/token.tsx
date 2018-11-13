
import API, { Methods } from './api'



export const getToken = async (): Promise<{}> =>
    API.fetch('/api/token', Methods.GET)


export const postToken = async (creds: {username: string, password: string}): Promise<{}> =>
    API.fetch('/api/token', Methods.POST, creds)