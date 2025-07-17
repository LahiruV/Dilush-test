import { RootState, setIsFilterBtnDisabled, setIsQueryEnabled } from "@peerless-cms/store";
import { EnduserSalesGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { getEnduserSalesWithAllProducts } from "@peerless/queries";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { contactTypeName } from "@peerless/utils";
import { RenderStatusContentTable } from "@peerless/models";

export interface EnduserSalesProps { }

export function EnduserSales(props: EnduserSalesProps) {
    const dispatch = useDispatch();

    const { selectedLeedOrCustomer, originator, filterYear, filterPeriod, isAddProductsWithNoSales, isQueryEnabled, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        originator: state.header.selectedOriginator,
        filterYear: state.enduserSalesFilters.year,
        filterPeriod: state.enduserSalesFilters.period,
        isAddProductsWithNoSales: state.enduserSalesFilters.isIncludeProductsWithNoSales,
        isQueryEnabled: state.enduserSalesFilters.isQueryEnabled,
        contactType: state.leedsAndCustomers.selectedContactType,
    }));

    useEffect(() => {
        return () => {
            dispatch(setIsQueryEnabled(false));
        };
    }, [dispatch]);

    let payload = {
        Args: {
            EnduserCode: selectedLeedOrCustomer.endUserCode,
            CustomerCode: selectedLeedOrCustomer.customerCode,
            RepCode: originator.repCode,
            SYear: filterYear.value,
            SMonth: filterPeriod.value,
            StartIndex: 1,
            RowCount: 1000,
        },
        IncludeProductsWithNoSales: isAddProductsWithNoSales,
        ActiveOnly: true
    }

    const { data: euSalesData, error: errorSales, status: salesStatus, isLoading: isLoadingSales } = getEnduserSalesWithAllProducts(payload, isQueryEnabled);

    useEffect(() => {
        if (isLoadingSales == false)
            dispatch(setIsFilterBtnDisabled(false));
        else
            dispatch(setIsFilterBtnDisabled(true));
    }, [isLoadingSales, euSalesData]);


    const args = {
        year: filterYear.value,
        month: filterPeriod.value,
        prodWithNoSales: isAddProductsWithNoSales,
        activeOnly: 1,
    }

    // const rowGroupHeaderTemplate = (data: any) => {        
    //     return (
    //         <tr>
    //             <td colSpan={3} style={{ fontWeight: 'bold', background: '#f4f4f4' }}>
    //                 {data.customerCode + ' - ' + data.customerName}
    //             </td>
    //         </tr>
    //     );
    // };

    const calculateForColumnsFooter = (customer: any, enduser: any, field: any) => {
        let total = 0;
        if (euSalesData) {
            for (let item of euSalesData) {
                if (item.customerCode === customer && item.endUserCode == enduser)
                    total = total + Number(item?.[field]);
            }
        }
        return total;
    };

    const groupFooterTemplate = (data: any) => {
        return (
            <React.Fragment>
                <td colSpan={4} className="font-bold">Total:</td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month1')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month2')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month3')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month4')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month5')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month6')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month7')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month8')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month9')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month10')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month11')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'month12')}</div>
                </td>
                <td style={{ textAlign: 'left', paddingInline: '10px 16px' }}>
                    <div className="flex font-bold w-full">{calculateForColumnsFooter(data.customerCode, data.endUserCode, 'totalCases')}</div>
                </td>
            </React.Fragment>
        );
    };

    let previousCustomerCode: any = null;
    let previousEndUserCode: any = null;
    const rowGroupHeaderTemplate = (data: any) => {
        let customerHeader = null;
        let endUserHeader = null;

        if (data.customerCode !== previousCustomerCode) {
            customerHeader = (
                <tr>
                    <td colSpan={3} style={{ fontWeight: 'bold', background: '#e0e0e0' }}>
                        {data.customerCode + ' - ' + data.customerName}
                    </td>
                </tr>
            );
            previousCustomerCode = data.customerCode;
            previousEndUserCode = null;
        }

        if (data.endUserCode !== previousEndUserCode) {
            endUserHeader = (
                <tr>
                    <td colSpan={3} style={{ paddingLeft: '20px', fontWeight: 'bold', background: '#f0f0f0' }}>
                        {data.endUserCode + ' - ' + data.endUserName + ' - ' + data.repCode}
                    </td>
                </tr>
            );
            previousEndUserCode = data.endUserCode;
        }

        return (
            <>
                {customerHeader}
                {endUserHeader}
            </>
        );
    };

    const header = (
        <div className="lead-customer-detail-section-header-container margin-bottom-20">
            <span className="center-align section-title">
                {contactTypeName[contactType]}
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faCoins} size='1x' />Sales</span>
                <span className="font-light">&nbsp; | &nbsp;</span>
                <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
            </span>
        </div>
    )

    const emptyMessage = isQueryEnabled ? 'No records found' : 'Please click on filter to view data';

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: salesStatus,
        isFetch: isLoadingSales,
        error: errorSales,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const euSalesTable = new EnduserSalesGrid(args);

    const main = (
        <DataGrid dataTable={euSalesTable} data={euSalesData} rowGroupMode="subheader" groupRowsBy={'customerCode'} sortMode="single" renderStatusContent={renderStatusContent}
            sortField={'customerCode'} sortOrder={1} expandableRowGroups={true} rowGroupHeaderTemplate={rowGroupHeaderTemplate} rowGroupFooterTemplate={groupFooterTemplate} />
    )

    return <SectionMainBase header={header} main={main}></SectionMainBase>;
}