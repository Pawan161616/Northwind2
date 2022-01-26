sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment'
  ],function(Controller,Fragment){
    return Controller.extend("northwind.northwind2.controller.Orders",{

         ProductID:null,
         custName: null,
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
        // var oJsonModel = this.models.createDeviceModel();
        var oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.setData({"Invoice":[{
                                        "CustomerName":[],
                                        
                                    }]});
        this.getView().setModel(oJsonModel,"myJInvoiceModel");                                            
        this.generateInvoice();
         },
           generateInvoice: function(){
              
            //   var payload = {"ShipName":"Alfred's Futterkiste"}
            //   this.getView().getModel("myJInvoiceModel").setProperty("/Invoice/",payload);
              
           },
           onObjectMatched: function(oEvent){
        
               this.ProductID = oEvent.getParameter("arguments").ProductID;
               sPath = "/Products("+ this.ProductID + ")";
               this.getView().bindElement(sPath,{
                expand:"Supplier"
               });
               var odataModel = this.getView().getModel();
               var locModel = this.getView().getModel("myJInvoiceModel");
               let Payload=[];
               odataModel.read("/Invoices",{success:function(oData,response){
                   for ( var i=0;i<oData.results.length;i++){
                       if (oData.results[i].ProductID == this.ProductID){      
                           var PayloadBeta = {"CustomerName":oData.results[i].CustomerName,
                                               "ProductId":oData.results[i].ProductID};     
                                        
                           Payload.push(PayloadBeta);
                           locModel.setProperty("/Invoice/CustomerName",Payload);
                           this.getView().setModel(locModel,"myJInvoiceModel");
                           
                       }
                    //    if((oData.results[i].ProductID === ProductID)&&(oData.results[i].ShipName === this.oInput.getValue())){
                    //        debugger;
                    //    }
                   }  
               }.bind(this)
            });
           },
            locModel:null,
           _searchHelp: function(){
              
               if(!this.detailPopup){
                   this.pDialog = this.loadFragment({
                       type:"XML",
                       id: this.getView().getId(),
                       name: "northwind.northwind2.fragments.SearchHelp",
                       controller: this
                   });

                   this.pDialog.then(function(oDialog){
                       this.detailPopup = oDialog;
                       this.locModel = this.getView().getModel("myJInvoiceModel");
                       this.detailPopup.setModel(this.locModel,"myJInvoiceModel0");
                       this.detailPopup.bindAggregation("items",{
                           path:"myJInvoiceModel0>/Invoice/CustomerName",
                           template: new sap.m.StandardListItem({
                               title:"{myJInvoiceModel0>CustomerName}"
                           })
                       });
                       this.detailPopup.open();
                }.bind(this));
                // Fragment.load({
                //     type:"XML",
                //     id:"searchHelp",
                //     name:"northwind2.northwind.fragments.SearchHelp",
                //     controller:this
                // }).then(function(oDialog){
                //     debugger;
                //     this.detailPopup = oDialog;
                //      this.detailPopup.bindElement("/Invoice/CompanyName");
                //      this.detailPopup.setModel(this.getView().getModel("myJInvoiceModel"));
                //      this.getView().addDependent(this.detailPopup);
                //      this.detailPopup.open();
                // }.bind(this));
               
               }else{
                   if(this.getView().byId("CustNameID").getValue() != ''){
                       this.detailPopup.setModel(this.locModel,"myJInvoiceModel0");
                       this.detailPopup.open();
                   }
                   else{
                    this.detailPopup.open();
                   }
                  
               }
             
           },
        
           onSelect: function(oEvent){
               var sTitle = oEvent.getParameter("selectedItem").getTitle();
           
               this.custName = this.getView().byId("CustNameID");
               this.custName.setValue(sTitle);
               this.DiscountDropDown();
               
           },
           DiscountDropDown: function(){
            var odataModel = this.getView().getModel();
            var oLocModel = this.getView().getModel("myJInvoiceModel");
            odataModel.read("/Invoices",{success:function(oData,response){
                var betaCustName = this.custName.getValue();
                var payload =[];
               
                  for(var i = 0;i<oData.results.length;i++){
                      if ((oData.results[i].ProductID == this.ProductID)&&(oData.results[i].CustomerName == betaCustName)){
                          var payloadBeta = {"ProductID": oData.results[i].ProductID,
                                         "CustomerName":oData.results[i].CustomerName,
                                         "Discount":oData.results[i].Discount};
                          
                          payload.push(payloadBeta);
                          
                      }
                      
                  }
                  oLocModel.setProperty("/Invoice/CustomerName",payload);
                  this.getView().setModel(oLocModel,"myJInviceModel2");
                //   var oComboBox = this.getView().byId("DiscountId");
                //   oComboBox
            }.bind(this)
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