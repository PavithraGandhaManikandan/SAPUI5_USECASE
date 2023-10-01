/* global sap */
sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/dm/dme/podplugin/test/integration/pages/Common",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/AggregationContainsPropertyEqual",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/Properties"
], function (Opa5, Common, PropertyStrictEquals, Press, AggregationContainsPropertyEqual, AggregationLengthEquals, Properties) {
	"use strict";
	var COLUMN_COUNT = 6;

	Opa5.createPageObjects({
		onTheSpeedLossOrderListPage: {
			viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
			baseClass: Common,

			actions: {
				iUpdateToken: function (sText) {
					return this.waitFor({
						id: "resourceFilter",
						success: function (oResourceFilter) {
							var aTokens = oResourceFilter.getTokens();
							let aFinalToken = aTokens.filter(function (item) {
								return item.getText() == sText;
							});
							oResourceFilter.fireTokenUpdate({ type: "removed", removedTokens: aFinalToken });
						},
						autoWait: true,
						searchOpenDialogs: false
					});
				},
				iClickOnFilter: function (filterId) {
					this.iPressOnTheControlById(filterId);
				},
				iPressSelectButton: function () {
					return this.iPressTheDialogButtonWithText("Select");
				},
				iPressTheDialogButtonWithText: function (sValue) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({ name: "text", value: sValue }),
						actions: new Press()
					});
				},
				iSelectAResourceAtIndex: function (iIndex) {
					return this.waitFor({
						id: "resourceBrowse--resultTable",
						success: function (oList) {
							oList.getItems()[iIndex].setSelected(true);
							oList.fireSelectionChange({ "listItems": [oList.getItems()[iIndex]], "selected": true });
						},
						autoWait: true,
						searchOpenDialogs: true
					});
				},
				iSelectAResourceWithWCFilterAtIndex: function (iIndex) {
                	return this.waitFor({
                		id: "workCenterResourceBrowse--resultTable",
                		success: function (oList) {
                			oList.getItems()[iIndex].setSelected(true);
                			oList.fireSelectionChange({ "listItems": [oList.getItems()[iIndex]], "selected": true });
                		},
                		autoWait: true,
                		searchOpenDialogs: true
                	});
                },
				iSelectAWorkCenterAtIndex: function (iIndex) {
					return this.waitFor({
						id: "workCenterBrowse--resultTable",
						success: function (oList) {
							oList.getItems()[iIndex].$().trigger("tap");
						},
						autoWait: true,
						searchOpenDialogs: true
					});
				},
				iSelectAnOrderAtIndex: function (iIndex) {
					return this.waitFor({
						id: "orderBrowse--resultTable",
						success: function (oList) {
							oList.getItems()[iIndex].$().trigger("tap");
						},
						autoWait: true,
						searchOpenDialogs: true
					});
				},
				iPressOnClearButton: function () {
					return this.iPressOnTheControlById("filterbar-btnClear");
				},
				iClickOnDatePicker: function () {
					return this.waitFor({
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						id: "date-picker",
						success: function (oControl) {
							oControl.setDateValue(new Date());
							Opa5.assert.ok(true, "Date Picker is pressed");
						},
						error: function (oControl) {
							Opa5.assert.ok(false, "Date Picker is not pressed");
						}
					});
				},
				iSelectedADate: function () {
					return this.waitFor({
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						searchOpenDialogs: true,
						id: "date-picker-cal",
						success: function (oControl) {
							Opa5.assert.ok(true, "Date is selected");
						},
						error: function (oControl) {
							Opa5.assert.ok(false, "Date is not selected");
						},
						autoWait: true
					});
				},
				iPressTheGoButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Go"
						},
						enabled: false,
						actions: new Press({
							idSuffix: "BDI-content"
						}),
						success: function (oControl) {
							oControl[0].setEnabled(true)
							Opa5.assert.ok(true, "Go button is pressed");
						},
						error: function (oControl) {
							Opa5.assert.ok(false, "Go button is not pressed");
						}
					});
				},
				iPressOnTableItem: function () {
					return this.waitFor({
						controlType: "sap.m.ColumnListItem",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							type: "Navigation"
						},
						actions: new Press(),
						success: function (oControl) {
							Opa5.assert.ok(true, "Table item is pressed");
						},
						error: function (oControl) {
							Opa5.assert.ok(false, "Table item is not pressed");
						}
					})
				},
				iPressOnGoButton: function () {
                    return this.iPressOnTheControlById("filterBar-btnGo");
                },
                iClickOnOK: function () {
                    this.iPressTheDialogButtonWithText("OK");
                }
			},

			assertions: {
				iShouldSeeResourceInputWithText: function (sText) {
					return this.waitFor({
						id: "resourceFilter",
						success: function (oControl) {
						if(sText==="" && oControl.getTokens().length==0){
						Opa5.assert.ok(true, "Resource has text '" + sText + "'");
						}else{
							let aFinalToken = oControl.getTokens().filter(function (item) {
                        								return item.getText() == sText;
                        							});
                        							if (aFinalToken != undefined && aFinalToken.length > 0) {
                        								Opa5.assert.ok(true, "Resource has text '" + sText + "'");
                        							}
						}
						},
						autoWait: true
					});
				},
				iSelectResourceFromTheList: function (oElem) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({ name: "title", value: oElem }),
						success: function (oRow) {
							// oRow[0].firePress();
							Opa5.assert.ok(true, oElem + " is selected");
						},
						actions: new Press(),
						autoWait: true
					});
				},
				iShouldSeeResourcePopup: function () {
					return this.theDialogTitleIs("Select Resource");
				},
				iShouldSeeValueHelpInputWithText: function (sFilter, sText) {
					return this.theControlPropertyShouldHaveValue(sFilter, "value", sText);
				},
				iShouldSeeWorkCenterPopup: function () {
					return this.theDialogTitleIs("Select Workcenter");
				},
				iShouldSeeOrderPopup: function () {
					return this.theDialogTitleIs("Select Order");
				},
				theDialogTitleIs: function (sTitle) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Dialog",
						matchers: function (oInternalDialog) {
							return oInternalDialog && oInternalDialog.getTitle() === sTitle;
						},
						success: function () {
							Opa5.assert.ok(true, "Title of Dialog is " + sTitle);
						},
						autoWait: true
					});
				},
				iShouldSeeTheFilterBar: function () {
					return this.waitFor({
						id: "filterbar",
						success: function (oFilterbar) {
							Opa5.assert.ok(true, "Filter bar is seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheSearchField: function () {
					return this.waitFor({
						controlType: "sap.m.SearchField",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						success: function (oSearchField) {
							Opa5.assert.ok(true, "Search field is seen");
						},
						error: function (oSearchField) {
							Opa5.assert.ok(false, "Search field is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheWorkcenterLabel: function () {
					return this.waitFor({
						controlType: "sap.m.Label",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Work Center"
						},
						success: function (oWorkcenter) {
							Opa5.assert.ok(true, "Workcenter label is seen");
						},
						error: function (oWorkcenter) {
							Opa5.assert.ok(false, "Workcenter label is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheWorkcenterMultiInput: function () {
					return this.waitFor({
						id: "workCenterFilter",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						success: function (oWorkcenter) {
							Opa5.assert.ok(true, "Workcenter multi input is seen");
						},
						error: function (oWorkcenter) {
							Opa5.assert.ok(false, "Workcenter multi input is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheResourceLabel: function () {
					return this.waitFor({
						controlType: "sap.m.Label",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Resource"
						},
						success: function (oResource) {
							Opa5.assert.ok(true, "Resource label is seen");
						},
						error: function (oResource) {
							Opa5.assert.ok(false, "Resource label is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheResourceMultiInput: function () {
					return this.waitFor({
						controlType: "sap.m.MultiInput",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						labelFor: {
							text: "Resource"
						},
						success: function (oResource) {
							Opa5.assert.ok(true, "Resource multi input is seen");
						},
						error: function (oResource) {
							Opa5.assert.ok(false, "Resource multi input is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheDateLabel: function () {
					return this.waitFor({
						controlType: "sap.m.Label",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Date"
						},
						success: function (oDate) {
							Opa5.assert.ok(true, "Date label is seen");
						},
						error: function (oDate) {
							Opa5.assert.ok(false, "Date label is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheDateSelection: function () {
					return this.waitFor({
						controlType: "sap.m.DatePicker",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							valueState: "None"
						},
						success: function (oDate) {
							Opa5.assert.ok(true, "Date selection is seen");
						},
						error: function (oDate) {
							Opa5.assert.ok(false, "Date selection is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheOrderLabel: function () {
					return this.waitFor({
						controlType: "sap.m.Label",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Order"
						},
						success: function (oOrder) {
							Opa5.assert.ok(true, "Order label is seen");
						},
						error: function (oOrder) {
							Opa5.assert.ok(false, "Order label is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheOrderMultiInput: function () {
					return this.waitFor({
						controlType: "sap.m.Input",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						labelFor: {
							text: "Order"
						},
						success: function (oOrder) {
							Opa5.assert.ok(true, "Order multi input is seen");
						},
						error: function (oOrder) {
							Opa5.assert.ok(false, "Order multi input is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheGoButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						enabled: false,
						properties: {
							text: "Go"
						},
						success: function (oButton) {
							oButton[0].setEnabled(true);
							Opa5.assert.ok(true, "Go button is seen");
						},
						error: function (oButton) {
							Opa5.assert.ok(false, "Go button is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheAdaptFiltersButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Adapt Filters"
						},
						success: function (oButton) {
							Opa5.assert.ok(true, "Adapt Filters button is seen");
						},
						error: function (oButton) {
							Opa5.assert.ok(false, "Adapt Filters button is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheClearButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Clear"
						},
						success: function (oButton) {
							Opa5.assert.ok(true, "Clear button is seen");
						},
						error: function (oButton) {
							Opa5.assert.ok(false, "Clear button is not seen");
						},
						autoWait: true
					});
				},
				iShoudlSeeTheDataInTable: function () {
					return this.waitFor({
						controlType: "sap.m.Title",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							text: "Items (3)"
						},
						success: function (oListItem) {
							Opa5.assert.ok(true, "Data is present");
						},
						error: function (oListItem) {
							Opa5.assert.ok(true, "Data is not present");
						}
					});
				},
				iShouldSeeTheGrouping: function () {
					return this.waitFor({
						controlType: "sap.m.GroupHeaderListItem",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						properties: {
							title: "_FULL_DAY_ - FULL DAY"
						},
						success: function (oListItem) {
							Opa5.assert.ok(true, "Grouping by Order can be seen");
						},
						error: function (oListItem) {
							Opa5.assert.ok(true, "Grouping by order cannot be seen");
						},
						autoWait: true
					});
				},
				iShouldSeeTheSmartTable: function () {
					return this.waitFor({
						id: "smart-table",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						success: function (oTable) {
							Opa5.assert.ok(true, "Smart table is seen");
						},
						error: function (oTable) {
							Opa5.assert.ok(false, "Smart table is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeAllTheColumn: function () {
					return this.waitFor({
						id: "smart-table",
						viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
						success: function (oTable) {
							var count = 0;
							var oTableColumns = oTable.getTable().getColumns();
							for (var i = 0; i < oTableColumns.length; i++) {
								oTableColumns[i].getVisible() ? count++ : 0;
							}
							Opa5.assert.equal(count, COLUMN_COUNT, "All the " + COLUMN_COUNT + " columns are present in the table");
						},
						error: function (oTable) {
							Opa5.assert.ok(false, "Smart table is not seen");
						},
						autoWait: true
					});
				},
				iShouldSeeDateValue: function(sVal) {
                   return this.waitFor({
                        viewName: "sap.dm.dme.oeetransactionplugins.speedLossOrderListPlugin.view.PluginView",
                        controlType: "sap.m.DatePicker",
                        id: "date-picker",
                        success: function (oControl) {
                            Opa5.assert.equal(sVal, oControl.getValue(), "The value has been updated");
                        },
                        autoWait: true
                    });
                },
                iSeeErrorPopup: function () {
                    this.waitFor({
                        //id: "errorMessageBox",
                        controlType: "sap.m.Dialog",
                        properties: {
                            icon: "sap-icon://error"
                        },
                        searchOpenDialogs: true,
                        success: function (oControl) {
                            Opa5.assert.ok(true, "Enter a value in the required Work Center field.");
                        },
                        error: function (oControl) {
                            Opa5.assert.ok(false, "Error message box is not seen");
                        }
                    });
                },
                iClickOnCloseOnErrorPopup: function () {
                  return this.waitFor({
                      controlType: "sap.m.Button",
                      matchers: new PropertyStrictEquals({ name: "text", value: "Close" }),
                      actions: new Press(),
                      searchOpenDialogs: true,

                      success: function (oInput) {
                          Opa5.assert.ok(true, "Enter a value in the required Work Center field.");
                      },
                      error: function (oControl) {
                          Opa5.assert.ok(false, "Error message box is not seen");
                      }
                  })
                }
			}
		}
	});
});
