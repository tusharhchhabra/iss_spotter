const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, upcomingPasses) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  for (const pass of upcomingPasses) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});