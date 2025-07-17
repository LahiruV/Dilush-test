import { useDispatch, useSelector } from "react-redux";
import FeaturesBase from "../../lib/features-base";
import { OrganisationList, OrganisationQuickInfo, OrganisationSearch, OrganisationTypes } from "../components";
import { pageModeEnum, RootState, setIsAddOrganisationModalOpen, setOrgDetailPageMode, setOrgFilterEnabled, setSelectedArea, setSelectedContactType, setSelectedOrganisation, updateDetails } from "@peerless-cms/store";
import { ButtonWidget } from "@peerless/controls";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

export const OrganisationSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedArea('organisation'));
  }, []);

  const handleFilterClick = () => {
    dispatch(setOrgFilterEnabled(true));
  }

  useEffect(() => {
    if (dispatch) {
      dispatch(setSelectedContactType('organisation'));
    }
  }, [dispatch]);

  const handleAddOrganisation = () => {
    dispatch(setOrgDetailPageMode(pageModeEnum.New));
    dispatch(updateDetails(false));
    dispatch(setSelectedOrganisation(null));
    dispatch(setIsAddOrganisationModalOpen(true));
  }

  const filters = (
    <div>
      <span className='container-title margin-top-10'>FILTER</span>
      <div className="filter-bottom-content padding-bottom-10">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleFilterClick();
        }}>
          <div style={{ marginLeft: '-20px' }}>
            <OrganisationSearch />
            <OrganisationTypes />
            <ButtonWidget
              id="btn-filter-org"
              name="Filter"
              type="submit"
              classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-tertiary dash-filter-button dash-filter-btn'
            />
          </div>
        </form>
      </div>
    </div>
  );

  const aside = (
    <div>
      <div className='contact-type-header border-bottom'>
        <FontAwesomeIcon icon={fa.faCalendarCheck} className='heaader-icon' /> Organisation
      </div>
      <div className="create-buttons-container border-bottom" style={{ marginTop: '-10px' }}>
        <button className="add-btn" onClick={handleAddOrganisation}>Add Organisation</button>
      </div>
      {filters}
    </div>
  );

  return <FeaturesBase aside={aside} main={<OrganisationList />} article={<OrganisationQuickInfo />} isDefaultCollapsed={false} />;
};