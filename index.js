var createEmitter = require('on-emit')

module.exports = function create (targetWindow, origin) {
  var emitter = createEmitter()
  var emit = emitter.emit

  window.addEventListener('message', receivePostMessage, false)

  emitter.emit = function emitPostMessage (type, data) {
    targetWindow.postMessage({ type: type, data: data }, origin || '*')
  }

  emitter.dispose = function dispose () {
    emitter.off()
    window.removeEventListener('message', receivePostMessage)
  }

  function receivePostMessage (event) {
    emit(event.data.type, event.data.data, event.origin, event.source)
  }

  return emitter
}
