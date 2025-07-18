
import { Link } from 'react-router-dom';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsAddLeaveModalOpen, setLeaveEntrySelectedArea } from '@peerless-cms/store';
import './leave-feature-area.css';
import { ButtonWidget } from '@peerless/controls';
import { LeaveListFilters } from '../leave-feature-component/leave-list/leavelist-table/leavelist-filters';

export interface LeaveFeatureAreasProps { }

const areaLinks = [
    { id: 'leave-application', path: 'leave-list', icon: fa2.faWalking, label: 'Leave Application' },
    { id: 'leave-view', path: 'leave-view', icon: fa2.faCalendar, label: 'View Leave' }
]

export function LeaveFeatureAreas(props: LeaveFeatureAreasProps) {
    const dispatch = useDispatch();
    const { leaveEntrySelectedArea } = useSelector((state: RootState) => state.leaveEntry);

    const handleSelectArea = (area: string) => {
        dispatch(setLeaveEntrySelectedArea(area));
    };

    const renderFilter = () => {
        if (leaveEntrySelectedArea === 'leave-application') {
            return <LeaveListFilters />;
        }
        return null;
    };

    // const handleAddCallCycle = () => {
    //     dispatch(setIsAddLeaveModalOpen(true));
    // };

    return (
        <div className='area-container'>
            {leaveEntrySelectedArea === 'leave-application' ? <div className="create-buttons-container border-bottom" style={{ marginTop: '-15px' }}>
                {/* <ButtonWidget id='add-new-leave' name='New Leave' classNames='add-btn' Function={handleAddCallCycle} /> */}
            </div> : <div style={{ marginTop: '-15px' }}></div>}
            <span>AREAS</span>
            <ul>
                {areaLinks.map((link) => (
                    <li key={link.id}>
                        <Link
                            id={link.id}
                            to={link.path}
                            className={leaveEntrySelectedArea === link.id ? 'selected' : ''}
                            onClick={() => handleSelectArea(link.id)}
                        >
                            <FontAwesomeIcon icon={link.icon} size='1x' /> {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            {renderFilter()}
        </div>
    );
}

export default LeaveFeatureAreas;