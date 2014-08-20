'use strict';

bonsaiApp.directive('manualswitch', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            switchName: '@',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.switch = new ManualSwitch(function (value) {
                $scope.value = value;
            }, $scope.wire, 0);

            $scope.toggle = function () {
                $scope.switch.toggle();
            };

            attrs.$observe('switchName', function() {
                if ($scope.switchName) {
                    $scope.switch.setName($scope.switchName);
                }
            });

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.switch.setValue(newValue);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 9) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 3) + 'px';
            });

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.wire.enrollToDirective(
                    $scope.switch,
                    $scope.getConnectionPositions
                );
                $scope.switch.setValue($scope.value);
            }, 1, 1);
        },
        templateUrl: 'partials/component_ManualSwitch.html'
    };
});