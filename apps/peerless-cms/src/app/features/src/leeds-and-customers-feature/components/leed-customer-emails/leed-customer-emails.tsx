

/*----------   Does not use at the moment ----------*/


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { ListTable } from "@peerless-cms/features-common-components";
import { format } from 'date-fns';
import { string } from "zod";
import { useSelector } from "react-redux";
import { RootState, setSelectedEmail } from "@peerless-cms/store";
import { contactId, contactTypeEnum } from "@peerless/utils";
import { getLeadCustomerEmails } from "@peerless/queries";
import { generateUniqueString } from "@peerless/common";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface LeedCustomerEmailsProps {}

export function LeedCustomerEmails(props: LeedCustomerEmailsProps){
    const { ref, inView } = useInView({ triggerOnce: false });
    const { selectedLeedOrCustomer, selectedEmail, loggedUser, originator, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        selectedEmail: state.leedsAndCustomers.selectedEmail,
        loggedUser: state.header.loggedUser,
        originator: state.header.selectedOriginator,
        contactType: state.leedsAndCustomers.selectedContactType
    }));

    let args = {
        LeadId: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.[contactId[contactType]] : 0,
        CustomerCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.[contactId[contactType]] : '',
        ChildOriginators: ` (originator = '${originator.userName}')`, 
        Originator: loggedUser.userName,
        DefaultDepartmentId: originator.defaultDepartmentId,
        ManagerMode: true,
        OrderBy: "mail_id asc",
        StartIndex: 1,
        RowCount: 50
    }

    const directoryPath: any = 'emails';  
    const sessionId: any = generateUniqueString();
    const payload = { args, directoryPath, sessionId };
    const { leadCustomeEmailData, error, status, fetchNextPage, isFetchingNextPage, hasNextPage } = getLeadCustomerEmails(payload, contactType);

    const handleRowClick = (row: any) => {
        
    };

    const columns = [        
        { name: 'From', selector: (row:any) => row.from, sortable: true, width: '192px' },
        { name: 'Email Address', selector: (row: any) => row.to, sortable: true },
        { name: 'Subject', selector: (row: any) => row.subject, sortable: true },
        { name: 'Date', selector: (row:any) => format(new Date(row.date), 'MMMM dd, yyyy'), sortable: true, width: '140px' },
    ];

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {      
          fetchNextPage().then(result => {
          }).catch(error => {
            console.error("Error fetching next page");
          });
        }
      }, [fetchNextPage, inView]);
    
      if (status === 'pending') {
        return <div>Loading...</div>;
      }
    
      if (status === 'error') {
        return <div>{error?.message}</div>;
    }

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faEnvelope} size='1x' />Emails</span>           
        </div>
    );

    const main = (
        <div>
            <ListTable columns={columns} data={leadCustomeEmailData} handleRowClick={handleRowClick} dispatchAction={setSelectedEmail} selectedRow={selectedEmail} rowIdColumn={"emailID"} />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    )
    return <SectionMainBase header={header} main={main}></SectionMainBase>;
}