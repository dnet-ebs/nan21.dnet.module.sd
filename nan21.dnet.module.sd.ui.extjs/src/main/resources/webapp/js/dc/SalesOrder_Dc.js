/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesOrder_Dc" , {
	extend: "dnet.core.dc.AbstractDc",
	filterModel: Dnet.ns.sd + "SalesOrder_DsFilter",
	paramModel: Dnet.ns.sd + "SalesOrder_DsParam",
	recordModel: Dnet.ns.sd + "SalesOrder_Ds"
});

/* ================= FILTER FORM: Filter ================= */			

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$Filter" , {
	extend: "dnet.core.dc.view.AbstractDcvFilterForm",
	alias: "widget.sd_SalesOrder_Dc$Filter",

	/**
	 * Components definition
	 */	
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"docType", dataIndex:"docType", xtype:"md_DocTypes_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "docTypeId"} ],
			filterFieldMapping: [{lovField:"category", value: "sales-order"} ]})
		.addLov({name:"company", dataIndex:"company", allowBlank:false, xtype:"md_OrgsLegalEntity_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "companyId"} ]})
		.addLov({name:"bpartner", dataIndex:"bpartner", xtype:"md_CustomerAccounts_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "bpAccountId"} ]})
		.addLov({name:"currency", dataIndex:"currency", xtype:"bd_Currencies_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "currencyId"} ]})
		.addLov({name:"docNo", dataIndex:"docNo", xtype:"sd_SalesOrders_Lov",
			retFieldMapping: [{lovField:"id", dsField: "id"} ],
			filterFieldMapping: [{lovField:"companyId", dsField: "companyId"} ]})
		.addLov({name:"filterPeriod", paramIndex:"filterPeriod", xtype:"md_FiscalPeriods_Lov",
			retFieldMapping: [{lovField:"startDate", dsField: "docDate_From"} ,{lovField:"endDate", dsField: "docDate_To"} ]})
		.addLov({name:"filterProduct", paramIndex:"filterProductAccount", xtype:"md_ProductAccounts_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsParam: "filterProductAccountId"} ],
			filterFieldMapping: [{lovField:"companyId", dsField: "companyId"}, {lovField:"purchase", value: "true"} ]})
		.addBooleanField({ name:"confirmed", dataIndex:"confirmed"})
		.addBooleanField({ name:"invoiced", dataIndex:"invoiced"})
		.addDateField({name:"docDate_From", dataIndex:"docDate_From", emptyText:"From" })
		.addDateField({name:"docDate_To", dataIndex:"docDate_To", emptyText:"To" })
		.addFieldContainer({name: "docDate"})
			.addChildrenTo("docDate",["docDate_From", "docDate_To"])
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, layout: {type:"hbox", align:'top', pack:'start', defaultMargins: {right:5, left:5}},
		autoScroll:true, padding:"0 30 5 0"})
		.addPanel({ name:"col1", width:250, layout:"form"})
		.addPanel({ name:"col3", width:220, layout:"form"})
		.addPanel({ name:"col4", width:300, layout:"form"})
		.addPanel({ name:"col5", width:170, layout:"form"});
	},

	/**
	 * Combine the components
	 */				
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["col1", "col3", "col4", "col5"])
		.addChildrenTo("col1", ["company", "bpartner", "docType"])
		.addChildrenTo("col3", ["docNo", "currency"])
		.addChildrenTo("col4", ["filterPeriod", "docDate", "filterProduct"])
		.addChildrenTo("col5", ["confirmed", "invoiced"]);
	}
});

/* ================= GRID: List ================= */

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$List" , {
	extend: "dnet.core.dc.view.AbstractDcvGrid",
	alias: "widget.sd_SalesOrder_Dc$List",

	/**
	 * Columns definition
	 */
	_defineColumns_: function() {
		this._getBuilder_()
		.addTextColumn({ name:"company", dataIndex:"company", width:120})
		.addTextColumn({ name:"companyId", dataIndex:"companyId", hidden:true, width:100})
		.addTextColumn({ name:"bpartner", dataIndex:"bpartner", width:120})
		.addTextColumn({ name:"bpartnerName", dataIndex:"bpartnerName", hidden:true, width:200})
		.addTextColumn({ name:"bpartnerId", dataIndex:"bpartnerId", hidden:true, width:100})
		.addTextColumn({ name:"docType", dataIndex:"docType", width:120})
		.addTextColumn({ name:"docNo", dataIndex:"docNo", width:80})
		.addDateColumn({ name:"docDate", dataIndex:"docDate", _mask_: Masks.DATE})
		.addNumberColumn({ name:"netAmount", dataIndex:"netAmount", decimals:6})
		.addNumberColumn({ name:"taxAmount", dataIndex:"taxAmount", decimals:6})
		.addNumberColumn({ name:"amount", dataIndex:"amount", decimals:6})
		.addTextColumn({ name:"currency", dataIndex:"currency", width:60})
		.addTextColumn({ name:"currencyId", dataIndex:"currencyId", hidden:true, width:100})
		.addNumberColumn({ name:"netAmountLoc", dataIndex:"netAmountLoc", hidden:true, decimals:6})
		.addNumberColumn({ name:"taxAmountLoc", dataIndex:"taxAmountLoc", hidden:true, decimals:6})
		.addNumberColumn({ name:"amountLoc", dataIndex:"amountLoc", hidden:true, decimals:6})
		.addNumberColumn({ name:"netAmountRef", dataIndex:"netAmountRef", hidden:true, decimals:6})
		.addNumberColumn({ name:"taxAmountRef", dataIndex:"taxAmountRef", hidden:true, decimals:6})
		.addNumberColumn({ name:"amountRef", dataIndex:"amountRef", hidden:true, decimals:6})
		.addBooleanColumn({ name:"confirmed", dataIndex:"confirmed"})
		.addBooleanColumn({ name:"invoiced", dataIndex:"invoiced"})
		.addDefaults();
	}
});

/* ================= EDIT FORM: CopyLinesForm ================= */

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$CopyLinesForm" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesOrder_Dc$CopyLinesForm",

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"copyFrom", paramIndex:"copyFrom", xtype:"sd_SalesOrders_Lov",
			retFieldMapping: [{lovField:"id", dsParam: "copyFromId"} ],
			filterFieldMapping: [{lovField:"bpAccountId", dsField: "bpAccountId"} ]})
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, layout:"form"});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["copyFrom"]);
	}
});

/* ================= EDIT FORM: FrmGenInvoice ================= */

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$FrmGenInvoice" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesOrder_Dc$FrmGenInvoice",

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"invDocType", paramIndex:"invDocType", xtype:"md_DocTypes_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsParam: "invDocTypeId"} ],
			filterFieldMapping: [{lovField:"category", value: "sales-invoice"}, {lovField:"active", value: "true"} ]})
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, layout:"form", defaults:{labelAlign:"right", labelWidth:140}});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["invDocType"]);
	}
});

/* ================= EDIT FORM: Create ================= */

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$Create" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesOrder_Dc$Create",

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"docType", dataIndex:"docType", allowBlank:false, xtype:"md_DocTypes_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "docTypeId"} ],
			filterFieldMapping: [{lovField:"category", value: "sales-order"} ]})
		.addLov({name:"company", dataIndex:"company", allowBlank:false, xtype:"md_OrgsLegalEntity_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "companyId"} ]})
		.addLov({name:"bpartner", dataIndex:"bpartner", allowBlank:false, xtype:"md_CustomerAccounts_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "bpAccountId"} ,{lovField:"bpartnerId", dsField: "bpartnerId"} ],
			filterFieldMapping: [{lovField:"companyId", dsField: "companyId"}, {lovField:"active", value: "true"} ]})
		.addLov({name:"currency", dataIndex:"currency", allowBlank:false, xtype:"bd_Currencies_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "currencyId"} ],
			filterFieldMapping: [{lovField:"active", value: "true"} ]})
		.addDateField({name:"docDate", dataIndex:"docDate", allowBlank:false})
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, width:300, layout:"form"});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["company", "docType", "bpartner", "currency", "docDate"]);
	}
});

/* ================= EDIT FORM: Edit ================= */

Ext.define(Dnet.ns.sd + "SalesOrder_Dc$Edit" , {
	extend: "dnet.core.dc.view.AbstractDcvEditForm",
	alias: "widget.sd_SalesOrder_Dc$Edit",

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addTextField({ name:"docType", dataIndex:"docType", noEdit:true , caseRestriction:"uppercase"})
		.addTextField({ name:"docNo", dataIndex:"docNo", noEdit:true })
		.addDateField({name:"docDate", dataIndex:"docDate", noEdit:true })
		.addTextField({ name:"company", dataIndex:"company", noEdit:true , caseRestriction:"uppercase"})
		.addTextField({ name:"bpartner", dataIndex:"bpartner", noEdit:true , caseRestriction:"uppercase"})
		.addLov({name:"paymentMethod", dataIndex:"paymentMethod", xtype:"md_DocTypes_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "paymentMethodId"} ],
			filterFieldMapping: [{lovField:"active", value: "true"}, {lovField:"category", value: "payment-in"} ]})
		.addLov({name:"paymentTerm", dataIndex:"paymentTerm", xtype:"md_PaymentTerms_Lov",
			retFieldMapping: [{lovField:"id", dsField: "paymentTermId"} ],
			filterFieldMapping: [{lovField:"active", value: "true"} ]})
		.addTextField({ name:"currency", dataIndex:"currency", noEdit:true , fieldCls:"important-field", caseRestriction:"uppercase"})
		.addNumberField({name:"netAmount", dataIndex:"netAmount", noEdit:true , decimals:6})
		.addNumberField({name:"taxAmount", dataIndex:"taxAmount", noEdit:true , decimals:6})
		.addNumberField({name:"amount", dataIndex:"amount", noEdit:true , fieldCls:"important-field", decimals:6})
		.addBooleanField({ name:"confirmed", dataIndex:"confirmed", noEdit:true })
		.addBooleanField({ name:"invoiced", dataIndex:"invoiced", noEdit:true })
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, layout: {type:"hbox", align:'top', pack:'start', defaultMargins: {right:5, left:5}},
		autoScroll:true, padding:"0 30 5 0"})
		.addPanel({ name:"col1", width:250, layout:"form"})
		.addPanel({ name:"col2", width:200, layout:"form"})
		.addPanel({ name:"col3", width:250, layout:"form"})
		.addPanel({ name:"col4", width:170, layout:"form"})
		.addPanel({ name:"col5", title:"Payment", width:300, layout:"form", xtype:"fieldset", border:true, collapsible:true});
	},

	/**
	 * Combine the components
	 */			
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["col1", "col2", "col3", "col4", "col5"])
		.addChildrenTo("col1", ["docType", "company", "bpartner"])
		.addChildrenTo("col2", ["docDate", "docNo", "currency"])
		.addChildrenTo("col3", ["netAmount", "taxAmount", "amount"])
		.addChildrenTo("col4", ["confirmed", "invoiced"])
		.addChildrenTo("col5", ["paymentTerm", "paymentMethod"]);
	},
	/* ==================== Business functions ==================== */
	
	_beforeApplyStates_: function(record) {
		if (record.get("confirmed") ) {
			this._disableAllFields_();
			return false;
		}
	},
	
	_endDefine_: function() {
		this._controller_.on("afterDoServiceSuccess", function(dc, response, name, options) {
		 	this._applyStates_(dc.record);
		 } , this )
	}
});
