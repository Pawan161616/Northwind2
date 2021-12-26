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
            onListItemPress:function(oEvent){
             
                var sItem = oEvent.getSource().getBindingContextPath();
                var a = sItem.lastIndexOf(")");
                var SId = sItem.substring(12,a-1);
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("OrderDetails",{
                    CustId: SId
                });
            }
        });
    });
