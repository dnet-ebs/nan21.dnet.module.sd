/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
	
Ext.define(Dnet.ns.sd + "PaymentIn_Ds", {
	extend: 'Ext.data.Model',
	
	initRecord: function() {
		this.set("companyId", getApplication().getSession().company.id);
		this.set("company", getApplication().getSession().company.code);
		this.set("docDate", new Date());
		this.set("amount", 0);
	},
	
	fields: [
		{name:"docNo", type:"string"},
		{name:"docDate", type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"sourceDocNo", type:"string"},
		{name:"confirmed", type:"boolean"},
		{name:"posted", type:"boolean"},
		{name:"generated", type:"boolean"},
		{name:"docTypeId", type:"string"},
		{name:"docType", type:"string"},
		{name:"currencyId", type:"string"},
		{name:"currency", type:"string"},
		{name:"companyId", type:"string"},
		{name:"company", type:"string"},
		{name:"bpAccountId", type:"string"},
		{name:"bpartnerId", type:"string"},
		{name:"bpartner", type:"string"},
		{name:"bpartnerName", type:"string"},
		{name:"amount", type:"float", useNull:true},
		{name:"amountLoc", type:"float", useNull:true},
		{name:"amountRef", type:"float", useNull:true},
		{name:"xrateLoc", type:"float", useNull:true},
		{name:"xrateRef", type:"float", useNull:true},
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
		{name:"docDate_From",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT},
		{name:"docDate_To",type:"date", dateFormat:Dnet.MODEL_DATE_FORMAT}
	],
	recordModelFqn: Dnet.ns.sd + "PaymentIn_Ds"
});
