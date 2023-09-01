const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request('http://ipwho.is/' + ip);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
};

module.exports = { nextISSTimesForMyLocation };