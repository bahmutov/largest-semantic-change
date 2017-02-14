'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('largest-semantic-change', () => {
  const m = require('.')
  it('has largerChange', () => {
    la(is.fn(m.largerChange))
  })

  it('has topChange', () => {
    la(is.fn(m.topChange))
  })
})
