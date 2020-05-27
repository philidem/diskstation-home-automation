var requestDigest = require('request-digest');

function padLeft(str, minLength) {
  str = str.toString();
  while(str.length < minLength) {
    str = '0' + str;
  }
  return str;
}
exports.setClocks = function() {
  var username = process.env.AMCREST_CAMERA_USERNAME;
  var password = process.env.AMCREST_CAMERA_PASSWORD;
  var ipAddresses = process.env.AMCREST_CAMERA_IP_ADDRESSES.split(',').map(function(ipAddress) {
    return ipAddress.trim();
  });

  var now = new Date();
  var year = now.getFullYear();
  var month = padLeft(now.getMonth() + 1, 2);
  var dayOfMonth = padLeft(now.getDate(), 2);

  var hours = padLeft(now.getHours(), 2);
  var minutes = padLeft(now.getMinutes(), 2);
  var seconds = padLeft(now.getSeconds(), 2);

  var dateStr = year + '-' + month + '-' + dayOfMonth + ' ' + hours + ':' + minutes + ':' + seconds;

  for (var i = 0; i < ipAddresses.length; i++) {
    var ipAddress = ipAddresses[i];
    var digestRequest = requestDigest(username, password);

    console.log('Setting clock for ' + ipAddress + ' to ' + dateStr + '...');

    digestRequest.request({
      host: 'http://' + ipAddress,
      path: '/cgi-bin/global.cgi?action=setCurrentTime&time=' + dateStr,
      port: 80,
      method: 'GET',
      headers: {}
    }, function (error, response, body) {
      if (error) {
        throw error;
      }

      console.log('Result for ' + ipAddress + ':');
      console.log(body);
    });
  }
}