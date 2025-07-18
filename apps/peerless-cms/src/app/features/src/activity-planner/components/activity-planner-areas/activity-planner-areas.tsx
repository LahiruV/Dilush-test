import { Link } from 'react-router-dom';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setActivityPlannerSelectedArea } from '@peerless-cms/store';
import ActivityPlannerFilter from './activity-planner-filter';
import './activity-planner-areas.css';

export interface ActivityPlannerAreasProps { }

const areaLinks = [
  { id: 'activity-planner', path: '/activity-planner/activity-planner', icon: fa2.faCalendar, label: 'Activity Planner' },
];

export function ActivityPlannerAreas(props: ActivityPlannerAreasProps) {
  const dispatch = useDispatch();
  const { activityPlannerSelectedArea } = useSelector((state: RootState) => state.activityPlanner); //Need to Change

  const handleSelectArea = (area: string) => {
    dispatch(setActivityPlannerSelectedArea(area));
  };

  return (
    <div className='area-container'>
      <div style={{ marginTop: '-15px' }}></div>
      <span>AREAS</span>
      <ul>
        {areaLinks.map((link) => (
          <li key={link.id}>
            <Link
              id={link.id}
              to={link.path}
              className={activityPlannerSelectedArea === link.id ? 'selected' : ''}
              onClick={() => handleSelectArea(link.id)}
            >
              <FontAwesomeIcon icon={link.icon} size='1x' /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ActivityPlannerFilter />
    </div>
  );
}

export default ActivityPlannerAreas;