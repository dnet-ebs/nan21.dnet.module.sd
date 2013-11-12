/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "PaymentsIn_Lov" , {
	extend: "dnet.core.lov.AbstractCombo",
	alias: "widget.sd_PaymentsIn_Lov",
	displayField: "docNo",
	listConfig: {
		getInnerTpl: function() {
			return '<span>{docNo}, {[ Ext.util.Format.date(values.docDate,Dnet.DATE_FORMAT)  ]}, {bpartnerName}</span>';
		},
		width:400, maxHeight:250
	},
	_editDialog_: {
		name: "PaymentIn_Ui",
		bundle: Dnet.bundle.sd
	},
	recordModel: Dnet.ns.sd + "PaymentInLov_Ds"
});
