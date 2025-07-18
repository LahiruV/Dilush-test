import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListBox } from "@peerless-cms/features-common-components";
import { pageModeEnum, RootState, setEnduserDetailPageMode, setIsAddContactModalOpen, setIsModalOpen, setLeadDetailPageMode, updateDetails } from "@peerless-cms/store";
import { contactId, contactTypeEnum, leadCustomerAreaMap, sectionPathMap } from "@peerless/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as faSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export interface LeadCustomerFavouriteProps {}

export function LeadCustomerFavourites(props: LeadCustomerFavouriteProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [favouritList, setFavouritList] = useState<any>([]);
    const { selectedLeedOrCustomer, selectedContactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer:  state.leedsAndCustomers.selectedLeedOrCustomer,        
        selectedContactType: state.leedsAndCustomers.selectedContactType,
    }));

    let favourites: any = [];

    useEffect(() => {
        const contactTypeAreaMap = leadCustomerAreaMap[selectedContactType];
        let arrLength = 6;
        while(arrLength > contactTypeAreaMap.length){
            arrLength = arrLength - 1;
        }
        for (let index = 0; index < arrLength; index++) {
            let item = contactTypeAreaMap[index];
            favourites.push({ icon: item.icon, text: item.label, path: item.path });            
        }
        setFavouritList(favourites);
    }, [selectedContactType]);

    const handleRowPopupClick = (li: any) => {    
        //reset modes
        dispatch(setEnduserDetailPageMode(pageModeEnum.Edit));
        dispatch(updateDetails(true));
        dispatch(setLeadDetailPageMode(pageModeEnum.Edit));
        
        if(!li.path || li.path == ''){
          navigate(sectionPathMap[selectedContactType] + `${selectedLeedOrCustomer?.[contactId[selectedContactType]]}`);
        }      
        else{            
          navigate(sectionPathMap[selectedContactType] + `${selectedLeedOrCustomer?.[contactId[selectedContactType]]}${li.path}`);
        }
        closeModal();
      };
    
      const closeModal = () => {
        dispatch(setIsModalOpen(false));
        dispatch(setIsAddContactModalOpen(false));
      };

    if(!selectedLeedOrCustomer){
        return (
              <div className="customer-details-card no-bg-color no-shadow border-bottom">
              <div className="icon-container">
                <FontAwesomeIcon icon={faSolid.faStar} className="sliders-icon" />
              </div>
              <h2>Favourites</h2>
              <p>Select a Lead or Customer to see your favourites</p>
            </div>
            );
    }

    return (
        <div>      
            <ListBox items={favouritList} title="FAVOURITES" cssClass='border-top-none border-left-none border-right-none' onClick={handleRowPopupClick} />     
        </div>
    )
}