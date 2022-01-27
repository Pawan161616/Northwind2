sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment'
  ],function(Controller,Fragment){
    return Controller.extend("northwind.northwind2.controller.Orders",{

         ProductID:null,
         custName: this.getView().byId("CustNameID").getValue(),
        onInit: function(){
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
        var oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.setData({"Invoice":[]});
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
                           var PayloadBeta =  {"ProductID": oData.results[i].ProductID,
                                                "CustomerName":oData.results[i].CustomerName,
                                                "Discount":oData.results[i].Discount,
                                                "OrderID": oData.results[i].OrderID,
                                                "ProductName": oData.results[i].ProductName,
                                                "Quantity": oData.results[i].Quantity,
                                                "Salesperson": oData.results[i].Salesperson,
                                                "ShipperName": oData.results[i].ShipperName,
                                                "UnitPrice": oData.results[i].UnitPrice
                                                };     
                                        
                           Payload.push(PayloadBeta);
                           locModel.setProperty("/Invoice",Payload);
                           this.getView().setModel(locModel,"myJInvoiceModel");
                           
                       }
                   
                   }  
               }.bind(this)
            });
           },
            locModel:null,
           _searchHelp: function(){
              this.getView().byId("CustNameID").setValue('');
              this.getView().byId("DiscountId").setValue('');
              this.getView().byId("orderId").setValue('');
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
                           path:"myJInvoiceModel0>/Invoice",
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
                    this.detailPopup.open();
               }
             
           },
        
           onSelect: function(oEvent){
              
                var sTitle = oEvent.getParameter("selectedItem").getTitle();

                this.custName = this.getView().byId("CustNameID");
               

                this.custName.setValue(sTitle);
                this.DiscountDropDown();
               
           },
           DiscountDropDown: function(){
                    
                    var oLocModel = this.getView().getModel("myJInvoiceModel");
                    var payload = [];
                    for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                        if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                            (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())){
                                var PayloadBeta = {"ProductID": oLocModel.oData.Invoice[i].ProductID,
                                                    "CustomerName":oLocModel.oData.Invoice[i].CustomerName,
                                                    "Discount":oLocModel.oData.Invoice[i].Discount,
                                                    "OrderID": oLocModel.oData.Invoice[i].OrderID,
                                                    "ProductName": oLocModel.oData.Invoice[i].ProductName,
                                                    "Quantity": oLocModel.oData.Invoice[i].Quantity,
                                                    "Salesperson": oLocModel.oData.Invoice[i].Salesperson,
                                                    "ShipperName": oLocModel.oData.Invoice[i].ShipperName,
                                                    "UnitPrice": oLocModel.oData.Invoice[i].UnitPrice};
                                                    payload.push(PayloadBeta);                   
                                                    }
                                            
                        }
                        var locModel = new sap.ui.model.json.JSONModel();
                        locModel.setData({"Invoice":[]});
                        this.getView().setModel(locModel,"myJInvoiceModel2");
                        locModel.setProperty("/Invoice/",payload);
                        },
           onSelectingDiscountID: function(){
                            this.getView().byId("orderId").setValue('');
                            var oLocModel = this.getView().getModel("myJInvoiceModel2");
                            var Discount = this.getView().byId("DiscountId");
                            var payload = [];
                            for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                                if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                                    (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                                    (oLocModel.oData.Invoice[i].Discount == Discount.getValue())){
                                        var PayloadBeta = {"ProductID": oLocModel.oData.Invoice[i].ProductID,
                                                            "CustomerName":oLocModel.oData.Invoice[i].CustomerName,
                                                            "Discount":oLocModel.oData.Invoice[i].Discount,
                                                            "OrderID": oLocModel.oData.Invoice[i].OrderID,
                                                            "ProductName": oLocModel.oData.Invoice[i].ProductName,
                                                            "Quantity": oLocModel.oData.Invoice[i].Quantity,
                                                            "Salesperson": oLocModel.oData.Invoice[i].Salesperson,
                                                            "ShipperName": oLocModel.oData.Invoice[i].ShipperName,
                                                            "UnitPrice": oLocModel.oData.Invoice[i].UnitPrice};
                                                            payload.push(PayloadBeta);                   
                                                            }
                                                    }
                                        var locModel = new sap.ui.model.json.JSONModel();
                                        locModel.setData({"Invoice":[]});
                                        this.getView().setModel(locModel,"myJInvoiceModel3");
                                        locModel.setProperty("/Invoice/",payload);  
                                                  
        },
        onSelectingOrderID: function(){
                                // this.getView().byId("orderId").setValue('');
                                var oLocModel = this.getView().getModel("myJInvoiceModel3");
                                var orderID = this.getView().byId("orderId");
                                var Discount = this.getView().byId("DiscountId");
                                var payload = [];
                                for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                                    if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                                        (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                                        (oLocModel.oData.Invoice[i].Discount == Discount.getValue())&&
                                        (oLocModel.oData.Invoice[i].OrderID == orderID.getValue())){
                                            var PayloadBeta = {"ProductID": oLocModel.oData.Invoice[i].ProductID,
                                                                "CustomerName":oLocModel.oData.Invoice[i].CustomerName,
                                                                "Discount":oLocModel.oData.Invoice[i].Discount,
                                                                "OrderID": oLocModel.oData.Invoice[i].OrderID,
                                                                "ProductName": oLocModel.oData.Invoice[i].ProductName,
                                                                "Quantity": oLocModel.oData.Invoice[i].Quantity,
                                                                "Salesperson": oLocModel.oData.Invoice[i].Salesperson,
                                                                "ShipperName": oLocModel.oData.Invoice[i].ShipperName,
                                                                "UnitPrice": oLocModel.oData.Invoice[i].UnitPrice};
                                                                payload.push(PayloadBeta);                   
                                                                }
                                                        }
                                            var locModel = new sap.ui.model.json.JSONModel();
                                            locModel.setData({"Invoice":[]});
                                            this.getView().setModel(locModel,"myJInvoiceModel4");
                                            locModel.setProperty("/Invoice/",payload); 
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