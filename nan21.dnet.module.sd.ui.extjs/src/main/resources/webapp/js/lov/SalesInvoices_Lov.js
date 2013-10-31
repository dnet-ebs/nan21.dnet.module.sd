/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesInvoices_Lov" , {
	extend: "dnet.core.lov.AbstractCombo",
	alias: "widget.sd_SalesInvoices_Lov",
	displayField: "docNo",
	listConfig: {
		getInnerTpl: function() {
			return '<span>{docNo}, {[ Ext.util.Format.date(values.docDate,Dnet.DATE_FORMAT)  ]}, {bpartnerName}</span>';
		},
		width:400, maxHeight:350
	},
	_editDialog_: {
		name: "SalesInvoice_Ui",
		bundle: Dnet.bundle.sd
	},
	recordModel: Dnet.ns.sd + "SalesInvoiceLov_Ds"
});
