import FeaturesBase from "../../../../lib/features-base";
import { formatNumber, useResetTablePagination } from "@peerless/common";
import { HeaderFilterContainer, InfoBox } from "@peerless-cms/features-common-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setClaimEnquiryTotalsData, setIsFetchingClaimsEnquiryList, setSalesEnquirySelectedArea, setSelectedClaim, setTriggerClaimsEnquiryFiltersFormSubmit } from "@peerless-cms/store";
import { GetClaimDetail, getClaimsEnquiry } from "@peerless/queries";
import { useEffect, useRef, useState } from "react";
import SectionMainBase from "../../../../lib/section-main-base";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { ClaimsEnquiryFilters } from "./claims-enquiry-filters";
import '../../../../styles/header-top-filter.css'
import ClaimsEnquiryMain from "./claims-enquiry-main";

export function ClaimsEnquiry() {
  const parentRefClaims = useRef<HTMLDivElement | null>(null);
  const parentRefProducts = useRef<HTMLDivElement | null>(null);
  const isInitialRender = useRef(true);
  const dispatch = useDispatch();
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [scrollHeightClaims, setScrollHeightClaims] = useState('100%');
  const [scrollHeightProducts, setScrollHeightProducts] = useState('100%');
  const [totalOfClaims, setTotalOfClaims] = useState('$0.00');
  const [pageSize, setPageSize] = useState(10);
  const [defaultPageSize, setDefaultPageSize] = useState(10);
  const [pageState, setPageState] = useState({ first: 0, rows: 20 });
  const [tableFilters, setTableFilters] = useState<any>();

  const rowHeight = 45;

  const { isFetchingClaimsEnquiryList, selectedClaim, claimEnquiryTotalsData, fromDate, toDate, product, customer, reason, parent, subParent, subParentGroup, rep, promo, payMethod, claimType, claimStatus } = useSelector((state: RootState) => (
    state.claimsEnquiryFilters
  ));

  useEffect(() => {
    if (isFetchingClaimsEnquiryList) {
      setIsDataFiltered(true);
    }
  }, [isFetchingClaimsEnquiryList]);

  useEffect(() => {
    dispatch(setSelectedClaim(null));
    dispatch(setSalesEnquirySelectedArea('claims-enquiry'));
  }, []);

  useEffect(() => {
    const calculatePageSize = () => {
      if (parentRefClaims.current) {
        const containerHeight = parentRefClaims.current.offsetHeight;
        const calculatedPageSize = Math.floor(containerHeight / rowHeight);
        setPageSize(calculatedPageSize);
        setDefaultPageSize(calculatedPageSize);
        setPageState({ first: 0, rows: calculatedPageSize });
      }
    };

    calculatePageSize(); // Initial calculation
    window.addEventListener('resize', calculatePageSize); // Recalculate on window resize
    return () => window.removeEventListener('resize', calculatePageSize);
  }, [rowHeight]);

  const payload = {
    DateClaimStart: fromDate,
    DateClaimEnd: toDate,
    CatalogCode: product?.value,
    AnalysisCode: reason?.value,
    ParentCustomer: parent?.value,
    CustSubGroup: subParent?.value,
    SubParentGroup: subParentGroup?.value,
    RepCode: rep?.value,
    PromoNo: promo,
    CustCode: customer?.value,
    PayMethod: payMethod?.value,
    ClaimAppType: claimType?.value,
    ClaimStatus: claimStatus?.value,
    NextRecord: pageState.first,
    NumberOfRecords: pageState.rows,
    ClaimTableFilters: tableFilters,
    // ShowQpr: claimFilters?.showQpr ? '1' : '0',
    // ForProcess: '', //claimFilters?.forProcessing,
    // ProcessStatus: '', //claimFilters?.processingStatus,
  }
  const { data: claimsEnquiryList, status, error, isLoading, refetch, isFetching, isFetched } = getClaimsEnquiry(payload, isFetchingClaimsEnquiryList);

  useResetTablePagination(7, setPageState, [
    fromDate, toDate, product?.value, customer?.value, reason?.value, parent?.value,
    subParent?.value, subParentGroup?.value, rep?.value, promo, payMethod?.value,
    claimType?.value, claimStatus?.value, tableFilters
  ], 0);

  // useEffect(() => {
  //   setPageState({ first: 0, rows: 20 });
  // }, [claimFilters]);

  const payloadDetail = {
    claimNo: selectedClaim != null ? selectedClaim.claimNo : 0,
  }
  const { data: claimsDetailsList, status: detailStatus, error: detailError, isLoading: isLoadingDetail } = GetClaimDetail(payloadDetail, (selectedClaim != null ? true : false));

  useEffect(() => {
    if (claimsEnquiryList) {
      const totalAmount = claimsEnquiryList.totalAmount ?? 0;
      const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(totalAmount);
      setTotalOfClaims(formattedTotal);
    }
    dispatch(setSelectedClaim(null));
  }, [claimsEnquiryList]);


  const handleSelectionChange = (row: any) => {
    if (row == null || selectedClaim?.claimUniqueId === row.claimUniqueId) {
      dispatch(setSelectedClaim(null));
    } else {
      dispatch(setSelectedClaim(row));
    }
  };

  const onFilterClaims = (e: any, isClear: boolean) => {
    let size = 0.80;
    if (isClear) {
      size = 0.91;
      setPageSize(defaultPageSize);
      setPageState({ first: 0, rows: defaultPageSize });
    }
    else {
      setPageSize(defaultPageSize - 2);
      setPageState({ first: 0, rows: (defaultPageSize - 2) });
    }

    if (parentRefClaims.current) {
      const parentHeight = parentRefClaims.current.offsetHeight; // Get parent's height
      setScrollHeightClaims(`${parentHeight * size}px`);
    }
    dispatch(setSelectedClaim(null));
    setTableFilters(e ? { ClaimNo: e.filters.claimNo, ComplaintNo: e.filters.complaintNo, CustClaimNo: e.filters.custClaimNo, DateClaim: e.filters.dateClaim, DateEntered: e.filters.dateEntered } : null);
  }

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the initial render
      isInitialRender.current = false;
      return;
    }
    dispatch(setIsFetchingClaimsEnquiryList(true));
  }, [tableFilters]);

  useEffect(() => {
    const size = 0.88
    if (parentRefProducts.current) {
      const parentHeight = parentRefProducts.current.offsetHeight; // Get parent's height
      setScrollHeightProducts(`${parentHeight * size}px`);
    }

    // a resize event listener to handle dynamic resizing
    const handleResize = () => {
      if (parentRefProducts.current) {
        const parentHeight = parentRefProducts.current.offsetHeight;
        setScrollHeightProducts(`${parentHeight * size}px`);
        refetch();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFilterProducts = (e: any, isClear: boolean) => {
    let size = 0.75;
    if (isClear) {
      size = 0.88;
    }
    if (parentRefProducts.current) {
      const parentHeight = parentRefProducts.current.offsetHeight; // Get parent's height
      setScrollHeightProducts(`${parentHeight * size}px`);
    }
  }

  const onPage = (event: any) => {
    const { first, rows } = event;
    setPageState({ first, rows: (first + rows) });
    dispatch(setIsFetchingClaimsEnquiryList(true));
  };

  useEffect(() => {
    if (Object.keys(claimsEnquiryList || {}).length > 0) {
      const data = Object.assign({}, claimsEnquiryList);
      delete data.claimResponses;
      dispatch(setClaimEnquiryTotalsData(data));
    }
  }, [isFetched])

  const handleExternalSubmit = () => {
    dispatch(setTriggerClaimsEnquiryFiltersFormSubmit(true));
  };

  useEffect(() => {
    if (
      status === 'success' &&
      claimsEnquiryList.claimResponses &&
      claimsEnquiryList.claimResponses.length > 0
    ) {
      handleSelectionChange(claimsEnquiryList.claimResponses[0]);
    }
  }, [status, claimsEnquiryList]);

  const header = (
    <>
      <HeaderFilterContainer title="Claims Enquiry" icon={fa2.faBriefcase} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
        <ClaimsEnquiryFilters isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} setTotalOfClaims={setTotalOfClaims} />
      )}
        onFilterClick={handleExternalSubmit}
        isFetching={isFetchingClaimsEnquiryList}
      />
    </>
  );

  const main = (
    <ClaimsEnquiryMain
      parentRefClaims={parentRefClaims}
      totalOfClaims={totalOfClaims}
      claimsEnquiryList={claimsEnquiryList}
      isFetchingClaimsEnquiryList={isFetchingClaimsEnquiryList}
      isFetching={isFetching}
      error={error}
      status={status}
      setIsFetchingClaimsEnquiryList={(value: boolean) => dispatch(setIsFetchingClaimsEnquiryList(value))}
      isDataFiltered={isDataFiltered}
      selectedClaim={selectedClaim}
      handleSelectionChange={handleSelectionChange}
      pageSize={pageSize}
      onPage={onPage}
      onFilterClaims={onFilterClaims}
      pageState={pageState}
      parentRefProducts={parentRefProducts}
      claimsDetailsList={claimsDetailsList}
      onFilterProducts={onFilterProducts}
      detailStatus={detailStatus}
      isLoadingDetail={isLoadingDetail}
      detailError={detailError} />
  );

  const articleData = [
    {
      label: "Customer :",
      text: selectedClaim?.name
    },
    {
      label: "Image No :",
      text: selectedClaim?.imageNo
    }
  ]

  const totalsData = [
    {
      label: "Total Rec :",
      text: formatNumber(claimEnquiryTotalsData?.totalRecord)
    },
    {
      label: "Total Amt :",
      text: formatNumber(claimEnquiryTotalsData?.totalAmount, { isCurrency: true })
    },
  ]

  const articleDefault = (
    <div className="customer-details-card">
      <h2>Claim Details</h2>
      <p>Select a claim to see the details</p>
    </div>
  );

  const article = (
    selectedClaim ? (
      <>
        <InfoBox header={"Narration  on claim: "} headerClass="title-1" headerSpannedValue={selectedClaim.claimNo} cssClass="border-left-none border-top-none padding-top-10" contentText={selectedClaim.narration} />

        <InfoBox contentList={articleData}
          cssClass='border-top-none border-bottom-none border-left-none border-right-none'
          labelWidthClass="title-1 padding-left-none" />

        <InfoBox
          contentList={totalsData}
          cssClass='border-bottom-none border-left-none border-right-none'
          labelWidthClass="title-1 padding-left-none"
          listParentClass="padding-right-30"
          valueClass="text-right font-bold-last"
        />
      </>
    ) :
      articleDefault
  )
  const mainContent = <SectionMainBase header={header} main={main} ></SectionMainBase>;

  return <FeaturesBase main={mainContent} article={article} cssClass='remove-margin-top-article article-shrinked' isNoScrollX={true} />;
}

export default ClaimsEnquiry;