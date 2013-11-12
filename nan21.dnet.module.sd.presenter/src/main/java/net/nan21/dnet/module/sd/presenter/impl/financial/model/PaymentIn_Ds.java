/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.financial.model;

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
import net.nan21.dnet.module.md.domain.impl.bp.BpAccount;
import net.nan21.dnet.module.md.domain.impl.org.FinancialAccount;
import net.nan21.dnet.module.md.domain.impl.org.Org;
import net.nan21.dnet.module.tx.domain.impl.financial.Payment;

@Ds(entity = Payment.class, jpqlWhere = " e.direction = 'in' ", sort = {@SortField(field = PaymentIn_Ds.f_docDate, desc = true)})
@RefLookups({
		@RefLookup(refId = PaymentIn_Ds.f_docTypeId, namedQuery = DocType.NQ_FIND_BY_NAME, params = {@Param(name = "name", field = PaymentIn_Ds.f_docType)}),
		@RefLookup(refId = PaymentIn_Ds.f_currencyId, namedQuery = Currency.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = PaymentIn_Ds.f_currency)}),
		@RefLookup(refId = PaymentIn_Ds.f_companyId, namedQuery = Org.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = PaymentIn_Ds.f_company)}),
		@RefLookup(refId = PaymentIn_Ds.f_customerAccountId, namedQuery = BpAccount.NQ_FIND_BY_ORG_BP_PRIMITIVE, params = {
				@Param(name = "companyId", field = PaymentIn_Ds.f_companyId),
				@Param(name = "bpartnerId", field = PaymentIn_Ds.f_customerId)}),
		@RefLookup(refId = PaymentIn_Ds.f_finAccountId, namedQuery = FinancialAccount.NQ_FIND_BY_CODE_PRIMITIVE, params = {@Param(name = "companyId", field = PaymentIn_Ds.f_finAccount)})})
public class PaymentIn_Ds extends AbstractAuditableDs<Payment> {

	public static final String f_docNo = "docNo";
	public static final String f_docDate = "docDate";
	public static final String f_sourceDocNo = "sourceDocNo";
	public static final String f_confirmed = "confirmed";
	public static final String f_posted = "posted";
	public static final String f_generated = "generated";
	public static final String f_usage = "usage";
	public static final String f_direction = "direction";
	public static final String f_docTypeId = "docTypeId";
	public static final String f_docType = "docType";
	public static final String f_currencyId = "currencyId";
	public static final String f_currency = "currency";
	public static final String f_companyId = "companyId";
	public static final String f_company = "company";
	public static final String f_customerAccountId = "customerAccountId";
	public static final String f_customerId = "customerId";
	public static final String f_customer = "customer";
	public static final String f_customerName = "customerName";
	public static final String f_amount = "amount";
	public static final String f_amountLoc = "amountLoc";
	public static final String f_amountRef = "amountRef";
	public static final String f_xrateLoc = "xrateLoc";
	public static final String f_xrateRef = "xrateRef";
	public static final String f_finAccountId = "finAccountId";
	public static final String f_finAccount = "finAccount";

	@DsField
	private String docNo;

	@DsField
	private Date docDate;

	@DsField
	private String sourceDocNo;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean confirmed;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean posted;

	@DsField
	private Boolean generated;

	@DsField
	private String usage;

	@DsField(noUpdate = true)
	private String direction;

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
	private String customerAccountId;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.id")
	private String customerId;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.code")
	private String customer;

	@DsField(noUpdate = true, join = "left", path = "bpAccount.bpartner.name")
	private String customerName;

	@DsField
	private BigDecimal amount;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal amountLoc;

	@DsField(noInsert = true, noUpdate = true)
	private BigDecimal amountRef;

	@DsField
	private BigDecimal xrateLoc;

	@DsField
	private BigDecimal xrateRef;

	@DsField(join = "left", path = "finAccount.id")
	private String finAccountId;

	@DsField(join = "left", path = "finAccount.code")
	private String finAccount;

	public PaymentIn_Ds() {
		super();
	}

	public PaymentIn_Ds(Payment e) {
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

	public String getSourceDocNo() {
		return this.sourceDocNo;
	}

	public void setSourceDocNo(String sourceDocNo) {
		this.sourceDocNo = sourceDocNo;
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

	public Boolean getGenerated() {
		return this.generated;
	}

	public void setGenerated(Boolean generated) {
		this.generated = generated;
	}

	public String getUsage() {
		return this.usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

	public String getDirection() {
		return this.direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
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

	public String getCustomerAccountId() {
		return this.customerAccountId;
	}

	public void setCustomerAccountId(String customerAccountId) {
		this.customerAccountId = customerAccountId;
	}

	public String getCustomerId() {
		return this.customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getCustomer() {
		return this.customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getAmountLoc() {
		return this.amountLoc;
	}

	public void setAmountLoc(BigDecimal amountLoc) {
		this.amountLoc = amountLoc;
	}

	public BigDecimal getAmountRef() {
		return this.amountRef;
	}

	public void setAmountRef(BigDecimal amountRef) {
		this.amountRef = amountRef;
	}

	public BigDecimal getXrateLoc() {
		return this.xrateLoc;
	}

	public void setXrateLoc(BigDecimal xrateLoc) {
		this.xrateLoc = xrateLoc;
	}

	public BigDecimal getXrateRef() {
		return this.xrateRef;
	}

	public void setXrateRef(BigDecimal xrateRef) {
		this.xrateRef = xrateRef;
	}

	public String getFinAccountId() {
		return this.finAccountId;
	}

	public void setFinAccountId(String finAccountId) {
		this.finAccountId = finAccountId;
	}

	public String getFinAccount() {
		return this.finAccount;
	}

	public void setFinAccount(String finAccount) {
		this.finAccount = finAccount;
	}
}
