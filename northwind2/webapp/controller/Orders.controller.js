sap.ui.define([
    'sap/ui/core/mvc/Controller'
  
  
],function(Controller){
    return Controller.extend("northwind2.northwind.controller.Orders",{
         
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
        // var oJsonModel = this.models.createDeviceModel();
        var oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.setData({"Invoice":[]});
        this.getView().setModel(oJsonModel,"myJInvoiceModel");                                            
        this.generateInvoice();
        
           },
           generateInvoice: function(){
              
              var payload = {"ShipName":"Alfred's Futterkiste"}
              this.getView().getModel("myJInvoiceModel").setProperty("/Invoice/",payload);
              
           },
           onObjectMatched: function(oEvent){
        
               ProductID = oEvent.getParameter("arguments").ProductID;
               sPath = "/Products("+ ProductID + ")";
               this.getView().bindElement(sPath,{
                expand:"Supplier"
               });
               var odataModel = this.getView().getModel();
               odataModel.read("/Invoices",{sync:false,success:function(oData,response){
                 debugger;
               },
               error:function(oData,response){
                   debugger;
               }
            });
           },
           toEmptyPage: function(){
          
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
           },
           getIcon: function(Image){
                  if(Image){
                    var sImage = "data:image/bmp;base64," + Image.substring(104);
                    return sImage;
                  }
             }
           
    });
});