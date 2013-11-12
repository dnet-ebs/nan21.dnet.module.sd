package net.nan21.dnet.module.sd.presenter.ext.financial.delegate;

import net.nan21.dnet.core.presenter.service.AbstractPresenterDelegate;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentIn_Ds;
import net.nan21.dnet.module.tx.business.api.financial.IPaymentService;
import net.nan21.dnet.module.tx.domain.impl.financial.Payment;

public class PaymentIn_Pd extends AbstractPresenterDelegate {

	/**
	 * Confirm document.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void confirm(PaymentIn_Ds ds) throws Exception {
		IPaymentService srv = ((IPaymentService) this
				.findEntityService(Payment.class));
		Payment e = srv.findById(ds.getId());
		srv.doConfirm(e);
	}

	/**
	 * Un-Confirm document.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void unConfirm(PaymentIn_Ds ds) throws Exception {
		IPaymentService srv = ((IPaymentService) this
				.findEntityService(Payment.class));
		Payment e = srv.findById(ds.getId());
		srv.doUnConfirm(e);
	}

	/**
	 * Post document to accounting.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void post(PaymentIn_Ds ds) throws Exception {
		IPaymentService srv = ((IPaymentService) this
				.findEntityService(Payment.class));
		Payment e = srv.findById(ds.getId());
		srv.doPost(e);
	}

	/**
	 * Un-Post document from accounting.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void unPost(PaymentIn_Ds ds) throws Exception {
		IPaymentService srv = ((IPaymentService) this
				.findEntityService(Payment.class));
		Payment e = srv.findById(ds.getId());
		srv.doUnPost(e);
	}

	/**
	 * Remove the allocated amounts.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void removeAmounts(PaymentIn_Ds ds) throws Exception {
		IPaymentService srv = ((IPaymentService) this
				.findEntityService(Payment.class));
		Payment e = srv.findById(ds.getId());
		srv.doRemoveAmounts(e);
	}

}
