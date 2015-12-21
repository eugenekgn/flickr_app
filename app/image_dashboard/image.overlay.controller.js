(function () {
  'use strict';

  angular.module('app.imageDashboard').controller('imageOverlayCtrl', imageOverlayCtrl);

  function imageOverlayCtrl($scope, $uibModalInstance, photo) {
    $scope.photo = photo;

    $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
