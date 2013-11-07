/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.order.model;

public class SalesOrder_DsParam {

	public static final String f_copyFromId = "copyFromId";
	public static final String f_copyFrom = "copyFrom";
	public static final String f_filterPeriod = "filterPeriod";
	public static final String f_filterProductAccount = "filterProductAccount";
	public static final String f_filterProductAccountId = "filterProductAccountId";
	public static final String f_invDocTypeId = "invDocTypeId";
	public static final String f_invDocType = "invDocType";

	private String copyFromId;

	private String copyFrom;

	private String filterPeriod;

	private String filterProductAccount;

	private String filterProductAccountId;

	private String invDocTypeId;

	private String invDocType;

	public String getCopyFromId() {
		return this.copyFromId;
	}

	public void setCopyFromId(String copyFromId) {
		this.copyFromId = copyFromId;
	}

	public String getCopyFrom() {
		return this.copyFrom;
	}

	public void setCopyFrom(String copyFrom) {
		this.copyFrom = copyFrom;
	}

	public String getFilterPeriod() {
		return this.filterPeriod;
	}

	public void setFilterPeriod(String filterPeriod) {
		this.filterPeriod = filterPeriod;
	}

	public String getFilterProductAccount() {
		return this.filterProductAccount;
	}

	public void setFilterProductAccount(String filterProductAccount) {
		this.filterProductAccount = filterProductAccount;
	}

	public String getFilterProductAccountId() {
		return this.filterProductAccountId;
	}

	public void setFilterProductAccountId(String filterProductAccountId) {
		this.filterProductAccountId = filterProductAccountId;
	}

	public String getInvDocTypeId() {
		return this.invDocTypeId;
	}

	public void setInvDocTypeId(String invDocTypeId) {
		this.invDocTypeId = invDocTypeId;
	}

	public String getInvDocType() {
		return this.invDocType;
	}

	public void setInvDocType(String invDocType) {
		this.invDocType = invDocType;
	}
}
