// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider, multiselectProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  multiselectProvider.setTemplateUrl('lib/ionic-multiselect/dist/templates/item-template.html');
  multiselectProvider.setModalTemplateUrl('lib/ionic-multiselect/dist/templates/modal-template.html');

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tab.newMission', {
    url: '/newMission',
    views: {
      'tab-newMission': {
        templateUrl: 'templates/tab-newMission.html',
        controller: 'NewMissionCtrl'
      }
    }
  }) 

  .state('tab.reviewProject', {
    url: '/reviewProject',
    views: {
      'tab-reviewProject': {
        templateUrl: 'templates/tab-reviewProject.html',
        controller: 'ReviewProjectCtrl'
      }
    }
  })

  .state('tab.detailedUser', {
    url: '/detailedUser',
    views: {
      'tab-detailedUser': {
        templateUrl: 'templates/tab-detailedUser.html',
        controller: 'DetailedUserCtrl'
      }
    }
  })

  .state('tab.index', {
    url: '/index',
    cache: false,
    views: {
      'tab-index': {
        templateUrl: 'templates/tab-index.html',
        controller: 'IndexCtrl'
      }
    }
  })

  .state('missions', {
    url: '/missions/:mId',
    templateUrl: 'templates/missions.html',
    controller: 'MissionsCtrl'
  })

  .state('newMission1', {
    url: '/newMission1',
    templateUrl: 'templates/newMission1.html',
    controller: 'NewMission1Ctrl'
  })

  .state('presetMission', {
    url: '/presetMission',
    cache: false,
    templateUrl: 'templates/presetMission.html',
    controller: 'PresetMissionCtrl'
  })

  .state('selectComplianceCatgory', {
    url: '/selectComplianceCatgory',
    templateUrl: 'templates/selectComplianceCatgory.html',
    controller: 'SelectComplianceCatgoryCtrl'
  })

  .state('generalFlightRules', {
    url: '/generalFlightRules',
    templateUrl: 'templates/generalFlightRules.html',
    controller: 'GeneralFlightRulesCtrl'
  })

  .state('sync', {
    url: '/sync',
    templateUrl: 'templates/sync.html',
    controller: 'SyncCtrl'
  })

  .state('detailPrevMission', {
    url: '/detailPrevMission/:mId',
    templateUrl: 'templates/detailPrevMission.html',
    controller: 'DetailPrevMissionCtrl'
  })

  .state('presetMissionList', {
    url: '/presetMissionList/:pId',
    templateUrl: 'templates/presetMissionList.html',
    controller: 'PresetMissionListCtrl'
  })

  .state('detailPresetMission', {
    url: '/detailPresetMission/:mId',
    templateUrl: 'templates/detailPresetMission.html',
    controller: 'DetailPresetMissionCtrl'
  })

  .state('verySmallUavChk', {
    url: '/verySmallUavChk',
    templateUrl: 'templates/verySmallUavChk.html',
    controller: 'VerySmallUavChkCtrl'
  })

  .state('smallComplexChk', {
    url: '/smallComplexChk',
    templateUrl: 'templates/smallComplexChk.html',
    controller: 'SmallComplexChkCtrl'
  })

  .state('smallLimitedChk', {
    url: '/smallLimitedChk',
    templateUrl: 'templates/smallLimitedChk.html',
    controller: 'SmallLimitedChkCtrl'
  })

  .state('smallLimitedChk2', {
    url: '/smallLimitedChk2',
    templateUrl: 'templates/smallLimitedChk2.html',
    controller: 'SmallLimitedChk2Ctrl'
  })

  .state('smallLimitedChk3', {
    url: '/smallLimitedChk3',
    templateUrl: 'templates/smallLimitedChk3.html',
    controller: 'SmallLimitedChk3Ctrl'
  })

  .state('smallComplexChk2', {
    url: '/smallComplexChk2',
    templateUrl: 'templates/smallComplexChk2.html',
    controller: 'SmallComplexChk2Ctrl'
  })

  .state('smallComplexChk3', {
    url: '/smallComplexChk3',
    templateUrl: 'templates/smallComplexChk3.html',
    controller: 'SmallComplexChk3Ctrl'
  })

  .state('smallComplexChk4', {
    url: '/smallComplexChk4',
    templateUrl: 'templates/smallComplexChk4.html',
    controller: 'SmallComplexChk4Ctrl'
  })

  .state('smallComplexChk5', {
    url: '/smallComplexChk5',
    templateUrl: 'templates/smallComplexChk5.html',
    controller: 'SmallComplexChk5Ctrl'
  })
  
  .state('preFlightChk', {
    url: '/preFlightChk',
    templateUrl: 'templates/preFlightChk.html',
    controller: 'PreFlightChkCtrl'
  })

  .state('preFlightChk2', {
    url: '/preFlightChk2',
    templateUrl: 'templates/preFlightChk2.html',
    controller: 'PreFlightChk2Ctrl'
  })

  .state('preFlightChk3', {
    url: '/preFlightChk3',
    templateUrl: 'templates/preFlightChk3.html',
    controller: 'PreFlightChk3Ctrl'
  })

  .state('sensorChk', {
    url: '/sensorChk',
    templateUrl: 'templates/sensorChk.html',
    controller: 'SensorChkCtrl'
  })

  .state('missionPlanChk', {
    url: '/missionPlanChk',
    templateUrl: 'templates/missionPlanChk.html',
    controller: 'MissionPlanChkCtrl'
  })

  .state('flightTimeLog', {
    url: '/flightTimeLog',
    templateUrl: 'templates/flightTimeLog.html',
    controller: 'FlightTimeLogCtrl'
  })

  .state('platformChk', {
    url: '/platformChk',
    templateUrl: 'templates/platformChk.html',
    controller: 'PlatformChkCtrl'
  })

  .state('promptsSummary', {
    url: '/promptsSummary',
    templateUrl: 'templates/promptsSummary.html',
    controller: 'PromptsSummaryCtrl'
  })

  .state('uploadMissions', {
    url: '/uploadMissions',
    cache: false,
    templateUrl: 'templates/uploadMissions.html',
    controller: 'UploadMissionsCtrl'
  })

  .state('reviewMissions', {
    url: '/reviewMissions/:pId',
    templateUrl: 'templates/reviewMissions.html',
    controller: 'ReviewMissionsCtrl'
  })
  
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
