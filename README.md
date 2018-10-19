[![Travis CI](https://travis-ci.org/alanclarke/post-msg.svg?branch=master)](https://travis-ci.org/alanclarke/post-msg)
[![devDependency Status](https://david-dm.org/alanclarke/post-msg/dev-status.svg)](https://david-dm.org/alanclarke/post-msg#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# post-msg
Post message made simple

- Tiny
- 100% test coverage
- performant


## Installation
```js
npm install --save post-msg
```

## Usage

- `createPostMsg(window, origin)`: returns a postMsg instance
- `postMsg.on(namespace, handler)`: listen for and handle post messages from target window
- `postMsg.emit(namespace, data)`: send post messages to target window

example:
```js
var createPostMsg = require('post-msg')
var postMsg = createPostMsg(targetWindow, '*')

postMsg.on('*', log) // listen to all post messages from the targetWindow

postMsg.on('namespace', log) // listen for namespaced post messages from the targetWindow

postMsg.emit('hello', { data: true }) // send a post message to the targetWindow

postMsg.dispose() // remove all event and post message listeners

function log (type, data, origin, source) {
  console.log(type, data, origin, source)
}
```
