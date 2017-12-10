/* globals describe beforeEach, afterEach it */

const createPostKitten = require('../index')
const expect = require('chai').expect

describe('post-kitten', function () {
  let iframe, post
  const dispose = []
  const payload = { dogma: false }

  beforeEach(function (done) {
    iframe = document.createElement('iframe')
    iframe.src = '/base/test/fixtures/index.html'
    iframe.onload = function () {
      post = createPostKitten(iframe.contentWindow)
      done()
    }
    document.body.appendChild(iframe)
  })

  afterEach(function () {
    while (dispose.length) dispose.pop()()
    document.body.removeChild(iframe)
  })

  it('should send and receive post messages', function (done) {
    dispose.push(post.on('received', getPayloadChecker(done)))
    post.emit('test', payload)
  })

  it('should support wildcard listeners', function (done) {
    dispose.push(post.on('*', getPayloadChecker(done)))
    post.emit('test', payload)
  })

  it('should dispose of listeners on dispose', function (done) {
    post.on('*', function () {
      throw new Error('This should never get called')
    })
    post.dispose()
    post.emit('test', payload)
    setTimeout(done, 1000)
  })

  function getPayloadChecker (cb) {
    return function checkPayload (type, data, origin, source) {
      expect(type).to.eql('received')
      expect(data.type).to.eql('test')
      expect(data.data).to.eql(payload)
      expect(data.origin).to.eql(window.location.protocol + '//' + window.location.host)
      expect(data.source).to.eql(true)
      expect(origin).to.eql(window.location.protocol + '//' + window.location.host)
      expect(source).to.eql(iframe.contentWindow)
      cb()
    }
  }
})
