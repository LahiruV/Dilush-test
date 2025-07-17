import { pageModeEnum, RootState, setCustomerEUListPricePageMode } from "@peerless-cms/store";
import { contactId, contactTypeEnum, contactTypeName, enduserPriceAddButtonLabel, enduserPriceSubUrl, enduserPriceTitle, sectionPathMap } from "@peerless/utils";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";


export interface CustomerEUListPriceProps {}

export function CustomerEUListPrice(props: CustomerEUListPriceProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, contactType, customerEUListPricePageMode, isEUPriceQueryEnabled } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,        
        contactType: state.leedsAndCustomers.selectedContactType,
        customerEUListPricePageMode: state.leedsAndCustomers.customerEUListPricePageMode,
        isEUPriceQueryEnabled: state.enduserPriceFilters.isEUPriceQueryEnabled,
    }));
    

    const handleAddPriceListClick = () => {
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${enduserPriceSubUrl[contactType]}/update`);
        dispatch(setCustomerEUListPricePageMode(pageModeEnum.New));
    };

    const handleCancelAddPriceListClick = () => {
      navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${enduserPriceSubUrl[contactType]}`); 
      dispatch(setCustomerEUListPricePageMode(pageModeEnum.List));
    };

    const isAddEditListBtnDisabled = () => {
        return contactType == contactTypeEnum.enduser && !isEUPriceQueryEnabled;
    }

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faReceipt} size='1x' />{enduserPriceTitle[contactType]}</span> 
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
          </span>           
          {customerEUListPricePageMode === pageModeEnum.List ? (<button disabled={isAddEditListBtnDisabled()} className={isAddEditListBtnDisabled() ? 
                "header-btn-add-extended btn-disabled" : "header-btn-add-extended filter-area"} onClick={handleAddPriceListClick}>{enduserPriceAddButtonLabel[contactType]}</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelAddPriceListClick}>Back</button>)}           
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}