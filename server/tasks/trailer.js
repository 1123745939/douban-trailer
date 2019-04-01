const cp = require('child_process')
const resolve_dir = require('path').resolve
module.exports = async doubanId => {
  return new Promise(async (resolve, reject) => {
    const script = resolve_dir(__dirname, '../crawler/video')
    const child = cp.fork(script, [], {
      argv0: doubanId
    })
    let invoked = false

    child.on('error', err => {
      if (invoked) return
      invoked = true
      console.log(err)
      reject(err)
    })
    child.on('exit', code => {
      if (invoked) return

      invoked = true
      let err = code === 0 ? null : new Error('exit code ' + code)
      if (err) {
        reject(err)
      }
    })
    child.on('message', data => {
      let result = data.data
      resolve(result)
    })
  })
}
