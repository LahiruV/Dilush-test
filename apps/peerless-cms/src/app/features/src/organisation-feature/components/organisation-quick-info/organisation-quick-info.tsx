import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoBox } from "@peerless-cms/features-common-components";
import { RootState } from "@peerless-cms/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as faSolid from '@fortawesome/free-solid-svg-icons';
import './organisation-quick-info.css';

export const OrganisationQuickInfo = () => {
    const [orgInfo, setOrgInfo] = useState<any[]>([]);
    const [contactInfo, setContactInfo] = useState<any[]>([]);
    const { selectedOrganisation} = useSelector((state: RootState) => ({            
        selectedOrganisation: state.organisations.selectedOrganisation,
    }));

    

    useEffect(() => {
        if(selectedOrganisation != null){ 
            let contactInfo: any = [];
            let orgInfo: any = [];
            orgInfo.push({label: 'Correspondence', text: selectedOrganisation.correspondence});
            orgInfo.push({label: 'Preferred Method', text: selectedOrganisation.preferredMethod});
            orgInfo.push({label: 'No Of Employees', text: selectedOrganisation.noOfEmployees});
            orgInfo.push({label: 'Annual Revenue', text: selectedOrganisation.annualRevenue});

            contactInfo.push({label: 'Contact', text: selectedOrganisation.contact});
            contactInfo.push({label: 'Mobile', text: selectedOrganisation.mobile});
            contactInfo.push({label: 'Telephone', text: selectedOrganisation.telephone});
            contactInfo.push({label: 'State', text: selectedOrganisation.state});

            setOrgInfo(orgInfo);
            setContactInfo(contactInfo);
        }
        else{
            setOrgInfo([]);
            setContactInfo([]);
        }
    }, [selectedOrganisation]);

    if(selectedOrganisation == null || Object.keys(selectedOrganisation).length === 0)
        return (
          <div className="customer-details-card">
          <div className="icon-container">
            <FontAwesomeIcon icon={faSolid.faCog} className="sliders-icon" />
          </div>
          <h2>Organisation Details</h2>
          <p>Select an organisation to see the details</p>
        </div>
        );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InfoBox title="Organisation Info" contentList={orgInfo} cssClass='border-bottom-none border-left-none border-right-none' labelWidthClass="flex-none w-92" />  
            <InfoBox title="Contact Info" contentList={contactInfo} cssClass={' border-left-none border-right-none'} labelWidthClass='flex-none w-92' needBullets={true} />  
        </div>
    );
    
};