import { Outlet } from "react-router-dom";
import SectionMainBase from "../../lib/section-main-base";
import FeaturesBase from "../../lib/features-base";
import { CallCycleAreas } from "../components";

export const CallCycleDetailSection = () => {


    const aside = (
        <div>
            <CallCycleAreas />
        </ div>

    );

    const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

    return <FeaturesBase aside={aside} main={main} />;
};