import { pageModeEnum, RootState, setCrmOrdersPageMode, setSelectedCRMOrder } from "@peerless-cms/store";
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";

export interface CustomerCRMOrdersProps {}

export function CustomerCRMOrders(props: CustomerCRMOrdersProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, crmOrdersPageMode, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        crmOrdersPageMode: state.leedsAndCustomers.crmOrdersPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
    }));

    const handleAddCrmOrderClick = () => {
        let subPath = contactType == contactTypeEnum.customer? 'crm-orders' : 'tio-list';
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${subPath}/update`); 
        dispatch(setSelectedCRMOrder(null));
        dispatch(setCrmOrdersPageMode(pageModeEnum.New));
    };

    const handleCancelCrmOrderClick = () => {
      let subPath = contactType == contactTypeEnum.customer? 'crm-orders' : 'tio-list';
      navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${subPath}`); 
      dispatch(setCrmOrdersPageMode(pageModeEnum.List));
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faShoppingCart} size='1x' />{contactType == contactTypeEnum.customer ? 'CRM Orders' : 'TIO List'}</span> 
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
          </span>           
          {crmOrdersPageMode === pageModeEnum.List ? (<button className="header-btn-add" onClick={handleAddCrmOrderClick}>{contactType == contactTypeEnum.customer ? 'Add Order' : 'Add TIO'}</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelCrmOrderClick}>Back</button>)} 
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}