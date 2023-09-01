const request = require("request");

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    if (!ip) {
      const msg = "Error: failed to parse fetched JSON.";
      callback(Error(msg));
      return;
    }

    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('http://ipwho.is/' + ip, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const bodyObj = JSON.parse(body);
    if (!bodyObj.success) {
      const msg = `Success status was ${bodyObj.success}. Server message says: ${bodyObj.message} when fetching for IP ${bodyObj.ip}`;
      callback(Error(msg));
      return;
    }

    const { latitude, longitude } = bodyObj;

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };