// fork from https://gist.github.com/zh-h/c5adc0dc4f0b96b00040aab9b8df93e6#file-who-weibo-js

function decodeBase62(number) {
  var alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var out = 0
  var len = number.length - 1
  for (var t = 0; t <= len; t++) {
      out = out + alphabet.indexOf(number.substr(t, 1)) * Math.pow(62, len - t)
  }
  return out
}

function decode16Unit(number) {
  return parseInt(number, 16)
}

function decode(number) {
  if (number.startsWith('00')) {
      return decodeBase62(number)
  } else {
      return decode16Unit(number)
  }
}

function findNumber(url) {
  var lastIndexOfSlash = url.lastIndexOf('/')
  var number = url.substr(lastIndexOfSlash + 1, 8)
  return number
}

function findUid(url) {
  var number = findNumber(url)
  var uid = decode(number)
  return uid
}

function constructHomePageUrl(uid) {
  if (!uid) return ''
  var prefixUrl = 'http://weibo.com/u/'
  return prefixUrl + uid
}

function main(url) {
  var uid = findUid(url)
  var homePageUrl = constructHomePageUrl(uid)
  return homePageUrl
}

export default main
