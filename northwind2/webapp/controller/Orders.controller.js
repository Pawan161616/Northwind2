sap.ui.define([
    'sap/ui/core/mvc/Controller'
  
],function(Controller){
    return Controller.extend("northwind2.northwind.controller.Orders",{
         
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
           },
           
           onObjectMatched: function(oEvent){
        
               ProductID = oEvent.getParameter("arguments").ProductID;
               sPath = "/Products("+ ProductID + ")";
               this.getView().bindElement(sPath);
           },
           toProductList: function(){
          
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("ProductDetails");
           },
           getObjectStatus: function(status){
        
            if(status === false)
              return "Unavailable";
              else
              return "Available"; 
           },
           getState: function(status){
              if(status === false)
              return "Error";
              else
              return "Success";
           }
           
    });
});