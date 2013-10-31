/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.invoice.qb;

import net.nan21.dnet.core.presenter.action.query.QueryBuilderWithJpql;
import net.nan21.dnet.module.sd.presenter.impl.invoice.model.SalesInvoice_Ds;
import net.nan21.dnet.module.sd.presenter.impl.invoice.model.SalesInvoice_DsFilter;
import net.nan21.dnet.module.sd.presenter.impl.invoice.model.SalesInvoice_DsParam;

import net.nan21.dnet.core.api.session.Session;

public class SalesInvoice_DsQb
		extends
			QueryBuilderWithJpql<SalesInvoice_Ds, SalesInvoice_DsFilter, SalesInvoice_DsParam> {

	@Override
	public void beforeBuildWhere() {
		if (this.params != null
				&& this.params.getFilterProductAccountId() != null
				&& !"".equals(this.params.getFilterProductAccountId())) {
			addFilterCondition("  e.id in (select l.invoice.id from SalesInvoiceLine l where l.productAccount.id = :filterProductAccountId) ");
			addCustomFilterItem("filterProductAccountId",
					this.params.getFilterProductAccountId());
		}
	}
}
