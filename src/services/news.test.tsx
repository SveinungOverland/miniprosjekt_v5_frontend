import 'jest'

import { getNews, getNewsFromUsername } from './news'


test("getNews", done => {
    getNews()
    .then(res => {
        expect(res.data).toBeInstanceOf(Array)
        done()
    })
})

test("getNewsFromUsername", done => {
    getNewsFromUsername("Sveinung")
    .then(res => {
        expect(res.data).toBeInstanceOf(Array)
        done()
    })
})