sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "northwind/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("northwind.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
            createContent: function() {
                var oAppPage = new sap.ui.view({
                    viewName: "northwind.view.App",
                    id: "idAP",
                    type:"XML"
                });
                var oCustomerPage = new sap.ui.view({
                    viewName: "northwind.view.Customer",
                    id: "idCust",
                    type: "XML"
                });
                var oWelcomePage = new sap.ui.view({
                    viewName: "northwind.view.Welcome",
                    id: "idWlcm",
                    type: "XML"
                });
                var oAppCon = oAppPage.byId("idAppCon");
                oAppCon.addMasterPage(oCustomerPage).addDetailPage(oWelcomePage);
                return oAppPage;
            }
        });
    }
);