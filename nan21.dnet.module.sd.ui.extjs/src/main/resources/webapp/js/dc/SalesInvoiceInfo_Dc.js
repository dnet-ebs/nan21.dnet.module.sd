/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesInvoiceInfo_Dc" , {
	extend: "dnet.core.dc.AbstractDc",
	recordModel: Dnet.ns.sd + "SalesInvoiceInfo_Ds"
});

/* ================= EDIT FORM: Edit ================= */

Ext.define(Dnet.ns.sd + "SalesInvoiceInfo_Dc$Edit" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesInvoiceInfo_Dc$Edit",

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
		.addLov({name:"paymentMethod", dataIndex:"paymentMethod", xtype:"md_DocTypes_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "paymentMethodId"} ],
			filterFieldMapping: [{lovField:"active", value: "true"}, {lovField:"category", value: "payment-in"} ]})
		.addLov({name:"paymentTerm", dataIndex:"paymentTerm", xtype:"md_PaymentTerms_Lov",
			retFieldMapping: [{lovField:"id", dsField: "paymentTermId"} ],
			filterFieldMapping: [{lovField:"active", value: "true"} ]})
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true})
		.addPanel({ name:"panelBilling", title:"Invoice", width:400, layout:"form", xtype:"fieldset", border:true, collapsible:true})
		.addPanel({ name:"panelPayment", title:"Payment", width:400, layout:"form", xtype:"fieldset", border:true, collapsible:true});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["panelBilling", "panelPayment"])
		.addChildrenTo("panelBilling", ["billToLocation", "billToContact"])
		.addChildrenTo("panelPayment", ["paymentTerm", "paymentMethod"]);
	}
});
