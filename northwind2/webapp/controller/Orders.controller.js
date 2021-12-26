sap.ui.define([
    'sap/ui/core/mvc/Controller'
],function(Controller){
    return Controller.extend("northwind2.northwind.controller.Orders",{
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
           },
           onObjectMatched: function(oEvent){
        
               CustomerId = oEvent.getParameter("arguments").CustId;
               sPath = "/Customers('"+ CustomerId + "')";
               this.getView().bindElement(sPath);
           },
           toCustomer: function(){
          
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("CustomerDetails");
           }
    });
});