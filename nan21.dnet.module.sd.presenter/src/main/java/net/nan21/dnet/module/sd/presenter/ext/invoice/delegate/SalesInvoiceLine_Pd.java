package net.nan21.dnet.module.sd.presenter.ext.invoice.delegate;

import net.nan21.dnet.core.presenter.service.AbstractPresenterDelegate;
import net.nan21.dnet.module.sd.presenter.impl.invoice.model.SalesInvoiceLine_Ds;

public class SalesInvoiceLine_Pd extends AbstractPresenterDelegate {

	/**
	 * Update line values according to the line product.
	 * 
	 * @param ds
	 * @throws Exception
	 */
	public void onProductChange(SalesInvoiceLine_Ds ds) throws Exception {
		// ISalesInvoiceService siSrv = (ISalesInvoiceService) this
		// .findEntityService(SalesInvoice.class);
		// SalesInvoice si = siSrv.findById(ds.getInvoiceId());

		// IProductPriceService srv = (IProductPriceService) this
		// .findEntityService(ProductPrice.class);
		// ProductPrice pr = srv.getProductPrice(ds.getProductId(), si
		// .getPriceList().getId(), si.getDocDate());
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
