/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
	
Ext.define(Dnet.ns.sd + "SalesInvoiceInfo_Ds", {
	extend: 'Ext.data.Model',
	
	fields: [
		{name:"confirmed", type:"boolean"},
		{name:"posted", type:"boolean"},
		{name:"bpartnerId", type:"string"},
		{name:"bpartnerRefid", type:"string"},
		{name:"billToLocationId", type:"string"},
		{name:"billToLocationRefId", type:"string"},
		{name:"billToLocation", type:"string"},
		{name:"billToContactId", type:"string"},
		{name:"billToContact", type:"string"},
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
