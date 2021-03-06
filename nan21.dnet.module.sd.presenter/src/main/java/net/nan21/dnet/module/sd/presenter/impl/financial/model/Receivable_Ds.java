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
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.tx.domain.impl.financial.AmountOwed;

@Ds(entity = AmountOwed.class, jpqlWhere = " e.sale = true ")
public class Receivable_Ds extends AbstractAuditableDs<AmountOwed> {

	public static final String f_dueDate = "dueDate";
	public static final String f_dueInDays = "dueInDays";
	public static final String f_amountInitial = "amountInitial";
	public static final String f_amountPayed = "amountPayed";
	public static final String f_amountDue = "amountDue";
	public static final String f_companyId = "companyId";
	public static final String f_company = "company";
	public static final String f_customerAccountId = "customerAccountId";
	public static final String f_customerId = "customerId";
	public static final String f_customer = "customer";
	public static final String f_customerName = "customerName";
	public static final String f_currencyId = "currencyId";
	public static final String f_currency = "currency";
	public static final String f_invoiceId = "invoiceId";
	public static final String f_invoiceNo = "invoiceNo";
	public static final String f_invoiceDate = "invoiceDate";

	@DsField
	private Date dueDate;

	@DsField(fetch = false)
	private Integer dueInDays;

	@DsField
	private BigDecimal amountInitial;

	@DsField
	private BigDecimal amountPayed;

	@DsField
	private BigDecimal amountDue;

	@DsField(join = "left", path = "bpAccount.company.id")
	private String companyId;

	@DsField(join = "left", path = "bpAccount.company.code")
	private String company;

	@DsField(join = "left", path = "bpAccount.id")
	private String customerAccountId;

	@DsField(join = "left", path = "bpAccount.bpartner.id")
	private String customerId;

	@DsField(join = "left", path = "bpAccount.bpartner.code")
	private String customer;

	@DsField(join = "left", path = "bpAccount.bpartner.name")
	private String customerName;

	@DsField(join = "left", path = "currency.id")
	private String currencyId;

	@DsField(join = "left", path = "currency.code")
	private String currency;

	@DsField(join = "left", path = "salesInvoice.id")
	private String invoiceId;

	@DsField(join = "left", path = "salesInvoice.docNo")
	private String invoiceNo;

	@DsField(join = "left", path = "salesInvoice.docDate")
	private Date invoiceDate;

	public Receivable_Ds() {
		super();
	}

	public Receivable_Ds(AmountOwed e) {
		super(e);
	}

	public Date getDueDate() {
		return this.dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Integer getDueInDays() {
		return this.dueInDays;
	}

	public void setDueInDays(Integer dueInDays) {
		this.dueInDays = dueInDays;
	}

	public BigDecimal getAmountInitial() {
		return this.amountInitial;
	}

	public void setAmountInitial(BigDecimal amountInitial) {
		this.amountInitial = amountInitial;
	}

	public BigDecimal getAmountPayed() {
		return this.amountPayed;
	}

	public void setAmountPayed(BigDecimal amountPayed) {
		this.amountPayed = amountPayed;
	}

	public BigDecimal getAmountDue() {
		return this.amountDue;
	}

	public void setAmountDue(BigDecimal amountDue) {
		this.amountDue = amountDue;
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

	public String getInvoiceId() {
		return this.invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public String getInvoiceNo() {
		return this.invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public Date getInvoiceDate() {
		return this.invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
}
