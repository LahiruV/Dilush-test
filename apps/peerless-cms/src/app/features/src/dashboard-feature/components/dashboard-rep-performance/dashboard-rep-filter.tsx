import { useDispatch, useSelector } from 'react-redux';
import { RootState, setRepTemplateDrop } from '@peerless-cms/store';
import { DropDown } from '@peerless/controls';
import { FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useEffect } from 'react';

export interface DashBoardRepFilterProps {
  isFiltersOpen?: boolean;
  isClearFilters?: boolean;
  setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashBoardRepFilter(props: DashBoardRepFilterProps) {
  const dispatch = useDispatch();
  const { repTemplateDataList, repTemplateDrop } = useSelector((state: RootState) => state.dashoardRep);

  const clearFilters = () => {
    dispatch(setRepTemplateDrop(repTemplateDataList[0]));
  }

  const repTemplateDropDefault = repTemplateDataList[0];

  const popUpSettings = {
    width: '208px'
  }

  useEffect(() => {
    if (props.isClearFilters) {
      clearFilters?.();
    }
  }, [props.isClearFilters])

  return (
    <>
      <Collapse in={props.isFiltersOpen}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', padding: '10px' }}>
            <FilterFormGroup label='Rep Type'>
              <DropDown id={"repType-performance-drop-button"} className={"repType-performance-drop filter-form-filter"} setValue={(e) => dispatch(setRepTemplateDrop(e))} value={repTemplateDrop} defaultValue={repTemplateDropDefault} datalist={repTemplateDataList} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
            </FilterFormGroup>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default DashBoardRepFilter;
