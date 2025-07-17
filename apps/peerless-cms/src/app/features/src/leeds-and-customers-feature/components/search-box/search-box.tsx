import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import './search-box.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSearchBy } from '@peerless-cms/store';
import { Button } from '@progress/kendo-react-buttons';

/* eslint-disable-next-line */
export interface SearchBoxProps {}

export function SearchBox(props: SearchBoxProps) {

  const { searchBy } = useSelector((state: RootState) => ({    
    searchBy: state.leedsAndCustomers.searchBy
  }));

  const dispatch = useDispatch();

  const handleInputChange = (event: InputChangeEvent) => {
    dispatch(setSearchBy(event.value));
  };

  const handleClear = () => {
    dispatch(setSearchBy(''));
  };

  return (
    <div className='search-container'>
      <div className='search-input-container'>
        <Input placeholder="Search..." className='txt-search-input' value={searchBy} onChange={handleInputChange} />
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
        {searchBy && (
        <span
        onClick={handleClear}
        className='clear-icon-search'
        title="Clear"
      >
        &times; 
      </span>
      )}
      </div>
    </div>
  );
}

export default SearchBox;
