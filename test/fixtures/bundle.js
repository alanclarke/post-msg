var createPostKitten = require('../../index')
var post = createPostKitten(window.parent)
post.on('*', function reply (type, data, origin, source) {
  post.emit('received', {
    type: type,
    data: data,
    origin: origin,
    source: !!source
  })
})
