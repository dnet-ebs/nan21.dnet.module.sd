/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "Receivable_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.Receivable_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("receivable", Ext.create(Dnet.ns.sd + "Receivable_Dc" ,{}))
		;
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addButton({name:"btnShowBpAccount", disabled:true, handler: this.onBtnShowBpAccount,
				stateManager:{ name:"selected_one", dc:"receivable" }, scope:this})
		.addButton({name:"btnShowInvoice", disabled:true, handler: this.onBtnShowInvoice,
				stateManager:{ name:"selected_one", dc:"receivable" , and: function(dc) {return (dc.record.get("invoiceId"));}}, scope:this})
		.addDcFilterFormView("receivable", {name:"filter", xtype:"sd_Receivable_Dc$Filter"})
		.addDcGridView("receivable", {name:"list", xtype:"sd_Receivable_Dc$List"})
		.addPanel({name:"main", layout:"border", defaults:{split:true}});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["filter", "list"], ["north", "center"])
		.addToolbarTo("main", "tlbReceivableList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbReceivableList", {dc: "receivable"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowBpAccount") ,this._elems_.get("btnShowInvoice") ])
			.addReports()
		.end();
	}

	
	/**
	 * On-Click handler for button btnShowBpAccount
	 */
	,onBtnShowBpAccount: function() {
		var bundle = Dnet.bundle.sd;
		var frame = "CustomerAccount_Ui";
		getApplication().showFrame(frame,{
			url:Dnet.buildUiPath(bundle, frame, false),
			params: {
				company: this._getDc_("receivable").getRecord().get("company"),
				companyId: this._getDc_("receivable").getRecord().get("companyId"),
				bpartner: this._getDc_("receivable").getRecord().get("customer"),
				bpartnerId: this._getDc_("receivable").getRecord().get("customerId")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
	
	/**
	 * On-Click handler for button btnShowInvoice
	 */
	,onBtnShowInvoice: function() {
		var bundle = Dnet.bundle.sd;
		var frame = "SalesInvoice_Ui";
		getApplication().showFrame(frame,{
			url:Dnet.buildUiPath(bundle, frame, false),
			params: {
				companyId: this._getDc_("receivable").getRecord().get("companyId"),
				company: this._getDc_("receivable").getRecord().get("company"),
				id: this._getDc_("receivable").getRecord().get("invoiceId"),
				docNo: this._getDc_("receivable").getRecord().get("invoiceNo")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
});
