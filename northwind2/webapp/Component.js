sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "northwind/northwind2/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("northwind.northwind2.Component", {
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
            }
            // createContent: function(){
            //     var oAppPage = new sap.ui.view({
            //         viewName: "northwind.northwind2.view.App",
            //         id:"idApp",
            //         type:"XML"
            //     });
            //     var oProductPage = new sap.ui.view({
            //         viewName:"northwind.northwind2.view.Products",
            //         id:"idProduct",
            //         type:"XML"
            //     });
            //     var oOrderPage = new sap.ui.view({
            //         viewName="northwind.northwind2.view.Orders",
            //         id:"idOrder",
            //         type:"XML"
            //     });
            //     var oEmptyPage = new sap.ui.view({
            //         viewName = "northwind.northwind2.view.Empty",
            //         id:"idEmpty",
            //         type:"XML"
            //     });
            //     var oAppCon = oAppPage.byId("idAppCon");
            //     oAppCon.addMasterPage().addDetailPage(oEmptyPage).addDetailPage();
            //     return oAppPage;
            // }
        });
    }
);