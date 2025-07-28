import { useDispatch, useSelector } from 'react-redux';
import { RootState, decrement, increment, pageModeEnum, resetFilter, resetSelectedContactType, resetShowLeastActive, setEnduserDetailPageMode, setFilter, setIsAddEnduserModalOpen, setIsAddLeadModalOpen, setLeadDetailPageMode, setSearchBy, setSelectedContactType, setSelectedLeedOrCustomer, updateDetails } from '@peerless-cms/store';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { faCake, faClose, faCopy, faMap, faPerson, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ListBox } from '@peerless-cms/features-common-components';
import './leeds-and-customers-filter.css'
import { contactTypeEnum } from '@peerless/utils';
import { DropDown } from '@peerless/controls';
import { useEffect, useState } from 'react';
import SearchBox from './search-box/search-box';

function LeedsAndCustomersFilter() {
  //const { value, searchBy, selectedLeedOrCustomer, selectedContactType } = useSelector((state: RootState) => state.leedsAndCustomers);
  const dispatch = useDispatch();

  const { value, searchBy, selectedLeedOrCustomer, selectedContactType, loggedUser, filters } = useSelector((state: RootState) => ({
    value: state.leedsAndCustomers.value,
    searchBy: state.leedsAndCustomers.searchBy,
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    selectedContactType: state.leedsAndCustomers.selectedContactType,
    loggedUser: state.header.loggedUser,
    filters: state.leedsAndCustomers.filter,
  }));

  // const items = [
  //   { icon: faPhone, text: 'Call cycle' },
  //   { icon: faMap, text: 'Map view' },
  //   { icon: faPerson, text: 'Leads' },
  //   { icon: faClose, text: 'De-activated leads' },
  //   { icon: faCopy, text: 'Converted leads' },
  //   { icon: faCake, text: 'Bakery' }
  // ];

  // const items: any = [];

  const contactTypes = [{ label: 'Lead', value: 'lead' }, { label: 'Customer', value: 'customer' }, { label: 'Enduser', value: 'enduser' }];
  const repTypes = [{ label: 'Bakery', value: 'B' }, { label: 'Food Services', value: 'F' }, { label: 'All', value: 'A' }];
  const saveTypes = [{ label: 'Save Load / Filter', value: 'slf' }];
  const statusTypes = [
    { label: 'Active', value: '1' },
    { label: 'In-Active', value: '0' },
    ...(selectedContactType == contactTypeEnum.lead ? [{ label: 'Converted', value: '2' }] : [])
  ];
  const occurrenceTypes = [{ label: 'Most Active', value: false }, { label: 'Least Active', value: true }];

  const [contactType, setContactType] = useState<any>();
  const [repType, setRepType] = useState(repTypes.find(f => f.value == loggedUser.repType));
  const [saveType, setSaveType] = useState<any>();
  const [statusType, setStatusType] = useState<any>(null);
  const [occurrenceType, setOccurrenceType] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (dispatch) {
      const updatedFilters = {
        ...filters,
        repType: repType != null ? repType.value : loggedUser.repType
      }
      dispatch(setFilter(updatedFilters));
    }
  }, [dispatch, repType, loggedUser]);

  useEffect(() => {
    if (filters) {
      setStatusType(statusTypes.find(f => f.value == filters.status));
      setOccurrenceType(occurrenceTypes.find(f => f.value == filters.showLeastActive));
    }
  }, [filters]);

  useEffect(() => {
    if (selectedContactType) {
      setContactType(contactTypes.find(f => f.value == selectedContactType))
    }
  }, [selectedContactType]);

  const onChangeContactType = (event: any) => {
    if (event == null) {
      dispatch(resetSelectedContactType(null));
      dispatch(setSelectedLeedOrCustomer(null));
      return;
    }
    dispatch(setSelectedContactType(event.value));
    dispatch(setSelectedLeedOrCustomer(null));
  };

  const openAddEnduserModel = () => {
    dispatch(setSelectedLeedOrCustomer(null));
    dispatch(setEnduserDetailPageMode(pageModeEnum.New));
    dispatch(setIsAddEnduserModalOpen(true));
    dispatch(updateDetails(false));
  }

  const openAddLeadModel = () => {
    // dispatch(setSelectedLeedOrCustomer(null));
    dispatch(setLeadDetailPageMode(pageModeEnum.New));
    dispatch(setIsAddLeadModalOpen(true));
    dispatch(updateDetails(false));
  }

  const popUpSettings = {
    width: '150px'
  }

  const contactPopUpSettings = {
    width: '150px'
  }

  const onChangeRepType = (e: any) => {
    if (e == null) {
      setRepType(repTypes.find(f => f.value == loggedUser.repType));
      return;
    }
    setRepType(e);
  }

  const onChangeSaveType = (e: any) => {
    setSaveType(e);
  }

  const onChangeStatusType = (e: any) => {
    if (e == null) {
      dispatch(resetFilter(null));
      return;
    }
    const updatedFilters = {
      ...filters,
      status: e.value
    }
    dispatch(setFilter(updatedFilters));
  }

  const onChangeOccurrenceType = (e: any) => {
    if (e == null) {
      dispatch(resetShowLeastActive(null));
      return;
    }
    const updatedFilters = {
      ...filters,
      showLeastActive: e.value
    }
    dispatch(setFilter(updatedFilters));
  }

  const clearAllFilters = () => {
    dispatch(resetSelectedContactType(null));
    dispatch(setSelectedLeedOrCustomer(null));
    dispatch(resetFilter(null));
    dispatch(setSearchBy(''));
    setRepType(repTypes.find(f => f.value == loggedUser.repType));
  }

  useEffect(() => {
    if (location?.pathname) {
      if (location.pathname.includes('/lead')) {
        dispatch(setSelectedContactType('lead'));
      } else if (location.pathname.includes('/customer')) {
        dispatch(setSelectedContactType('customer'));
      } else if (location.pathname.includes('/enduser')) {
        dispatch(setSelectedContactType('enduser'));
      }
    }
  }, [location.pathname, dispatch]);

  return (
    <div>
      {/* <div className='filter-top-container'>        
        <DropDown id={"filter-contact-type-drop"}
          className={"filter-combo width-main"}
          setValue={(e) => onChangeContactType(e)}
          value={contactType}
          datalist={contactTypes}
          textField={"label"}
          dataItemKey={"value"}
          fillMode={"outline"}
          size={"small"}
          popupSettings={contactPopUpSettings}
        />
      </div> */}
      {/* <div className='create-buttons-container'>
        {selectedContactType == contactTypeEnum.enduser && <button className='add-enduser' onClick={openAddEnduserModel}>Add New Enduser</button>}
        {selectedContactType == contactTypeEnum.lead && <button className='add-btn' onClick={openAddLeadModel}>Add New Lead</button>}
      </div> */}
      {/* <ListBox items={items} title='FILTERS' cssClass='border-left-none border-right-none border-bottom-none border-top-none' /> */}
      <div className='filter-bottom-container'>
        <span className='container-title margin-top-10'>FILTERS</span>
        <div className='filter-bottom-content'>
          <SearchBox />
          {/* <DropDown id={"filter-contact-type-drop"}
            className={"filter-combo"}
            setValue={(e) => onChangeContactType(e)}
            value={contactType}
            datalist={contactTypes}
            textField={"label"}
            dataItemKey={"value"}
            fillMode={"outline"}
            size={"small"}
            popupSettings={contactPopUpSettings}
          /> */}
          {/* <DropDown id={"filter-save-type-drop"} 
            className={"filter-combo"} 
            setValue={(e) => onChangeSaveType(e)} 
            value={saveType} 
            datalist={saveTypes} 
            textField={"label"} 
            dataItemKey={"value"} 
            fillMode={"outline"} 
            size={"small"} 
            popupSettings={popUpSettings} 
            /> */}
          {
            selectedContactType != contactTypeEnum.enduser &&

            <DropDown id={"filter-rep-type-drop"}
              className={"filter-combo"}
              setValue={(e) => onChangeRepType(e)}
              value={repType}
              datalist={repTypes}
              textField={"label"}
              dataItemKey={"value"}
              fillMode={"outline"}
              size={"small"}
              popupSettings={popUpSettings}
            />
          }

          <DropDown id={"filter-status-type-drop"}
            className={"filter-combo"}
            setValue={(e) => onChangeStatusType(e)}
            value={statusType}
            datalist={statusTypes}
            textField={"label"}
            dataItemKey={"value"}
            fillMode={"outline"}
            size={"small"}
            popupSettings={popUpSettings}
          />

          {
            selectedContactType == contactTypeEnum.enduser &&

            <DropDown id={"filter-occurrence-type-drop"}
              className={"filter-combo"}
              setValue={(e) => onChangeOccurrenceType(e)}
              value={occurrenceType}
              datalist={occurrenceTypes}
              textField={"label"}
              dataItemKey={"value"}
              fillMode={"outline"}
              size={"small"}
              popupSettings={popUpSettings}
            />
          }

          <a href='javascript:void(0)' className='clear-filters-link' onClick={clearAllFilters}>Clear all filters</a>
        </div>

      </div>
    </div>
  );
}

export default LeedsAndCustomersFilter;
