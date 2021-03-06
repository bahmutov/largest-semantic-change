'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('top change', () => {
  const top = require('./top-change')

  const breakCommit = {
    firstLine: 'break(foo): foo commit',
    type: 'major'
  }

  const feat1Commit = {
    firstLine: 'feat(foo): foo commit',
    type: 'feat'
  }

  const feat2Commit = {
    firstLine: 'feat(bar): bar commit',
    type: 'feat'
  }

  const fixCommit = {
    firstLine: 'fix(log): fix logging',
    type: 'fix'
  }

  const regularCommit = {}

  it('feat wins over fix', () => {
    const commits = [feat1Commit, feat2Commit, fixCommit]
    const result = top(commits)
    la(result === 'feat', result)
  })

  it('fix if only fix is available', () => {
    const commits = [fixCommit]
    const result = top(commits)
    la(result === 'fix', result)
  })

  it('undefined without semantic information', () => {
    const commits = [regularCommit]
    const result = top(commits)
    la(is.not.defined(result), result)
  })

  it('picks major', () => {
    const commits = [breakCommit, feat1Commit, fixCommit, regularCommit]
    const result = top(commits)
    la(result === 'major', result)
  })

  it('picks major from list', () => {
    const commits = [breakCommit, feat1Commit, fixCommit, regularCommit]
      .map(c => c.type)
    const result = top(commits)
    la(result === 'major', result)
  })

  it('allows just types', () => {
    const result = top(['feat', 'fix', 'feat'])
    la(result === 'feat', result)
  })

  it('allows just types with undefined values', () => {
    const result = top(['feat', 'fix', 'feat', undefined, 'major'])
    la(result === 'major', result)
  })

  it('allows minor, patch aliases', () => {
    const result = top(['minor', 'fix'])
    la(result === 'feat', result)
  })
})
