import {assert} from 'chai'
import * as moment from 'moment'
import {Player} from '../../lib/core/actors'

describe('core/Player', () => {
    it('should properly instantiate a Player and exhibit TimeTraveler behavior', (done:(err?:Error) => any) => {
        let now = moment()
        let birth = moment().subtract(8, 'year')
        let p = new Player("Test", birth.valueOf())
        p.setPointInTime(now.valueOf())
        assert.equal(p.getAge(), 8, 'Age was not the expected 8 years old')
        done()
    })
})