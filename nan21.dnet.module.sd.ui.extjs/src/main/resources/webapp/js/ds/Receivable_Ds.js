/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
	
Ext.define(Dnet.ns.sd + "Receivable_Ds", {
	extend: 'Ext.data.Model',
	
	fields: [
		{name:"dueDate", type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"dueInDays", type:"int", useNull:true},
		{name:"amountInitial", type:"float", useNull:true},
		{name:"amountPayed", type:"float", useNull:true},
		{name:"amountDue", type:"float", useNull:true},
		{name:"companyId", type:"string"},
		{name:"company", type:"string"},
		{name:"customerAccountId", type:"string"},
		{name:"customerId", type:"string"},
		{name:"customer", type:"string"},
		{name:"customerName", type:"string"},
		{name:"currencyId", type:"string"},
		{name:"currency", type:"string"},
		{name:"invoiceId", type:"string"},
		{name:"invoiceNo", type:"string"},
		{name:"invoiceDate", type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"id", type:"string"},
		{name:"clientId", type:"string"},
		{name:"createdAt", type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"modifiedAt", type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"createdBy", type:"string"},
		{name:"modifiedBy", type:"string"},
		{name:"notes", type:"string"},
		{name:"active", type:"boolean"},
		{name:"version", type:"int", useNull:true},
		{name:"refid", type:"string"},
		{name:"entityAlias", type:"string"},
		{name:"entityFqn", type:"string"}
	]
});

Dnet.createFilterModelFromRecordModel({
	initFilter: function() {
		this.set("companyId", getApplication().getSession().company.id);
		this.set("company", getApplication().getSession().company.code);
	},
	fields: [
		{name:"dueDate_From",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"dueDate_To",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"amountInitial_From",type:"float", useNull:true},
		{name:"amountInitial_To",type:"float", useNull:true},
		{name:"amountPayed_From",type:"float", useNull:true},
		{name:"amountPayed_To",type:"float", useNull:true},
		{name:"amountDue_From",type:"float", useNull:true},
		{name:"amountDue_To",type:"float", useNull:true},
		{name:"invoiceDate_From",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"invoiceDate_To",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT}
	],
	recordModelFqn: Dnet.ns.sd + "Receivable_Ds"
});

Ext.define(Dnet.ns.sd + "Receivable_DsParam", {
	extend: 'Ext.data.Model',
	
	fields: [
		{name:"docPeriod", type:"string", forFilter:true},
		{name:"duePeriod", type:"string", forFilter:true}
	]
});
