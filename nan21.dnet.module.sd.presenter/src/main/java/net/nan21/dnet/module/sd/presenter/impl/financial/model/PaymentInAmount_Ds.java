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
import net.nan21.dnet.core.api.annotation.RefLookup;
import net.nan21.dnet.core.api.annotation.RefLookups;
import net.nan21.dnet.core.api.annotation.SortField;
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.tx.domain.impl.financial.PaymentAmount;

@Ds(entity = PaymentAmount.class, jpqlWhere = " e.payment.direction = 'in' ", sort = {@SortField(field = PaymentInAmount_Ds.f_paymentDate, desc = true)})
@RefLookups({@RefLookup(refId = PaymentInAmount_Ds.f_paymentId)})
public class PaymentInAmount_Ds extends AbstractAuditableDs<PaymentAmount> {

	public static final String f_companyId = "companyId";
	public static final String f_company = "company";
	public static final String f_customerAccountId = "customerAccountId";
	public static final String f_customerId = "customerId";
	public static final String f_customer = "customer";
	public static final String f_customerName = "customerName";
	public static final String f_paymentId = "paymentId";
	public static final String f_paymentDocNo = "paymentDocNo";
	public static final String f_paymentSourceDocNo = "paymentSourceDocNo";
	public static final String f_paymentDate = "paymentDate";
	public static final String f_paymentAmount = "paymentAmount";
	public static final String f_currentPayment = "currentPayment";
	public static final String f_amountId = "amountId";
	public static final String f_amountInitial = "amountInitial";
	public static final String f_amountPayed = "amountPayed";
	public static final String f_amountDue = "amountDue";
	public static final String f_currencyId = "currencyId";
	public static final String f_currency = "currency";
	public static final String f_invoiceId = "invoiceId";
	public static final String f_invoice = "invoice";
	public static final String f_invoiceDocDate = "invoiceDocDate";

	@DsField(join = "left", path = "payment.company.id")
	private String companyId;

	@DsField(join = "left", path = "payment.company.code")
	private String company;

	@DsField(join = "left", path = "payment.bpAccount.id")
	private String customerAccountId;

	@DsField(join = "left", path = "payment.bpAccount.bpartner.id")
	private String customerId;

	@DsField(join = "left", path = "payment.bpAccount.bpartner.code")
	private String customer;

	@DsField(join = "left", path = "payment.bpAccount.bpartner.name")
	private String customerName;

	@DsField(join = "left", path = "payment.id")
	private String paymentId;

	@DsField(join = "left", path = "payment.docNo")
	private String paymentDocNo;

	@DsField(join = "left", path = "payment.sourceDocNo")
	private String paymentSourceDocNo;

	@DsField(join = "left", path = "payment.docDate")
	private Date paymentDate;

	@DsField(join = "left", path = "payment.amount")
	private BigDecimal paymentAmount;

	@DsField(path = "amount")
	private BigDecimal currentPayment;

	@DsField(join = "left", path = "amountOwed.id")
	private String amountId;

	@DsField(join = "left", path = "amountOwed.amountInitial")
	private BigDecimal amountInitial;

	@DsField(join = "left", path = "amountOwed.amountPayed")
	private BigDecimal amountPayed;

	@DsField(join = "left", path = "amountOwed.amountDue")
	private BigDecimal amountDue;

	@DsField(join = "left", path = "payment.currency.id")
	private String currencyId;

	@DsField(join = "left", path = "payment.currency.code")
	private String currency;

	@DsField(join = "left", path = "amountOwed.salesInvoice.id")
	private String invoiceId;

	@DsField(join = "left", path = "amountOwed.salesInvoice.docNo")
	private String invoice;

	@DsField(join = "left", path = "amountOwed.salesInvoice.docDate")
	private Date invoiceDocDate;

	public PaymentInAmount_Ds() {
		super();
	}

	public PaymentInAmount_Ds(PaymentAmount e) {
		super(e);
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

	public String getPaymentId() {
		return this.paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getPaymentDocNo() {
		return this.paymentDocNo;
	}

	public void setPaymentDocNo(String paymentDocNo) {
		this.paymentDocNo = paymentDocNo;
	}

	public String getPaymentSourceDocNo() {
		return this.paymentSourceDocNo;
	}

	public void setPaymentSourceDocNo(String paymentSourceDocNo) {
		this.paymentSourceDocNo = paymentSourceDocNo;
	}

	public Date getPaymentDate() {
		return this.paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public BigDecimal getPaymentAmount() {
		return this.paymentAmount;
	}

	public void setPaymentAmount(BigDecimal paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public BigDecimal getCurrentPayment() {
		return this.currentPayment;
	}

	public void setCurrentPayment(BigDecimal currentPayment) {
		this.currentPayment = currentPayment;
	}

	public String getAmountId() {
		return this.amountId;
	}

	public void setAmountId(String amountId) {
		this.amountId = amountId;
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

	public String getInvoice() {
		return this.invoice;
	}

	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}

	public Date getInvoiceDocDate() {
		return this.invoiceDocDate;
	}

	public void setInvoiceDocDate(Date invoiceDocDate) {
		this.invoiceDocDate = invoiceDocDate;
	}
}
