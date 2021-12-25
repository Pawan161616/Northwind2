sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("northwind.northwind2.controller.Customer", {
            onInit: function () {

            },
            onListItemPress:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("OrderDetails");
          

            }
        });
    });
