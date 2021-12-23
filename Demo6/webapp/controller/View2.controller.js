sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Training.Demos.Demo6.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Training.Demos.Demo6.view.View2
		 */
		onInit: function () {

		},
		onListItemPress:function(oEvent){
			//var bindConPath = oEvent.getSource().getBindingContextPath().substr(1);
			//oEvent.getSource().getBindingContextPath();
			var src = oEvent.getSource();
			
		  	sap.ui.core.UIComponent.getRouterFor(this).navTo("nView3",{ bindcon : src.getBindingContext().sPath.replaceAll("/multipleEmpDetails/","") });	
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Training.Demos.Demo6.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Training.Demos.Demo6.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Training.Demos.Demo6.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});