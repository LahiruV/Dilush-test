import { useSelector } from "react-redux";
import SectionMainBase from "../../../../lib/section-main-base";
import LeaveListTable from "./leavelist-table/leavelist-table";
import { RootState } from "@peerless-cms/store";


export interface LeaveListProps { }

export function LeaveList(props: LeaveListProps) {
    const { leaveFilterExpanded } = useSelector((state: RootState) => state.leaveEntry);

    const main = (
        <div className='content'>
            <LeaveListTable
                heightOffset={leaveFilterExpanded ? 130 : 62}
            />
        </div>
    )
    return <SectionMainBase mainClassName="overflow-hidden" main={main}></SectionMainBase>;
}