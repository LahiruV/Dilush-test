import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState, setSearchText, setSelectedOrganisation } from "@peerless-cms/store";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { useDispatch, useSelector } from "react-redux";
import './organisation-filters.css';
import { useEffect, useRef, useState } from "react";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { getOrganisationNames } from "@peerless/queries";
import { Loader } from '@progress/kendo-react-indicators';

export interface OrganisationSearchProps {}

export function OrganisationSearch(props: OrganisationSearchProps) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [keywordsToSearch, setKeywordsToSearch] = useState<string>('');

  const { searchText } = useSelector((state: RootState) => ({    
    searchText: state.organisations.searchText
  }));

  const handleInputChange = (event: { target: { value: string } }) => {    
    const newValue = event.target.value;    
    dispatch(setSearchText(newValue));
    dispatch(setSelectedOrganisation(null));
    if (newValue.length >= 2) {
      setKeywordsToSearch(newValue);
    } else {
      setSuggestions([]);
    }
  };

  const payload = {
    orgName: keywordsToSearch
  }

  const { responseData: organisationNamesList, error, status, isLoading } = getOrganisationNames(payload);

  useEffect(() => {
    if (organisationNamesList) {
      const organisationNames = organisationNamesList.map(
        (org: { organisationName: string }) => org.organisationName
      );
      setSuggestions(organisationNames);
    }
  }, [organisationNamesList]);

  return (
    <div className='search-container'>
      <div className='search-input-container'>
        <AutoComplete
          data={suggestions}
          value={searchText}
          onChange={handleInputChange}
          placeholder="Organisation name"
          suggest
          loading={isLoading}
          className='width-shirnked txt-iconed'
        />
        <FontAwesomeIcon icon={faSearch} className='search-icon' />         
      </div>
    </div>
  );
}

export default OrganisationSearch;