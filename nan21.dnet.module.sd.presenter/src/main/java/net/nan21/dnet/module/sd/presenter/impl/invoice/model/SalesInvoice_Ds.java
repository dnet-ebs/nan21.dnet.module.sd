/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.invoice.model;

import java.math.BigDecimal;
import java.util.Date;
import net.nan21.dnet.core.api.annotation.Ds;
import net.nan21.dnet.core.api.annotation.DsField;
import net.nan21.dnet.core.api.annotation.Param;
import net.nan21.dnet.core.api.annotation.RefLookup;
import net.nan21.dnet.core.api.annotation.RefLookups;
import net.nan21.dnet.core.api.annotation.SortField;
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.bd.domain.impl.currency.Currency;
import net.nan21.dnet.module.md.domain.impl.base.DocType;
import net.nan21.dnet.module.md.domain.impl.base.PaymentTerm;
import net.nan21.dnet.module.md.domain.impl.bp.BpAccount;
import net.nan21.dnet.module.md.domain.impl.org.Org;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesInvoice;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesOrder;

@Ds(entity = SalesInvoice.class, sort = {@SortField(field = SalesInvoice_Ds.f_docDate, desc = true)})
@RefLookups({
		@RefLookup(refId = SalesInvoice_Ds.f_docTypeId, namedQuery = DocType.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesInvoice_Ds.f_docType)}),
		@RefLookup(refId = SalesInvoice_Ds.f_currencyId, namedQuery = Currency.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesInvoice_Ds.f_currency)}),
		@RefLookup(refId = SalesInvoice_Ds.f_companyId, namedQuery = Org.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesInvoice_Ds.f_company)}),
		@RefLookup(refId = SalesInvoice_Ds.f_bpAccountId, namedQuery = BpAccount.NQ_FIND_BY_ORG_BP_PRIMITIVE, params = {
				@Param(name = "companyId", field = SalesInvoice_Ds.f_companyId),
				@Param(name = "bpartnerId", field = SalesInvoice_Ds.f_bpartnerId)}),
		@RefLookup(refId = SalesInvoice_Ds.f_salesOrderId, namedQuery = SalesOrder.NQ_FIND_BY_DOCNO, params = {@Param(name = "docNo", field = SalesInvoice_Ds.f_salesOrder)}),
		@RefLookup(refId = SalesInvoice_Ds.f_paymentMethodId, namedQuery = DocType.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesInvoice_Ds.f_paymentMethod)}),
		@RefLookup(refId = SalesInvoice_Ds.f_paymentTermId, namedQuery = PaymentTerm.NQ_FIND_BY_NAME, params = {@Param(name = "name", field = SalesInvoice_Ds.f_paymentTerm)})})
public class SalesInvoice_Ds extends AbstractAuditableDs<SalesInvoice> {

	public static final String f_docNo = "docNo";
	public static final String f_docDate = "docDate";
	public static final String f_confirmed = "confirmed";
	public static final String f_posted = "posted";
	public static final String f_docTypeId = "docTypeId";
	public static final String f_docType = "docType";
	public static final String f_currencyId = "currencyId";
	public static final String f_currency = "currency";
	public static final String f_companyId = "companyId";
	public static final String f_company = "company";
	public static final String f_bpAccountId = "bpAccountId";
	public static final String f_bpartnerId = "bpartnerId";
	public static final String f_bpartner = "bpartner";
	public static final String f_bpartnerName = "bpartnerName";
	public static final String f_netAmount = "netAmount";
	public static final String f_taxAmount = "taxAmount";
	public static final String f_amount = "amount";
	public static final String f_xrateLoc = "xrateLoc";
	public static final String f_netAmountLoc = "netAmountLoc";
	public static final String f_taxAmountLoc = "taxAmountLoc";
	public static final String f_amountLoc = "amountLoc";
	public static final String f_xrateRef = "xrateRef";
	public static final String f_netAmountRef = "netAmountRef";
	public static final String f_taxAmountRef = "taxAmountRef";
	public static final String f_amountRef = "amountRef";
	public static final String f_paymentMethodId = "paymentMethodId";
	public static final String f_paymentMethod = "paymentMethod";
	public static final String f_paymentMethodName = "paymentMethodName";
	public static final String f_paymentTermId = "paymentTermId";
	public static final String f_paymentTerm = "paymentTerm";
	public static final String f_salesOrderId = "salesOrderId";
	public static final String f_salesOrder = "salesOrder";

	@DsField
	private String docNo;

	@DsField
	private Date docDate;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean confirmed;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean posted;

	@DsField(noUpdate = true, join = "left", path = "docType.id")
	private String docTypeId;

	@DsField(noUpdate = true, join = "left", path = "docType.code")
	private String docType;

	@DsField(noUpdate = true, join = "left", path = "currency.id")
	private String currencyId;

	@DsField(noUpdate = true, join = "left", path = "currency.code")
	private String currency;

	@DsField(noUpdate = true, join = "left", path = "company.id")
	private String companyId;

	@DsField(noUpdate = true, join = "left", path = "company.code")
	private String company;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.id")
	private String bpAccountId;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.id")
	private String bpartnerId;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.code")
	private String bpartner;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.name")
	private String bpartnerName;

	@DsField(noUpdate = true)
	private BigDecimal netAmount;

	@DsField(noUpdate = true)
	private BigDecimal taxAmount;

	@DsField(noUpdate = true)
	private BigDecimal amount;

	@DsField
	private BigDecimal xrateLoc;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal netAmountLoc;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal taxAmountLoc;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal amountLoc;

	@DsField
	private BigDecimal xrateRef;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal netAmountRef;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal taxAmountRef;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal amountRef;

	@DsField(join = "left", path = "paymentMethod.id")
	private String paymentMethodId;

	@DsField(join = "left", path = "paymentMethod.code")
	private String paymentMethod;

	@DsField(join = "left", path = "paymentMethod.name")
	private String paymentMethodName;

	@DsField(join = "left", path = "paymentTerm.id")
	private String paymentTermId;

	@DsField(join = "left", path = "paymentTerm.name")
	private String paymentTerm;

	@DsField(join = "left", path = "salesOrder.id")
	private String salesOrderId;

	@DsField(join = "left", path = "salesOrder.docNo")
	private String salesOrder;

	public SalesInvoice_Ds() {
		super();
	}

	public SalesInvoice_Ds(SalesInvoice e) {
		super(e);
	}

	public String getDocNo() {
		return this.docNo;
	}

	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}

	public Date getDocDate() {
		return this.docDate;
	}

	public void setDocDate(Date docDate) {
		this.docDate = docDate;
	}

	public Boolean getConfirmed() {
		return this.confirmed;
	}

	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}

	public Boolean getPosted() {
		return this.posted;
	}

	public void setPosted(Boolean posted) {
		this.posted = posted;
	}

	public String getDocTypeId() {
		return this.docTypeId;
	}

	public void setDocTypeId(String docTypeId) {
		this.docTypeId = docTypeId;
	}

	public String getDocType() {
		return this.docType;
	}

	public void setDocType(String docType) {
		this.docType = docType;
	}

	public String getCurrencyId() {
		return this.currencyId;
	}

	public void setCurrencyId(String currencyId) {
		this.currencyId = currencyId;
	}

	public String getCurrency() {
		return this.currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getCompany() {
		return this.company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getBpAccountId() {
		return this.bpAccountId;
	}

	public void setBpAccountId(String bpAccountId) {
		this.bpAccountId = bpAccountId;
	}

	public String getBpartnerId() {
		return this.bpartnerId;
	}

	public void setBpartnerId(String bpartnerId) {
		this.bpartnerId = bpartnerId;
	}

	public String getBpartner() {
		return this.bpartner;
	}

	public void setBpartner(String bpartner) {
		this.bpartner = bpartner;
	}

	public String getBpartnerName() {
		return this.bpartnerName;
	}

	public void setBpartnerName(String bpartnerName) {
		this.bpartnerName = bpartnerName;
	}

	public BigDecimal getNetAmount() {
		return this.netAmount;
	}

	public void setNetAmount(BigDecimal netAmount) {
		this.netAmount = netAmount;
	}

	public BigDecimal getTaxAmount() {
		return this.taxAmount;
	}

	public void setTaxAmount(BigDecimal taxAmount) {
		this.taxAmount = taxAmount;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getXrateLoc() {
		return this.xrateLoc;
	}

	public void setXrateLoc(BigDecimal xrateLoc) {
		this.xrateLoc = xrateLoc;
	}

	public BigDecimal getNetAmountLoc() {
		return this.netAmountLoc;
	}

	public void setNetAmountLoc(BigDecimal netAmountLoc) {
		this.netAmountLoc = netAmountLoc;
	}

	public BigDecimal getTaxAmountLoc() {
		return this.taxAmountLoc;
	}

	public void setTaxAmountLoc(BigDecimal taxAmountLoc) {
		this.taxAmountLoc = taxAmountLoc;
	}

	public BigDecimal getAmountLoc() {
		return this.amountLoc;
	}

	public void setAmountLoc(BigDecimal amountLoc) {
		this.amountLoc = amountLoc;
	}

	public BigDecimal getXrateRef() {
		return this.xrateRef;
	}

	public void setXrateRef(BigDecimal xrateRef) {
		this.xrateRef = xrateRef;
	}

	public BigDecimal getNetAmountRef() {
		return this.netAmountRef;
	}

	public void setNetAmountRef(BigDecimal netAmountRef) {
		this.netAmountRef = netAmountRef;
	}

	public BigDecimal getTaxAmountRef() {
		return this.taxAmountRef;
	}

	public void setTaxAmountRef(BigDecimal taxAmountRef) {
		this.taxAmountRef = taxAmountRef;
	}

	public BigDecimal getAmountRef() {
		return this.amountRef;
	}

	public void setAmountRef(BigDecimal amountRef) {
		this.amountRef = amountRef;
	}

	public String getPaymentMethodId() {
		return this.paymentMethodId;
	}

	public void setPaymentMethodId(String paymentMethodId) {
		this.paymentMethodId = paymentMethodId;
	}

	public String getPaymentMethod() {
		return this.paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPaymentMethodName() {
		return this.paymentMethodName;
	}

	public void setPaymentMethodName(String paymentMethodName) {
		this.paymentMethodName = paymentMethodName;
	}

	public String getPaymentTermId() {
		return this.paymentTermId;
	}

	public void setPaymentTermId(String paymentTermId) {
		this.paymentTermId = paymentTermId;
	}

	public String getPaymentTerm() {
		return this.paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}

	public String getSalesOrderId() {
		return this.salesOrderId;
	}

	public void setSalesOrderId(String salesOrderId) {
		this.salesOrderId = salesOrderId;
	}

	public String getSalesOrder() {
		return this.salesOrder;
	}

	public void setSalesOrder(String salesOrder) {
		this.salesOrder = salesOrder;
	}
}
