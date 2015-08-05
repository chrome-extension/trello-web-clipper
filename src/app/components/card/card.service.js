(function() {
  'use strict';

  angular
    .module('twc')
    .service('$card', $card);

  /** @ngInject */
  function $card($log, $addon, properties) {
    var service = this;

    service.position = properties.defaults.position;

    service.fromTab = fromTab;
    service.toApi = toApi;

    function fromTab(tab) {
      if (! tab) { return service; }

      service.name = tab.title;
      service.attachmentUrl = tab.url;

      service.desc = $addon.prefs['desc.template']
        .replace(/{{\s*title\s*}}/g, tab.title)
        .replace(/{{\s*url\s*}}/g, tab.url);

      return service;
    }

    function toApi() {
      if (! service.list ||
          ! service.list.id) {
        throw new Error('Cannot serialize card, missing list');
      }

      return {
        idList: service.list.id,
        name: service.name,
        desc: service.desc,
        pos: service.position
      };
    }
  }
})();
