/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesOrderTax_Dc" , {
	extend: "dnet.core.dc.AbstractDc",
	recordModel: Dnet.ns.sd + "SalesOrderTax_Ds"
});

/* ================= GRID: List ================= */

Ext.define(Dnet.ns.sd + "SalesOrderTax_Dc$List" , {
	extend: "dnet.core.dc.view.AbstractDcvGrid",
	alias: "widget.sd_SalesOrderTax_Dc$List",

	/**
	 * Columns definition
	 */
	_defineColumns_: function() {
		this._getBuilder_()
		.addTextColumn({ name:"tax", dataIndex:"tax", width:200})
		.addTextColumn({ name:"taxId", dataIndex:"taxId", hidden:true, width:100})
		.addNumberColumn({ name:"baseAmount", dataIndex:"baseAmount", decimals:6})
		.addNumberColumn({ name:"taxAmount", dataIndex:"taxAmount", decimals:6})
		.addTextColumn({ name:"orderId", dataIndex:"orderId", hidden:true, width:100})
		.addDefaults();
	}
});
