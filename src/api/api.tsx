import fetch from 'node-fetch'
import { json } from 'body-parser';

export enum Methods {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE"
}


export default class API {

    static fetch<T>(url: string, method: Methods, payload: object = {}): Promise<T> {
            let token: string = localStorage.getItem("access-token") || ""
        
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-access-token": token
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then(data => data as { token?: string, data: T })
            })
            .then(data => {
                if(data.token) localStorage.setItem("access-token", data.token)
                return data.data
            })
    }
}