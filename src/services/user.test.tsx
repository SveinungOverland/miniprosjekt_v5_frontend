import 'jest'


import { getUser } from './user'


test("getUser", done => {
    getUser("Sveinung")
    .catch(err => {
        expect(err).toBeDefined()
        done()
    })
})