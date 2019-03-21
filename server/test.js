class Boy {
  @speak('chinese')
  run() {
    console.log('I can speak ' + this.langue)
    console.log('run')
  }
}
function speak(langue) {
  return function(target, key, descripter) {
    console.log(target)
    console.log(key)
    console.log(descripter)
    target.langue = langue
    return descripter
  }
}
const ybq = new Boy()
ybq.run()
