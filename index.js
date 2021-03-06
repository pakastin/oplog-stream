'use strict'

var MongoDB = require('mongodb')

module.exports = OplogStream

function OplogStream (callback) {
  var oplogurl = 'mongodb://localhost/local'

  MongoDB.MongoClient.connect(oplogurl, function (err, db) {
    if (err) {
      return callback(err)
    }

    db.collection('oplog.rs', function (err, oplog) {
      if (err) {
        return callback(err)
      }

      var now = Date.now()
      var timestamp = MongoDB.Timestamp(0, (now / 1000 | 0))

      var cursor = oplog.find({ts: {$gt: timestamp}}, {
        tailable: true,
        awaitdata: true,
        oplogReplay: true,
        numberOfRetries: -1
      })

      var stream = cursor.stream()
      var destroy = stream.destroy

      stream.destroy = function () {
        cursor.close()
        destroy.call(stream)
        db.close()
      }

      callback(null, stream)
    })
  })
}
