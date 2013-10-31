/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.invoice.cnv;

import javax.persistence.EntityManager;
import net.nan21.dnet.core.api.action.result.IDsConverter;
import net.nan21.dnet.core.presenter.converter.AbstractDsConverter;
import net.nan21.dnet.module.md.business.api.bp.IBusinessPartnerService;
import net.nan21.dnet.module.md.domain.impl.bp.BusinessPartner;
import net.nan21.dnet.module.sd.presenter.impl.invoice.model.SalesInvoice_Ds;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesInvoice;

public class SalesInvoice_DsCnv
		extends
			AbstractDsConverter<SalesInvoice_Ds, SalesInvoice>
		implements
			IDsConverter<SalesInvoice_Ds, SalesInvoice> {

	protected void modelToEntityReferences(SalesInvoice_Ds ds, SalesInvoice e,
			boolean isInsert, EntityManager em) throws Exception {

		if (ds.getBpartnerId() == null) {
			BusinessPartner x = ((IBusinessPartnerService) findEntityService(BusinessPartner.class))
					.findByCode(ds.getBpartner());
			ds.setBpartnerId(x.getId());
		}
		super.modelToEntityReferences(ds, e, isInsert, em);
	}
}
