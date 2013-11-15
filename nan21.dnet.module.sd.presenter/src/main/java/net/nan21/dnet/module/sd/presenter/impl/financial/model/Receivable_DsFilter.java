/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.financial.model;
import java.math.BigDecimal;
import java.util.Date;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.Receivable_Ds;

/**
 * Helper filter object to run query by example with range values.
 *
 */
public class Receivable_DsFilter extends Receivable_Ds {

	private Date dueDate_From;

	private Date dueDate_To;

	private BigDecimal amountInitial_From;

	private BigDecimal amountInitial_To;

	private BigDecimal amountPayed_From;

	private BigDecimal amountPayed_To;

	private BigDecimal amountDue_From;

	private BigDecimal amountDue_To;

	private Date invoiceDate_From;

	private Date invoiceDate_To;

	public Date getDueDate_From() {
		return this.dueDate_From;
	}

	public Date getDueDate_To() {
		return this.dueDate_To;
	}

	public void setDueDate_From(Date dueDate_From) {
		this.dueDate_From = dueDate_From;
	}

	public void setDueDate_To(Date dueDate_To) {
		this.dueDate_To = dueDate_To;
	}

	public BigDecimal getAmountInitial_From() {
		return this.amountInitial_From;
	}

	public BigDecimal getAmountInitial_To() {
		return this.amountInitial_To;
	}

	public void setAmountInitial_From(BigDecimal amountInitial_From) {
		this.amountInitial_From = amountInitial_From;
	}

	public void setAmountInitial_To(BigDecimal amountInitial_To) {
		this.amountInitial_To = amountInitial_To;
	}

	public BigDecimal getAmountPayed_From() {
		return this.amountPayed_From;
	}

	public BigDecimal getAmountPayed_To() {
		return this.amountPayed_To;
	}

	public void setAmountPayed_From(BigDecimal amountPayed_From) {
		this.amountPayed_From = amountPayed_From;
	}

	public void setAmountPayed_To(BigDecimal amountPayed_To) {
		this.amountPayed_To = amountPayed_To;
	}

	public BigDecimal getAmountDue_From() {
		return this.amountDue_From;
	}

	public BigDecimal getAmountDue_To() {
		return this.amountDue_To;
	}

	public void setAmountDue_From(BigDecimal amountDue_From) {
		this.amountDue_From = amountDue_From;
	}

	public void setAmountDue_To(BigDecimal amountDue_To) {
		this.amountDue_To = amountDue_To;
	}

	public Date getInvoiceDate_From() {
		return this.invoiceDate_From;
	}

	public Date getInvoiceDate_To() {
		return this.invoiceDate_To;
	}

	public void setInvoiceDate_From(Date invoiceDate_From) {
		this.invoiceDate_From = invoiceDate_From;
	}

	public void setInvoiceDate_To(Date invoiceDate_To) {
		this.invoiceDate_To = invoiceDate_To;
	}
}
