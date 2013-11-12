/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "PaymentIn_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.PaymentIn_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("payment", Ext.create(Dnet.ns.sd + "PaymentIn_Dc" ,{}))	
		.addDc("amount", Ext.create(Dnet.ns.sd + "PaymentInAmountCtx_Dc" ,{}))	
		.addDc("proposal", Ext.create(Dnet.ns.sd + "PaymentInAmountProposal_Dc" ,{multiEdit:true}))	
		.addDc("line", Ext.create(Dnet.ns.sd + "PaymentInLine_Dc" ,{multiEdit:true}))
		.linkDc("amount", "payment",{fields:[
			{childField:"paymentId", parentField:"id"}]}
		).linkDc("proposal", "payment",{fields:[
			{childField:"bpAccountId", parentField:"customerAccountId"}]}
		).linkDc("line", "payment",{fields:[
			{childField:"paymentId", parentField:"id"}]}
		);
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addButton({name:"btnConfirm", iconCls:"icon-action-commit", disabled:true, handler: this.onBtnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"payment" , and: function(dc) {return (dc.record && !dc.record.get("confirmed"));}}, scope:this})
		.addButton({name:"btnUnConfirm", iconCls:"icon-action-rollback", disabled:true, handler: this.onBtnUnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"payment" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && !dc.record.get("posted")  );}}, scope:this})
		.addButton({name:"btnCreateContinue", disabled:true, handler: this.onBtnCreateContinue,
				stateManager:{ name:"record_is_dirty", dc:"payment" , and: function(dc) {return (dc.record.isValid());}}, scope:this})
		.addButton({name:"btnCreateCancel", disabled:false, handler: this.onBtnCreateCancel, scope:this})
		.addButton({name:"btnPayAmounts", iconCls:"icon-action-commit", disabled:true, handler: this.onBtnPayAmounts,
				stateManager:{ name:"selected_one_clean", dc:"payment" , and: function(dc) {return (dc.record && !dc.record.get("confirmed") && dc.record.get("usage")== "amounts" );}}, scope:this})
		.addButton({name:"btnShowBpAccount", disabled:true, handler: this.onBtnShowBpAccount,
				stateManager:{ name:"selected_one", dc:"payment" }, scope:this})
		.addButton({name:"btnShowInvoice", disabled:true, handler: this.onBtnShowInvoice,
				stateManager:{ name:"selected_one", dc:"amount" , and: function(dc) {return (dc.record.get("invoiceId"));}}, scope:this})
		.addDcFilterFormView("payment", {name:"paymentFilter", xtype:"sd_PaymentIn_Dc$Filter"})
		.addDcGridView("payment", {name:"paymentList", xtype:"sd_PaymentIn_Dc$List"})
		.addDcFormView("payment", {name:"paymentEdit", xtype:"sd_PaymentIn_Dc$Edit"})
		.addDcFormView("payment", {name:"paymentCreate", xtype:"sd_PaymentIn_Dc$Create"})
		.addDcGridView("amount", {name:"amountList", _hasTitle_:true, xtype:"sd_PaymentInAmountCtx_Dc$List"})
		.addDcEditGridView("line", {name:"lineList", _hasTitle_:true, xtype:"sd_PaymentInLine_Dc$CtxList", frame:true})
		.addDcFilterFormView("proposal", {name:"proposalFilter", xtype:"sd_PaymentInAmountProposal_Dc$Filter"})
		.addDcEditGridView("proposal", {name:"proposalEditList", xtype:"sd_PaymentInAmountProposal_Dc$EditList", frame:true})
		.addPanel({name:"proposalPanel", width:950, height:450, layout:"border", defaults:{split:true}})
		.addWindow({name:"wdwCreate", _hasTitle_:true, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("paymentCreate")], closable:false
			, 
					dockedItems:[{xtype:"toolbar", ui:"footer", dock:'bottom', weight:-1,
						items:[ this._elems_.get("btnCreateContinue"), this._elems_.get("btnCreateCancel")]}]})
		.addWindow({name:"wdwProposal", _hasTitle_:true, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("proposalPanel")]})
		.addPanel({name:"main", layout:"card", activeItem:0})
		.addPanel({name:"canvas1", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"canvas2", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"detailsTab", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("proposalPanel", ["proposalFilter", "proposalEditList"], ["north", "center"])
		.addChildrenTo("main", ["canvas1", "canvas2"])
		.addChildrenTo("canvas1", ["paymentFilter", "paymentList"], ["north", "center"])
		.addChildrenTo("canvas2", ["paymentEdit", "detailsTab"], ["north", "center"])
		.addChildrenTo("detailsTab", ["amountList", "lineList"])
		.addToolbarTo("canvas1", "tlbPaymentList")
		.addToolbarTo("canvas2", "tlbPaymentEdit")
		.addToolbarTo("amountList", "tlbAmountList")
		.addToolbarTo("proposalPanel", "tlbProposalFilter")
		.addToolbarTo("lineList", "tlbLineList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbPaymentList", {dc: "payment"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addEdit().addNew().addCopy().addDeleteSelected()
			.addReports()
		.end()
		.beginToolbar("tlbPaymentEdit", {dc: "payment"})
			.addTitle().addSeparator().addSeparator()
			.addBack().addSave().addNew().addCopy().addCancel().addPrevRec().addNextRec()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowBpAccount") ,this._elems_.get("btnPayAmounts") ,this._elems_.get("btnConfirm") ,this._elems_.get("btnUnConfirm") ])
			.addReports()
		.end()
		.beginToolbar("tlbAmountList", {dc: "amount"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowInvoice") ])
			.addReports()
		.end()
		.beginToolbar("tlbProposalFilter", {dc: "proposal"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addSave().addCancel()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbLineList", {dc: "line"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addSave().addNew().addCopy().addDeleteSelected().addCancel()
			.addSeparator().addAutoLoad()
			.addReports()
		.end();
	}

	
	/**
	 * On-Click handler for button btnConfirm
	 */
	,onBtnConfirm: function() {
		var o={
			name:"confirm",
			modal:true
		};
		this._getDc_("payment").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnUnConfirm
	 */
	,onBtnUnConfirm: function() {
		var o={
			name:"unConfirm",
			modal:true
		};
		this._getDc_("payment").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnCreateContinue
	 */
	,onBtnCreateContinue: function() {
		this._getWindow_("wdwCreate").close();
	}
	
	/**
	 * On-Click handler for button btnCreateCancel
	 */
	,onBtnCreateCancel: function() {
		this._getWindow_("wdwCreate").close();
		this._getDc_("payment").doCancel();
	}
	
	/**
	 * On-Click handler for button btnPayAmounts
	 */
	,onBtnPayAmounts: function() {
		this.openProposalWdw();
		this._getWindow_("wdwProposal").show();
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
				company: this._getDc_("payment").getRecord().get("company"),
				companyId: this._getDc_("payment").getRecord().get("companyId"),
				bpartner: this._getDc_("payment").getRecord().get("customer"),
				bpartnerId: this._getDc_("payment").getRecord().get("customerId")
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
				companyId: this._getDc_("payment").getRecord().get("companyId"),
				company: this._getDc_("payment").getRecord().get("company"),
				id: this._getDc_("amount").getRecord().get("invoiceId"),
				docNo: this._getDc_("amount").getRecord().get("invoice")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
	
	,_whenCreateNewDoc_: function() {	
		this._getWindow_("wdwCreate").show();
	}
	
	,_afterDefineDcs_: function() {
		
		this._getDc_("payment").on("afterDoNew", this._whenCreateNewDoc_, this);
		this._getDc_("payment").on("recordChange", this._syncReadOnlyStates_, this );
		this._getDc_("payment").on("afterDoServiceSuccess", 
			function() { this._applyStateAllButtons_(); this._syncReadOnlyStates_();} , this );	
		this._getDc_("proposal").on("afterDoCommitSuccess", 
			function() {this._getWindow_("wdwProposal").close(); this._getDc_("amount").doQuery();}, this );
		this._getDc_("payment").on("recordChange", this._detailsState_, this);
		this._getDc_("payment").on("statusChange", this._detailsState_, this);
	}
	
	,_detailsState_: function() {
		
		var r = this._getDc_("payment").getRecord();
		if (r) {
			if ( r.get("usage") == "amounts" || r.get("usage") == "invoice" ){
				this._get_("amountList").enable();
				this._get_("lineList").disable();
			}  else if ( r.get("usage") == "items" ) { 
				this._get_("amountList").disable();
				this._get_("lineList").enable();
			} else {
				this._get_("amountList").disable();
				this._get_("lineList").disable();
			}
		}
	}
	
	,_syncReadOnlyStates_: function() {
		
		var rec = this._getDc_("payment").getRecord();
		if (!rec) { return; }
		var lineDc = this._getDc_("line");
		if (rec.get("confirmed")) {
			if (!lineDc.isReadOnly()) {
				lineDc.setReadOnly(true);
			}
		} else {
			if (lineDc.isReadOnly()) {
				lineDc.setReadOnly(false);
			}
		}
	}
	
	,openProposalWdw: function() {
		  
		var paymentRec = this._getDc_("payment").getRecord();
		var proposalDc = this._getDc_("proposal");
		
		proposalDc.setParamValue("paymentId", paymentRec.get("id") );
		proposalDc.setParamValue("businessPartner", paymentRec.get("customer") );
		proposalDc.setParamValue("receivedAmount", paymentRec.get("amount"));
		proposalDc.setParamValue("unAllocatedAmount", 0);
		
		proposalDc.setFilterValue("currencyId", paymentRec.get("currencyId"));
		proposalDc.setParamValue("paymentCurrency", paymentRec.get("currency"));
		proposalDc.doCancel();
		proposalDc.doQuery();
	}
});
