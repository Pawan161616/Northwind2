sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment'
  ],function(Controller,Fragment){
    return Controller.extend("northwind.northwind2.controller.Orders",{

         ProductID: null, custName: null, Discount: null, orderID: null, quantity: null, Salesperson: null, ShipperName: null, UnitPrice : null,
         oJsonModel: null, locModel2: null, locModel3: null, locModel4: null, locModel5: null, locModel6: null, locModel7: null,
         varinIt : function(){
            this.custName = this.getView().byId("CustNameID");
            this.Discount = this.getView().byId("DiscountId");
            this.orderID =  this.getView().byId("orderId");
            this.quantity = this.getView().byId("QuantityID");
            this.Salesperson = this.getView().byId("salesPersonID");
            this.ShipperName = this.getView().byId("shipperNameID");
            this.UnitPrice = this.getView().byId("unitPriceID");
        },
        onInit: function(){
        this.varinIt();
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("OrderDetails").attachMatched(this.onObjectMatched.bind(this));
          this.createLocalModels();
                                                   
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
            this.refreshLocalModels();
           },
           createLocalModels: function(){
               // to initialize all the local models required 
                    this.oJsonModel = new sap.ui.model.json.JSONModel();
                    this.oJsonModel.setData({"Invoice":[]});
                    this.getView().setModel(this.oJsonModel,"myJInvoiceModel"); 

                    this.locModel2 = new sap.ui.model.json.JSONModel();
                    this.locModel2.setData({"Invoice":[]});
                    this.getView().setModel(this.locModel2,"myJInvoiceModel2");

                    this.locModel3 = new sap.ui.model.json.JSONModel();
                    this.locModel3.setData({"Invoice":[]});
                    this.getView().setModel(this.locModel3,"myJInvoiceModel3");

                    this.locModel4 = new sap.ui.model.json.JSONModel();
                    this.locModel4.setData({"Invoice":[]});
                    this.getView().setModel( this.locModel4,"myJInvoiceModel4");
           
                    this.locModel5 = new sap.ui.model.json.JSONModel();
                    this.locModel5.setData({"Invoice":[]});
                    this.getView().setModel( this.locModel5,"myJInvoiceModel5");
                    
                    this.locModel6 = new sap.ui.model.json.JSONModel();
                    this.locModel6.setData({"Invoice":[]});
                    this.getView().setModel( this.locModel6,"myJInvoiceModel6"); 

                    this.locModel7 = new sap.ui.model.json.JSONModel();
                    this.locModel7.setData({"Invoice":[]});
                    this.getView().setModel( this.locModel7,"myJInvoiceModel7"); 
                },
           refreshLocalModels: function(){
            //    to refresh Invoice input fields when product is changed form product view
               for (i=2;i<8;i++){
                   var modelName = "myJInvoiceModel" + i;
                   if(this.getView().getModel(modelName).oData.Invoice != ''){
                                if(this.getView().getModel(modelName).oData.Invoice[0].ProductID != this.ProductID){
                                   this.getView().getModel(modelName).oData.Invoice = '';
                                    this.getView().setModel(this.getView().getModel(modelName),modelName);
                                    this.emptyInvoiceFields();
                                 
                            }
                   }
                   
               }
           },
           emptyInvoiceFields: function(){
                    //empty Invoice fields
                    this.custName.setValue('');
                    this.Discount.setValue('');
                    this.orderID.setValue('');
                    this.quantity.setValue('');
                    this.Salesperson.setValue('');
                    this.ShipperName.setValue('');
                    this.UnitPrice.setValue('');
           },
            
           _searchHelp: function(){
            this.emptyInvoiceFields();
               if(!this.detailPopup){
                   this.pDialog = this.loadFragment({
                       type:"XML",
                       id: this.getView().getId(),
                       name: "northwind.northwind2.fragments.SearchHelp",
                       controller: this
                   });

                   this.pDialog.then(function(oDialog){
                       this.detailPopup = oDialog;
                       var locModel = this.getView().getModel("myJInvoiceModel");
                       this.detailPopup.setModel(locModel);
                       this.detailPopup.bindAggregation("items",{
                           path:"/Invoice",
                           template: new sap.m.StandardListItem({
                               title:"{CustomerName}"
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
                        
                        this.locModel2.setProperty("/Invoice/",payload);
                        },          
           onSelectingDiscountID: function(){
                            this.orderID.setValue('');
                            var oLocModel = this.getView().getModel("myJInvoiceModel2");
                          
                            var payload = [];
                            for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                                if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                                    (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                                    (oLocModel.oData.Invoice[i].Discount == this.Discount.getValue())){
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
                                        
                                        this.locModel3.setProperty("/Invoice/",payload);  
                                                  
            },
            onSelectingOrderID: function(){
                                    // this.getView().byId("orderId").setValue('');
                                    var oLocModel = this.getView().getModel("myJInvoiceModel3"); 
                                    var payload = [];
                                    for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                                        if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                                            (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                                            (oLocModel.oData.Invoice[i].Discount == this.Discount.getValue())&&
                                            (oLocModel.oData.Invoice[i].OrderID ==  this.orderID.getValue())){
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
                                                
                                                this.locModel4.setProperty("/Invoice/",payload); 
            },
            onSelectingQuantity: function() {
                                var oLocModel = this.getView().getModel("myJInvoiceModel4"); 
                                var payload = [];
                                for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                                    if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                                        (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                                        (oLocModel.oData.Invoice[i].Discount == this.Discount.getValue())&&
                                        (oLocModel.oData.Invoice[i].OrderID ==  this.orderID.getValue())&&
                                        (oLocModel.oData.Invoice[i].Quantity ==  this.quantity.getValue())){
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
                                            
                                            this.locModel5.setProperty("/Invoice/",payload); 
            },
            onSelectingSalesPerson: function(){
                var oLocModel = this.getView().getModel("myJInvoiceModel5"); 
                var payload = [];
                for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                    if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                        (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                        (oLocModel.oData.Invoice[i].Discount == this.Discount.getValue())&&
                        (oLocModel.oData.Invoice[i].OrderID ==  this.orderID.getValue())&&
                        (oLocModel.oData.Invoice[i].Quantity ==  this.quantity.getValue())&&
                        (oLocModel.oData.Invoice[i].Salesperson ==  this.Salesperson.getValue())){
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
                            
                            this.locModel6.setProperty("/Invoice/",payload); 
            },

            onSelectingShipperName: function(){
                var oLocModel = this.getView().getModel("myJInvoiceModel6"); 
                var payload = [];
                for(var i=0;i < oLocModel.oData.Invoice.length;i++){
                    if((oLocModel.oData.Invoice[i].ProductID == this.ProductID) && 
                        (oLocModel.oData.Invoice[i].CustomerName == this.custName.getValue())&&
                        (oLocModel.oData.Invoice[i].Discount == this.Discount.getValue())&&
                        (oLocModel.oData.Invoice[i].OrderID ==  this.orderID.getValue())&&
                        (oLocModel.oData.Invoice[i].Quantity ==  this.quantity.getValue())&&
                        (oLocModel.oData.Invoice[i].Salesperson ==  this.Salesperson.getValue())&&
                        (oLocModel.oData.Invoice[i].ShipperName ==  this.ShipperName.getValue())){
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
                            
                            this.locModel7.setProperty("/Invoice/",payload); 
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