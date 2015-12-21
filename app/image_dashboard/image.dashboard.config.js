/**
 * Created by Eugene on 12/20/15.
 */

(function () {
  'use strict';
  angular.module('app.imageDashboard')
    .constant('ImageBoardConfig', {
      url: 'https://api.flickr.com/services/rest/',
      apiKey: '',
      tags: 'Soccer'
    });

})();