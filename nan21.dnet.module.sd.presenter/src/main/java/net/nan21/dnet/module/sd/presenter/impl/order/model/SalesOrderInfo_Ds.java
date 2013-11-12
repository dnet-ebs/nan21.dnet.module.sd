/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.order.model;

import net.nan21.dnet.core.api.annotation.Ds;
import net.nan21.dnet.core.api.annotation.DsField;
import net.nan21.dnet.core.api.annotation.RefLookup;
import net.nan21.dnet.core.api.annotation.RefLookups;
import net.nan21.dnet.core.presenter.model.AbstractAuditableDs;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesOrder;

@Ds(entity = SalesOrder.class)
@RefLookups({@RefLookup(refId = SalesOrderInfo_Ds.f_billToLocationId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_billToContactId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_shipToLocationId),
		@RefLookup(refId = SalesOrderInfo_Ds.f_shipToContactId)})
public class SalesOrderInfo_Ds extends AbstractAuditableDs<SalesOrder> {

	public static final String f_confirmed = "confirmed";
	public static final String f_invoiced = "invoiced";
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

	@DsField(noInsert = true, noUpdate = true)
	private Boolean confirmed;

	@DsField(noInsert = true, noUpdate = true)
	private Boolean invoiced;

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

	public SalesOrderInfo_Ds() {
		super();
	}

	public SalesOrderInfo_Ds(SalesOrder e) {
		super(e);
	}

	public Boolean getConfirmed() {
		return this.confirmed;
	}

	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}

	public Boolean getInvoiced() {
		return this.invoiced;
	}

	public void setInvoiced(Boolean invoiced) {
		this.invoiced = invoiced;
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
}
