import 'jest'

import API, { Methods } from './api'

import { DataResponse } from './responseInterfaces'



test("API test", done => {
    API.fetch("/api/", Methods.GET)
    .then(res => {
        expect(((res as unknown) as { msg: string }).msg).toEqual("Hello world")
        done()
    })
})