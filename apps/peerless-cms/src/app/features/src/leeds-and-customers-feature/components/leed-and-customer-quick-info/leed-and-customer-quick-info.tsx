import { useDispatch, useSelector } from 'react-redux';
import { RootState, decrement, increment, pageModeEnum, setArticleAddress, setContactPersonPageMode, setContacts, setIsAddContactModalOpen, setIsShowAddContactPerson } from '@peerless-cms/store';
import { Link } from 'react-router-dom';
import { HeaderTagProps, InfoBox, TitleButtonProps } from '@peerless-cms/features-common-components';
import * as faSolid from '@fortawesome/free-solid-svg-icons';
import * as faRegular from "@fortawesome/free-regular-svg-icons";
import { useContactsByOrigin } from '@peerless/queries';
import './leed-and-customer-quick-info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { contactOrderBy, contactTypeEnum, contactTypeName } from '@peerless/utils';
import { getDate } from '@peerless/common';
import { format } from 'date-fns';

function LeedAndCustomerQuickInfo() {
  const { selectedLeedOrCustomer, originator, contacts, articleAddress, selectedContactType, isAddContactModalOpen } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer:  state.leedsAndCustomers.selectedLeedOrCustomer,
    originator: state.header.selectedOriginator,
    contacts: state.leedsAndCustomers.contacts,
    articleAddress: state.leedsAndCustomers.articleAddress,
    selectedContactType: state.leedsAndCustomers.selectedContactType,
    isAddContactModalOpen: state.modal.isAddContactModalOpen,
  }));
  const dispatch = useDispatch();

  let contactInfoListItem: { label: string; text: string }[] = [];
  let marketListItem: { label: string; text: string }[] = [];
  let addressDetails: string = '';
  let isActive: HeaderTagProps;
  let additionalInfoListItem: { label: string; text: string }[] = [];
  
  let args = {
    LeadId: selectedLeedOrCustomer?.sourceId,
    Originator: originator.userName, 
    ChildOriginators: ` (originator = '${originator.userName}')`, 
    ClientType: 'SALES',
    OrderBy: contactOrderBy[selectedContactType],
    DefaultDepartmentId: originator.defaultDepartmentId,
    CustomerCode: selectedLeedOrCustomer?.customerCode,
    EnduserCode: selectedLeedOrCustomer?.endUserCode,
    ManagerMode: true,
    StartIndex: 1,
    RowCount: 10
  }
  const includeChildReps = true;

  const payload = { args, includeChildReps };

  const { data, error, isLoading, refetch } = useContactsByOrigin(payload, selectedContactType);

  useEffect(() => {
    if(selectedContactType == contactTypeEnum.customer && data != null && data.length > 0){
      dispatch(setIsShowAddContactPerson(false));
    }
    else{
      dispatch(setIsShowAddContactPerson(true));
    }
  },[data]);

  useEffect(() => {
    if(isAddContactModalOpen == false){
      refetch();
    }
  }, [isAddContactModalOpen]);

  if(!selectedLeedOrCustomer)
    return (
      <div className="customer-details-card">
      <div className="icon-container">
        <FontAwesomeIcon icon={faSolid.faCog} className="sliders-icon" />
      </div>
      <h2>Customer Details</h2>
      <p>Select a Lead or Customer to see the details</p>
    </div>
    );

  contactInfoListItem = [];
  if(isLoading){      
    contactInfoListItem.push({label: "Loading...", text: ""});
  }
  else{    
    if(data && data.length > 0 && data){
      contactInfoListItem = data.map((contact: any) => ({
        label: contact.firstName,
        text: contact.telephone
      }));
    }
    else{
      contactInfoListItem.push({label: "No contacts", text: ""});
    }
  }
    
  marketListItem = [
    {label: "Market :", text: selectedLeedOrCustomer.industryDescription},
    {label: "Sub Market :", text: selectedLeedOrCustomer.business}
  ]

  additionalInfoListItem = [
    {label: "Assigned To :", text: (selectedLeedOrCustomer.repCode != null && selectedLeedOrCustomer.repCode.trim() != '' ? selectedLeedOrCustomer.repCode : 'Not Provided')},
    {label: "Cust Category :", text: (selectedLeedOrCustomer.customerCategoryDescription != null && selectedLeedOrCustomer.customerCategoryDescription.trim() != '' ? selectedLeedOrCustomer.customerCategoryDescription : 'Not Provided')},
    {label: "Contact :", text: (selectedLeedOrCustomer.contact != null && selectedLeedOrCustomer.contact.trim() != '' ? selectedLeedOrCustomer.contact : 'Not Provided')},
    {label: "Telephone :", text: (selectedLeedOrCustomer.telephone != null && selectedLeedOrCustomer.telephone.trim() != '' ? selectedLeedOrCustomer.telephone : 'Not Provided')},
    {label: "Email :", text: (selectedLeedOrCustomer.emailAddress != null && selectedLeedOrCustomer.emailAddress.trim() != '' ? selectedLeedOrCustomer.emailAddress : 'Not Provided')},
  ]

  const openAddContactModal = (row: any, event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setContactPersonPageMode(pageModeEnum.New));
    dispatch(setIsAddContactModalOpen(true));
  };

  const titleButton: TitleButtonProps = {
      displayText: "Add Contact",
      callbackMethod: openAddContactModal
  }

  const activeHeaderTag: HeaderTagProps = {
      icon: faSolid.faCheckCircle,
      text: 'Active',
      cssClass: 'active-tag'
  }

  const deactiveHeaderTag: HeaderTagProps = {
      icon: faRegular.faTimesCircle,
      text: 'Deactive',
      cssClass: 'deactive-tag'
  }
   
  isActive = !selectedLeedOrCustomer.status || selectedLeedOrCustomer.status.trim().toLowerCase() === 'n' ? activeHeaderTag : deactiveHeaderTag;

  addressDetails = ((selectedLeedOrCustomer.address && selectedLeedOrCustomer.address.length > 0) ? selectedLeedOrCustomer.address + ', \n' : '') +  
                          //((selectedLeedOrCustomer.address1 && selectedLeedOrCustomer.address1.length > 0) ? selectedLeedOrCustomer.address1 + ', ' : '') +
                          //((selectedLeedOrCustomer.address2 && selectedLeedOrCustomer.address2.length > 0) ? selectedLeedOrCustomer.address2 + ', ' : '') +
                          ((selectedLeedOrCustomer.city && selectedLeedOrCustomer.city.length > 0) ? selectedLeedOrCustomer.city + ', \n' : '') +
                          ((selectedLeedOrCustomer.state && selectedLeedOrCustomer.state.length > 0) ? selectedLeedOrCustomer.state + ', \n' : '') +
                          ((selectedLeedOrCustomer.postalCode && selectedLeedOrCustomer.postalCode.length > 0) ? selectedLeedOrCustomer.postalCode + ', ' : '');

  if(addressDetails.trim().length > 0){
    addressDetails = replaceLastOccurrence(addressDetails, ',', '');
  }
  else{
    addressDetails = 'No address provided';
  }

  function replaceLastOccurrence(orgStr:string, char:string, replacement:string) {
    const lastIndex = orgStr.lastIndexOf(char);
    if (lastIndex === -1) return orgStr; // Character not found, return original string
    
    return orgStr.substring(0, lastIndex) + replacement + orgStr.substring(lastIndex + 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InfoBox title={contactTypeName[selectedContactType] + " Address"} header={selectedLeedOrCustomer.company} headerTag={isActive} contentText={addressDetails} cssClass='border-top-none border-bottom-none border-left-none border-right-none' />  
      <InfoBox title="Contact Person" titleBtn={((selectedContactType == contactTypeEnum.customer && contactInfoListItem[0].label.trim() == 'No contacts') || 
        selectedContactType != contactTypeEnum.customer) ? titleButton : undefined} contentList={contactInfoListItem} 
        cssClass={ (selectedContactType.toLocaleLowerCase() === contactTypeEnum.lead? 'border-bottom-none' : '') + ' border-left-none border-right-none'} labelWidthClass='w-110' needBullets={true} />  
      {selectedContactType.toLocaleLowerCase() === contactTypeEnum.lead &&  <InfoBox title="Market" contentList={marketListItem} cssClass= 'border-left-none border-right-none' labelWidthClass='w-80' /> }
      {selectedContactType.toLocaleLowerCase() != contactTypeEnum.lead &&  <InfoBox title={"Grade"} contentText={(selectedLeedOrCustomer.grade != null && selectedLeedOrCustomer.grade.trim() != '' ? selectedLeedOrCustomer.grade : 'Not Provided')} 
        cssClass='border-top-none border-left-none border-right-none' />}
      {selectedContactType.toLocaleLowerCase() != contactTypeEnum.lead &&  <InfoBox title={"Last Activity Date"} contentText={(selectedLeedOrCustomer.lastActiveDate != null && getDate(selectedLeedOrCustomer.lastActiveDate).toString() != '1-01-01' ? format(getDate(selectedLeedOrCustomer.lastActiveDate), 'dd/MM/yyyy') : 'Not Provided')} 
        cssClass='border-top-none border-left-none border-right-none' />}
      {selectedContactType.toLocaleLowerCase() == contactTypeEnum.enduser &&  <InfoBox title={"Other Information"} contentList={additionalInfoListItem} labelWidthClass='w-65'listClass='display-block content-wrap'
        cssClass='border-top-none border-left-none border-right-none' />}
    </div>
  );

}

export default LeedAndCustomerQuickInfo;
