import { Dispatch, SetStateAction } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import './header-dropdown.css';
import { DropDownData } from '@peerless/models';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { DashBoardRepFilter } from '../dashboard-rep-filter'

export interface HeaderDropDownProps {
    year: string;
    selectorUserTypeData: DropDownData[];
    userTypeSelect: DropDownData;
    setUserTypeSelect: Dispatch<SetStateAction<DropDownData>>;
}

export function HeaderDropDown(props: HeaderDropDownProps) {
    const handleUserSelect = (event: any) => {
        props.setUserTypeSelect(event.target.value);
    };

    const headerInlineElements = (
        <div className="center-align">
            <span className="dropdown-rep-drop-head">Current Cost Year : <b>{props.year}</b> | Customer / End User Type : </span>
            <DropDownList
                className="dropdown-rep-performance"
                data={props.selectorUserTypeData}
                textField="text"
                dataItemKey="id"
                onChange={handleUserSelect}
                value={props.userTypeSelect}
                fillMode={'flat'}
            />
        </div>
    )

    return (
        <HeaderFilterContainer title='Rep Performance' icon={fa2.faPager} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <DashBoardRepFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            inlineElements={headerInlineElements}
            isFiltersOpened={true}
            clearBtnText='Clear Filter'
        />
    );
};

export default HeaderDropDown;

