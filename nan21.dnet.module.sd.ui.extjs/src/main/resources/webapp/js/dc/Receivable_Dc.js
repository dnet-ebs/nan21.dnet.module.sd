/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "Receivable_Dc" , {
	extend: "dnet.core.dc.AbstractDc",
	filterModel: Dnet.ns.sd + "Receivable_DsFilter",
	paramModel: Dnet.ns.sd + "Receivable_DsParam",
	recordModel: Dnet.ns.sd + "Receivable_Ds"
});

/* ================= FILTER FORM: Filter ================= */			

Ext.define(Dnet.ns.sd + "Receivable_Dc$Filter" , {
	extend: "dnet.core.dc.view.AbstractDcvFilterForm",
	alias: "widget.sd_Receivable_Dc$Filter",

	/**
	 * Components definition
	 */	
	_defineElements_: function() {
		this._getBuilder_()
		
		/* =========== controls =========== */
		.addLov({name:"company", dataIndex:"company", allowBlank:false, xtype:"md_OrgsLegalEntity_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "companyId"} ]})
		.addLov({name:"customer", dataIndex:"customer", xtype:"md_CustomerAccounts_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "customerAccountId"} ],
			filterFieldMapping: [{lovField:"companyId", dsField: "companyId"} ]})
		.addLov({name:"currency", dataIndex:"currency", xtype:"bd_Currencies_Lov", caseRestriction:"uppercase",
			retFieldMapping: [{lovField:"id", dsField: "currencyId"} ]})
		.addLov({name:"invoiceNo", dataIndex:"invoiceNo", xtype:"sd_SalesInvoices_Lov",
			retFieldMapping: [{lovField:"id", dsField: "invoiceId"} ,{lovField:"companyId", dsField: "companyId"} ]})
		.addLov({name:"duePeriod", paramIndex:"duePeriod", xtype:"md_FiscalPeriods_Lov",
			retFieldMapping: [{lovField:"startDate", dsField: "dueDate_From"} ,{lovField:"endDate", dsField: "dueDate_To"} ]})
		.addLov({name:"docPeriod", paramIndex:"docPeriod", xtype:"md_FiscalPeriods_Lov",
			retFieldMapping: [{lovField:"startDate", dsField: "invoiceDate_From"} ,{lovField:"endDate", dsField: "invoiceDate_To"} ]})
		.addNumberField({name:"amountInitial_From", dataIndex:"amountInitial_From", emptyText:"From" })
		.addNumberField({name:"amountInitial_To", dataIndex:"amountInitial_To", emptyText:"To" })
		.addFieldContainer({name: "amountInitial"})
			.addChildrenTo("amountInitial",["amountInitial_From", "amountInitial_To"])
		.addNumberField({name:"amountPayed_From", dataIndex:"amountPayed_From", emptyText:"From" })
		.addNumberField({name:"amountPayed_To", dataIndex:"amountPayed_To", emptyText:"To" })
		.addFieldContainer({name: "amountPayed"})
			.addChildrenTo("amountPayed",["amountPayed_From", "amountPayed_To"])
		.addNumberField({name:"amountDue_From", dataIndex:"amountDue_From", emptyText:"From" })
		.addNumberField({name:"amountDue_To", dataIndex:"amountDue_To", emptyText:"To" })
		.addFieldContainer({name: "amountDue"})
			.addChildrenTo("amountDue",["amountDue_From", "amountDue_To"])
		.addDateField({name:"dueDate_From", dataIndex:"dueDate_From", emptyText:"From" })
		.addDateField({name:"dueDate_To", dataIndex:"dueDate_To", emptyText:"To" })
		.addFieldContainer({name: "dueDate"})
			.addChildrenTo("dueDate",["dueDate_From", "dueDate_To"])
		.addDateField({name:"invoiceDate_From", dataIndex:"invoiceDate_From", emptyText:"From" })
		.addDateField({name:"invoiceDate_To", dataIndex:"invoiceDate_To", emptyText:"To" })
		.addFieldContainer({name: "invoiceDate"})
			.addChildrenTo("invoiceDate",["invoiceDate_From", "invoiceDate_To"])
		
		/* =========== containers =========== */
		.addPanel({ name:"main", autoScroll:true, layout: {type:"hbox", align:'top', pack:'start', defaultMargins: {right:5, left:5}},
		autoScroll:true, padding:"0 30 5 0"})
		.addPanel({ name:"col1", width:250, layout:"form"})
		.addPanel({ name:"col2", width:310, layout:"form"})
		.addPanel({ name:"col3", width:330, layout:"form", defaults:{labelAlign:"right", labelWidth:130}});
	},

	/**
	 * Combine the components
	 */				
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["col1", "col2", "col3"])
		.addChildrenTo("col1", ["company", "customer", "currency", "invoiceNo"])
		.addChildrenTo("col2", ["duePeriod", "dueDate", "docPeriod", "invoiceDate"])
		.addChildrenTo("col3", ["amountInitial", "amountPayed", "amountDue"]);
	}
});

/* ================= GRID: List ================= */

Ext.define(Dnet.ns.sd + "Receivable_Dc$List" , {
	extend: "dnet.core.dc.view.AbstractDcvGrid",
	alias: "widget.sd_Receivable_Dc$List",
	_noImport_: true,

	/**
	 * Columns definition
	 */
	_defineColumns_: function() {
		this._getBuilder_()
		.addTextColumn({ name:"company", dataIndex:"company", width:120})
		.addTextColumn({ name:"companyId", dataIndex:"companyId", hidden:true, width:100})
		.addTextColumn({ name:"customerId", dataIndex:"customerId", hidden:true, width:100})
		.addTextColumn({ name:"customer", dataIndex:"customer", width:120})
		.addTextColumn({ name:"customerName", dataIndex:"customerName", hidden:true, width:200})
		.addTextColumn({ name:"customerAccountId", dataIndex:"customerAccountId", hidden:true, width:100})
		.addDateColumn({ name:"dueDate", dataIndex:"dueDate", _mask_: Masks.DATE})
		.addNumberColumn({ name:"dueInDays", dataIndex:"dueInDays", sortable:false, width:60})
		.addNumberColumn({ name:"amountInitial", dataIndex:"amountInitial", width:120, decimals:6})
		.addNumberColumn({ name:"amountPayed", dataIndex:"amountPayed", width:120, decimals:6})
		.addNumberColumn({ name:"amountDue", dataIndex:"amountDue", width:120, decimals:6})
		.addTextColumn({ name:"currency", dataIndex:"currency", width:60})
		.addTextColumn({ name:"currencyId", dataIndex:"currencyId", hidden:true, width:100})
		.addTextColumn({ name:"invoiceNo", dataIndex:"invoiceNo", width:80})
		.addDateColumn({ name:"invoiceDate", dataIndex:"invoiceDate", _mask_: Masks.DATE})
		.addTextColumn({ name:"invoiceId", dataIndex:"invoiceId", hidden:true, width:80})
		.addDefaults();
	}
});
