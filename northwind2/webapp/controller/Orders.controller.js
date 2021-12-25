sap.ui.define([
    'sap/ui/core/mvc/Controller'
],function(Controller){
    return Controller.extend("northwind2.northwind.controller.Orders",{
        onInit: function(){
          
           },
           toCustomer: function(){
          
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("CustomerDetails");
           }
    });
});