//import fetch from 'node-fetch'
import { json } from 'body-parser';

import { ApiResponse } from './responseInterfaces'

export enum Methods {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
    UPDATE = "UPDATE"
}

// URL https://miniprosjekt-api.herokuapp.com

export default class API {

    static async fetch<T extends ApiResponse>(url: string, method: Methods, payload: object = {}): Promise<T> {
            let token: string = localStorage.getItem("access-token") || ""
            console.log("Fetching request with body", payload)
            console.log("Sending", JSON.stringify(payload))
            return fetch("https://miniprosjekt-api.herokuapp.com" + url, {
                method: method,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-access-token": token
                },
                body: !(method === Methods.GET) ? JSON.stringify(payload) : undefined
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then(data => data as T)
            })
            .then(data => {
                if(data.token) localStorage.setItem("access-token", data.token)
                return data
            })
    }
}