module.exports = function (data) {
  var badges = {
    // note: road counts and road mod counts were removed

    // roads: {
    //   name: 'Road Builder',
    //   id: 1,
    //   tiers: {1: 100, 2: 500, 3: 1000}
    // },
    // roadMods: {
    //   name: 'Road Maintainer',
    //   id: 2,
    //   tiers: {1: 100, 2: 500, 3: 1000}
    // },
    pois: {
      name: 'On Point',
      id: 3,
      tiers: {1: 500, 2: 2500, 3: 5000}
    },
    buildings: {
      name: 'The Wright Stuff',
      id: 4,
      tiers: {1: 100, 2: 500, 3: 1000}
    },
    gpsTraces: {
      name: 'Field Mapper',
      id: 5,
      tiers: {1: 10, 2: 50, 3: 100}
    },
    roadKms: {
      name: 'On The Road Again',
      id: 6,
      tiers: {1: 50, 2: 100, 3: 500}
    },
    roadKmMods: {
      name: 'Long and Winding Road',
      id: 7,
      tiers: {1: 50, 2: 100, 3: 500}
    },
    waterways: {
      name: 'White Water Rafting',
      id: 8,
      tiers: {1: 50, 2: 100, 3: 500}
    },
    countries: {
      name: 'World Renown',
      id: 9,
      tiers: {1: 5, 2: 10, 3: 25}
    },
    tasks: {
      name: 'Task Champion',
      id: 10,
      tiers: {1: 5, 2: 20, 3: 50}
    },
    taskEdits: {
      name: 'Scrutinizer',
      id: 11,
      tiers: {1: 5, 2: 20, 3: 50}
    },
    josm: {
      name: 'Awesome JOSM',
      id: 12,
      tiers: {1: 1, 2: 10, 3: 100}
    },
    hashtags: {
      name: 'Mapathoner',
      id: 13,
      tiers: {1: 5, 2: 20, 3: 50}
    }
  };

  function checkBadgeLevel (userTotal, badge) {
    if (userTotal >= badge.tiers[1] && userTotal < badge.tiers[2]) {
      return 1;
    } else if (userTotal >= badge.tiers[2] && userTotal < badge.tiers[3]) {
      return 2;
    } else if (userTotal >= badge.tiers[3]) {
      return 3;
    } else {
      return 0;
    }
  }

  var userBadges = {};
  Object.keys(data).forEach(function (key) {
    var userTotal = data[key];
    var badge = badges[key];

    var badgeLevel = checkBadgeLevel(userTotal, badge);
    if (badgeLevel < 3) {
      var nextBadgeLevel = badgeLevel + 1;
      var currentPoints = Number(userTotal);
      var lastPoints = 0;
      if (badgeLevel > 0) lastPoints = badge.tiers[badgeLevel];
      var nextPoints = badge.tiers[nextBadgeLevel];
      var percentage = (currentPoints - lastPoints) / (nextPoints - lastPoints) * 100;
      userBadges[key] = {
        name: badge.name,
        category: badge.id,
        badgeLevel: badgeLevel,
        nextBadgeLevel: nextBadgeLevel,
        points: {
          currentPoints: currentPoints,
          nextPoints: nextPoints,
          percentage: percentage
        }
      };
    }
  });

  return userBadges;
};
