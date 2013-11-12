/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.impl.financial.service;

import net.nan21.dnet.core.api.service.presenter.IDsService;
import net.nan21.dnet.core.presenter.service.ds.AbstractEntityDsService;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentIn_Ds;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentIn_DsFilter;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentIn_DsParam;
import net.nan21.dnet.module.tx.domain.impl.financial.Payment;

public class PaymentIn_DsService
		extends
			AbstractEntityDsService<PaymentIn_Ds, PaymentIn_DsFilter, PaymentIn_DsParam, Payment>
		implements
			IDsService<PaymentIn_Ds, PaymentIn_DsFilter, PaymentIn_DsParam> {

	@Override
	public void preInsert(PaymentIn_Ds ds, PaymentIn_DsParam params) {
		ds.setDirection("in");
	}
}
