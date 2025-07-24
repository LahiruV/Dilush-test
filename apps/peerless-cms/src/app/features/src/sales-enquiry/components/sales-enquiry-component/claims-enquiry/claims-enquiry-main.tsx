import ClaimsEnquiryBottomTable from "./claim-enquiry-bottom-table";
import ClaimsEnquiryUpperTable from "./claim-enquiry-upper-table";

interface ClaimsEnquiryMainProps {
    parentRefClaims: any;
    totalOfClaims: any;
    claimsEnquiryList: any;
    isFetchingClaimsEnquiryList: boolean;
    isFetching: boolean;
    error: any;
    status: string;
    setIsFetchingClaimsEnquiryList: any;
    isDataFiltered: boolean;
    selectedClaim: any;
    handleSelectionChange: Function;
    pageSize: number;
    onPage: Function;
    onFilterClaims: Function;
    pageState: any;
    parentRefProducts: any;
    claimsDetailsList: any;
    onFilterProducts: Function;
    detailStatus: any;
    isLoadingDetail: boolean;
    detailError: any;
}

export function ClaimsEnquiryMain({
    parentRefClaims,
    totalOfClaims,
    claimsEnquiryList,
    isFetchingClaimsEnquiryList,
    isFetching,
    error,
    status,
    setIsFetchingClaimsEnquiryList,
    isDataFiltered,
    selectedClaim,
    handleSelectionChange,
    pageSize,
    onPage,
    onFilterClaims,
    pageState,
    parentRefProducts,
    claimsDetailsList,
    onFilterProducts,
    detailStatus,
    isLoadingDetail,
    detailError
}: ClaimsEnquiryMainProps) {

    return (
        <div className="tables-container">
            <div className="claims-table-container" ref={parentRefClaims}>
                <div className="total-container border-bottom">
                    <span className="title-text">Claim Details</span>
                    <span className="total-spn"><b>Total of All Claims:</b> {totalOfClaims}</span>
                </div>
                <ClaimsEnquiryUpperTable
                    claimsEnquiryList={claimsEnquiryList}
                    isFetchingClaimsEnquiryList={isFetchingClaimsEnquiryList}
                    isFetching={isFetching}
                    error={error}
                    status={status}
                    setIsFetchingClaimsEnquiryList={setIsFetchingClaimsEnquiryList}
                    isDataFiltered={isDataFiltered}
                    selectedClaim={selectedClaim}
                    handleSelectionChange={handleSelectionChange}
                    pageSize={pageSize}
                    onPage={onPage}
                    onFilterClaims={onFilterClaims}
                    pageState={pageState}
                />
            </div>
            <div className="claims-product-table-container" ref={parentRefProducts}>
                <div className="table-title">
                    <span className="title-text"><b>Product Details</b></span>
                </div>
                <ClaimsEnquiryBottomTable
                    claimsDetailsList={claimsDetailsList}
                    selectedClaim={selectedClaim}
                    onFilterProducts={onFilterProducts}
                    detailStatus={detailStatus}
                    isLoadingDetail={isLoadingDetail}
                    detailError={detailError}
                />
            </div>
        </ div>
    )
}

export default ClaimsEnquiryMain;