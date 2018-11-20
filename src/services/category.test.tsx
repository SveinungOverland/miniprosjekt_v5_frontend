import 'jest'

import { getCategories, getFromName } from './category'


test("getCategories", done => {
    getCategories()
    .then(res => {
        expect(res.data).toBeInstanceOf(Array)
        done()
    })
})

test("getFromName", done => {
    getFromName("memes")
    .then(res => {
        expect(res.data).toBeInstanceOf(Array)
        done()
    })
})