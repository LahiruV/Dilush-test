import './organisation-filters.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState, setOrganisationTypes } from "@peerless-cms/store";
import { Checkbox } from '@progress/kendo-react-inputs';

export interface OrganisationTypesProps {}

interface Option {
    value: string;
    text: string;
  }

export function OrganisationTypes(props: OrganisationTypesProps) {
  const dispatch = useDispatch();
  const { organisationTypes } = useSelector((state: RootState) => ({    
    organisationTypes: state.organisations.organisationTypes
  }));

    const options: Option[] = [
      { value: 'Org', text: 'Organisation' },
      { value: 'Lead', text: 'Lead' },
      { value: 'EndUser', text: 'End User' },
      { value: 'Customer', text: 'Customer' },
      { value: 'NAC', text: 'Non Account Customer' },
    ];
  
    const handleCheckboxChange = (value: string, checked: boolean) => {
      const updatedOrgTypes = checked
        ? [...organisationTypes, value]
        : organisationTypes.filter((v: string) => v !== value);
      dispatch(setOrganisationTypes(updatedOrgTypes));
    };

    return (
      <div className="org-types-container">
        {options.map((option) => (
          <div key={option.value} className="checkbox-field">
            <Checkbox
              label={option.text}
              value={option.value}
              checked={organisationTypes.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.value as boolean)
              }
            />
          </div>
        ))}
      </div>
      );
}