import FeaturesBase from '../lib/features-base';
import './organisation-feature.css';

export interface OrganisationFeatureProps {}

export function OrganisationFeature(props: OrganisationFeatureProps) {
  return (
    <FeaturesBase
      aside={<div>OrgFilter Menu</div>}
      main={<div> orgContent Area</div>}
      article={<div>Right Area</div>}
    />
  );
}

export default OrganisationFeature;
