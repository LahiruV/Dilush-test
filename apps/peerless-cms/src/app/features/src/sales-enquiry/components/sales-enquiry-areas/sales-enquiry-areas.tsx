import { Link } from 'react-router-dom';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSelectedArea } from '@peerless-cms/store';
import './sales-enquiry-areas.css';
import SalesEnquiryCustomerPriceListFilter from './sales-enquiry-customer-pricelist-filter';
import SalesEnquiryDealEnquiryFilter from './sales-enquiry-deal-enquiry-filter';
import SalesEnquiryInvoiceEnquiryFilter from './sales-enquiry-invoice-enquiry-filter';
import SalesEnquiryOutstandingOrdersFilter from './sales-enquiry-outstanding-orders-filter';
import QuarterlyUnitSalesFilter from './sales-enquiry-quarterly-unit-sales-filter';
import { ClaimsEnquiryFilters } from '../sales-enquiry-component/claims-enquiry/claims-enquiry-filters';
import { StockEnquiryFilters } from '../sales-enquiry-component/stock-enquiry/stock-enquiry-filters';

export interface SalesEnquiryAreasProps { }

const areaLinks = [
  {
    id: 'claims-enquiry',
    path: '/sales-enquiry/claims-enquiry',
    icon: fa2.faTag,
    label: 'Claims Enquiry',
  },
  // { id: 'sales-enquiry-customer-pricelist', path: '/sales-enquiry/customer-pricelist', icon: fa2.faTag, label: 'Customer Price List' },
  {
    id: 'sales-enquiry-deal-enquiry',
    path: '/sales-enquiry/deal-enquiry',
    icon: fa2.faTag,
    label: 'Deal Enquiry',
  },
  {
    id: 'stock-enquiry',
    path: '/sales-enquiry/stock-enquiry',
    icon: fa2.faTag,
    label: 'Stock Enquiry',
  },
  {
    id: 'sales-enquiry-invoice-enquiry',
    path: '/sales-enquiry/invoice-enquiry',
    icon: fa2.faTag,
    label: 'Invoice Enquiry',
  },
  // { id: 'sales-enquiry-outstanding-orders', path: '/sales-enquiry/outstanding-orders', icon: fa2.faTag, label: 'Outstanding Orders' },
  // { id: 'quarterly-unit-sales', path: '/sales-enquiry/quarterly-unit-sales', icon: fa2.faTag, label: 'Quarterly Unit Sales' },
];
// Need to change
export function SalesEnquiryAreas(props: SalesEnquiryAreasProps) {
  const dispatch = useDispatch();
  const { selectedArea } = useSelector(
    (state: RootState) => state.dashboardActivityAnalysis
  );

  const handleSelectArea = (area: string) => {
    dispatch(setSelectedArea(area));
  };

  const renderFilter = () => {
    if (selectedArea === 'sales-enquiry-customer-pricelist') {
      return <SalesEnquiryCustomerPriceListFilter />;
    } else if (selectedArea === 'sales-enquiry-deal-enquiry') {
      return <SalesEnquiryDealEnquiryFilter />;
    } else if (selectedArea === 'sales-enquiry-invoice-enquiry') {
      return <SalesEnquiryInvoiceEnquiryFilter />;
    } else if (selectedArea === 'sales-enquiry-outstanding-orders') {
      return <SalesEnquiryOutstandingOrdersFilter />;
    } else if (selectedArea === 'claims-enquiry') {
      return <ClaimsEnquiryFilters />;
    } else if (selectedArea === 'stock-enquiry') {
      return <StockEnquiryFilters />;
    } else if (selectedArea === 'quarterly-unit-sales') {
      return <QuarterlyUnitSalesFilter />;
    }
    return null;
  };

  return (
    <div className="area-container">
      <div style={{ marginTop: '-15px' }}></div>
      <span>AREAS</span>
      <ul>
        {areaLinks.map((link) => (
          <li key={link.id}>
            <Link
              id={link.id}
              to={link.path}
              className={selectedArea === link.id ? 'selected' : ''}
              onClick={() => handleSelectArea(link.id)}
            >
              <FontAwesomeIcon icon={link.icon} size="1x" /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {renderFilter()}
    </div>
  );
}

export default SalesEnquiryAreas;
