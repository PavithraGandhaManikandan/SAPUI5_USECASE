sap.ui.require([
    "sap/ui/test/Opa5",
    "sap/dm/dme/test/integration/pages/Arrangements",
    "sap/dm/dme/localService/DmeMockServer"
], function (Opa5, Arrangements, MockServer) {
    "use strict";

    QUnit.module("Orders List", function (hooks) {
        hooks.before(function (assert) {
            var loadingDone = assert.async();

            Opa5.extendConfig({
                arrangements: Arrangements.getInstance()
            });

            // This mock server is used when the app is started as Component
            MockServer.init({
                sManifestPath: "ui5exercise/manifest.json",
                oRequestMappingConfig: {
                    appMappingConfig: "ui5exercise/test/integration/ordersList/mock/orderListRequestMapping.json",
                    supplementalConfigs: [
                    ]
                },
                sMockDataFolderPath: "ui5exercise/test/integration/ordersList/mock/mockData/"
            });

            sap.ui.require([
            "ui5exercise/test/integration/ordersList/pages/ordersListPage"
            // Placing the Journey within a callback will guarantee that the required files are loaded prior
           // to launching the Journey.
            ], function () {
                loadingDone();
            });
        });

        sap.ui.require([
           "ui5exercise/test/integration/ordersList/OrdersJourney"
        ]);
    });
});
