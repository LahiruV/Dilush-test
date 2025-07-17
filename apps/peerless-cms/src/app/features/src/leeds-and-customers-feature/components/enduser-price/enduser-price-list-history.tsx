import { RootState } from "@peerless-cms/store";
import { EnduserPriceListHistoryGrid } from "@peerless/common";
import { DataGrid, ToastManager } from "@peerless/controls";
import { getEnduserPriceListHistory, saveEnduserPricelist } from "@peerless/queries";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import './enduser-price.css';
import { useMutation } from "@tanstack/react-query";
import { RenderStatusContentTable } from "@peerless/models";

export interface EnduserPriceListHistoryProps {
    msgMgr?: ToastManager,
    effectiveDate?: any
}

export function EnduserPriceListHistory(props: EnduserPriceListHistoryProps) {    
    const [isSaving, setIsSaving] = useState(false);    
    const [priceHistory, setPriceHistory] = useState([]);
    
    const { selectedLeedOrCustomer, contactType, isEUPriceQueryEnabled, childOriginators, originator, selectedDistributor } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,         
        contactType: state.leedsAndCustomers.selectedContactType,
        isEUPriceQueryEnabled: state.enduserPriceFilters.isEUPriceQueryEnabled,
        childOriginators: state.header.childOriginators,
        originator: state.header.selectedOriginator,
        selectedDistributor: state.enduserPriceFilters.selectedDistributor,
    }));

    const mutation = useMutation<any, Error, any>({
        mutationFn: saveEnduserPricelist
    });
    
    let priceHistoryArgs = {
        CustomerCode: selectedDistributor.value,
        EnduserCode: selectedLeedOrCustomer.endUserCode,
        OrderBy:'',
        EffectiveDate: ''
    }

    let gridView: any = <div className="dv-loading">Loading...</ div>;

    const { data: enduserPriceListHistoryData, status, error: enduserPriceListHistoryDataError, isLoading: isEnduserPriceListHistoryDataLoading } = getEnduserPriceListHistory(priceHistoryArgs);

    useEffect(() => {
      if(enduserPriceListHistoryData){
        setPriceHistory(enduserPriceListHistoryData);
      }
    }, [enduserPriceListHistoryData]);

    const onCellEdit = (e: any) => {
        let { rowData, newValue, field, originalEvent: event } = e;        
        switch (field) {          
          case 'price':
            if (newValue >= 0) 
              rowData[field] = Number(newValue);
            else 
              event.preventDefault();
            break;
          default:
            if (newValue.trim().length > 0) 
              rowData[field] = newValue;
            else 
              event.preventDefault();
            break;
        }
        
        setPriceHistory((prevData: any) =>
          prevData.map((item: any) =>
            item.catlogCode === rowData.catlogCode ? { ...item, ...rowData } : item
          )
        );
        
      };

    const handleSaveClick = () => {
        setIsSaving(true);
        const payload = {
          ChildOriginators: childOriginators,
          DefaultDepartmentId: originator.defaultDepartmentId,
          Originator: originator.userName,
          CustomerCode: selectedDistributor.value,
          EnduserCode: selectedLeedOrCustomer.endUserCode,
          ManagerMode: true,
          CustomerType: 'EndUser',
          StartIndex: 1,
          RowCount: 1000,
          OrderBy: 'catlog_code ASC',
          EndUserPricelist: priceHistory,
          EffectiveDate: props.effectiveDate
        }        
        mutation.mutate(payload, {
            onSuccess: (response: any) => {       
              setIsSaving(false);     
              if(response){
                props.msgMgr?.showMessage("success", "Success", "Price list history updated");
              }
            },
            onError: (error: any) => {
              setIsSaving(false);
              props.msgMgr?.showMessage("error", "Error", "Error occured while updating price list history");
              console.error('Failed to update');
            }
          });  
    }

    const renderStatusContent = {
      isRenderStatusContentTable: true,
      status: status,
      isFetch: isEnduserPriceListHistoryDataLoading,
      error: enduserPriceListHistoryDataError,
      isStatusOutput: true
    } as RenderStatusContentTable;

    const enduserPriceListHistoryGrid = new EnduserPriceListHistoryGrid(onCellEdit);
    
    return (    
        <div>
            <span className="eu-date-string">Customer Code : </span> <span className="eu-date-string-data">{selectedDistributor.value}</span>
            <span className="eu-date-string">Enduser Code : </span> <span className="eu-date-string-data">{selectedLeedOrCustomer.endUserCode}</span>      
            <DataGrid dataTable={enduserPriceListHistoryGrid} data={priceHistory} editMode={'cell'} renderStatusContent={renderStatusContent} />     
            <hr />
            <Button disabled={isSaving} type='button' variant='outline-dark' className='btn-submit float-right' onClick={handleSaveClick}>{isSaving ? 'Updating...' : 'Update'}</Button>
        </div>    
    )
}