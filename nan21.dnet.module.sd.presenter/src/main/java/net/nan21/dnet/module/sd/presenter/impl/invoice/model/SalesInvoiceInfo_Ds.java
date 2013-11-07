/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.invoice.model;

import net.nan21.dnet.core.api.annotation.Ds;
import net.nan21.dnet.core.api.annotation.DsField;
import net.nan21.dnet.core.api.annotation.Param;
import net.nan21.dnet.core.api.annotation.RefLookup;
import net.nan21.dnet.core.api.annotation.RefLookups;
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.md.domain.impl.base.DocType;
import net.nan21.dnet.module.md.domain.impl.base.PaymentTerm;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesInvoice;

@Ds(entity = SalesInvoice.class)
@RefLookups({
		@RefLookup(refId = SalesInvoiceInfo_Ds.f_billToLocationId),
		@RefLookup(refId = SalesInvoiceInfo_Ds.f_billToContactId),
		@RefLookup(refId = SalesInvoiceInfo_Ds.f_paymentMethodId, namedQuery = DocType.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesInvoiceInfo_Ds.f_paymentMethod)}),
		@RefLookup(refId = SalesInvoiceInfo_Ds.f_paymentTermId, namedQuery = PaymentTerm.NQ_FIND_BY_NAME, params = {@Param(name = "name", field = SalesInvoiceInfo_Ds.f_paymentTerm)})})
public class SalesInvoiceInfo_Ds extends AbstractAuditableDs<SalesInvoice> {

	public static final String f_confirmed = "confirmed";
	public static final String f_posted = "posted";
	public static final String f_bpartnerId = "bpartnerId";
	public static final String f_bpartnerRefid = "bpartnerRefid";
	public static final String f_billToLocationId = "billToLocationId";
	public static final String f_billToLocationRefId = "billToLocationRefId";
	public static final String f_billToLocation = "billToLocation";
	public static final String f_billToContactId = "billToContactId";
	public static final String f_billToContact = "billToContact";
	public static final String f_paymentMethodId = "paymentMethodId";
	public static final String f_paymentMethod = "paymentMethod";
	public static final String f_paymentMethodName = "paymentMethodName";
	public static final String f_paymentTermId = "paymentTermId";
	public static final String f_paymentTerm = "paymentTerm";

	@DsField(noInsert = true, noUpdate = true)
	private Boolean confirmed;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean posted;

	@DsField(join = "left", path = "bpAccount.bpartner.id")
	private String bpartnerId;

	@DsField(join = "left", path = "bpAccount.bpartner.refid")
	private String bpartnerRefid;

	@DsField(join = "left", path = "billToLocation.id")
	private String billToLocationId;

	@DsField(join = "left", path = "billToLocation.refid")
	private String billToLocationRefId;

	@DsField(join = "left", fetch = false, path = "billToLocation.asString")
	private String billToLocation;

	@DsField(join = "left", path = "billToContact.id")
	private String billToContactId;

	@DsField(join = "left", path = "billToContact.name")
	private String billToContact;

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

	public SalesInvoiceInfo_Ds() {
		super();
	}

	public SalesInvoiceInfo_Ds(SalesInvoice e) {
		super(e);
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

	public String getBpartnerId() {
		return this.bpartnerId;
	}

	public void setBpartnerId(String bpartnerId) {
		this.bpartnerId = bpartnerId;
	}

	public String getBpartnerRefid() {
		return this.bpartnerRefid;
	}

	public void setBpartnerRefid(String bpartnerRefid) {
		this.bpartnerRefid = bpartnerRefid;
	}

	public String getBillToLocationId() {
		return this.billToLocationId;
	}

	public void setBillToLocationId(String billToLocationId) {
		this.billToLocationId = billToLocationId;
	}

	public String getBillToLocationRefId() {
		return this.billToLocationRefId;
	}

	public void setBillToLocationRefId(String billToLocationRefId) {
		this.billToLocationRefId = billToLocationRefId;
	}

	public String getBillToLocation() {
		return this.billToLocation;
	}

	public void setBillToLocation(String billToLocation) {
		this.billToLocation = billToLocation;
	}

	public String getBillToContactId() {
		return this.billToContactId;
	}

	public void setBillToContactId(String billToContactId) {
		this.billToContactId = billToContactId;
	}

	public String getBillToContact() {
		return this.billToContact;
	}

	public void setBillToContact(String billToContact) {
		this.billToContact = billToContact;
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
}
