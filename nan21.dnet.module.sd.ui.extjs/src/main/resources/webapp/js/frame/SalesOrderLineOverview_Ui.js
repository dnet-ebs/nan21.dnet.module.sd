/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesOrderLineOverview_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.SalesOrderLineOverview_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("items", Ext.create(Dnet.ns.sd + "SalesOrderLineOverview_Dc" ,{}))
		;
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addDcFilterFormView("items", {name:"filter", xtype:"sd_SalesOrderLineOverview_Dc$Filter"})
		.addDcGridView("items", {name:"list", xtype:"sd_SalesOrderLineOverview_Dc$List"})
		.addDcFormView("items", {name:"docView", _hasTitle_:true, height:100, xtype:"sd_SalesOrderLineOverview_Dc$DocView", collapsible:true
		})
		.addPanel({name:"main", layout:"border", defaults:{split:true}});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["filter", "list", "docView"], ["north", "center", "south"])
		.addToolbarTo("main", "tlbInvList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbInvList", {dc: "items"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addReports()
		.end();
	}

});
