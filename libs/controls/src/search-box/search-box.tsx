import { Dispatch, SetStateAction } from 'react';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import './search-box.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
/* eslint-disable-next-line */
export interface SearchBoxProps {
    setSearchBy: Dispatch<SetStateAction<any[]>>;
    searchBy: string;
}

export function SearchBox(props: SearchBoxProps) {

    const handleInputChange = (event: any) => {
        props.setSearchBy(event.value)
    };

    return (
        <div className='search-container'>
            <div className='search-input-container'>
                <Input placeholder="Search..." className='txt-search-input' value={props.searchBy} onChange={handleInputChange} />
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
            </div>
        </div>
    );
}

export default SearchBox;
