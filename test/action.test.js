/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const steps = ['pre', 'main']
const chai = require('chai')
const { assert } = require('chai')
chai.should()

// *************
// Write your tests here
describe('action-init', function () {
  // this.timeout(10000)
  // uncomment this if you want to raise the timeout cap for your whole test (when you need to perform long async tasks). You can also follow the same logic per describe block or per it block to increase the timeout cap
  // if your describe/it callbacks are arrow functions, you need to use the following syntax: describe('...', () => {}).timeout(...) but be aware that this won't apply to hooks!

  // ******* Example tests
  before(function () {
    runAction(steps)
  })
  describe('Placeholder test', function () {
    it('should pass', function () {
      const exp = true
      assert(exp === true, 'True is true...')
    })
  })
  // *******
})
// *************
