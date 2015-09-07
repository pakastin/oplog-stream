# oplog-stream
MongoDB oplog stream wrapper

## Installation
```
  npm install oplog-stream
```

## Usage
```js
  var oplog = require('oplog-stream')
  
  oplog(function (err, stream) {
    if (err) {
      throw err
    }
    stream.on('data', function (data) {
      console.log(data)
    })
    stream.on('error', function () {
      throw err
    })
  })
```

## Destroying stream

```js
  stream.destroy() // also closes connection to db
```
