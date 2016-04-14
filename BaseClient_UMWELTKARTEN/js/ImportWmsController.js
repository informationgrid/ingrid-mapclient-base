goog.provide('ga_importwms_controller');
(function() {

  var module = angular.module('ga_importwms_controller', []);

  module.controller('GaImportWmsController', function($scope, gaGlobalOptions) {
    $scope.options = {
      proxyUrl: gaGlobalOptions.ogcproxyUrl,
      defaultGetCapParams: 'SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0',
      defaultWMSList: [
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/GAV_wms/MapServer/WMSServer',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/GSG_wms/MapServer/WMSServer',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/HWRM_wms/MapServer/WMSServer',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/Stickstoffbelastung/MapServer/WMSServer?',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/WMS_GDI_DE/MapServer/WMSServer',
        'https://www.umweltkarten-niedersachsen.de/arcgis/services/WRRL_wms/MapServer/WMSServer'
      ]
    };
  });
})();
