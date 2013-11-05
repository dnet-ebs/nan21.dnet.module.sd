/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.order.qb;

import net.nan21.dnet.core.presenter.action.query.QueryBuilderWithJpql;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_Ds;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_DsFilter;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_DsParam;

import net.nan21.dnet.core.api.session.Session;

public class SalesOrder_DsQb
		extends
			QueryBuilderWithJpql<SalesOrder_Ds, SalesOrder_DsFilter, SalesOrder_DsParam> {

	@Override
	public void beforeBuildWhere() {
		if (this.params != null
				&& this.params.getFilterProductAccountId() != null
				&& !"".equals(this.params.getFilterProductAccountId())) {
			addFilterCondition("  e.id in (select l.invoice.id from SalesOrderLine l where l.productAccount.id = :filterProductAccountId and l.clientId =:clientId ) ");
			addCustomFilterItem("filterProductAccountId",
					this.params.getFilterProductAccountId());
		}
	}
}
