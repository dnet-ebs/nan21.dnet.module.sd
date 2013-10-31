/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.order.model;

import net.nan21.dnet.core.api.annotation.Ds;
import net.nan21.dnet.core.api.annotation.DsField;
import net.nan21.dnet.core.api.annotation.Param;
import net.nan21.dnet.core.api.annotation.RefLookup;
import net.nan21.dnet.core.api.annotation.RefLookups;
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.md.domain.impl.base.DocType;
import net.nan21.dnet.module.md.domain.impl.base.PaymentTerm;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesOrder;

@Ds(entity = SalesOrder.class)
@RefLookups({
		@RefLookup(refId = SalesOrderInfo_Ds.f_billToLocationId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_billToContactId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_shipToLocationId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_shipToContactId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_paymentMethodId, namedQuery = DocType.NQ_FIND_BY_CODE, params = {@Param(name = "code", field = SalesOrderInfo_Ds.f_paymentMethod)}),
		@RefLookup(refId = SalesOrderInfo_Ds.f_paymentTermId, namedQuery = PaymentTerm.NQ_FIND_BY_NAME, params = {@Param(name = "name", field = SalesOrderInfo_Ds.f_paymentTerm)})})
public class SalesOrderInfo_Ds extends AbstractAuditableDs<SalesOrder> {

	public static final String f_bpartnerId = "bpartnerId";
	public static final String f_bpartnerRefid = "bpartnerRefid";
	public static final String f_billToLocationId = "billToLocationId";
	public static final String f_billToLocationRefId = "billToLocationRefId";
	public static final String f_billToLocation = "billToLocation";
	public static final String f_billToContactId = "billToContactId";
	public static final String f_billToContact = "billToContact";
	public static final String f_shipToLocationId = "shipToLocationId";
	public static final String f_shipToLocationRefId = "shipToLocationRefId";
	public static final String f_shipToLocation = "shipToLocation";
	public static final String f_shipToContactId = "shipToContactId";
	public static final String f_shipToContact = "shipToContact";
	public static final String f_paymentMethodId = "paymentMethodId";
	public static final String f_paymentMethod = "paymentMethod";
	public static final String f_paymentMethodName = "paymentMethodName";
	public static final String f_paymentTermId = "paymentTermId";
	public static final String f_paymentTerm = "paymentTerm";

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

	@DsField(join = "left", path = "shipToLocation.id")
	private String shipToLocationId;

	@DsField(join = "left", path = "shipToLocation.refid")
	private String shipToLocationRefId;

	@DsField(join = "left", fetch = false, path = "shipToLocation.asString")
	private String shipToLocation;

	@DsField(join = "left", path = "shipToContact.id")
	private String shipToContactId;

	@DsField(join = "left", path = "shipToContact.name")
	private String shipToContact;

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

	public SalesOrderInfo_Ds() {
		super();
	}

	public SalesOrderInfo_Ds(SalesOrder e) {
		super(e);
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

	public String getShipToLocationId() {
		return this.shipToLocationId;
	}

	public void setShipToLocationId(String shipToLocationId) {
		this.shipToLocationId = shipToLocationId;
	}

	public String getShipToLocationRefId() {
		return this.shipToLocationRefId;
	}

	public void setShipToLocationRefId(String shipToLocationRefId) {
		this.shipToLocationRefId = shipToLocationRefId;
	}

	public String getShipToLocation() {
		return this.shipToLocation;
	}

	public void setShipToLocation(String shipToLocation) {
		this.shipToLocation = shipToLocation;
	}

	public String getShipToContactId() {
		return this.shipToContactId;
	}

	public void setShipToContactId(String shipToContactId) {
		this.shipToContactId = shipToContactId;
	}

	public String getShipToContact() {
		return this.shipToContact;
	}

	public void setShipToContact(String shipToContact) {
		this.shipToContact = shipToContact;
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
