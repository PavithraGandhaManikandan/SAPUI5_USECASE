sap.ui.require([
    "sap/ui/test/Opa5",
    "sap/dm/dme/test/integration/pages/Arrangements",
    "sap/dm/dme/localService/DmeMockServer"
], function (Opa5, Arrangements, MockServer) {
    "use strict";

    QUnit.module("Speed Loss List", function (hooks) {
        hooks.before(function (assert) {
            var loadingDone = assert.async();

            Opa5.extendConfig({
                arrangements: Arrangements.getInstance()
            });

            // This mock server is used when the app is started as Component
            MockServer.init({
                sManifestPath: "sap/dm/dme/pod/manifest.json",
                oRequestMappingConfig: {
                    appMappingConfig: "sap/dm/dme/oeetransactionpodplugin/test/integration/speedLossOrderList/mock/speedLossOrderListRequestMapping.json",
                    supplementalConfigs: [
                        "sap/dm/dme/oeetransactionpodplugin/test/integration/mock/dependentRequestMapping.json"
                    ]
                },
                sMockDataFolderPath: "sap/dm/dme/oeetransactionpodplugin/test/integration/speedLossOrderList/mock/mockData/"
            });

            sap.ui.require([
            "sap/dm/dme/oeetransactionpodplugin/test/integration/speedLossOrderList/pages/SpeedLossDetailPage"
            // Placing the Journey within a callback will guarantee that the required files are loaded prior
           // to launching the Journey.
            ], function () {
                loadingDone();
            });
        });

        sap.ui.require([
           "sap/dm/dme/oeetransactionpodplugin/test/integration/speedLossOrderList/SpeedLossJourneyWithValidResource"
        ]);
    });
});
