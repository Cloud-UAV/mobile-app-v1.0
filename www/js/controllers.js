angular.module('starter.controllers', ['ionic','ionic-multiselect','timer'])

.controller('PromptsSummaryCtrl',function($scope, $state, $promptsChk,
 $localstorage, $updateCheckBox, $device, $ionicPopup) {

  $scope.items = $promptsChk.all();
  $scope.userItems = $localstorage.getObject(promptsChkAdded);
  $scope.location = $localstorage.getObject("geolocation");
  $scope.compliance = $localstorage.getObject("droneCatgory");
  $scope.totalDuration = $localstorage.getObject("flightTime");
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;
    }
    for(index in $scope.userItems) {
      $scope.userItems[index].checked = true;
    }

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  }

  $scope.drone = "";
  for(val of $localstorage.getObject("droneName")) {
    $scope.drone += val + "  ";
  }
  $scope.sensor = "";
  for(val of $localstorage.getObject("sensorName")) {
    $scope.sensor += val + "  ";
  }
  $scope.personnel = [];
  let cnt = 0;
  let val1 = $localstorage.getObject("personnelRole")
  for(val of $localstorage.getObject("personnelName")) {
    let temp = {
      "name":val,
      "role":val1[cnt++].name
    };
    $scope.personnel.push(temp);
  }

  $scope.updateCheckBox = function(items) {
    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  };

  $scope.next = function() {
    $state.go(sync);
  }

  $scope.modifyTime = function() {

    $ionicPopup.prompt({
      title: 'What time is the finished time',
      template: 'Input Finished Time',
      inputType: 'datetime-local',
      inputPlaceholder: ''
    }).then(function(res) {
      
      if(res == undefined) return;
      $localstorage.setObject("endTime",res.toString().replace("hu",""));
      let endTime = new Date($localstorage.getObject("endTime"));
      let startTime = new Date($localstorage.getObject("startTime"));
      let totalMins = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
      let hours = Math.floor(Math.abs(Math.round(totalMins)) / 60);
      let mins = Math.floor(Math.abs(Math.round(totalMins)) % 60);
      $scope.totalDuration =hours +"hours "+ mins +"minutes 0sec";
      $localstorage.setObject("flightTime", hours +"hours "+ mins +"minutes 0sec");
    });
  }

})

.controller('PlatformChkCtrl',function($scope, $state, $platformChk,
  $updateCheckBox, $localstorage, $ionicPopup, $window,$userChk,$object,$device) {

  $scope.items = $platformChk.all();
  if($localstorage.getObject(platformChkAdded).length > 0)
    $scope.userItems = $localstorage.getObject(platformChkAdded);
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;
    }
    for(index in $scope.userItems) {
      $scope.userItems[index].checked = true;
    }

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  }

  $scope.updateCheckBox = function(items) {

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  };

  $scope.delUserChk = function(index) {
    $userChk.remove(index,platformChkAdded);
  }

  $scope.addNew = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.text">',
      title: 'Quickly add custom checklist item to be clicked',
      subTitle: 'Please add checkbox',
      scope: $scope,
      buttons: [
        {text: 'Cancel',
type: 'button-assertive'},
        {
          text: 'Save',
          type: 'button-calm',
          onTap: function(e) {
            $userChk.add($scope.data,platformChkAdded);
          }
        }
      ]
    });

  }

  $scope.next = function() {
    if($scope.userItems != null || $scope.userItems != undefined)
      $scope.popup = $scope.items.concat($scope.userItems);
    else $scope.popup = $scope.items;

    var  customTemplate = '<ion-list>'+
        '  <ion-item class="item item-text-wrap" ng-repeat="item in popup"> '+
        '    {{item.name}}'+
        '<div ng-if=item.checked> Checked:<i class="icon ion-checkmark-round icon-balanced"></i></div>'+
        // '<div ng-if=!item.checked> Checked:<i class="icon ion-close-round icon-assertive"></i></div>'+
        '  </ion-item>'+
        '</ion-list>';

    var listPopup = $ionicPopup.show({
         template: customTemplate,
         title: 'Summary',
         scope: $scope,
         buttons: [
           {text: 'Cancel',
type: 'button-assertive'},
           {
            text: 'Complete',
            type: 'button-calm',
                onTap: function(e) {
                  $localstorage.setObject(platformChk, $object.toJson($scope.items));
                  if($localstorage.getObject(platformChkAdded).length > 0)
                    $localstorage.setObject(platformChkAdded,$scope.userItems);
                  $state.go("sensorChk");
              }
            }
         ]
       });

  }
})

.controller('FlightTimeLogCtrl', function($scope, $state, $ionicPopup, $localstorage, $object) {
  $scope.startBtn = false;
  $scope.continueBtn = false;
  $scope.stopBtn = false;
  $scope.timeLabel = false;
  $scope.data = {};
  $scope.title = 'CHECKS COMPLETE, READY FOR FLIGHT';

  $scope.start = function (){
    $scope.$broadcast('timer-start');
    $scope.startBtn = true;
    $scope.stopBtn = true;
    $scope.timeLabel = true;
    var startTime = new Date();
    $localstorage.setObject("startTime", startTime.toString());
  };

  $scope.stop = function() {
    stopTimer();
  }

  $scope.continue = function() {
    $state.go("promptsSummary");
  }

  $scope.$on('timer-stopped', function (event, data){
    $scope.totalDuration =data.hours +"hours "+ data.minutes +"minutes "+ data.seconds + "sec";
    $localstorage.setObject("flightTime", data.hours +"hours "+ data.minutes +"minutes "+ data.seconds + "sec");
  });

  $scope.pause = function() {
    $ionicPopup.confirm({
      title: 'Would you like to resume or end mission?',
      cancelText: 'RESUME',
      cancelType: 'button-calm',
      okText: 'COMPLETE',
      okType: 'button-assertive',
     }).then(function(res) {
       if(res == true) {
        stopTimer();
       }
     });

  }

  function stopTimer() {
    $scope.$broadcast('timer-stop');
        let endTime= new Date();
        $localstorage.setObject("endTime", endTime.toString());
        $scope.endTime = new Date($localstorage.getObject("endTime")).toLocaleString();
        $scope.startTime = new Date($localstorage.getObject("startTime")).toLocaleString();
        $scope.continueBtn = true;
        $scope.stopBtn = false;
        $scope.timeLabel = false;
        $scope.title = 'MISSION COMPLETE – SUMMARY';
  }

})

.controller('SensorChkCtrl', function($scope, $state, $sensorChk,
  $updateCheckBox, $localstorage, $ionicPopup, $window, $userChk,$object, $device)  {

  $scope.items = $sensorChk.all();
  if($localstorage.getObject(sensorChkAdded).length > 0)
    $scope.userItems = $localstorage.getObject(sensorChkAdded);
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;
    }
    for(index in $scope.userItems) {
      $scope.userItems[index].checked = true;
    }

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  }

  $scope.updateCheckBox = function(items) {

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  };

  $scope.delUserChk = function(index) {
    $userChk.remove(index,sensorChkAdded);
  }

  $scope.addNew = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.text">',
      title: 'Quickly add custom checklist item to be clicked',
      subTitle: 'Please add checkbox',
      scope: $scope,
      buttons: [
        {text: 'Cancel',
type: 'button-assertive'},
        {
          text: 'Save',
          type: 'button-calm',
          onTap: function(e) {
            $userChk.add($scope.data,sensorChkAdded);
          }
        }
      ]
    });

  }

  $scope.next = function() {
    if($scope.userItems != null || $scope.userItems != undefined)
      $scope.popup = $scope.items.concat($scope.userItems);
    else $scope.popup = $scope.items;

    var  customTemplate = '<ion-list>'+
        '  <ion-item class="item item-text-wrap" ng-repeat="item in popup"> '+
        '    {{item.name}}'+
        '<div ng-if=item.checked> Checked:<i class="icon ion-checkmark-round icon-balanced"></i></div>'+
// '<div ng-if=!item.checked> Checked:<i class="icon ion-close-round icon-assertive"></i></div>'+
        '  </ion-item>'+
        '</ion-list>';

    var listPopup = $ionicPopup.show({
         template: customTemplate,
         title: 'Summary',
         scope: $scope,
         buttons: [
           {text: 'Cancel',
type: 'button-assertive'},
           {
            text: 'Complete',
            type: 'button-calm',
                onTap: function(e) {
                  $localstorage.setObject(sensorChk,$object.toJson($scope.items));
                  if($localstorage.getObject(sensorChkAdded).length > 0)
                    $localstorage.setObject(sensorChkAdded,$scope.userItems);
                  $state.go("missionPlanChk");
                  //$state.go("flightTimeLog");
              }
            }
         ]
       });

  }
})

.controller('MissionPlanChkCtrl', function($scope, $state, $missionPlanChk,
  $updateCheckBox, $localstorage, $ionicPopup, $window, $userChk,$object, $device)  {

  $scope.items = $missionPlanChk.all();
  if($localstorage.getObject(missionPlanChkAdded).length > 0)
    $scope.userItems = $localstorage.getObject(missionPlanChkAdded);
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;
    }
    for(index in $scope.userItems) {
      $scope.userItems[index].checked = true;
    }

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  }

  $scope.updateCheckBox = function(items) {

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  };

  $scope.delUserChk = function(index) {
    $userChk.remove(index,missionPlanChkAdded);
  }

  $scope.addNew = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.text">',
      title: 'Quickly add custom checklist item to be clicked',
      subTitle: 'Please add checkbox',
      scope: $scope,
      buttons: [
        {text: 'Cancel',
type: 'button-assertive'},
        {
          text: 'Save',
          type: 'button-calm',
          onTap: function(e) {
            $userChk.add($scope.data,missionPlanChkAdded);
          }
        }
      ]
    });

  }

  $scope.next = function() {
    if($scope.userItems != null || $scope.userItems != undefined)
      $scope.popup = $scope.items.concat($scope.userItems);
    else $scope.popup = $scope.items;

    var  customTemplate = '<ion-list>'+
        '  <ion-item class="item item-text-wrap" ng-repeat="item in popup"> '+
        '    {{item.name}}'+
        '<div ng-if=item.checked> Checked:<i class="icon ion-checkmark-round icon-balanced"></i></div>'+
// '<div ng-if=!item.checked> Checked:<i class="icon ion-close-round icon-assertive"></i></div>'+
        '  </ion-item>'+
        '</ion-list>';

    var listPopup = $ionicPopup.show({
         template: customTemplate,
         title: 'Summary',
         scope: $scope,
         buttons: [
           {text: 'Cancel',
type: 'button-assertive'},
           {
            text: 'Complete',
            type: 'button-calm',
                onTap: function(e) {
                  $localstorage.setObject(missionPlanChk,$object.toJson($scope.items));
                  if($localstorage.getObject(missionPlanChkAdded).length > 0)
                    $localstorage.setObject(missionPlanChkAdded,$scope.userItems);
                  $state.go("flightTimeLog");
              }
            }
         ]
       });

  }
})

.controller('PreFlightChkCtrl', function($scope, $state, $preFlightChk, $updateCheckBox, $localstorage,
  $ionicPopup,$object, $device) {
  $scope.items = $preFlightChk.all1();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  };

  $scope.next = function() {

   var listPopup = $ionicPopup.show({
     template: customTemplate,
     title: 'Summary',
     scope: $scope,
     buttons: [
       {text: 'Cancel',
type: 'button-assertive'},
       {
        text: 'Complete',
        type: 'button-calm',
            onTap: function(e) {
            $localstorage.setObject("preFlightChk1", $object.toJson($scope.items));
            $state.go("preFlightChk2");

          }
        }
     ]
   });

  }
})

.controller('PreFlightChk2Ctrl', function($scope, $state, $preFlightChk,
 $updateCheckBox, $localstorage, $ionicPopup,$object, $device) {
  $scope.items = $preFlightChk.all2();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  };

  $scope.next = function() {

   var listPopup = $ionicPopup.show({
     template: customTemplate,
     title: 'Summary',
     scope: $scope,
     buttons: [
       {text: 'Cancel',
type: 'button-assertive'},
       {
        text: 'Complete',
        type: 'button-calm',
            onTap: function(e) {
            $localstorage.setObject("preFlightChk2",$object.toJson($scope.items));
            $state.go("preFlightChk3");

          }
        }
     ]
   });

  }
})

.controller('PreFlightChk3Ctrl', function($scope, $state, $preFlightChk,
  $updateCheckBox, $localstorage, $ionicPopup, $object, $window,$userChk,$object, $device) {
  $scope.items = $preFlightChk.all3();
  $scope.userItems = {};
  if($localstorage.getObject(preFlightUserAdded).length > 0)
    $scope.userItems = $localstorage.getObject(preFlightUserAdded);

  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;
    }
    for(index in $scope.userItems) {
      $scope.userItems[index].checked = true;
    }

    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  }

  $scope.updateCheckBox = function(items) {
    if($updateCheckBox.get($scope.items) && $updateCheckBox.get($scope.userItems))
      $scope.disabled = true;
    else $scope.disabled = false;
  };

  $scope.delUserChk = function(index) {
    $userChk.remove(index,preFlightUserAdded);
  }

  $scope.addNew = function() {
    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.text">',
      title: 'Quickly add custom checklist item to be clicked',
      subTitle: 'Please add checkbox',
      scope: $scope,
      buttons: [
        {text: 'Cancel',
type: 'button-assertive'},
        {
          text: 'Save',
          type: 'button-calm',
          onTap: function(e) {
            $userChk.add($scope.data,preFlightUserAdded);
          }
        }
      ]
    });

  }

  $scope.next = function() {
    if($scope.userItems != null || $scope.userItems != undefined)
      $scope.popup = $scope.items.concat($scope.userItems);
    else $scope.popup = $scope.items;
    var  customTemplate = '<ion-list>'+
        '  <ion-item class="item item-text-wrap" ng-repeat="item in popup"> '+
        '    {{item.name}}'+
        '<div ng-if=item.checked> Checked:<i class="icon ion-checkmark-round icon-balanced"></i></div>'+
// '<div ng-if=!item.checked> Checked:<i class="icon ion-close-round icon-assertive"></i></div>'+
        '  </ion-item>'+
        '</ion-list>';

    var listPopup = $ionicPopup.show({
         template: customTemplate,
         title: 'Summary',
         scope: $scope,
         buttons: [
           {
            text: 'Cancel',
            type: 'button-assertive'},
           {
            text: 'Complete',
            type: 'button-calm',
                onTap: function(e) {
                  $localstorage.setObject("preFlightChk3",$object.toJson($scope.items));
                  if($scope.userItems.length > 0)
                    $localstorage.setObject(preFlightUserAdded,$object.toJson($scope.userItems));
                  $state.go("platformChk");
                  //$state.go("flightTimeLog");
              }
            }
         ]
       });

  }
})

.controller('VerySmallUavChkCtrl', function($scope, $state, $localstorage, $http,
  $complianceVerySmallUav, $updateCheckBox, $object, $device) {

  $scope.items = $complianceVerySmallUav.all();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  };

  $scope.next = function() {
    $localstorage.setObject(verySmallUavChkList, $object.toJson($scope.items));
    //NOT REQUIRED FOR VERY SMALL UAV category.
    $state.go(preFlightChk);
  }
})

.controller('SmallComplexChkCtrl', function($scope, $state, $updateCheckBox,
  $complianceSamllComplex,$localstorage,$object, $device ) {

  $scope.items = $complianceSamllComplex.all1();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallComplexList1", $object.toJson($scope.items));
    $state.go('smallComplexChk2');
  }
})

.controller('SmallComplexChk2Ctrl', function($scope, $state, $updateCheckBox,
  $complianceSamllComplex,$localstorage,$object, $device ) {
  $scope.items = $complianceSamllComplex.all2();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallComplexList2", $object.toJson($scope.items));
    $state.go('smallComplexChk3');
  }
})

.controller('SmallComplexChk3Ctrl', function($scope, $state, $updateCheckBox,
  $localstorage, $complianceSamllComplex,$object, $device ) {

  $scope.check = {};
  $scope.check.choice1 = false;
  if(!$device.checkIfMobile()) {

    $scope.check.chk1 = true;
    $scope.check.chk2 = true;
  } else {
    $scope.chk1 = false;
    $scope.chk2 = false;
  }

  $scope.updateCheckBox = function(items) {
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    let items = [{
      name:"UAV won’t be flown with snow, ice, or frost on critical surfaces and must be inspected for these by the pilot or a designated crew member before operations. Pilot must inform crew members before anti-icing or de-icing occurs. If icing conditions are forecast or likely, operations cannot occur unless the pilot deems the aircraft has the necessary equipment to operate or icing conditions no longer exist.",
      checked: $scope.check.chk1
    },
    {
      name:"Technical records of flight time of each flight, total aircraft flight time, number of landings since date of manufacture, and particulars of maintenance, modifications, and repairs will be kept.",
      checked: $scope.check.chk2
    }];
    if($scope.check.choice1) {
      items.push({
        name:"Max altitude: 400 feet above ground level, OR 100 feet above a building or structure if laterally within 200 feet of it and more than 3 nm from an aerodrome",
        checked: $scope.check.chk3
      });
      items.push({
        name:"Max distance from pilot: 1 nautical mile (1.8 km)",
        checked: $scope.check.chk4
      });
    } else {
      items.push({
        name: "Aircraft is not compliant but was bought before Dec 15, 2017, and will not operate above 300 feet AGL, more than 0.5 nm from pilot, within 0.5 nm, over, or within a built-up area, or in Class C, D, or E airspace.B",
        checked:!$scope.check.choice1
      });
    }

    $localstorage.setObject("smallComplexList3", $object.toJson(items));
    $state.go("smallComplexChk4");
  }
})

.controller('SmallComplexChk4Ctrl', function($scope, $state, $updateCheckBox,
  $complianceSamllComplex,$localstorage,$object, $device ) {
  $scope.items = $complianceSamllComplex.all4();
  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
    $scope.disabled = $updateCheckBox.get($scope.items);
  };

  $scope.next = function() {
   $localstorage.setObject("smallComplexList4", $object.toJson($scope.items));
   $state.go("smallComplexChk5");
  }

})

.controller('SmallComplexChk5Ctrl', function($scope, $state, $conditions, $localstorage,
  $complianceSamllComplex, $updateCheckBox,$object, $device ) {

  $scope.check = {};
  $scope.items = $complianceSamllComplex.all5();

  if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallComplexList5", $object.toJson($scope.items));
    $state.go(preFlightChk);
  }

  $scope.conditions = function(val) {
    alert($conditions.get(val));
  }

})

.controller('SmallLimitedChkCtrl', function($scope,$state, $complianceSmallLimited,
  $localstorage, $updateCheckBox,$object, $device ) {

  $scope.items = $complianceSmallLimited.all1();
   if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallLimitedList1", $object.toJson($scope.items));
    $state.go("smallLimitedChk2");
    }
})

.controller('SmallLimitedChk2Ctrl', function($scope,$state,
  $complianceSmallLimited, $localstorage, $updateCheckBox,$object, $device ) {

  $scope.items = $complianceSmallLimited.all2();
   if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallLimitedList2", $object.toJson($scope.items));
    $state.go("smallLimitedChk3");
  }
})

.controller('SmallLimitedChk3Ctrl', function($scope,$state, $complianceSmallLimited,
  $localstorage, $updateCheckBox, $object, $device ) {

  $scope.items = $complianceSmallLimited.all3();
   if(!$device.checkIfMobile()) {
    for(index in $scope.items) {
      $scope.items[index].checked = true;

    }
    $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.updateCheckBox = function(items) {
      $scope.disabled = $updateCheckBox.get($scope.items);
  }

  $scope.next = function() {
    $localstorage.setObject("smallLimitedList3", $object.toJson($scope.items));
    $state.go(preFlightChk);
  }
})


.controller('NewMissionCtrl', function($scope, $ionicPopup, $state, $localstorage
  ,$rootScope, $cordovaNetwork) {
    $scope.notice1 = 'Set mission parameters and complete pre-flight checks for operational conditions, site survey, and platform and sensor checks';
    $scope.notice2 = 'Load mission parameters already created on CloudUAV.ca and complete pre-flight checklists for operational conditions, site survey, and platform/sensor checks';

    $scope.newMission1 = function() {
    	const userId = $localstorage.getObject("userId");
	    if($localstorage.getMissionLength(userId) >= stroeAmoutMission) {
	    	var myPopup = $ionicPopup.confirm({
		      title: 'Maxium 10 missions in local, please update the missions to server.',
		      scope: $scope,
		      buttons: [
		        { text: 'OK', type: 'button-calm' }
		        ]
		    });
	    }
	    else {
	      $state.go('newMission1');
	    }
        
    }

    $scope.presetMission = function() {
        $state.go('presetMission');
    };
    

    document.addEventListener("deviceready", function() {

      var type = $cordovaNetwork.getNetwork()
      var isOnline = $cordovaNetwork.isOnline()
      var isOffline = $cordovaNetwork.isOffline()

      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
          var onlineState = networkState;
          if (onlineState == 'wifi') $scope.disabled = true;
          else $scope.disabled = false;

      })
      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          var offlineState = networkState;
          if (offlineState == 'none') $scope.disabled = false;
          if (offlineState == '4g') $scope.disabled = false;

      })

    }, false);

})

.controller('DetailPrevMissionCtrl', function($scope, $http,$state,$rootScope,
 $localstorage, $stateParams, $window, $ionicHistory,$ionicPopup) {

  $http.get(baseUrl+"/missions/"+$stateParams.mId+"?$expand=Sensor,Personnels,Drone,files", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
        console.log(response);
        $scope.detailMission = response;

      }, function(err) {
          console.log(err);
  });

  $scope.delete = function() {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete this item',
      template: 'Are you sure?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $http.delete(baseUrl+"/missions/"+$stateParams.mId, {
          headers: {'auth-token': $localstorage.getObject('token')}
        })
          .success(function(response)  {
            console.log(response)
            //$ionicHistory.goBack(-1);
            $state.go('tab.reviewProject');
            $window.location.reload();
          }, function(err) {
            console.log(err);
        });
      }
    });

  };

})

.controller('SyncCtrl', function($scope, $cordovaNetwork, $ionicPopup,
  $state, $http, $localstorage, $window, $object,$syncService, $timeout,
  $ionicLoading, $device, $rootScope) {
  $scope.email = $localstorage.getObject("email");
  $scope.username = $localstorage.getObject("username");
  $scope.mission = $localstorage.getMissionLength($localstorage.getObject("userId"));
  $scope.stroeAmoutMission = stroeAmoutMission;

  var mId;
  var mytimeout;
  var timeOutCnt = 0;

  if($cordovaNetwork.getNetwork() == 'wifi')
    $scope.disabled = true;
  else {
    if(!debug)
      $scope.disabled = false;
    else $scope.disabled = true;
    var myPopup = $ionicPopup.confirm({
      title: 'Sync will be available when connected to wifi',
      scope: $scope,
      buttons: [
        { text: 'OK', type: 'button-calm' }
        ]
    });
  }

  document.addEventListener("deviceready", function() {

    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        var onlineState = networkState;
        if (onlineState == 'wifi') $scope.disabled = true;
        else $scope.disabled = false;

    })
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
        var offlineState = networkState;
        if (offlineState == 'none') $scope.disabled = false;
        if (offlineState == '4g') $scope.disabled = false;

    })

  }, false);

  function showLoading() {
    uploadedChk = 0;
    uploadTimeout = $timeout($scope.onTimeout,600);
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

  }

  $scope.syncNow = function(selectedDrone) {
    const userId = $localstorage.getObject("userId");
    const pMid = $localstorage.getObject(presetMId);
    showLoading();
    if($object.isEmpty(pMid)) {
       mId =saveCheckList($syncService.saveMissionSummary());
       $syncService.updateToServer(mId,userId, false); //new mission
    } else {
       saveCheckList($syncService.saveMissionSummary(pMid));
       $syncService.updateToServer(pMid,userId,true);  //preset
    }
    if(!debug) {
      $localstorage.remove(presetMId);
      $localstorage.remove(pMName);
    }
  }

  $scope.syncLater = function() {
    var datetime = new Date();
    datetime.setDate(datetime.getDate() + 1);
    $localstorage.setObject("lastTime",datetime.getTime());
    const pMid = $localstorage.getObject(presetMId);
    if($object.isEmpty(pMid)) {
      saveCheckList($syncService.saveMissionSummary());
    }
    else {
      saveCheckList($syncService.saveMissionSummary(pMid));
    }
    $localstorage.remove(presetMId);
    $localstorage.remove(pMName);
    $window.location.reload();
    $state.go('tab.index');
  };

  $scope.onTimeout = function(){
    if(uploadedChk && 0x1F) {
      console.log("Success, Please go check on website.");
      uploadedChk = 0;
      $timeout.cancel(mytimeout);
      $ionicLoading.hide();
      let alertPopup1 = $ionicPopup.alert({
        title: 'Success',
        template: 'Please check the data on server.',
        buttons: [
          { text: 'OK', type: 'button-calm' }
          ]
      });
      alertPopup1.then(function(res) {
        $window.location.reload();
        $state.go('tab.index');
      });

    }
    else {

      if(timeOutCnt++ < 30) { //3sec
        uploadTimeout = $timeout($scope.onTimeout,100);
      } else {
        $timeout.cancel(mytimeout);
        $ionicLoading.hide();
        let alertPopup = $ionicPopup.alert({
          title: 'Uploading Error',
          template: 'Sorry, Uploaded action has been timeout.'
        });
      }
    }
  };


  function saveCheckList(missionId) {
    const userId = $localstorage.getObject("userId");
    let chk1 = $localstorage.getObject(preFlightChk+"1");
    if(!$object.isEmpty(chk1))  {
      let chk = [];
      for(let i = 1; i <= preFlightChkPage; i++) {
        chk[i-1] = $localstorage.getObject(preFlightChk+i.toString());
        $localstorage.remove(preFlightChk+i.toString());
      }
      let added = $localstorage.getObject(preFlightUserAdded);
      let total = chk[0].concat(chk[1].concat(chk[2]));
      total = total.concat(added);
      $localstorage.setObject(userId+'-'+missionId + '-'+preFlightChk,$syncService.retFromat(preFlightChk,total));

    }

    saveOnePageChk(sensorChk, sensorChkAdded,userId,missionId);
    saveOnePageChk(platformChk, platformChkAdded,userId,missionId);
    saveOnePageChk(missionPlanChk, missionPlanChkAdded,userId,missionId);
    if($localstorage.getObject('droneCatgory') == verySmall)
      saveOnePageChk(verySmallUavChkList,"",userId,missionId);

    chk1 = $localstorage.getObject(smallComplexList+"1");
    if(!$object.isEmpty(chk1))  {
      let chk = [];
      for(let i = 1; i <= smaleComplexPage; i++) {
        chk[i-1] = $localstorage.getObject(smallComplexList+i.toString());
        $localstorage.remove(smallComplexList+i.toString());
      }
      let total = chk[0].concat(chk[1].concat(chk[2].concat(chk[3].concat(chk[4]))));
      $localstorage.setObject(userId+'-'+missionId + '-'+smallComplexList,$syncService.retFromat(smallComplexList,total));

    }

    chk1 = $localstorage.getObject(smallLimitedList+"1");
    if(!$object.isEmpty(chk1)) {
      let chk = [];
      //Combine as an array
      for(let i = 1; i <= smaleLimitedPage; i++) {
        chk[i-1] = $localstorage.getObject(smallLimitedList+i.toString());
        $localstorage.remove(smallLimitedList+i.toString());
      }

      total = chk[0].concat(chk[1].concat(chk[2]));
      $localstorage.setObject(userId+'-'+missionId + '-' + smallLimitedList,$syncService.retFromat(smallLimitedList,total));
    }
    return missionId;
  }

  function saveOnePageChk(chkList,usedDefList,userId,missionId) {
    chk1 = $localstorage.getObject(chkList);
    if(!$object.isEmpty(chk1))  {
      let added = $localstorage.getObject(usedDefList);
      if(!$object.isEmpty(added)) {
        let total = chk1.concat(added);
        $localstorage.setObject(userId+'-'+missionId + '-'+chkList,$syncService.retFromat(chkList,total));
      }
       else $localstorage.setObject(userId+'-'+missionId + '-'+chkList,$syncService.retFromat(chkList,chk1));
      //$localstorage.remove(chkList);
    }
  }

})

.controller('SelectComplianceCatgoryCtrl', function($scope, $state, $ionicHistory, $localstorage) {
  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.next = function(selectedDrone) {
    $localstorage.setObject('droneCatgory', selectedDrone);
    $state.go('generalFlightRules');
  };

})

.controller('GeneralFlightRulesCtrl', function($scope, $ionicHistory, $state, $localstorage) {
  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  const droneCatgory = $localstorage.getObject('droneCatgory');
  $scope.nextUavChk = function() {
    if(droneCatgory == verySmall)
      $state.go('verySmallUavChk');
    if(droneCatgory == smallLimited)
      $state.go('smallLimitedChk');
    if(droneCatgory == smallComplex)
      $state.go('smallComplexChk');
  }
})

.controller('NewMission1Ctrl', function($scope, $window, $ionicHistory, $rootScope, $state, $localstorage,
  $http, $cordovaGeolocation,$ionicPopup) {
  $scope.mission = {};
  $scope.email = $localstorage.getObject("email");
  $scope.username = $localstorage.getObject("username");

  let userId = $localstorage.getObject('userId');
  $http.get(baseUrl+"/"+userId+"/projects", {
    headers: {'auth-token': $localstorage.getObject('token')}
    })
      .success(function(response) {
          $scope.project = response;
      }, function(err) {
          console.log(err);
  });

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
      var lat  = position.coords.latitude.toFixed(4);
      var long = position.coords.longitude.toFixed(4);

      $localstorage.setObject('geolocation', lat + ',' + long);

    }, function(err) {
      console.log(err)
      alert(err);
  });


  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.next = function() {

    $localstorage.setObject('missionName', $scope.mission.name);
    $state.go('selectComplianceCatgory');
  };

  function checkNextBtn() {
    let val = 0;
    if($localstorage.getObject('droneId').length > 0)  val |= 0x01 ;
    if($localstorage.getObject('sensorId').length > 0)  val |= 0x02 ;
    if($localstorage.getObject('personnelId').length > 0)  val |= 0x04;
    if($scope.mission.name != "" && $scope.mission.name != undefined) val |= 0x08;
    //console.log(val);
    if(val == 0x0f) $scope.disabled = true;
      else $scope.disabled = false;
  }

  $scope.getPrj = function(projectId){
    $localstorage.setObject('projectId',projectId);
    $http.get(baseUrl+"/projects/" + projectId, {
    headers: {'auth-token': $localstorage.getObject('token')}
    })
        .success(function(response) {
            $scope.droneList = response.Drones;
            $scope.sensorList = response.Sensors;
            $scope.personnelList = response.Personnels;
            checkNextBtn();
        }, function(err) {
            console.log(err);
    });
  }

  $scope.checkMissionName = function() {
    checkNextBtn();
  }

  $scope.getDrone = function(val){
    $localstorage.setObject('droneId', getId(val));
    $localstorage.setObject('droneName', getName(val));
    checkNextBtn();
    //console.log($localstorage.getObject('droneId'));
  }
  $scope.getSensor = function(val){
    $localstorage.setObject('sensorId',getId(val));
    $localstorage.setObject('sensorName', getName(val));
    checkNextBtn();
    //console.log($localstorage.getObject('sensorId'));
  }
  $scope.getPersonnel = function(val){
    $localstorage.setObject('personnelId', getId(val));
    $localstorage.setObject('personnelName', (function(val){
      let list = [];
      for (var i = 0; i < val.length; i++) {
        list.push(val[i].firstName)
      }
      return list;}(val)
    ));

    $localstorage.setObject('personnelRole', (function(val){
      let list = [];
      for (var i = 0; i < val.length; i++) {
        list.push(val[i].Role)
      }
      return list;}(val)
    ));
    checkNextBtn();
  }

  $scope.getMap = function() {
    var alertPopup = $ionicPopup.alert({
       title: 'Your location',
       template: ' <div id="map" style="width: 230px; height: 400px;"></div> ',
       buttons: [
         { text: 'OK', type: 'button-calm' }
         ]
    });

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
      var lat  = position.coords.latitude.toFixed(4);
      var long = position.coords.longitude.toFixed(4);

      $localstorage.setObject('geolocation', lat + ',' + long);
      var map = L.map('map').setView([lat, long], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([lat, long]).addTo(map)
          .bindPopup('You are here.<br>')
          .openPopup();

    }, function(err) {
      console.log(err)
      alert(err);
    });

  }

  function getId(val) {
    let list = [];
    for (var i = 0; i < val.length; i++) {
      list.push(val[i].id)
    }
    return list;
  }

  function getName(val) {
    let list = [];
    for (var i = 0; i < val.length; i++) {
      list.push(val[i].name)
    }
    return list;
  }

})

.controller('PresetMissionCtrl', function($scope, $ionicHistory, $http, $localstorage) {
   $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.email = $localstorage.getObject("email");
  $scope.username = $localstorage.getObject("username");
  $localstorage.remove(presetMId);
  $localstorage.remove(pMName);
  const userId = $localstorage.getObject('userId');
  $http.get(baseUrl+"/"+userId+"/projects", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
          $scope.project = response;
      }, function(err) {
          console.log(err);
  });

})

.controller('DetailPresetMissionCtrl', function($scope, $http,$state,
 $localstorage, $stateParams) {

  $http.get(baseUrl+"/missions/"+$stateParams.mId+"?$expand=Sensor,Personnels,Drone,files", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
        //console.log(response);
        $scope.detailMission = response;

      }, function(err) {
          console.log(err);
  });

  $scope.next = function() {
    $localstorage.setObject(presetMId, $stateParams.mId);
    $localstorage.setObject(pMName, $scope.detailMission.name);
    $state.go('selectComplianceCatgory');
  }

})

.controller('PresetMissionListCtrl', function($scope, $http,$state,
 $localstorage, $stateParams) {
  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.username = $localstorage.getObject("username");
  $scope.email = $localstorage.getObject("email");
  const userId = $localstorage.getObject('userId');

  $http.get(baseUrl+"/"+userId+"/projects?$expand=Missions", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
        let prj =[];
        for (var i = response.length - 1; i >= 0; i--) {
          if(response[i].id == $stateParams.pId) {
            prj.push(response[i].Missions);

          }
        }
        let m = [];
        for (var i = 0; i < prj[0].length; i++) {
          m.push(prj[0][i]);
        }
        $scope.missions = m;
      }, function(err) {
          console.log(err);
  });

})

.controller('MissionsCtrl', function($scope, $http, $ionicHistory,$stateParams, $localstorage ) {

  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.username = $localstorage.getObject("username");
  $scope.email = $localstorage.getObject("email");
  const mission = $localstorage.getAllMission();
  let missionList =[];
  for (var i = 0; i < mission.length; i++) {
    if(mission[i].projectId == $stateParams.mId) {
      missionList.push(mission[i]);
    }
  }

  $scope.missions = missionList;

})

.controller('ReviewProjectCtrl', function($scope, $ionicHistory, $http, $localstorage) {
   $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.username = $localstorage.getObject("username");
  $scope.email = $localstorage.getObject("email");
  const userId = $localstorage.getObject('userId');
  $http.get(baseUrl+"/"+userId+"/projects", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
          $scope.project = response;

      }, function(err) {
          console.log(err);
  });

})

.controller('DetailedUserCtrl', function($scope,$state,$localstorage) {

    $scope.username = $localstorage.getObject("username");
    $scope.address = "3553 31 St NW, Calgary, AB T2L 2K7";
    $scope.phone = "4031234567";
    $scope.email = $localstorage.getObject("email");

    $scope.logout = function() {
      $localstorage.remove("email");
      $localstorage.remove("userId");
      $localstorage.remove("username");
      $localstorage.remove("token");
      $state.go('login');
    };
})

.controller('IndexCtrl', function($scope,$state, $localstorage, $http, $ionicPopup, $object) {
  $scope.email = $localstorage.getObject("email");
  $scope.username = $localstorage.getObject("username");
  $scope.missions = $localstorage.getMissionLength($localstorage.getObject("userId"));
  let totalSeconds = $localstorage.getObject("cumulativeTotalSeconds");
  if(!$object.isEmpty(totalSeconds)) {
    totalSeconds  = totalSeconds / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    $scope.cumulativeFlightTime = seconds + " seconds";
    if(minutes > 0)
      $scope.cumulativeFlightTime = minutes + " minutes, " + $scope.cumulativeFlightTime
    if(hours > 0)
      $scope.cumulativeFlightTime = hours + " hours, " + $scope.cumulativeFlightTime
  } else {
    $scope.cumulativeFlightTime = "0 seconds";
  }
  var datetime = new Date();
  const userId = $localstorage.getObject('userId');
  if(datetime.getTime() >  $localstorage.getObject("lastTime")) {
    if($localstorage.getMissionLength(userId) > 0) {
      $ionicPopup.confirm({
        title: 'You have unsynced missions from the last 24 hours. Do you wish to sync them now?',
        cancelText: 'NO',
        cancelType: 'button-light',
        okText: 'YES',
        okType: 'button-calm',
       }).then(function(res) {
         if(res == true) {
          $state.go('uploadMissions')
         }
       });
    } else {
      $localstorage.remove("lastTime");
    }
  }
  $http.get(baseUrl+"/"+userId+"/projects?$expand=Missions", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
          $scope.project = response;

      }, function(err) {
          console.log(err);
  });

})

.controller('LoginCtrl', function($scope, $rootScope, $localstorage, $ionicPopup,
 $state,$http,$device,$cordovaNetwork) {

  $scope.data ={};
  if(debug) {
    $scope.data.username = 'wales.chang@sensorup.com';
    $scope.data.password = 123456;
  }

  $scope.login = function() {
    if($scope.data.username )
      if( $scope.data.password)  {

        $http.get(baseUrl+ "/users?",
        {  params: {
            "email": $scope.data.username,
            "password": $scope.data.password }
        })
        .success(function(response) {
            $localstorage.setObject('userId', response.id);
            $localstorage.setObject('email', response.email);
            $localstorage.setObject('username', response.firstName +" "+ response.lastName);
            $localstorage.setObject('token', response.token);
            $state.go('tab.index');
        })
        .error(function(data, status) {
            alert(data.error)
            $scope.data.password = '';
        });
      }
  }

  if($cordovaNetwork.getNetwork() == 'wifi')
    $scope.disabled = true;
  else $scope.disabled = false;

  document.addEventListener("deviceready", function() {

    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        var onlineState = networkState;
        if (onlineState == 'wifi') $scope.disabled = true;
        else $scope.disabled = false;

    })
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
        var offlineState = networkState;
        if (offlineState == 'none') $scope.disabled = false;
        if (offlineState == '4g') $scope.disabled = false;

    })

  }, false);
})

.controller('UploadMissionsCtrl', function($scope,$state,$localstorage,
  $syncService, $timeout, $ionicLoading, $ionicPopup, $window, $ionicHistory,
  $device, $cordovaNetwork, $rootScope ) {
  $scope.email = $localstorage.getObject("email");
  $scope.username = $localstorage.getObject("username");
  const userId = $localstorage.getObject("userId");
  $scope.project = $localstorage.getAllMission(userId);
  var mytimeout;
  var timeOutCnt = 0;
  $scope.selected = false;

  $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.selectedCheckBox = function(item) {
    let cont=0;
    for( index in $scope.project) {
      if($scope.project[index].id == item.id) {
        $scope.project[index].checked ^= true;
      }
    }

    for( item of $scope.project) {
      if(item.checked == 1)
        cont++;
    }
    if(cont>0)
      $scope.selected = true;
    else $scope.selected = false;
  };

  $scope.uploadAll = function() {
    uploadedChk = 0;
    uploadTimeout = $timeout($scope.onTimeout,1000);

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    for(item of $scope.project) {
      if(item.checked == 1) {
        $syncService.updateToServer(item.id,userId,item.preset);
      }
    }
  };

  $scope.onTimeout = function(){
    if(uploadedChk && 0x1F) {
      console.log("Success, Please go check on website.");
      uploadedChk = 0;
      $timeout.cancel(mytimeout);
      $ionicLoading.hide();
      let alertPopup1 = $ionicPopup.alert({
        title: 'SYNC COMPLETE',
        template: 'Please check the data on server',
        buttons: [
          { text: 'OK', type: 'button-calm' }
          ]
      });
      alertPopup1.then(function(res) {
        $localstorage.remove("lastTime");
        $state.go('tab.index');
      });

    }
    else {

      if(timeOutCnt++ < 60) { //6sec
        uploadTimeout = $timeout($scope.onTimeout,100);
      } else {
        $timeout.cancel(mytimeout);
        $ionicLoading.hide();
        let alertPopup = $ionicPopup.alert({
          title: 'Uploading Error',
          template: 'Sorry, Uploaded action has been timeout.'
        });
      }
    }
  };

  if($cordovaNetwork.getNetwork() == 'wifi')  {
    if($scope.project.length > 0) {
        $scope.disabled = true;
        $scope.msg = "";
    }
  }
  else {
    if(!debug)
      $scope.disabled = false;
    else $scope.disabled = true;
    $scope.msg = "Please connect to Wifi";
  }

  document.addEventListener("deviceready", function() {

    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        var onlineState = networkState;

        if (onlineState == 'wifi') {
          if($scope.project.length >= 0) {
            $scope.disabled = true;
            $scope.msg = "";
          }
        }
        else {
          $scope.disabled = false;
          $scope.msg = "Please connect to Wifi";
        }
    })
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
        var offlineState = networkState;

        if (offlineState == 'none') {
          $scope.disabled = false;
          $scope.msg = "Please connect to Wifi";
        }
        if (offlineState == '4g') {
          $scope.disabled = false;
          $scope.msg = "Please connect to Wifi";
        }
        //alert('offline: ' + networkState);

    })

  }, false);
})

.controller('ReviewMissionsCtrl', function($scope, $ionicHistory,
  $http, $localstorage, $state,$stateParams ) {
   $scope.doTheBack = function() {
    $ionicHistory.goBack(-1);
  };

  $scope.username = $localstorage.getObject("username");
  $scope.email = $localstorage.getObject("email");
  const userId = $localstorage.getObject('userId');

  $http.get(baseUrl+"/"+userId+"/projects?$expand=Missions", {
    headers: {'auth-token': $localstorage.getObject('token')}
  })
      .success(function(response) {
        let prj =[];
        for (var i = response.length - 1; i >= 0; i--) {
          if(response[i].id == $stateParams.pId) {
            prj.push(response[i].Missions);

          }
        }
        let m = [];
        for (var i = 0; i < prj[0].length; i++) {
          m.push(prj[0][i]);
        }
        $scope.missions = m;
      }, function(err) {
          console.log(err);
  });

})
