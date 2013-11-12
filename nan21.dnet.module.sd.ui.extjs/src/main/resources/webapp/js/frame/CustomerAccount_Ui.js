/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "CustomerAccount_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.CustomerAccount_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("account", Ext.create(Dnet.ns.md + "CustomerAccount_Dc" ,{}))	
		.addDc("order", Ext.create(Dnet.ns.sd + "CustomerAccountCtxOrder_Dc" ,{}))	
		.addDc("invoice", Ext.create(Dnet.ns.sd + "CustomerAccountCtxInvoice_Dc" ,{}))	
		.addDc("receivable", Ext.create(Dnet.ns.sd + "CustomerAccountCtxReceivable_Dc" ,{}))
		.linkDc("order", "account",{fields:[
			{childField:"bpAccountId", parentField:"id"}]}
		).linkDc("invoice", "account",{fields:[
			{childField:"bpAccountId", parentField:"id"}]}
		).linkDc("receivable", "account",{fields:[
			{childField:"customerAccountId", parentField:"id"}]}
		);
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addButton({name:"btnShowBpAccount", disabled:true, handler: this.onBtnShowBpAccount,
				stateManager:{ name:"selected_one", dc:"account" }, scope:this})
		.addButton({name:"btnShowOrder", disabled:true, handler: this.onBtnShowOrder,
				stateManager:{ name:"selected_one", dc:"order" }, scope:this})
		.addButton({name:"btnShowInvoice", disabled:true, handler: this.onBtnShowInvoice,
				stateManager:{ name:"selected_one", dc:"invoice" }, scope:this})
		.addDcFilterFormView("account", {name:"accountFilter", xtype:"md_CustomerAccount_Dc$Filter"})
		.addDcGridView("account", {name:"accountList", xtype:"md_CustomerAccount_Dc$List"})
		.addDcFormView("account", {name:"accountEdit", xtype:"md_CustomerAccount_Dc$Edit"})
		.addDcFilterFormView("order", {name:"orderFilter", _hasTitle_:true, width:300, xtype:"sd_CustomerAccountCtxOrder_Dc$Filter", collapsible:true
		})
		.addDcGridView("order", {name:"orderList", xtype:"sd_CustomerAccountCtxOrder_Dc$List"})
		.addPanel({name:"orderPanel", _hasTitle_:true, layout:"border", defaults:{split:true}})
		.addDcFilterFormView("invoice", {name:"invoiceFilter", _hasTitle_:true, width:300, xtype:"sd_CustomerAccountCtxInvoice_Dc$Filter", collapsible:true
		})
		.addDcGridView("invoice", {name:"invoiceList", xtype:"sd_CustomerAccountCtxInvoice_Dc$List"})
		.addPanel({name:"invoicePanel", _hasTitle_:true, layout:"border", defaults:{split:true}})
		.addDcGridView("receivable", {name:"receivableList", _hasTitle_:true, xtype:"sd_CustomerAccountCtxReceivable_Dc$List"})
		.addPanel({name:"main", layout:"card", activeItem:0})
		.addPanel({name:"canvas1", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"canvas2", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"accountDetailsTab", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("orderPanel", ["orderFilter", "orderList"], ["west", "center"])
		.addChildrenTo("invoicePanel", ["invoiceFilter", "invoiceList"], ["west", "center"])
		.addChildrenTo("main", ["canvas1", "canvas2"])
		.addChildrenTo("canvas1", ["accountFilter", "accountList"], ["north", "center"])
		.addChildrenTo("canvas2", ["accountEdit", "accountDetailsTab"], ["north", "center"])
		.addChildrenTo("accountDetailsTab", ["orderPanel", "invoicePanel", "receivableList"])
		.addToolbarTo("canvas1", "tlbAccountList")
		.addToolbarTo("canvas2", "tlbAccountEdit")
		.addToolbarTo("orderList", "tlbOrderList")
		.addToolbarTo("invoiceList", "tlbInvoiceList")
		.addToolbarTo("receivableList", "tlbReceivablesList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbAccountList", {dc: "account"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addEdit({inContainer:"main",showView:"canvas2"})
			.addReports()
		.end()
		.beginToolbar("tlbAccountEdit", {dc: "account"})
			.addTitle().addSeparator().addSeparator()
			.addBack({inContainer:"main",showView:"canvas1"}).addSave().addCancel().addPrevRec().addNextRec()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowBpAccount") ])
			.addReports()
		.end()
		.beginToolbar("tlbOrderList", {dc: "order"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowOrder") ])
			.addReports()
		.end()
		.beginToolbar("tlbInvoiceList", {dc: "invoice"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowInvoice") ])
			.addReports()
		.end()
		.beginToolbar("tlbReceivablesList", {dc: "receivable"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addReports()
		.end();
	}

	
	/**
	 * On-Click handler for button btnShowBpAccount
	 */
	,onBtnShowBpAccount: function() {
		var bundle = Dnet.bundle.md;
		var frame = "BpAccount_Ui";
		getApplication().showFrame(frame,{
			url:Dnet.buildUiPath(bundle, frame, false),
			params: {
				companyId: this._getDc_("account").getRecord().get("companyId"),
				company: this._getDc_("account").getRecord().get("company"),
				bpartnerId: this._getDc_("account").getRecord().get("bpartnerId"),
				bpartner: this._getDc_("account").getRecord().get("bpartner")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
	
	/**
	 * On-Click handler for button btnShowOrder
	 */
	,onBtnShowOrder: function() {
		var bundle = Dnet.bundle.sd;
		var frame = "SalesOrder_Ui";
		getApplication().showFrame(frame,{
			url:Dnet.buildUiPath(bundle, frame, false),
			params: {
				companyId: this._getDc_("order").getRecord().get("companyId"),
				company: this._getDc_("order").getRecord().get("company"),
				id: this._getDc_("order").getRecord().get("id"),
				docNo: this._getDc_("order").getRecord().get("docNo")
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
				companyId: this._getDc_("invoice").getRecord().get("companyId"),
				company: this._getDc_("invoice").getRecord().get("company"),
				id: this._getDc_("invoice").getRecord().get("id"),
				docNo: this._getDc_("invoice").getRecord().get("docNo")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
	
	,_when_called_to_edit_: function(params) {
		
		var account = this._getDc_("account");
		if (account.isDirty()) {
			this._alert_dirty_();
			return;
		}
		account.doClearQuery();
		 
		account.setFilterValue("companyId", params.companyId);
		account.setFilterValue("company", params.company );
		account.setFilterValue("bpartnerId", params.bpartnerId );
		account.setFilterValue("bpartner", params.bpartner );
		account.doQuery();
	}
});
