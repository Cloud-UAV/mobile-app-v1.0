angular.module('starter.services', [])

.factory('$localstorage', function($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    },
    setMission: function(mission) {
      var prevm = [];
      if($window.localStorage.getItem('prevMission') !== null) {
        prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      }

      prevm.push(mission);
      $window.localStorage.setItem('prevMission',JSON.stringify(prevm));
      //prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      //console.log(prevm);
    },
    getAllMission: function(userId) {
      let prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      if(prevm == null) return [];
      let res = [];
      for (var i = 0; i < prevm.length; i++) {
        if(prevm[i].userID == userId) { 
          res.push(prevm[i]);
        }
      }

      return res;
      
    },
    getMission: function(mId) {
      let prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      for (var i = 0; i < prevm.length; i++) {
        if(prevm[i].id == mId) { 
          return prevm[i];
        }
      }
      return "";
    },
    delMission: function(mId) {
      let prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      for (var i = 0; i < prevm.length; i++) {
        if(prevm[i].id == mId) { 
          prevm.splice(i,1)
        }
      }
      $window.localStorage.setItem('prevMission',JSON.stringify(prevm));
      
    },
    getMissionLength: function(userId) {
      let prevm = JSON.parse($window.localStorage.getItem('prevMission'));
      if(prevm == null) return 0;
      let res = [];
      for (var i = 0; i < prevm.length; i++) {
        if(prevm[i].userID == userId) { 
          res.push(prevm[i]);
        }
      }

      return res.length;
      
    }
  }

})

.factory('$conditions', function() {

  var theList = [
  'Coordination with the provider of air traffic services in the area of operation at least seven days before a proposed operation and air traffic services must be given the listed information. Pilot must comply with and acknowledge receipt of all air traffic instructions from air traffic control, comply with all air traffic control clearances received by the pilot, and during VFR flight, read back text of any air traffic control clearance received when requested by air traffic control. No operations are allowed in Class F Special Use Restricted Airspace – Military Operations unless, at least 30 days before operation, the person obtains written authorization from the Base and a written letter from the Minister of National Defense allowing the operation.'
  ,'Within a lateral distance of 500 feet to assembly of persons, operations cannot occur unless aircraft is flown at greater than 300 ft AGL and an emergency landing is necessary it is possible without creating a hazard to people or property. Before take-off or launch pilot must conduct an assessment of hazards present including meteorological conditions, and probability of lost command and control links or fly-away; establish procedures and precautions related to operations that ensure no hazard is created to people or property; establish a site for take-off and landing with a minimum diameter of 20 m from the point of take-off that has access restricted to crew members and is clear of obstacles. Aircraft must reach the minimum altitude required for the operation at an expedited rate of climb.'
  ,'Aircraft must have turned-on position lights and anti-collision lights; LED lights must be of intensity and spectrum to be seen with or without night-vision goggles; Aircraft must have means of illumination sufficient to maintain a visual line of sight with the pilot; Every crew member must have a portable emergency light source accessible; No crew member can conduct night operations if they have visual limitations related to depth perception, colour blindness, or visual acuity in low light; Take-off and landing site must be lighted and operations conducted under a SFOC; Night vision goggles can’t be used to perform sense and avoid functions'
  ,'Within a lateral distance of 500 feet to built-up area boundary, operations cannot occur unless aircraft is flown at greater than 300 ft AGL and an emergency landing is necessary it is possible without creating a hazard to people or property. Before take-off or launch pilot must conduct an assessment of hazards present including meteorological conditions, and probability of lost command and control links or fly-away; establish procedures and precautions related to operations that ensure no hazard is created to people or property; establish a site for take-off and landing with a minimum diameter of 20 m from the point of take-off that has access restricted to crew members and is clear of obstacles. Aircraft must reach the minimum altitude required for the operation at an expedited rate of climb.'
  ];

  return {
    get: function(id) {
      return theList[id];
    }
  };
})

.factory('$complianceVerySmallUav', function() {

  const theList = [{
    name : 'Pilot has completed pilot knowledge test with grade of at least 60% in the last five years',
    checked: false
  }, {
    name: 'Pilot is at least 14 years of age',
    checked: false 
  }, { 
    name: 'Aircraft is marked with pilot’s name and contact information',
    checked: false
  }, { 
    name: 'Operations in Class G airspace only',
    checked: false
  }, { 
    name: 'Max altitude: 300 feet above ground level',
    checked: false
  }, { 
    name: 'Max speed: 25 knots (29 mph)',
    checked: false
  }, { 
    name: 'Max distance from pilot: 0.25 nautical miles (0.46 km)',
    checked: false
  }, { 
    name: 'Will maintain lateral distance of ≥100 feet from people not involved in the operation, unless flying above 100 ft AGL and slower than 10 knots',
    checked: false
  }, { 
    name: 'No operating over an open-air assembly of persons, will maintain lateral distance of at least 100 feet',
    checked: false
  }, { 
    name: 'Aircraft will fly clear of cloud',
    checked: false
  }, { 
    name: 'Ground visibility is at least 2 statute miles',
    checked: false
  }, { 
    name: 'operations are at least 3 nm (5.5 km) from an aerodrome',
    checked: false
  }, { 
    name: 'Operations are at least 1 nm (1.85 km) from a heliport',
    checked: false
  }, { 
    name: 'Prohibitions: no operation in control or restricted airspace; no night operations; no operations at aerodromes',
    checked: false
  }];

  return {
    get: function(id) {
      return theList[id];
    },

    all: function() {
      return theList;
    }
  };
})

.factory('$complianceSmallLimited', function() {

  const theList1 = [{
    name : 'Pilot has completed pilot knowledge test with grade of at least 60% in the last five years',
    checked: false
  }, {
    name: 'Pilot is at least 16 years of age',
    checked: false 
  }, { 
    name: 'Crew members have up-to-date qualifications and training',
    checked: false
  }, { 
    name: 'Aircraft is marked with pilot’s name and contact information',
    checked: false
  }, { 
    name: 'There is a means of:',
    name2: 'controlling flight of aircraft',
    name3: 'monitoring the proper function of the unmanned aircraft system',
    name4:'navigating the aircraft, performing communications with air traffic control',
    name5:'detecting hazardous environmental flight conditions; mitigating the risk of loss of control',
    name6:'providing sense and avoid functions; and remaining clear of cloud at required distance',
    
    checked: false
  }, { 
    name: 'Operations in Class G airspace only',
    checked: false
  }, { 
    name: 'Max altitude: 300 feet above ground level, OR 100 feet above a building or structure if laterally within 200 feet of it and more than 3 nm from an aerodrome',
    checked: false
  }, { 
    name: 'Max speed: 87 knots (100 mph)',
    checked: false
  }, { 
    name: 'Max distance from pilot: 0.5 nautical miles (0.93 km)',
    checked: false
  }, { 
    name: 'Will maintain lateral distance of ≥250 feet from people not involved in the operation, unless flying above 250 ft AGL and slower than 10 knots',
    checked: false
  }];

const theList2 = [{
    name : 'No operating over an open-air assembly of persons, will maintain lateral distance of at least 500 feet',
    checked: false
  }, {
    name: 'Aircraft will fly clear of cloud',
    checked: false 
  }, { 
    name: 'Ground visibility is at least 2 statute miles',
    checked: false
  }, {
    name: 'operations are at least 3 nm (5.5 km) from an aerodrome',
    checked: false 
  }, { 
    name: 'Operations are at least 1 nm (1.85 km) from a heliport',
    checked: false
  }, {
    name: 'Operations are at least 0.5 nm (0.9 km) from the boundary of a built-up area',
    checked: false 
  }, { 
    name: 'If operating in an altimeter-setting region or standard pressure region, before take-off the pilot must set the altimeter to the appropriate setting for that region.',
    checked: false
  }, {
    name: 'Lost Command-Control (C2) Link risks have been assessed',
    checked: false 
  }, { 
    name: 'UAV won’t be flown with snow, ice, or frost on critical surfaces and must be inspected for these by the pilot or a designated crew member before operations. Pilot must inform crew members before anti-icing or de-icing occurs. If icing conditions are forecast or likely, operations cannot occur unless the pilot deems the aircraft has the necessary equipment to operate or icing conditions no longer exist.',
    checked: false
  }, {
    name: 'Technical records of flight time of each flight, total aircraft flight time, number of landings since date of manufacture, and particulars of maintenance, modifications, and repairs will be kept.',
    checked: false 
  }, { 
    name: 'Prohibitions:',
    name2:'no operation in control or restricted airspace',
    name3:'no night operations;',
    name4:'no operations at aerodromes',
    name5:'no towing; no flying in formation with other aircraft',
    name6:'no performing acrobatic maneuvers',
    checked: false
  }];

const theList3 = [{
    name : 'Normal operation procedures for system assembly, pre-flight checks, take-off and launch, landing and recovery, performance limitations, refueling/recharging, and use of checklists',
    checked: false
  }, {
    name: 'Emergency procedures covering: engine failure or fire;',
    name2:'gliding;',
    name3:'emergency landing or recovery; ',
    name4:'structural failure of aircraft;',
    name5:'control station failure;',
    name6:'equipment failure; pilot incapacitation; potential conflict with other aircraft',
    checked: false 
  }, { 
    name: 'Lost Command-Control Link emergency procedures, covering: ',
    name2:'route of flight during lost C2 link event; use of transponders;',
    name3:'orbit points in event of lost link; ',
    name4:'communications with air traffic service if applicable;',
    name5:'contingency planning measures in event that C2 link cannot be re-established, including pre-programmed flight termination points and automatic landing or recovery procedures.',
    checked: false
  }, {
    name: 'Fly-away contingency procedures, covering how to determine if UAV enters controlled airspace and contact information for controlled airspace the UAV could enter.',
    checked: false 
  }, { 
    name: 'Flight termination contingency procedures, covering how to determine when flight termination is required; how to contact air traffic service unit; pre-programmed flight termination points; flight routes to flight termination points.',
    checked: false
  }, {
    name: 'A checklist or placard enabling the UAV to be operated in accordance with manufacturer’s limitations, and a fire extinguisher is available during all operations',
    checked: false 
  }];

  return {
    all1: function() {
      return theList1;
    },
    all2: function() {
      return theList2;
    },
    all3: function() {
      return theList3;
    }
  };
})

.factory('$updateCheckBox', function() {
  return {
    get: function(items) {
    let openBtn = true;
    for(item in items) {
      openBtn &= items[item].checked;
    }
    return openBtn;
    }
  };
})

.factory('$object', function()  {
  return {
      isEmpty: function(obj) {
        let val= isNaN(obj);
        if(val == false) return false;
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
      },
      toJson: function(items) { //Remove others items ex: $$hashkey
        let chk = [];
        let arr = {};
        for(index in items) {
          arr = { 
              "name" : items[index].name,
              "checked" : items[index].checked,
              "comm" : items[index].comm
          };  
          chk.push(arr);
        }
        return chk;
      }
    }
})


.factory('$complianceSamllComplex', function() { 
  const theList1 = [{
    name : 'Pilot has a valid pilot permit from Transport Canada',
    checked: false
  }, {
    name: 'Pilot is at least 16 years of age',
    checked: false 
  }, { 
    name: 'Aircraft is marked and registered with Transport Canada',
    checked: false
  }, { 
    name: 'Aircraft has any markings or placards required by manufacturer in place',
    checked: false
  }, { 
    name: 'There is a means of:',
    name2: 'controlling flight of aircraft',
    name3: 'monitoring the proper function of the unmanned aircraft system', 
    name4: 'navigating the aircraft, performing communications with air traffic control',
    name5: 'detecting hazardous environmental flight conditions',
    name6: 'mitigating the risk of loss of control; providing sense and avoid functions',
    name7: 'and remaining clear of cloud at required distance',
    checked: false
  }, { 
    name: 'Max speed: 87 knots (100 mph)',
    checked: false
  }, { 
    name: 'Will maintain lateral distance of ≥100 feet from people not involved in the operation, unless flying above 100 ft AGL and slower than 10 knots',
    checked: false
  }, { 
    name: 'Distance from aircraft to cloud will be at least 500 feet vertically and 1 mile horizontally',
    checked: false
  }, { 
    name: 'Ground visibility is at least 3 statute miles',
    checked: false
  }];

  const theList2 = [{
    name : 'Prohibitions: no towing; no flying in formation with other aircraft; no performing acrobatic maneuvers',
    checked: false
  }, {
    name: 'If operating in an altimeter-setting region or standard pressure region, before take-off the pilot must set the altimeter to the appropriate setting for that region.',
    checked: false 
  }, { 
    name: 'Lost Command-Control (C2) Link risks have been assessed',
    checked: false
  }, { 
    name: 'UAV won’t be flown with snow, ice, or frost on critical surfaces and must be inspected for these by the pilot or a designated crew member before operations. Pilot must inform crew members before anti-icing or de-icing occurs. If icing conditions are forecast or likely, operations cannot occur unless the pilot deems the aircraft has the necessary equipment to operate or icing conditions no longer exist.',
    checked: false
  }, { 
    name: 'Technical records of flight time of each flight, total aircraft flight time, number of landings since date of manufacture, and particulars of maintenance, modifications, and repairs will be kept.',
    checked: false
  }];

const theList4 = [{
    name : 'Normal operation procedures for system assembly, pre-flight checks, take-off and launch, landing and recovery, performance limitations, refueling/recharging, and use of checklists',
    checked: false
  }, {
    name: 'Emergency procedures covering:',
    name2:'engine failure or fire; ',
    name3:'gliding;',
    name4:'emergency landing or recovery; ',
    name5:'structural failure of aircraft; control station failure;',
    name6:'equipment failure; pilot incapacitation; potential conflict with other aircraft',
    checked: false 
  }, { 
    name: 'Lost Command-Control Link emergency procedures, covering:',
    name2:'route of flight during lost C2 link event; use of transponders; ',
    name3:'orbit points in event of lost link; communications with air traffic service if applicable;',
    name4:'contingency planning measures in event that C2 link cannot be re-established, including pre-programmed flight termination points and automatic landing or recovery procedures.',
    checked: false
  }, {
    name: 'Fly-away contingency procedures, covering how to determine if UAV enters controlled airspace and contact information for controlled airspace the UAV could enter.',
    checked: false 
  }, { 
    name: 'Flight termination contingency procedures, covering how to determine when flight termination is required; how to contact air traffic service unit; pre-programmed flight termination points; flight routes to flight termination points.',
    checked: false
  }, {
    name: 'A checklist or placard enabling the UAV to be operated in accordance with manufacturer’s limitations, and a fire extinguisher is available during all operations',
    checked: false 
  }];
  

 const theList5 = [{
    name : 'If operating in controlled or restricted airspace, or within 3 nm (5.5 km) from an aerodrome or 1 nm (1.85 km) from a heliport, will abide by conditions',
    checked: false
  }, {
    name: 'If operating over an open-air assembly of persons (lateral distance of 500 feet or less), will abide by conditions',
    checked: false 
  }, { 
    name: 'If operating at night, will abide by conditions',
    checked: false
  }, {
    name: 'If operating within 0.5 nm of a built-up area, or over or within a built-up area, will abide by conditions',
    checked: false 
  }];

   return {
    
    all1: function() {
      return theList1;
    },
    all2: function() {
      return theList2;
    },
    all4: function() {
      return theList4;
    },
    all5: function() {
      return theList5;
    }
  };
})

.factory('$preFlightChk', function() {

  const theList = [{
    name : 'boundaries of area of operation',
    checked: false,
    comm: ""
  }, {
    name: 'boundaries of private and public property',
    checked: false ,
    comm: ""
  }, { 
    name: 'name and contact information of landowners of any private property that may require access',
    checked: false,
    comm: ""
  }, { 
    name: 'permission from landowner of private property to launch/land UAV on their property, if necessary',
    checked: false,
    comm: ""
  }, { 
    name: 'class of airspace of operation and regulations/requirements within that class;',
    checked: false,
    comm: ""
  }];

  const theList2 = [{
    name : 'altitude and routes to be used on approach and departure from area of operation;',
    checked: false,
    comm: ""
  }, {
    name: 'proximity of manned aircraft operations;',
    checked: false ,
    comm: ""
  }, { 
    name: 'proximity of aerodromes;',
    checked: false,
    comm: ""
  }, { 
    name: 'hazards associated with nearby industrial sites;',
    checked: false,
    comm: ""
  }, { 
    name: 'proximity to high-intensity radio transmissions or electromagnetic interference;',
    checked: false,
    comm: ""
  }, { 
    name: 'location and height of obstacles including wires, masts, buildings, cell towers, wind turbines;',
    checked: false,
    comm: ""
  }];

  const theList3 = [{
    name : 'proximity to built-up areas, roadways, and recreational activity sites;',
    checked: false,
    comm: ""
  }, {
    name: 'proximity to any other potential hazards',
    checked: false ,
    comm: ""
  }, { 
    name: 'security measures to limit public access to site;',
    checked: false,
    comm: ""
  }, { 
    name: 'predominant weather conditions;',
    checked: false,
    comm: ""
  }, { 
    name: 'minimum required separation distances from persons, vehicles, buildings, structures',
    checked: false,
    comm: ""
  }, { 
    name: 'potential to disturb wildlife and/or domestic animals',
    checked: false,
    comm: ""
  }, { 
    name: 'potential to violate privacy of persons not associated with the operation',
    checked: false,
    comm: ""
  }, { 
    name: 'likelihood of icing conditions',
    checked: false,
    comm: ""
  }];
  return {
    all1: function() {
      return theList;
    },
    all2: function() {
      return theList2;
    },
    all3: function() {
      return theList3;
    }
  };
})

.factory('$platformChk', function() {

  const theList = [{
    name : 'Walk around – check overall condition, airworthiness',
    checked: false
  }, {
    name: 'Airframe condition – check for cracks, loose parts, and damage',
    checked: false 
  }, { 
    name: 'Wiring – check for loose wires, damage',
    checked: false
  }, { 
    name: 'Propellers – check for damage, correct direction of rotation, securely fastened, free range of motion',
    checked: false
  }, { 
    name: 'Wings – check for damage, securely fastened',
    checked: false
  }, { 
    name: 'Control surfaces – check for damage, correct direction',
    checked: false
  }, { 
    name: 'Screws and fasteners – check that all fasteners holding components are secure and properly threaded, not damaged',
    checked: false
  }, { 
    name: 'Battery – check battery condition (not puffy or hot) and charge level',
    checked: false
  }, { 
    name: 'Battery connection – check batteries are connected, seated properly, and secured',
    checked: false
  }, { 
    name: 'Fail-safe equipment – check that return to home/return to launch functions are active, sense/avoid equipment active and functioning, recovery chute attached and functioning, if necessary',
    checked: false
  }, { 
    name: 'Monitoring equipment – check that all monitoring equipment (i.e. GPS, airspeed sensor, altitude sensor, RC receiver) is functioning correctly',
    checked: false
  }, { 
    name: 'Flight modes – ensure all flight modes required for operation (manual, auto) are set and programmed into RC transmitter',
    checked: false
  }, { 
    name: 'RC transmitter – check stick settings, check flight modes, test communication between aircraft and transmitter',
    checked: false
  }, { 
    name: 'Ground control station – ensure communication is active between ground control and aircraft, ensure flight plan is uploaded and correct',
    checked: false
  }];

  return {
    all: function() {
      return theList;
    }
  };
})

.factory('$sensorChk', function() {

  const theList = [{
    name : 'Battery – is fully charged and connected properly',
    checked: false
  }, {
    name: 'Lens – clear of dust and dirt, opens/closes smoothly, lens cap off',
    checked: false 
  }, { 
    name: 'Settings – appropriate settings (F-stop, ISO, shutter speed) for operational conditions, settings are locked if possible',
    checked: false
  }, { 
    name: 'Data storage – memory card or similar device is cleared and in sensor',
    checked: false
  }, { 
    name: 'Trigger – check that sensor will trigger at appropriate intervals',
    checked: false
  }, { 
    name: 'Mounting – securely mounted to platform',
    checked: false
  }, { 
    name: 'Connection to platform – wires/ports connecting sensor to platform are secure and properly connected',
    checked: false
  }, { 
    name: 'Take test image – ensure sensor turns/on off, check imagery quality',
    checked: false
  }];

  return {
    all: function() {
      return theList;
    }
  };
})

.factory('$missionPlanChk', function() {

  const theList = [{
    name : 'Planned route takes into account height and location of obstacles',
    checked: false
  }, {
    name: 'Routes to and from launch/land site are planned',
    checked: false 
  }, { 
    name: 'All crew members are aware of planned routes',
    checked: false
  }, { 
    name: 'Emergency contingency plans are in place for flyaway, lost C2 link, crash, and obstacle avoidance',
    checked: false
  }, { 
    name: 'Launch/landing takes into account wind direction',
    checked: false
  }, { 
    name: 'Launch and landing site is clear of objects and people',
    checked: false
  }, { 
    name: 'Mission plan is uploaded to UAV platform',
    checked: false
  }];

  return {
    all: function() {
      return theList;
    }
  };
})

.factory('$userChk', function($window,$localstorage,$object)  {
  return {
     add: function(data,addedItem) {

         let added = $localstorage.getObject(addedItem);
            if($object.isEmpty(added)) {
              let items = [];
              items.push({
                name: data.text,
                comm: "",
                checked: false});
              $localstorage.setObject(addedItem,items);  
            }
            else  {
              added.push({
                name: data.text,
                comm: "",
                checked: false});
              $localstorage.setObject(addedItem,added);  
            }
            $window.location.reload();
        
      },
      remove: function(index,delItem) {
        if(confirm("Do you want to delete the checkbox?")) {
          let items = $localstorage.getObject(delItem);
          items.splice(index,1);
          $localstorage.setObject(delItem,items);
          $window.location.reload();
        }
      }
    }
})

.factory('$promptsChk', function() {

  const theList = [{
    name : 'Is your battery/fuel disconnected from your UAS platform?',
    checked: false
  }, {
    name: 'Check your airframe. Is anything damaged or missing?',
    checked: false 
  }, { 
    name: 'Check your flight data! Did imagery record? Does it look acceptable?',
    checked: false
  }, { 
    name: 'Is your data safe? Keep your flight data in a safe place and make sure to back up your data ASAP!',
    checked: false
  }];

  return {
    all: function() {
      return theList;
    }
  };
})

.factory('$syncService', function($localstorage,$http, $object) {

  function saveMissionSummary(pMid) {
      if(pMid == "" || pMid == null) {
        var mission = {};
        var datetime = new Date();
        mission.id = datetime.getTime();
        mission.userID = $localstorage.getObject("userId");
        mission.droneID =  $localstorage.getObject("droneId")[0];
        mission.sensorID = $localstorage.getObject("sensorId")[0];
        mission.Personnels = $localstorage.getObject("personnelId");
        mission.projectID = $localstorage.getObject("projectId");
        mission.droneCatgory = $localstorage.getObject("droneCatgory");
        mission.startTime = $localstorage.getObject("startTime");
        mission.endTime =  $localstorage.getObject("endTime");
        mission.name = $localstorage.getObject("missionName");
        mission.preset = false;
        let geo = $localstorage.getObject("geolocation");
        geo = geo.split(',');
        mission.location = {
          "coordinates": [geo[0], geo[1]],
          "type": "Point"
        }
      
        $localstorage.setMission(mission);
        return mission.id;
      } else {
        var mission = {};
        var datetime = new Date();
        mission.name = $localstorage.getObject(pMName);
        mission.id = pMid;
        mission.userID = $localstorage.getObject("userId");
        mission.droneCatgory = $localstorage.getObject("droneCatgory");
        mission.startTime = $localstorage.getObject("startTime");
        mission.endTime =  $localstorage.getObject("endTime");
        mission.preset = true;
        $localstorage.setMission(mission);
        return pMid;
      }
  }

  function retFromat(title,total) {
      return data = {  
        "extension": "json",
        "data": {
          [title] : total
           
        }
      }
  }

  function updateCumulativeSec(data) {
    let cumulativeTotalSeconds = $localstorage.getObject("cumulativeTotalSeconds");
    if($object.isEmpty(cumulativeTotalSeconds)) {
      cumulativeTotalSeconds = data;
    } else {
      cumulativeTotalSeconds += data;
    }
    $localstorage.setObject("cumulativeTotalSeconds", cumulativeTotalSeconds);
  }

  function updateToServer(mId,userId,preset) {
      //whether presetMission or not
     if (preset == true) {
        let geo = $localstorage.getObject("geolocation");
        geo = geo.split(',');
        let json = {
             "startTime": $localstorage.getObject("startTime"),
             "endTime": $localstorage.getObject("endTime"),
             "description": "",
             "location": {
                 "coordinates": [geo[0], geo[1]],
                 "type": "Point"
             }
        }
        $http.patch(baseUrl + "/missions/" + mId, json, {
          headers: {'auth-token': $localstorage.getObject('token')}
        })
          .success(function(response) {
            sendChkList(mId,mId,userId);
            if(!debug)
              $localstorage.delMission(mId);  //remove that updated mission

            let endTime = new Date($localstorage.getObject("endTime"));
            let startTime = new Date($localstorage.getObject("startTime"));
            updateCumulativeSec(endTime - startTime);
          }, function(err) {
                 console.log(err);
        });
        

     } else {
        $http.post(baseUrl + "/missions", $localstorage.getMission(mId), {
          headers: {'auth-token': $localstorage.getObject('token')}
        })
          .success(function(response) {
            let userId = $localstorage.getObject("userId");
            sendChkList(response.id,mId,userId);
            if(!debug)
              $localstorage.delMission(mId);  //remove that updated mission
            let endTime = new Date($localstorage.getObject("endTime"));
            let startTime = new Date($localstorage.getObject("startTime"));
            updateCumulativeSec(endTime - startTime);
          }, function(err) {
            console.log(err);
          });
      }

  }
  function  sendChkList(id,mId,userId) {
      for(let i = 0; i < 5; i++) {

        let tempJson = {};
        if(i==0)      tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+missionPlanChk);
        else if(i==1) tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+platformChk);
        else if(i==2) tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+preFlightChk);
        else if(i==3) tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+sensorChk);
        else if(i==4) {
          let tmp = $localstorage.getMission(mId).droneCatgory;
          //console.log(mId);
          //console.log(tmp);
          if(tmp == verySmall) 
            tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+verySmallUavChkList);
          if(tmp == smallLimited)
            tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+smallLimitedList);
          if(tmp == smallComplex)
            tempJson = $localstorage.getObject(userId+"-"+ mId+"-"+smallComplexList);
          
        }
        else return;
        
        $http.post(baseUrl+"/missions/"+id+"/files",tempJson, {
          headers: {'auth-token': $localstorage.getObject('token')}
        })
          .success(function(response) {
            if (i == 0) {
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+missionPlanChk);
              uploadedChk |= 0x01;
            }
            else if(i == 1) {
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+platformChk);
              uploadedChk |= 0x02;
            }
            else if(i == 2) {
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+preFlightChk);
              uploadedChk |= 0x04;
            }
            else if(i == 3) {
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+sensorChk);
              uploadedChk |= 0x08;
            }
            else if(i == 4) {
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+verySmallUavChkList);
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+smallLimitedList);
              if(!debug)
                $localstorage.remove(userId+"-"+ mId+"-"+smallComplexList);
              uploadedChk |= 0x10;
            }
                        
          }, function(err) {
            console.log(err);
          }); 
    }  
   
  }

  return {
    sendChkList: sendChkList,
    updateToServer: updateToServer,
    retFromat: retFromat,
    saveMissionSummary: saveMissionSummary

  }
})

.factory('$device', function($cordovaNetwork, $rootScope) {

  return {
    checkIfMobile: function() {
      //alert("And: " + ionic.Platform.isAndroid() + " IOS:" + ionic.Platform.isIOS());
      //return ionic.Platform.isAndroid() ? false : 
      //ionic.Platform.isIOS() ? true : false;

      return ionic.Platform.isAndroid()? true : false;
    }
  }
})


