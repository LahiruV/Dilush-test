import { Link } from 'react-router-dom';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAdministratorSelectedArea, } from '@peerless-cms/store';
import './administrator-areas.css';
import AdministratorRepMarketFilter from './administrator-rep-market-filter';
import AdministratorRepProxyFilter from './administrator-rep-proxy-filter';

export interface AdministratorAreasProps { }

const areaLinks = [
  { id: 'administrator-rep-markets', path: '/administrator/rep-markets', icon: fa2.faTag, label: 'Rep Markets' },
  { id: 'administrator-rep-proxy', path: '/administrator/rep-proxy', icon: fa2.faTag, label: 'Rep Proxy' },
  { id: 'administrator-pantry-list', path: '/administrator/pantry-list', icon: fa2.faListAlt, label: 'Pantry List' },
  { id: 'administrator-setting', path: '/administrator/setting', icon: fa2.faCog, label: 'Setting' },
];

export function AdministratorAreas(props: AdministratorAreasProps) {
  const dispatch = useDispatch();
  const { administratorSelectedArea } = useSelector((state: RootState) => state.administrator);

  const handleSelectArea = (area: string) => {
    dispatch(setAdministratorSelectedArea(area));
  };

  const renderFilter = () => {
    if (administratorSelectedArea === 'administrator-rep-markets') {
      return <AdministratorRepMarketFilter />;
    }
    else if (administratorSelectedArea === 'administrator-rep-proxy') {
      return <AdministratorRepProxyFilter />;
    }
    return null;
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
              className={administratorSelectedArea === link.id ? 'selected' : ''}
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

export default AdministratorAreas;