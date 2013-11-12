/**
 * DNet eBusiness Suite
 * Copyright: 2010-2013 Nan21 Electronics SRL. All rights reserved.
 * Use is subject to license terms.
 */
package net.nan21.dnet.module.sd.presenter.ext.financial.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import net.nan21.dnet.core.api.action.query.IQueryBuilder;
import net.nan21.dnet.core.api.exceptions.BusinessException;
import net.nan21.dnet.core.api.service.presenter.IDsService;
import net.nan21.dnet.core.presenter.service.ds.AbstractEntityDsService;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentInAmountProposal_Ds;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentInAmountProposal_DsFilter;
import net.nan21.dnet.module.sd.presenter.impl.financial.model.PaymentInAmountProposal_DsParam;
import net.nan21.dnet.module.tx.business.api.financial.IPaymentService;
import net.nan21.dnet.module.tx.domain.impl.financial.AmountOwed;
import net.nan21.dnet.module.tx.domain.impl.financial.Payment;
import net.nan21.dnet.module.tx.domain.impl.financial.PaymentAmount;

public class PaymentInAmountProposal_DsService
		extends
		AbstractEntityDsService<PaymentInAmountProposal_Ds, PaymentInAmountProposal_DsFilter, PaymentInAmountProposal_DsParam, AmountOwed>
		implements
		IDsService<PaymentInAmountProposal_Ds, PaymentInAmountProposal_DsFilter, PaymentInAmountProposal_DsParam> {

	/**
	 * Instead of update, create payment-amounts from the list of due amounts.
	 * Process only those which specify a not null payment.
	 */
	@Override
	public void update(List<PaymentInAmountProposal_Ds> list,
			PaymentInAmountProposal_DsParam params) throws Exception {

		IPaymentService paymentSrv = (IPaymentService) this
				.findEntityService(Payment.class);
		List<AmountOwed> entities = this.getEntityService().findByIds(
				this.collectIds(list), AmountOwed.class);

		List<PaymentAmount> paymentAmounts = new ArrayList<PaymentAmount>();
		Payment payment = paymentSrv.findById(params.getPaymentId());

		if (payment.getConfirmed()) {
			throw new BusinessException(
					"Cannot add details to a confirmed payment. Un-confirm it first.");
		}
		BigDecimal currentPaymentSum = BigDecimal.ZERO;
		for (PaymentInAmountProposal_Ds ds : list) {
			if (ds.getCurrentPayment() != null
					&& !ds.getCurrentPayment().equals(BigDecimal.ZERO)) {
				PaymentAmount pa = new PaymentAmount();
				pa.setPayment(payment);
				pa.setAmount(ds.getCurrentPayment());
				pa.setAmountOwed(lookupEntityById(entities, ds.getId()));
				paymentAmounts.add(pa);
				currentPaymentSum = currentPaymentSum.add(ds
						.getCurrentPayment());

			}
		}
		// do not use more than is received
		if (currentPaymentSum.compareTo(payment.getAmount()) == 1) {
			throw new BusinessException(
					"Cannot process payment details. Payed amount ("
							+ payment.getAmount()
							+ ") is less than the sum of distributed amounts ( "
							+ currentPaymentSum + ").");
		}
		// leave the unused difference as a prepayment
		if (currentPaymentSum.compareTo(payment.getAmount()) == -1) {
			PaymentAmount pa = new PaymentAmount();
			pa.setPayment(payment);
			pa.setAmount(payment.getAmount().subtract(currentPaymentSum));
			paymentAmounts.add(pa);
		}

		this.findEntityService(PaymentAmount.class).insert(paymentAmounts);
		// paymentSrv.doConfirm(payment);
	}

	/**
	 * Remove the existing payment distribution before proposing a new one.
	 */
	@Override
	protected void preFind(
			IQueryBuilder<PaymentInAmountProposal_Ds, PaymentInAmountProposal_DsFilter, PaymentInAmountProposal_DsParam> builder)
			throws Exception {
		super.preFind(builder);
		try {
			IPaymentService paymentSrv = (IPaymentService) this
					.findEntityService(Payment.class);
			Payment payment = paymentSrv.findById(builder.getParams()
					.getPaymentId());
			paymentSrv.doRemoveAmounts(payment);
		} catch (Exception e) {
			throw new BusinessException(
					"Cannot remove existing payed amounts.", e);
		}
	}

	@Override
	protected void postFind(
			IQueryBuilder<PaymentInAmountProposal_Ds, PaymentInAmountProposal_DsFilter, PaymentInAmountProposal_DsParam> builder,
			List<PaymentInAmountProposal_Ds> result) throws Exception {
		PaymentInAmountProposal_DsParam params = builder.getParams();
		BigDecimal receivedAmount = params.getReceivedAmount();
		BigDecimal unallocated = receivedAmount;
		for (PaymentInAmountProposal_Ds ds : result) {
			ds.setCurrentPayment(new BigDecimal("0"));
			// ds.setRemainingAmount(0F);
			// Float outstanding = ds.getOutstandingAmount();
			// if (unallocated <= outstanding) {
			// ds.setCurrentPayment(unallocated);
			// unallocated = 0F;
			// } else {
			// ds.setCurrentPayment(outstanding);
			// unallocated = unallocated - outstanding;
			// }
		}
		params.setUnAllocatedAmount(unallocated);
	}

}
