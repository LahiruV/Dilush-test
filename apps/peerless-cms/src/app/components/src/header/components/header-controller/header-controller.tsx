import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { filterBy, FilterDescriptor } from "@progress/kendo-data-query";
import { Switch } from '@progress/kendo-react-inputs';
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from '@progress/kendo-react-dropdowns';
import styles from './header-controller.module.css';
import { setSelectedOriginator, setSelectedOriginatorReptype, setIsManagerMode, setSelectedLeedOrCustomer, setChildOriginators } from '@peerless-cms/store';
import { useDispatch } from 'react-redux';
import { useGetChildOriginators } from '@peerless/queries';

export interface HeaderControllerProps {
  isManagerMode: boolean;
  childOriginatorsList: any[];
  setChildOriginatorsList: Dispatch<SetStateAction<any[]>>;
  originalData: any[];
  selectedOriginator: any;
  modifiedList: any[];
  managerMode: any;
  userDetails: any;
}

export function HeaderController(props: HeaderControllerProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userNameToQuery, setUserNameToQuery] = useState(props.userDetails.userName);  
  const timeout = useRef<any>();

  const handleToggle = () => {
    dispatch(setIsManagerMode(!props.isManagerMode));
  };

  const filterData = (filter: FilterDescriptor) => {
    const data = props.childOriginatorsList.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event: ComboBoxFilterChangeEvent) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (event.filter.value === "" || event.filter.value == null) {
        props.setChildOriginatorsList(props.originalData);
      } else {
        props.setChildOriginatorsList(filterData(event.filter));
      }
      setLoading(false);
    }, 300);
    setLoading(true);
  };

  const handleSelect = (event: ComboBoxChangeEvent) => {        
    const selectedValue = event.target.value;
    if (!selectedValue) {
      dispatch(setSelectedOriginator(''));
      dispatch(setSelectedOriginatorReptype(null));
      return;
    }
    dispatch(setSelectedOriginator(selectedValue));
    let isBakeryRep = selectedValue.repType == "B" ? true : false;
    dispatch(setSelectedOriginatorReptype(isBakeryRep));    
    setUserNameToQuery(selectedValue.userName);       
    //dispatch(setSelectedLeedOrCustomer(null));
  }

  const { childOriginators, error} = useGetChildOriginators(userNameToQuery, props.isManagerMode);

  useEffect(() => {
    if (childOriginators) {
      const sessionData = {
        childOriginators,
        filterByUserName: props.userDetails.userName,
        filterByRepOriginatorId: 0,
        userName: props.userDetails.userName
      };
      saveToSessionStorage(sessionData);
    }        
    dispatch(setChildOriginators(childOriginators));
  }, [childOriginators]);

  function saveToSessionStorage(data: any) {
    for (const key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]));
    }
  }

  useEffect(() => {
    if (error) {
      console.error('Error fetching data : ', error);
    }
  }, [error]);


  useEffect(() => {
    handleSelect({ target: { value: props.userDetails } } as ComboBoxChangeEvent)
  }, [props.isManagerMode]);
  
  return (
    <div className={styles['header-container']}>
      <div className={styles['header-dropdown']}>
        <div>
          <span className={styles["switch-label"]}>Manager Mode </span>
          <Switch
            id='managerModeSwitch'
            className={styles["managerModeSwitch"]}
            size="small"
            onChange={handleToggle}
            checked={props.isManagerMode}
            disabled={props.managerMode}
          />
        </div>
        <div className={styles["custom-combobox"]}>
          <ComboBox
            style={{ fontSize: '12px' }}
            id='originatorComboBox'
            data={props.modifiedList}
            textField="name"
            dataItemKey="userName"
            filterable={true}
            onFilterChange={filterChange}
            onChange={handleSelect}
            value={props.selectedOriginator}
            loading={loading}
            size={'medium'}
            fillMode={'flat'}
            placeholder={'Please Select'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderController;