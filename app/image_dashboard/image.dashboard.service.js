/**
 * Created by Eugene on 12/20/15.
 */

(function () {
  'use strict';

  angular.module('app.imageDashboard').service('ImageBoardService', ImageBoardService);

  ImageBoardService.$inject = ['$http', '$q', 'ImageBoardConfig'];

  function ImageBoardService($http, $q, ImageBoardConfig) {
    var imageBoardService = this;

    imageBoardService.getImages = function (page, perPage) {

      var toSkip = Math.abs(page * perPage);

      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ImageBoardConfig.url,
        params: {
          method: 'flickr.photos.search',
          api_key: ImageBoardConfig.apiKey,
          tags: ImageBoardConfig.tags,
          format: 'json',
          page: toSkip,
          per_page: perPage,
          nojsoncallback: 1
        }
      }).success(function (data) {
        deferred.resolve(data.photos);
      }).error(function (err) {
        deferred.reject(err, code);
        console.log(err, code);
      });

      return deferred.promise;
    };
  }
})();