import { Link, useLocation, useNavigate } from 'react-router-dom';
import './leeds-and-customers-areas.css'
import * as fa from '@fortawesome/free-regular-svg-icons';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { pageModeEnum, RootState, setActivityPageMode, setAddressPageMode, setContactPersonPageMode, setEnduserDetailPageMode, setLeadDetailPageMode, updateDetails } from '@peerless-cms/store';
import { contactId, contactTypeEnum, leadCustomerAreaMap, sectionPathMap } from '@peerless/utils';

/* eslint-disable-next-line */
export interface LeedsAndCustomersAreasProps {
  cssClasses?: string;
}

export function LeedsAndCustomersAreas(props: LeedsAndCustomersAreasProps) {
  const { selectedLeedOrCustomer, selectedContactType, selectedOrganisation } = useSelector((state: RootState) => ({    
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,    
    selectedContactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleDispatchAndRedirect = (path: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    
    dispatch(setEnduserDetailPageMode(pageModeEnum.Edit));
    dispatch(setLeadDetailPageMode(pageModeEnum.Edit));
    dispatch(updateDetails(true));
    navigate(path); 
  };

  const areaItems = leadCustomerAreaMap[selectedContactType];
  

  return (
    <div className={'area-container' + ' ' + props.cssClasses}>
      <span className='area-title'>AREAS</span>
      <ul>
        {areaItems.map((item: any, index: any) => {
          const id = selectedContactType != contactTypeEnum.organisation ? selectedLeedOrCustomer?.[contactId[selectedContactType]] : selectedOrganisation?.[contactId[selectedContactType]];
          const mainPath = sectionPathMap[selectedContactType] + `${id}${item.path}`;
          const additionalPaths = item.additionalPaths
            ? item.additionalPaths.map((extraPath: any) => sectionPathMap[selectedContactType] + `${id}${item.path}${extraPath}`)
            : [];

          const isActiveClass = isActive(mainPath) || additionalPaths.some(isActive) ? 'active' : '';

          return (
            <li key={index} className={isActiveClass}>
              <Link to="#" onClick={handleDispatchAndRedirect(mainPath)}>
                <FontAwesomeIcon icon={item.icon} size="1x" /> {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeedsAndCustomersAreas;
