sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment'
  ],function(Controller,Fragment){
    return Controller.extend("northwind2.northwind.controller.Orders",{
         
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
        // var oJsonModel = this.models.createDeviceModel();
        var oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.setData({"Invoice":[{
                                        "CompanyName":[]
                                    }]});
        this.getView().setModel(oJsonModel,"myJInvoiceModel");                                            
        this.generateInvoice();
         },
           generateInvoice: function(){
              
            //   var payload = {"ShipName":"Alfred's Futterkiste"}
            //   this.getView().getModel("myJInvoiceModel").setProperty("/Invoice/",payload);
              
           },
           onObjectMatched: function(oEvent){
        
               ProductID = oEvent.getParameter("arguments").ProductID;
               sPath = "/Products("+ ProductID + ")";
               this.getView().bindElement(sPath,{
                expand:"Supplier"
               });
               var odataModel = this.getView().getModel();
               var Payload=[];
               odataModel.read("/Invoices",{success:function(oData,response){
                   for ( var i=0;i<oData.results.length;i++){
                       if (oData.results[i].ProductID == ProductID){
                        //    var Payload_beta = {"ShipName":oData.results[i].ShipName}
                          
                           Payload.push(oData.results[i].ShipName);
                          this.getView().getModel("myJInvoiceModel").setProperty("/Invoice/CompanyName",Payload);
                           
                       }
                   }  
               }.bind(this)
            });
           },
           detailPopup: null,
           _searchHelp: function(){
              
               if(!this.detailPopup){
                //    this.pDialog = this.loadFragment({
                //        type:"XML",
                //        name: "northwind2.northwind.fragments.SearchHelp"
                //    });

                //    this.pDialog.then(function(oDialog){
                //     oDialog.open();
                // });
                Fragment.load({
                    type:"XML",
                    id:"searchHelp",
                    name:"northwind2.northwind.fragments.SearchHelp",
                    controller:this
                }).then(function(oDialog){
                    debugger;
                    this.detailPopup = oDialog;
                     this.detailPopup.bindElement("/Invoice/CompanyName");
                     this.detailPopup.setModel(this.getView().getModel("myJInvoiceModel"));
                     this.getView().addDependent(this.detailPopup);
                     this.detailPopup.open();
                }.bind(this));
               
               }else{
                   this.detailPopup.open();
               }
             
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