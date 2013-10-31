package net.nan21.dnet.module.sd.presenter.ext.order.delegate;

import net.nan21.dnet.core.presenter.service.AbstractPresenterDelegate;
import net.nan21.dnet.module.sd.presenter.impl.order.model.SalesOrderLine_Ds;

public class SalesOrderLine_Pd extends AbstractPresenterDelegate {

	/**
	 * Update line values according to the line product.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void onProductChange(SalesOrderLine_Ds ds) throws Exception {
		// ISalesOrderService soSrv = (ISalesOrderService) this
		// .findEntityService(SalesOrder.class);
		// SalesOrder so = soSrv.findById(ds.getOrderId());
		//
		// IProductPriceService srv = (IProductPriceService) this
		// .findEntityService(ProductPrice.class);
		// ProductPrice pr = srv.getProductPrice(ds.getProductId(), so
		// .getPriceList().getId(), so.getDocDate());
		//
		// ds.setUnitPrice(pr.getPrice());
		// ds.setUomId(pr.getUom().getId());
		// ds.setUomCode(pr.getUom().getCode());
		//
		// // reset other
		// ds.setNetAmount(1F * pr.getPrice());
		// ds.setTaxAmount(0F);
		// ds.setQuantity(1F);
	}

}
