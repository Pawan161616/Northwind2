sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("northwind.northwind2.controller.Products", {
            onInit: function () {

            },
            onListItemPress:function(oEvent){
             
                var sItem = oEvent.getSource().getBindingContextPath();
                var a = sItem.lastIndexOf(")");
                var SId = sItem.substring(10,a);
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("OrderDetails",{
                    ProductID: SId
                });
            },
            onSearch: function(oEvent){
              var sQuery = oEvent.getParameter("newValue");
              var oFilter = new Filter("ProductName",FilterOperator.Contains,sQuery);
              this.getView().byId("listId").getBinding("items").filter(oFilter);
            }
        });
    });
