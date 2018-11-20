import 'jest'

import { postToken } from './token'


test("Login test", done => {

    postToken({username: "Sveinung", password: " "})
    .then(res => {
        expect(res).toBeDefined()
        done()
    })

})