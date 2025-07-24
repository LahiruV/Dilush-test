import { ClaimsEnquiryClaimsGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { RenderStatusContentTable } from "@peerless/models";
import { useInView } from "react-intersection-observer";

interface ClaimsEnquiryUpperTableProps {
    claimsEnquiryList: any;
    isFetchingClaimsEnquiryList: boolean;
    isFetching: boolean;
    error: any;
    status: string;
    setIsFetchingClaimsEnquiryList: Function;
    isDataFiltered?: boolean;
    selectedClaim: any;
    handleSelectionChange: Function;
    pageSize: number;
    onPage: Function;
    onFilterClaims: Function;
    pageState: any;
}

export function ClaimsEnquiryUpperTable({ claimsEnquiryList, isFetchingClaimsEnquiryList, isFetching, error, status, setIsFetchingClaimsEnquiryList, isDataFiltered, selectedClaim, handleSelectionChange, pageSize, onPage, onFilterClaims, pageState }: ClaimsEnquiryUpperTableProps) {

    const claimsGrid = new ClaimsEnquiryClaimsGrid();
    const { ref, inView } = useInView({ triggerOnce: false });

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingClaimsEnquiryList || isFetching,
        error: error,
        setStateFunction: setIsFetchingClaimsEnquiryList,
        isStatusOutput: true,
        isHideClickFilterMessage: true,
    } as RenderStatusContentTable;


    return (
        <>
            <DataGrid uniqueId="claimUniqueId"
                // style={{ height: '300px' }}
                dataTable={claimsGrid}
                data={claimsEnquiryList && claimsEnquiryList.claimResponses}
                cssClasses={'sticky-header'}
                renderStatusContent={renderStatusContent}
                emptyMessage={isDataFiltered ? 'No records available' : 'Please click on filter to view data'}
                selectionMode={"single"}
                selectedRow={selectedClaim}
                setSelectedRow={handleSelectionChange}
                enablePagination={true}
                pageSize={pageSize}
                onFilterCallback={onFilterClaims}
                isServerSidePaging={true}
                firstIndex={pageState.first}
                totalRecords={claimsEnquiryList && claimsEnquiryList.totalRecord}
                onPage={onPage}
                isSelectionColumnShow={false}
                width="1350px"
                isScrollable={true}
                scrollHeight={350}
            // heightOffset={100}
            />
            <div ref={ref} style={{ height: '1px' }} />
        </>
    )
}

export default ClaimsEnquiryUpperTable;