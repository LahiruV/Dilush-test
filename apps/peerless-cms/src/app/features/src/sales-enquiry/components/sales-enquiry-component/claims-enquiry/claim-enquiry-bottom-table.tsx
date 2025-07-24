import { ClaimsEnquiryProductGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { RenderStatusContentTable } from "@peerless/models";

interface ClaimsEnquiryBottomTableProps {
    claimsDetailsList: any;
    selectedClaim: any;
    onFilterProducts: Function;
    detailStatus: any;
    isLoadingDetail: boolean;
    detailError: any;
}

export function ClaimsEnquiryBottomTable({ claimsDetailsList, selectedClaim, onFilterProducts, detailStatus, isLoadingDetail, detailError }: ClaimsEnquiryBottomTableProps) {
    const productsGrid = new ClaimsEnquiryProductGrid();

    const renderStatusContentDetail = {
        isRenderStatusContentTable: true,
        status: detailStatus,
        isFetch: isLoadingDetail,
        error: detailError,
        isStatusOutput: true,
        isHideClickFilterMessage: true,
    } as RenderStatusContentTable;

    return (
        <>
            <DataGrid dataTable={productsGrid} data={claimsDetailsList} isScrollable={true} scrollHeight={250} cssClasses={"sticky-header"}
                emptyMessage={(selectedClaim == null ? "Select a claim to view details" : "No records available")} onFilterCallback={onFilterProducts} renderStatusContent={renderStatusContentDetail} />
        </>
    )
}

export default ClaimsEnquiryBottomTable;