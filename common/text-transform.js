module.exports = function (text) {
  return text.replace('/\r\n/g', '<br/>').replace('/ /g', '&nbsp;');
}