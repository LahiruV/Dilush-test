import { useDispatch, useSelector } from 'react-redux';
import { RootState, setRepTemplateDrop } from '@peerless-cms/store';
import { DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';

export interface DashBoardRepFilterProps { }

export function DashBoardRepFilter(props: DashBoardRepFilterProps) {
  const dispatch = useDispatch();
  const { repTemplateDataList, repTemplateDrop } = useSelector((state: RootState) => state.dashoardRep);

  const clearFilters = () => {
    dispatch(setRepTemplateDrop(repTemplateDataList[0]));
  }

  const repTemplateDropDefault = repTemplateDataList[0];

  const popUpSettings = {
    width: '150px'
  }

  return (
    <>
      <hr />
      <ClearFilterBox onClick={clearFilters} />
      <div>
        <span className='dashboard-filter-header' > Rep Type </span>
        <DropDown id={"repType-performance-drop-button"} className={"repType-performance-drop"} setValue={(e) => dispatch(setRepTemplateDrop(e))} value={repTemplateDrop} defaultValue={repTemplateDropDefault} datalist={repTemplateDataList} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
      </div>
    </>
  );
}

export default DashBoardRepFilter;
