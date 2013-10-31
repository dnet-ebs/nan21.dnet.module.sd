/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.order.cnv;

import javax.persistence.EntityManager;
import net.nan21.dnet.core.api.action.result.IDsConverter;
import net.nan21.dnet.core.presenter.converter.AbstractDsConverter;
import net.nan21.dnet.module.md.business.api.bp.IBusinessPartnerService;
import net.nan21.dnet.module.md.domain.impl.bp.BusinessPartner;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_Ds;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesOrder;

public class SalesOrder_DsCnv
		extends
			AbstractDsConverter<SalesOrder_Ds, SalesOrder>
		implements
			IDsConverter<SalesOrder_Ds, SalesOrder> {

	protected void modelToEntityReferences(SalesOrder_Ds ds, SalesOrder e,
			boolean isInsert, EntityManager em) throws Exception {

		if (ds.getBpartnerId() == null) {
			BusinessPartner x = ((IBusinessPartnerService) findEntityService(BusinessPartner.class))
					.findByCode(ds.getBpartner());
			ds.setBpartnerId(x.getId());
		}
		super.modelToEntityReferences(ds, e, isInsert, em);
	}
}
