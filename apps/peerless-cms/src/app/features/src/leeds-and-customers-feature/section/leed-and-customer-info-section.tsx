import { Link } from 'react-router-dom';
import FeaturesBase from '../../lib/features-base';
import SectionMainBase from '../../lib/section-main-base';
import LeedAndCustomerInfo from '../components/leed-and-customer-info/leed-and-customer-info';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateDetails } from '@peerless-cms/store';

export const LeedAndCustomerInfoSection = () => {
  const { selectedLeedOrCustomer } = useSelector((state: RootState) => state.leedsAndCustomers);
  const dispatch = useDispatch();

  const aside = (
    <div>
      <div>{selectedLeedOrCustomer.name}</div>

      <ul>
        <li>
          <Link to='/leeds-and-customers'>List</Link>
        </li>
        <li>
          <Link to='/leeds-and-customers/new'>New</Link>
        </li>
      </ul>
    </div>
  );

  const header = (
    <div>
      section HEader <button onClick={() => dispatch(updateDetails(false))}>Update</button>
    </div>
  );

  const main = <SectionMainBase header={header} main={<LeedAndCustomerInfo />}></SectionMainBase>;

  return <FeaturesBase aside={aside} main={main} />;
};
