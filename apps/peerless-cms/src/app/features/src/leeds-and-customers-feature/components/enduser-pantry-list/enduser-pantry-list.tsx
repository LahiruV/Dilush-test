import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { DataGrid, GridButtonWidgetProps, ToastManager } from "@peerless/controls";
import { EnduserPantryListGrid } from "@peerless/common";
import { getPantryList, updateCustomerPantrylistItem } from "@peerless/queries";
import { useSelector } from "react-redux";
import { RootState } from "@peerless-cms/store";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { contactId, contactTypeEnum, contactTypeName } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";

export interface EnduserPantryListProps { }

export function EnduserPantryList(props: EnduserPantryListProps) {
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const { selectedLeedOrCustomer, originator, contactType } = useSelector((state: RootState) => ({    
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,   
        originator: state.header.selectedOriginator,        
        contactType: state.leedsAndCustomers.selectedContactType,
    }));

    const [buttonOptions, setButtonOptions] = useState<GridButtonWidgetProps | null>(null);

    const mutationUpdatePantryItem = useMutation<any, Error, any>({
        mutationFn: updateCustomerPantrylistItem
    });

    const header = (
        <div className="lead-customer-detail-section-header-container margin-bottom-20">
            <span className="center-align section-title">
                {contactTypeName[contactType]} 
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faListAlt} size='1x' />Pantry List</span>
                <span className="font-light">&nbsp; | &nbsp;</span>
                <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
            </span>             
        </div>
    );

    const payload = {
        CustomerCode: selectedLeedOrCustomer.customerCode,
        EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.[contactId[contactType]] : '',
        StartIndex: 1,
        RowCount: 1000
    }
   
    const {data: pantryListData, status: pantryStatus, error: errorPantryList, isLoading: isLoadingPantryList, refetch: refetchPantryList} = getPantryList(payload, contactType);
    //const pantryListData: any = [{catlogCode: 'cat001', isUsed: true}, {catlogCode: 'cat002', isUsed: false}];
    
    const gridButtonCallback = async (type: string, rowData: any) => {
        const buttonOptions: GridButtonWidgetProps = {
            name: type === 'add' ? 'Adding...' : 'Removing...',
            isDisabled: true,
            actionType: type,
            rowId: contactType === contactTypeEnum.customer ? rowData.catalogCode : rowData.catlogCode,
        };
        setButtonOptions(buttonOptions);
    
        const updatePayload = {
            pantrylistId: Number(rowData.id),
            catlogCode: contactType === contactTypeEnum.customer ? rowData.catalogCode : rowData.catlogCode,
            isUsed: !rowData.isUsed,
        };
    
        try {
            await mutationUpdatePantryItem.mutateAsync(updatePayload); 
            const result = await refetchPantryList();
    
            if (result.status === 'success') {
                messageMgr.showMessage("success", "Success", "Successfully updated");
            }
        } catch (error) {
            console.error('Failed to update');
            messageMgr.showMessage("error", "Error", "Failed to update pantry item.");
        } finally {
            setButtonOptions(null);
        }
    };
    
    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: pantryStatus,
        isFetch: isLoadingPantryList,
        error: errorPantryList,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const pantryListGrid = new EnduserPantryListGrid(gridButtonCallback, buttonOptions, contactType);
    const main = (
        <>
            <ToastMessages ref={messagesRef} />
            <DataGrid 
                dataTable={pantryListGrid} 
                data={pantryListData} 
                renderStatusContent={renderStatusContent} 
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
            />
        </>
        
    );

    return <SectionMainBase header={header} main={main}></SectionMainBase>;
}