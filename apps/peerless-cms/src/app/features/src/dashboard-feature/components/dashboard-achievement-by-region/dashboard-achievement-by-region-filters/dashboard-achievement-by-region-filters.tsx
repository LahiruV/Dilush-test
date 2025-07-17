import React, { useEffect, useState } from "react";
import './dashboard-achievement-by-region-filters.css';
import { GetSalesMarkets } from "@peerless/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setAcByRegFilters } from "@peerless-cms/store";
import { dropDownDataConverter } from "@peerless/common";
import { CheckBox } from "@peerless/controls";

const AchievementByRegionFilters: React.FC = () => {
    const dispatch = useDispatch();
    const { acByRegFilters } = useSelector((state: RootState) => state.dashboardAchievementByRegion);
    const [selectAll, setSelectAll] = useState(false);
    const { allSalesMarketData: saleMarketData } = GetSalesMarkets();
    const allSalesMarketData = dropDownDataConverter.dropDownDataConverter(saleMarketData || [], 'tableDescription', 'tableCode');

    useEffect(() => {
        if (allSalesMarketData && allSalesMarketData.length > 0) {
            dispatch(setAcByRegFilters([allSalesMarketData[0].value]));
        }
    }, [allSalesMarketData && allSalesMarketData.length]);

    const handleCheckboxChange = (value: string, isChecked: boolean) => {
        const newFilters = isChecked
            ? [...acByRegFilters, value]
            : acByRegFilters.filter((v: any) => v !== value);

        dispatch(setAcByRegFilters(newFilters));
        setSelectAll(false);
    };

    const handleSelectAllChange = (isChecked: boolean) => {
        setSelectAll(isChecked);
        if (isChecked && allSalesMarketData) {
            dispatch(setAcByRegFilters(allSalesMarketData.map((market: { value: string }) => market.value)));
        } else {
            dispatch(setAcByRegFilters([]));
        }
    };

    const isChecked = (value: string): boolean => {
        return Array.isArray(acByRegFilters) && acByRegFilters.includes(value);
    };


    return (
        <div className="achievement-by-region-filters">
            <div>
                <CheckBox
                    id="select-all-achievement-by-region"
                    className="checkbox-style"
                    size="medium"
                    setValue={handleSelectAllChange}
                    value={selectAll}
                    label="Select All"
                />
            </div>
            {allSalesMarketData && allSalesMarketData.map((market: { id: number; value: string; text: string }) => (
                <div key={market.id}>
                    <CheckBox
                        id={market.id.toString()}
                        className="checkbox-style"
                        size="medium"
                        setValue={(isChecked) => handleCheckboxChange(market.value, isChecked)}
                        value={isChecked(market.value)}
                        label={market.text}
                    />
                </div>
            ))}
        </div>
    );
};

export default AchievementByRegionFilters;
