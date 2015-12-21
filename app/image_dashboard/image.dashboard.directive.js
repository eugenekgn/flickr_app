/**
 * Created by Eugene on 12/20/15.
 */

(function () {
  'use strict';
  angular.module('app.imageDashboard')
    .controller('imageDashboardDisplayCtrl', imageDashboardDisplayCtrl)
    .directive('imageDashboardDisplay', imageDashboardDisplay);

  imageDashboardDisplayCtrl.$injector = ['$uibModal', 'ImageBoardService'];

  function imageDashboardDisplayCtrl($uibModal, ImageBoardService) {
    var vm = this;
    vm.photos = [];

    vm.pagination = {
      page: 1,
      perPage: 10,
      totalPages: 0
    };

    vm.prevPage = function () {
      if (vm.pagination.page > 1) {
        vm.pagination.page--;
        imageLoader();
      }
    }

    vm.nextPage = function () {
      if (vm.pagination.page <= vm.pagination.totalPages) {
        vm.pagination.page++;
        imageLoader();
      }
    }

    // This could be done better, I would not couple to two.
    // I am just doing this to same time. 
    vm.overlayPhoto = function (photo) {
      console.log(photo);

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/image_dashboard/views/image.overlay.dashboard.html',
        controller: 'imageOverlayCtrl',
        size: 'lg',
        resolve: {
          photo: function () {
            return photo;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
      });

    };

    function imageLoader() {
      ImageBoardService.getImages(vm.pagination.page, vm.pagination.perPage).then(function (photos) {
        console.log(photos);
        vm.photos = photos.photo;
        vm.pagination.totalPages = Math.ceil(photos.pages / vm.pagination.perPage);
      });
    }

    imageLoader();
  }

  function imageDashboardDisplay() {
    return {
      restrict: 'E',
      templateUrl: 'app/image_dashboard/views/image.dashboard.html',
      scope: {},
      controller: 'imageDashboardDisplayCtrl',
      controllerAs: 'imageDashboardDisplayCtrl'
    }
  }

})();