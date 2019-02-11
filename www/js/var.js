var  customTemplate = '<ion-list>'+
        '  <ion-item class="item item-text-wrap" ng-repeat="item in items"> '+
        '    {{item.name}}'+
        '<div ng-if=item.checked> Checked:<i class="icon ion-checkmark-round icon-balanced"></i></div>'+
        // '<div ng-if=!item.checked> Checked:<i class="icon ion-close-round icon-assertive"></i></div>'+
        '  </ion-item>'+
        '</ion-list>';
