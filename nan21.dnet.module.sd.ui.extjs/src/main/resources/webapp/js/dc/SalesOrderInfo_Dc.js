/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesOrderInfo_Dc" , {
	extend: "dnet.core.dc.AbstractDc",
	recordModel: Dnet.ns.sd + "SalesOrderInfo_Ds"
});

/* ================= EDIT FORM: Edit ================= */

Ext.define(Dnet.ns.sd + "SalesOrderInfo_Dc$Edit" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesOrderInfo_Dc$Edit",

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"billToLocation", dataIndex:"billToLocation", xtype:"bd_Locations_Lov",
			retFieldMapping: [{lovField:"id", dsField: "billToLocationId"} ],
			filterFieldMapping: [{lovField:"targetRefid", dsField: "bpartnerRefid"}, {lovField:"forBilling", value: "true"}, {lovField:"active", value: "true"} ]})
		.addLov({name:"billToContact", dataIndex:"billToContact", xtype:"md_BpContacts_Lov",
			retFieldMapping: [{lovField:"id", dsField: "billToContactId"} ],
			filterFieldMapping: [{lovField:"businessPartnerId", dsField: "bpartnerId"}, {lovField:"active", value: "true"} ]})
		.addLov({name:"shipToLocation", dataIndex:"shipToLocation", xtype:"bd_Locations_Lov",
			retFieldMapping: [{lovField:"id", dsField: "shipToLocationId"} ],
			filterFieldMapping: [{lovField:"targetRefid", dsField: "bpartnerRefid"}, {lovField:"forShipping", value: "true"}, {lovField:"active", value: "true"} ]})
		.addLov({name:"shipToContact", dataIndex:"shipToContact", xtype:"md_BpContacts_Lov",
			retFieldMapping: [{lovField:"id", dsField: "shipToContactId"} ],
			filterFieldMapping: [{lovField:"businessPartnerId", dsField: "bpartnerId"}, {lovField:"active", value: "true"} ]})
		.addTextArea({ name:"notes", dataIndex:"notes", height:80})
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true})
		.addPanel({ name:"panelBilling", title:"Invoice", width:400, layout:"form", xtype:"fieldset", border:true, collapsible:true})
		.addPanel({ name:"panelShipping", title:"Delivery", width:400, layout:"form", xtype:"fieldset", border:true, collapsible:true})
		.addPanel({ name:"panelNotes", width:400, layout:"form", xtype:"fieldset", border:true, collapsible:true, defaults:{labelAlign:"top"}});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["panelShipping", "panelBilling", "panelNotes"])
		.addChildrenTo("panelBilling", ["billToLocation", "billToContact"])
		.addChildrenTo("panelShipping", ["shipToLocation", "shipToContact"])
		.addChildrenTo("panelNotes", ["notes"]);
	},
	/* ==================== Business functions ==================== */
	
	_beforeApplyStates_: function(record) {
		
		var retVal = true;
		if (record.get("invoiced") ) {
			this._disableFields_(["billToLocation","billToContact" ]);
			retVal = false;
		}
		return retVal;
	}
});
