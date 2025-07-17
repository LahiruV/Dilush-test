import { RootState } from "@peerless-cms/store";
import { useSelector } from "react-redux";
import { CustomerEUListPriceGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { RenderStatusContentTable } from "@peerless/models";


export interface CustomerEUPriceListTableProps {
    dataList?: any,
    isShowDelete?: boolean,
    isEditable?: boolean,
    onCellEditCallback?: any;    
    rowPopupClickCallback?: any;
    status?: any;
    isLoading?: boolean;
    error?: any;
  }

  export function CustomerEUPriceListTable(props: CustomerEUPriceListTableProps) {     
    const { customerEUPriceList } = useSelector((state: RootState) => ({        
        customerEUPriceList: state.leedsAndCustomers.customerEUPriceList,
    }));

    const renderStatusContent = {
            isRenderStatusContentTable: true,
            status: props.status,
            isFetch: props.isLoading,
            error: props.error,
            isStatusOutput: true
          } as RenderStatusContentTable;
                   
    let custEUListPriceGrid = new CustomerEUListPriceGrid(props.rowPopupClickCallback, props.isEditable, props.isShowDelete, props.onCellEditCallback);
      
    return (
        <div>        
          <DataGrid dataTable={custEUListPriceGrid} data={props.dataList ?? customerEUPriceList} editMode={'cell'} renderStatusContent={renderStatusContent} />                            
        </div>
    )

  }

//onCellEditComplete={props.onCellBlurCallback}








