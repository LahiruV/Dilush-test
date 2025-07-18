import SectionMainBase from "../../../../lib/section-main-base";
import { LeaveViewMainComponent } from './leave-show-main';

export function LeaveShow() {
    const main = (
        <div className='content'>
            <LeaveViewMainComponent />
        </div>
    )
    return <SectionMainBase main={main}></SectionMainBase>;
}