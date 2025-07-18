import FeaturesBase from '../../lib/features-base';
import SectionMainBase from '../../lib/section-main-base';
import { Outlet } from 'react-router-dom';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { ButtonWidget } from '@peerless/controls';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsAddLeaveModalOpen, setLeaveFilterExpanded, setTriggerLeaveListFormSubmit } from '@peerless-cms/store';
import { LeaveListFilters } from '../components/leave-feature-component/leave-list/leavelist-filters';

export const LeaveFeatureSection = () => {
    const [isExporting, setIsExporting] = useState(false);
    const dispatch = useDispatch();

    const { isFetchingLeaveEntryList, isAddLeaveButton } = useSelector((state: RootState) => state.leaveEntry);

    const handleExternalSubmit = () => {
        dispatch(setTriggerLeaveListFormSubmit(true));
    };

    const handleAddLeave = () => {
        dispatch(setIsAddLeaveModalOpen(true));
    };

    const handleExportClick = () => {
        setIsExporting(true);
    }

    const headerBottomElements = (
        <div style={{ backgroundColor: '#fff' }}>
            < Stack direction="horizontal" gap={2}  >
                <div style={{ backgroundColor: '#ff9898', color: 'white', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', }}>Public Holiday</div>
                <div style={{ backgroundColor: '#19c5a8', color: 'white', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Cancelled Leave</div>
                <div style={{ backgroundColor: '#3ec263', color: 'white', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Pending Leave</div>
                <div style={{ backgroundColor: '#f45551', color: 'white', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Declined Leave</div>
                <div style={{ backgroundColor: '#696868', color: 'white', textAlign: 'center', width: '80px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Other Leave</div>
                <div style={{ backgroundColor: '#b3b329', color: 'white', textAlign: 'center', width: '120px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Long Service Leave</div>
                <div style={{ backgroundColor: '#7e7ece', color: 'white', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Personal Leave</div>
                <div style={{ backgroundColor: '#be6ebe', color: 'white', textAlign: 'center', width: '90px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Annual Leave</div>
                <div style={{ backgroundColor: '#5c8599', color: 'white', textAlign: 'center', width: '110px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Leave Without Pay</div>
            </ Stack>
        </div>
    )

    const header = (
        <HeaderFilterContainer title="Leave" isFiltersOpened={true} icon={fa.faArrowAltCircleLeft} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <LeaveListFilters isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} isExporting={isExporting} setIsExporting={setIsExporting} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchingLeaveEntryList}
            inlineElements={
                <>
                    <ButtonWidget id='activity-excel-button' classNames='excel-export-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
                    {isAddLeaveButton &&
                        <button id='add-new-leave' className="header-btn-add filter-area margin-left-auto margin-right-none" onClick={handleAddLeave}>Add Leave</button>
                    }
                </>
            }
            bottomBlockElements={headerBottomElements}
            setIsFilterExpanded={setLeaveFilterExpanded}
        />
    );

    const main = <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;

    return <FeaturesBase main={main} />;
};