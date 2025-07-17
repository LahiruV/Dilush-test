import { ListBox } from '@peerless-cms/features-common-components';
import FeaturesBase from '../../lib/features-base';
import LeedAndCustomerQuickInfo from '../components/leed-and-customer-quick-info/leed-and-customer-quick-info';
import LeedsAndCustomersFilter from '../components/leeds-and-customers-filter';
import LeedsAndCustomersList from '../components/leeds-and-customers-list/leeds-and-customers-list';
import SearchBox from '../components/search-box/search-box';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { pageModeEnum, RootState, setEnduserDetailPageMode, setIsAddEnduserModalOpen, setIsAddLeadModalOpen, setLeadDetailPageMode, setSelectedArea, setSelectedContactType, setSelectedLeedOrCustomer, setSelectedOrganisation, updateDetails } from '@peerless-cms/store';
import { LeadCustomerFavourites } from '../components';
import { contactTypeEnum, contactTypeName } from '@peerless/utils';
import './leeds-and-customer-section.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

export const LeedsAndCustomersSection = () => {
  const dispatch = useDispatch();

  const { selectedContactType } = useSelector((state: RootState) => ({
    selectedContactType: state.leedsAndCustomers.selectedContactType,
  }));

  useEffect(() => {
    dispatch(setSelectedArea('leeds-and-customers'));
  }, []);

  useEffect(() => {
    if (dispatch) {
      if (selectedContactType == contactTypeEnum.organisation) {
        dispatch(setSelectedContactType('customer'));
        dispatch(setSelectedOrganisation(null));
      }
    }
  }, [dispatch]);

  const openAddEnduserModel = () => {
    dispatch(setSelectedLeedOrCustomer(null));
    dispatch(setEnduserDetailPageMode(pageModeEnum.New));
    dispatch(setIsAddEnduserModalOpen(true));
    dispatch(updateDetails(false));
  }

  const openAddLeadModel = () => {
    dispatch(setLeadDetailPageMode(pageModeEnum.New));
    dispatch(setIsAddLeadModalOpen(true));
    dispatch(updateDetails(false));
  }

  const aside = (
    <div>
      <div className='contact-type-header border-bottom'>
        <FontAwesomeIcon icon={fa.faContactCard} className='heaader-icon' /> {contactTypeName[selectedContactType]}
      </div>
      {selectedContactType == contactTypeEnum.enduser &&
        <div className='create-buttons-container border-bottom padding-center'>
          <button className='add-enduser' onClick={openAddEnduserModel}>Add New Enduser</button>
        </div>
      }
      {selectedContactType == contactTypeEnum.lead &&
        <div className='create-buttons-container border-bottom padding-center'>
          <button className='add-btn' onClick={openAddLeadModel}>Add New Lead</button>
        </div>
      }
      <LeedsAndCustomersFilter />
      <LeadCustomerFavourites />
    </div>
  );

  return <FeaturesBase aside={aside} main={<LeedsAndCustomersList />} article={<LeedAndCustomerQuickInfo />} isDefaultCollapsed={false} />;
};
