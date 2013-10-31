/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
Ext.define(Dnet.ns.sd + "SalesInvoice_Ui" , {
	extend: "dnet.core.ui.AbstractUi",
	alias: "widget.SalesInvoice_Ui",
	
	/**
	 * Data-controls definition
	 */
	_defineDcs_: function() {
		this._getBuilder_()	
		.addDc("inv", Ext.create(Dnet.ns.sd + "SalesInvoice_Dc" ,{}))	
		.addDc("tax", Ext.create(Dnet.ns.sd + "SalesInvoiceTax_Dc" ,{}))	
		.addDc("line", Ext.create(Dnet.ns.sd + "SalesInvoiceLine_Dc" ,{}))	
		.addDc("lineTax", Ext.create(Dnet.ns.sd + "SalesInvoiceLineTax_Dc" ,{}))	
		.addDc("info", Ext.create(Dnet.ns.sd + "SalesInvoiceInfo_Dc" ,{}))
		.linkDc("tax", "inv",{fields:[
			{childField:"invoiceId", parentField:"id"}]}
		).linkDc("line", "inv",{fields:[
			{childField:"invoiceId", parentField:"id"}, {childField:"companyId", parentField:"companyId"}]}
		).linkDc("lineTax", "line",{fields:[
			{childField:"lineId", parentField:"id"}]}
		).linkDc("info", "inv",{fetchMode:"auto",fields:[
			{childField:"id", parentField:"id"}]}
		);
	},

	/**
	 * Components definition
	 */
	_defineElements_: function() {
		this._getBuilder_()
		.addButton({name:"btnConfirm", iconCls:"icon-action-commit", disabled:true, handler: this.onBtnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"inv" , and: function(dc) {return (dc.record && !dc.record.get("confirmed"));}}, scope:this})
		.addButton({name:"btnUnConfirm", iconCls:"icon-action-rollback", disabled:true, handler: this.onBtnUnConfirm,
				stateManager:{ name:"selected_one_clean", dc:"inv" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && !dc.record.get("posted")  );}}, scope:this})
		.addButton({name:"btnPost", iconCls:"icon-action-commit", disabled:true, handler: this.onBtnPost,
				stateManager:{ name:"selected_one_clean", dc:"inv" , and: function(dc) {return (dc.record && dc.record.get("confirmed")&& !dc.record.get("posted"));}}, scope:this})
		.addButton({name:"btnUnPost", iconCls:"icon-action-rollback", disabled:true, handler: this.onBtnUnPost,
				stateManager:{ name:"selected_one_clean", dc:"inv" , and: function(dc) {return (dc.record && dc.record.get("confirmed") &&  dc.record.get("confirmed") && dc.record.get("posted") );}}, scope:this})
		.addButton({name:"btnCreateContinue", disabled:true, handler: this.onBtnCreateContinue,
				stateManager:{ name:"record_is_dirty", dc:"inv" , and: function(dc) {return (dc.record.isValid());}}, scope:this})
		.addButton({name:"btnCreateCancel", disabled:false, handler: this.onBtnCreateCancel, scope:this})
		.addDcFilterFormView("inv", {name:"invFilter", xtype:"sd_SalesInvoice_Dc$Filter"})
		.addDcGridView("inv", {name:"invList", xtype:"sd_SalesInvoice_Dc$List"})
		.addDcFormView("inv", {name:"invCreate", xtype:"sd_SalesInvoice_Dc$Create"})
		.addDcFormView("inv", {name:"invEditMain", xtype:"sd_SalesInvoice_Dc$Edit"})
		.addDcFormView("info", {name:"infoEdit", _hasTitle_:true, xtype:"sd_SalesInvoiceInfo_Dc$Edit"})
		.addDcGridView("tax", {name:"taxList", _hasTitle_:true, xtype:"sd_SalesInvoiceTax_Dc$List"})
		.addDcFilterFormView("line", {name:"lineFilter", _hasTitle_:true, width:250, xtype:"sd_SalesInvoiceLine_Dc$FilterCtx", collapsible:true, collapsed:true
		})
		.addDcGridView("line", {name:"lineList", xtype:"sd_SalesInvoiceLine_Dc$CtxList"})
		.addDcFormView("line", {name:"lineEdit", xtype:"sd_SalesInvoiceLine_Dc$EditForm"})
		.addDcGridView("lineTax", {name:"lineTaxList", _hasTitle_:true, width:400, xtype:"sd_SalesInvoiceLineTax_Dc$CtxList", collapsible:true, collapsed:true
		})
		.addWindow({name:"wdwCreate", _hasTitle_:true, closeAction:'hide', resizable:true, layout:"fit", modal:true,
			items:[this._elems_.get("invCreate")], closable:false
			, 
					dockedItems:[{xtype:"toolbar", ui:"footer", dock:'bottom', weight:-1,
						items:[ this._elems_.get("btnCreateContinue"), this._elems_.get("btnCreateCancel")]}]})
		.addPanel({name:"main", layout:"card", activeItem:0})
		.addPanel({name:"canvas1", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"canvas2", preventHeader:true, isCanvas:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"invDetailsTab", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false})
		.addPanel({name:"linesPanel", _hasTitle_:true, layout:"border", defaults:{split:true}})
		.addPanel({name:"linesDataPanel", layout:"card", activeItem:0});
	},
	
	/**
	 * Combine the components
	 */
	_linkElements_: function() {
		this._getBuilder_()
		.addChildrenTo("main", ["canvas1", "canvas2"])
		.addChildrenTo("canvas1", ["invFilter", "invList"], ["north", "center"])
		.addChildrenTo("canvas2", ["invEditMain", "invDetailsTab"], ["north", "center"])
		.addChildrenTo("invDetailsTab", ["infoEdit", "linesPanel", "taxList"])
		.addChildrenTo("linesPanel", ["lineFilter", "linesDataPanel", "lineTaxList"], ["west", "center", "east"])
		.addChildrenTo("linesDataPanel", ["lineList", "lineEdit"])
		.addToolbarTo("canvas1", "tlbInvList")
		.addToolbarTo("canvas2", "tlbInvEdit")
		.addToolbarTo("infoEdit", "tlbInfoEdit")
		.addToolbarTo("taxList", "tlbTaxList")
		.addToolbarTo("lineList", "tlbLineList")
		.addToolbarTo("lineEdit", "tlbLineEdit")
		.addToolbarTo("lineTaxList", "tlbLineTaxList");
	},
	
	/**
	 * Create toolbars
	 */
	_defineToolbars_: function() {
		this._getBuilder_()
		.beginToolbar("tlbInvList", {dc: "inv"})
			.addTitle().addSeparator().addSeparator()
			.addQuery().addEdit().addNew().addCopy().addDeleteSelected()
			.addReports()
		.end()
		.beginToolbar("tlbInvEdit", {dc: "inv"})
			.addTitle().addSeparator().addSeparator()
			.addBack().addSave().addNew().addCopy().addCancel().addPrevRec().addNextRec()
			.addSeparator().addSeparator()
			.addButtons([this._elems_.get("btnConfirm") ,this._elems_.get("btnUnConfirm") ,this._elems_.get("btnPost") ,this._elems_.get("btnUnPost") ])
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
		this._getDc_("inv").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnUnConfirm
	 */
	,onBtnUnConfirm: function() {
		var o={
			name:"unConfirm",
			modal:true
		};
		this._getDc_("inv").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnPost
	 */
	,onBtnPost: function() {
		var o={
			name:"post",
			modal:true
		};
		this._getDc_("inv").doRpcData(o);
	}
	
	/**
	 * On-Click handler for button btnUnPost
	 */
	,onBtnUnPost: function() {
		var o={
			name:"unPost",
			modal:true
		};
		this._getDc_("inv").doRpcData(o);
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
		this._getDc_("inv").doCancel();
	}
	
	,_whenCreateNewDoc_: function() {	
		this._getWindow_("wdwCreate").show();
	}
	
	,_afterDefineDcs_: function() {
		
		this._getDc_("inv").on("afterDoNew", this._whenCreateNewDoc_, this);
		this._getDc_("line").on("afterDoCommitSuccess", 
				function() {
					this._getDc_("inv").doReloadRecord();
				} , this );
	}
	
	,_when_called_to_edit_: function(params) {
		
		var inv = this._getDc_("inv");
		if (inv.isDirty()) {
			this._alert_dirty_();
			return;
		}
		inv.doClearQuery();
		 
		inv.setFilterValue("id", params.id );
		inv.setFilterValue("docNo", params.docNo );
		inv.setFilterValue("companyId", params.companyId );
		inv.setFilterValue("company", params.company );
		inv.doQuery();
		this._showStackedViewElement_("main",1);
	}
});