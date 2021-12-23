sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Training.Demos.Demo6.controller.App", {
		onInit: function () {

		},
		goToV2:function(){
			sap.ui.core.UIComponent.getRouterFor(this).navTo("nView2");
		}
	});
});