/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesOrder_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.SalesOrder_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("ord", Ext.create(Dnet.ns.sd + "SalesOrder_Dc" ,{}))	
		.addDc("tax", Ext.create(Dnet.ns.sd + "SalesOrderTax_Dc" ,{}))	
		.addDc("line", Ext.create(Dnet.ns.sd + "SalesOrderLine_Dc" ,{}))	
		.addDc("lineTax", Ext.create(Dnet.ns.sd + "SalesOrderLineTax_Dc" ,{}))	
		.addDc("info", Ext.create(Dnet.ns.sd + "SalesOrderInfo_Dc" ,{}))	
		.addDc("atch", Ext.create(Dnet.ns.bd + "Attachment_Dc" ,{}))
		.linkDc("tax", "ord",{fields:[
			{childField:"orderId", parentField:"id"}]}
		).linkDc("line", "ord",{fields:[
			{childField:"orderId", parentField:"id"}, {childField:"companyId", parentField:"companyId"}]}
		).linkDc("lineTax", "line",{fields:[
			{childField:"lineId", parentField:"id"}]}
		).linkDc("info", "ord",{fetchMode:"auto",fields:[
			{childField:"id", parentField:"id"}]}
		).linkDc("atch", "ord",{fields:[
			{childField:"targetRefid", parentField:"refid"}, {childField:"targetAlias", parentField:"entityAlias"}, {childField:"targetType", value:"N/A"}]}
		);
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addButton({name:"btnShowBpAccount", disabled:true, handler: this.onBtnShowBpAccount,
				stateManager:{ name:"selected_one", dc:"ord" }, scope:this})
		.addButton({name:"btnConfirm", iconCls:"icon-action-commit", disabled:true, handler: this.onBtnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"ord" , and: function(dc) {return (dc.record && !dc.record.get("confirmed"));}}, scope:this})
		.addButton({name:"btnUnConfirm", iconCls:"icon-action-rollback", disabled:true, handler: this.onBtnUnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"ord" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && !dc.record.get("invoiced")  );}}, scope:this})
		.addButton({name:"btnShowCopyLines", disabled:true, handler: this.onBtnShowCopyLines,
				stateManager:{ name:"record_is_clean", dc:"ord" , and: function(dc) {return (dc.record && !dc.record.get("confirmed"));}}, scope:this})
		.addButton({name:"btnDoCopyLines", disabled:false, handler: this.onBtnDoCopyLines, scope:this})
		.addButton({name:"btnCreateContinue", disabled:true, handler: this.onBtnCreateContinue,
				stateManager:{ name:"record_is_dirty", dc:"ord" , and: function(dc) {return (dc.record.isValid());}}, scope:this})
		.addButton({name:"btnCreateCancel", disabled:false, handler: this.onBtnCreateCancel, scope:this})
		.addButton({name:"btnCreateInvoice", disabled:true, handler: this.onBtnCreateInvoice,
				stateManager:{ name:"selected_one_clean", dc:"ord" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && ! dc.record.get("invoiced"));}}, scope:this})
		.addButton({name:"btnCreateInvoiceOk", disabled:false, handler: this.onBtnCreateInvoiceOk, scope:this})
		.addButton({name:"btnShowInvoice", disabled:true, handler: this.onBtnShowInvoice,
				stateManager:{ name:"selected_one", dc:"ord" , and: function(dc) {return (dc.record.get("invoiced")===true);}}, scope:this})
		.addDcFilterFormView("ord", {name:"ordFilter", xtype:"sd_SalesOrder_Dc$Filter"})
		.addDcGridView("ord", {name:"ordList", xtype:"sd_SalesOrder_Dc$List"})
		.addDcFormView("ord", {name:"ordCreate", xtype:"sd_SalesOrder_Dc$Create", _acquireFocusUpdate_: false})
		.addDcFormView("ord", {name:"ordEditMain", xtype:"sd_SalesOrder_Dc$Edit", _acquireFocusInsert_: false})
		.addDcFormView("info", {name:"infoEdit", _hasTitle_:true, xtype:"sd_SalesOrderInfo_Dc$Edit"})
		.addDcFormView("ord", {name:"copyLinesForm", width:400, xtype:"sd_SalesOrder_Dc$CopyLinesForm"})
		.addDcFormView("ord", {name:"genInvoiceForm", xtype:"sd_SalesOrder_Dc$FrmGenInvoice"})
		.addWindow({name:"wdwCopyLines", _hasTitle_:true, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("copyLinesForm")], 
					dockedItems:[{xtype:"toolbar", ui:"footer", dock:'bottom', weight:-1,
						items:[ this._elems_.get("btnDoCopyLines")]}]})
		.addDcGridView("tax", {name:"taxList", _hasTitle_:true, xtype:"sd_SalesOrderTax_Dc$List"})
		.addDcFilterFormView("line", {name:"lineFilter", _hasTitle_:true, width:250, xtype:"sd_SalesOrderLine_Dc$FilterCtx", collapsible:true, collapsed:true
		})
		.addDcGridView("line", {name:"lineList", xtype:"sd_SalesOrderLine_Dc$CtxList"})
		.addDcFormView("line", {name:"lineEdit", xtype:"sd_SalesOrderLine_Dc$EditForm"})
		.addDcGridView("lineTax", {name:"lineTaxList", _hasTitle_:true, width:400, xtype:"sd_SalesOrderLineTax_Dc$CtxList", collapsible:true, collapsed:true
		})
		.addDcGridView("atch", {name:"atchList", _hasTitle_:true, xtype:"bd_Attachment_Dc$List"})
		.addWindow({name:"wdwCreate", _hasTitle_:true, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("ordCreate")], closable:false
			, 
					dockedItems:[{xtype:"toolbar", ui:"footer", dock:'bottom', weight:-1,
						items:[ this._elems_.get("btnCreateContinue"), this._elems_.get("btnCreateCancel")]}]})
		.addWindow({name:"wdwGenInvoice", _hasTitle_:true, width:400, height:120, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("genInvoiceForm")], 
					dockedItems:[{xtype:"toolbar", ui:"footer", dock:'bottom', weight:-1,
						items:[ this._elems_.get("btnCreateInvoiceOk")]}]})
		.addPanel({name:"main", layout:"card", activeItem:0})
		.addPanel({name:"canvas1", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"canvas2", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"ordDetailsTab", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false})
		.addPanel({name:"linesPanel", _hasTitle_:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"linesDataPanel", layout:"card", activeItem:0});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["canvas1", "canvas2"])
		.addChildrenTo("canvas1", ["ordFilter", "ordList"], ["north", "center"])
		.addChildrenTo("canvas2", ["ordEditMain", "ordDetailsTab"], ["north", "center"])
		.addChildrenTo("ordDetailsTab", ["infoEdit", "linesPanel", "taxList", "atchList"])
		.addChildrenTo("linesPanel", ["lineFilter", "linesDataPanel", "lineTaxList"], ["west", "center", "east"])
		.addChildrenTo("linesDataPanel", ["lineList", "lineEdit"])
		.addToolbarTo("canvas1", "tlbOrdList")
		.addToolbarTo("canvas2", "tlbOrdEdit")
		.addToolbarTo("infoEdit", "tlbInfoEdit")
		.addToolbarTo("taxList", "tlbTaxList")
		.addToolbarTo("lineList", "tlbLineList")
		.addToolbarTo("lineEdit", "tlbLineEdit")
		.addToolbarTo("lineTaxList", "tlbLineTaxList")
		.addToolbarTo("atchList", "tlbAtchList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbOrdList", {dc: "ord"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addEdit().addNew().addCopy().addDeleteSelected()
			.addReports()
		.end()
		.beginToolbar("tlbOrdEdit", {dc: "ord"})
			.addTitle().addSeparator().addSeparator()
			.addBack().addSave().addNew().addCopy().addCancel().addPrevRec().addNextRec()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnShowBpAccount") ,this._elems_.get("btnShowCopyLines") ,this._elems_.get("btnConfirm") ,this._elems_.get("btnUnConfirm") ,this._elems_.get("btnCreateInvoice") ,this._elems_.get("btnShowInvoice") ])
			.addReports()
		.end()
		.beginToolbar("tlbInfoEdit", {dc: "info"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addSave().addCancel()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbTaxList", {dc: "tax"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbLineList", {dc: "line"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addEdit({inContainer:"linesDataPanel",showView:"lineEdit"}
			).addNew().addCopy().addDeleteSelected()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbLineEdit", {dc: "line"})
			.addTitle().addSeparator().addSeparator()
			.addBack({inContainer:"linesDataPanel",showView:"lineList"}
			).addSave().addNew().addCopy().addCancel().addPrevRec().addNextRec()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbLineTaxList", {dc: "lineTax"})
			.addTitle().addSeparator().addSeparator()
			.addQuery()
			.addSeparator().addAutoLoad()
			.addReports()
		.end()
		.beginToolbar("tlbAtchList", {dc: "atch"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addNew().addDeleteSelected()
			.addSeparator().addAutoLoad()
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
				company: this._getDc_("ord").getRecord().get("company"),
				companyId: this._getDc_("ord").getRecord().get("companyId"),
				bpartner: this._getDc_("ord").getRecord().get("bpartner"),
				bpartnerId: this._getDc_("ord").getRecord().get("bpartnerId")
			},
			callback: function (params) {
				this._when_called_to_edit_(params);
			}
		});
	}
	
	/**
	 * On-Click handler for button btnConfirm
	 */
	,onBtnConfirm: function() {
		var o={
			name:"confirm",
			modal:true
		};
		this._getDc_("ord").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnUnConfirm
	 */
	,onBtnUnConfirm: function() {
		var o={
			name:"unConfirm",
			modal:true
		};
		this._getDc_("ord").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnShowCopyLines
	 */
	,onBtnShowCopyLines: function() {
		this._getWindow_("wdwCopyLines").show();
	}
	
	/**
	 * On-Click handler for button btnDoCopyLines
	 */
	,onBtnDoCopyLines: function() {
		var successFn = function(dc,response,serviceName,specs) {
			this._getDc_("line").doQuery();
			this._getDc_("ord").doReloadRecord();
			this._getWindow_("wdwCopyLines").close();
		};
		var failureFn = function(dc,response,serviceName,specs) {
			this._getWindow_("wdwCopyLines").close();
		}; 
		var o={
			name:"copyLines",
			callbacks:{
				successFn: successFn,
				successScope: this,
				failureFn: failureFn,
				failureScope: this
			},
			modal:true
		};
		this._getDc_("ord").doRpcData(o);
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
		this._getDc_("ord").doCancel();
	}
	
	/**
	 * On-Click handler for button btnCreateInvoice
	 */
	,onBtnCreateInvoice: function() {
		this._getWindow_("wdwGenInvoice").show();
	}
	
	/**
	 * On-Click handler for button btnCreateInvoiceOk
	 */
	,onBtnCreateInvoiceOk: function() {
		var successFn = function(dc,response,serviceName,specs) {
			this._getWindow_("wdwGenInvoice").close();
		};
		var o={
			name:"generateInvoice",
			callbacks:{
				successFn: successFn,
				successScope: this
			},
			modal:true
		};
		this._getDc_("ord").doRpcData(o);
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
				companyId: this._getDc_("ord").getRecord().get("companyId"),
				company: this._getDc_("ord").getRecord().get("company"),
				salesOrderId: this._getDc_("ord").getRecord().get("id"),
				salesOrder: this._getDc_("ord").getRecord().get("docNo")
			},
			callback: function (params) {
				this._when_called_to_edit_by_so_(params);
			}
		});
	}
	
	,_whenCreateNewDoc_: function() {	
		this._getWindow_("wdwCreate").show();
	}
	
	,_afterDefineDcs_: function() {
		
		this._getDc_("ord").on("afterDoNew", this._whenCreateNewDoc_, this);
		this._getDc_("ord").on("recordChange", this._syncReadOnlyStates_, this );
		this._getDc_("ord").on("afterDoServiceSuccess", 
			function() { this._applyStateAllButtons_(); this._syncReadOnlyStates_();} , this );
		this._getDc_("line").on("afterDoCommitSuccess", 
				function() {
					this._getDc_("ord").doReloadRecord();
				} , this );
	}
	
	,_syncReadOnlyStates_: function() {
		
							var rec = this._getDc_("ord").getRecord();
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
	
	,_when_called_to_edit_: function(params) {
		
		var ord = this._getDc_("ord");
		if (ord.isDirty()) {
			this._alert_dirty_();
			return;
		}
		ord.doClearQuery();
		 
		ord.setFilterValue("id", params.id );
		ord.setFilterValue("docNo", params.docNo );
		ord.setFilterValue("companyId", params.companyId );
		ord.setFilterValue("company", params.company );
		ord.doQuery();
		this._showStackedViewElement_("main",1);
	}
});
