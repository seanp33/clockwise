import {assert} from 'chai'
describe('smoke', () => {
    it('should smoke', (done:(err?:Error) => any) => {
        assert.isOk(true, 'true is true')
        done()
    })
})