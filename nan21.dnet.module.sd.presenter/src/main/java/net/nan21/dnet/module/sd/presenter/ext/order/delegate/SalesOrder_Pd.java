package net.nan21.dnet.module.sd.presenter.ext.order.delegate;

import net.nan21.dnet.core.presenter.service.AbstractPresenterDelegate;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_Ds;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrder_DsParam;
import net.nan21.dnet.module.tx.business.api.sale.ISalesOrderService;
import net.nan21.dnet.module.tx.domain.impl.sale.SalesOrder;

public class SalesOrder_Pd extends AbstractPresenterDelegate {

	/**
	 * Confirm document.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void confirm(SalesOrder_Ds ds) throws Exception {
		ISalesOrderService srv = ((ISalesOrderService) this
				.findEntityService(SalesOrder.class));
		SalesOrder e = srv.findById(ds.getId());
		srv.doConfirm(e);
	}

	/**
	 * Un-Confirm document.<BR>
	 * Delegate to the proper business service.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void unConfirm(SalesOrder_Ds ds) throws Exception {
		ISalesOrderService srv = ((ISalesOrderService) this
				.findEntityService(SalesOrder.class));
		SalesOrder e = srv.findById(ds.getId());
		srv.doUnConfirm(e);
	}

	/**
	 * Generate invoice from the given sales order.
	 * 
	 * @param ds
	 * @param params
	 * @throws Exception
	 */
	public void generateInvoice(SalesOrder_Ds ds, SalesOrder_DsParam params)
			throws Exception {
		ISalesOrderService service = ((ISalesOrderService) this
				.findEntityService(SalesOrder.class));
		service.doGenerateInvoice(ds.getId(), params.getInvDocTypeId());
	}

	/**
	 * Generate delivery document from the given sales order.
	 * 
	 * @param ds
	 * @param params
	 * @throws Exception
	 */
	public void generateDelivery(SalesOrder_Ds ds, SalesOrder_DsParam params)
			throws Exception {
		// ISalesOrderService service = ((ISalesOrderService) this
		// .findEntityService(SalesOrder.class));
		// TxDocType docType = service.getEntityManager().find(TxDocType.class,
		// params.getDelivDocTypeId());
		// InvTransactionType txType = service.getEntityManager().find(
		// InvTransactionType.class, params.getDelivTxTypeId());
		//
		// SalesOrder e = service.findById(ds.getId());
		// service.doGenerateDelivery(e, docType, txType,
		// params.getDelivEventData());
	}

	/**
	 * Copy lines from another document. Delegate to the proper business
	 * service.
	 * 
	 * @param ds
	 * @param params
	 * @throws Exception
	 */
	public void copyLines(SalesOrder_Ds ds, SalesOrder_DsParam params)
			throws Exception {
		ISalesOrderService srv = ((ISalesOrderService) this
				.findEntityService(SalesOrder.class));
		SalesOrder e = srv.findById(ds.getId());
		srv.doCopyLines(e, params.getCopyFromId());
	}

}
