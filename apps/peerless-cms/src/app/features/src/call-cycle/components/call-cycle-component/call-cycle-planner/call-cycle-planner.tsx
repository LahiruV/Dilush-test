import { pageModeEnum, RootState, setIsCallCycleActivityReadOnly } from "@peerless-cms/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
import SectionMainBase from "../../../../lib/section-main-base";
import './call-cylcle-planner.css'
import CallCyclePlannerDay from "./call-cycle-planner-day/call-cycle-planner-day";

export interface CallCyclePlannerProps {

}


export const CallCyclePlanner = () => {

    const { selectedCallCycleActivity } = useSelector((state: RootState) => state.callCycleActivity);

    const header = (
        <div className="lead-customer-detail-section-header-container margin-bottom-20">
            <span className="center-align section-title">
                Call Cycle
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa2.faPhone} size='1x' />Call Cycle Planner</span>
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                {selectedCallCycleActivity.description}
            </span>
            {/* {isShow !== false && (
                <>
                    {readonly ? (
                        <button disabled={isUpdating} className="header-btn-update" onClick={() => dispatch(setIsCallCycleActivityReadOnly(false))}>
                            <FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Update Details
                        </button>
                    ) : (
                        <Button className='header-btn-cancel' onClick={() => dispatch(setIsCallCycleActivityReadOnly(true))} variant='outline-secondary'>
                            <div className="common-cancel-btn"> Cancel </div>
                        </Button>
                    )}
                </>
            )} */}

        </div>
    );

    const main = (
        <div className='content'>
            {/* <CallCyclePlannerDay /> */}
        </div >
    );

    const footer = (

        <div className='form-button-container'>
            <span>Make sure you have verified all your changes before update</span>
            <Button disabled={false} type='button' variant='outline-green' className='btn-submit' onClick={() => { }}>
                Save
            </Button>
        </div>

    );

    return <SectionMainBase header={header} main={main} footer={footer}></SectionMainBase>;

};