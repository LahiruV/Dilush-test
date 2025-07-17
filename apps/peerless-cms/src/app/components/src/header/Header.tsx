import { useRef, useEffect, useState } from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '@peerless/providers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, resetState, setIsManagerMode, setLoggedUser, setOriginatorInList, setSelectedOriginator } from '@peerless-cms/store';
import { LogoutBox } from '@peerless-cms/features-common-components';
import { HeaderProfileContainer, HeaderController } from '@peerless-cms/components';
import { GetChildOriginatorsList } from '@peerless/queries';
import { Originator } from '@peerless/models';
import AccountDemoSignedOut from './components/profile-card-header/account-signed-out';

export interface OriginatorEntity {
  originator: string;
  childOriginators: string;
  defaultDepartmentId: string;
  managerMode: boolean;
}

export interface HeaderProps { }

export function Header(props: HeaderProps) {
  const dispatch = useDispatch();
  const [originalData, setOriginalData] = useState<Originator[]>([]);
  const [childOriginatorsList, setChildOriginatorsList] = useState<Originator[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const { isManagerMode, selectedOriginator, loggedUser } = useSelector((state: RootState) => state.header);

  const initialized = useRef(false);
  const { handleLogout } = useAuthContext();

  const userDetails = {
    name: loggedUser?.name || '',
    userName: loggedUser?.userName || '',
    clientType: loggedUser?.clientType || '',
    repType: loggedUser?.repType || '',
    defaultDepartmentId: loggedUser?.defaultDepartmentId || '',
    isNew: loggedUser?.isNew || false,
    childReps: loggedUser?.childReps || ''
  };

  const modifiedList = [{ name: "Select All", userName: 'all', repType: '', clientType: '', defaultDepartmentId: '', isNew: true }, loggedUser, ...childOriginatorsList];
  const newModifiedList = [{ name: userDetails.name, userName: userDetails.userName, repType: userDetails.repType, clientType: userDetails.clientType, defaultDepartmentId: userDetails.defaultDepartmentId, isNew: userDetails.isNew }, ...childOriginatorsList];
  const originatorInList = `originator IN (${newModifiedList.map(user => `'${user.userName}'`).join(',')})`;

  if (newModifiedList.length > 1) {
    dispatch(setOriginatorInList(originatorInList));
  }

  if (!initialized.current) {
    dispatch(setIsManagerMode(false));
    const originatorEntityString = localStorage.getItem('originatorEntity');
    if (originatorEntityString) {
      try {
        const originatorEntity = JSON.parse(originatorEntityString);
        dispatch(setLoggedUser(originatorEntity));
      } catch (error) {
        console.error('Failed to parse originatorEntity from localStorage:', error);
      }
    }
    initialized.current = true;
  }

  const toggleDialog = () => {
    setVisible(!visible)
  };

  const logOutFunction = () => {
    dispatch(resetState());
    handleLogout();
    toggleDialog();
  };

  const { responseData: childOriginatorsListData } = GetChildOriginatorsList({
    originator: loggedUser?.userName || '',
    childOriginators: `(originator = '${loggedUser?.userName || ''}')`,
    defaultDepartmentId: loggedUser?.defaultDepartmentId || '',
    managerMode: isManagerMode ? false : true
  }, true);

  useEffect(() => {
    dispatch(setSelectedOriginator(modifiedList[1]));
  }, [isManagerMode]);

  useEffect(() => {
    if (childOriginatorsListData && childOriginatorsListData.length > 0) {
      setChildOriginatorsList(childOriginatorsListData);
      setOriginalData(childOriginatorsListData);
    }
  }, [childOriginatorsListData]);

  return (
    <>
      <div className={styles["peerless-cms-header"]}>
        <div className={styles["component-container"]}>
          <HeaderController
            isManagerMode={isManagerMode}
            childOriginatorsList={childOriginatorsList}
            setChildOriginatorsList={setChildOriginatorsList}
            originalData={originalData}
            selectedOriginator={selectedOriginator}
            modifiedList={modifiedList}
            managerMode={loggedUser?.managerMode || false}
            userDetails={userDetails}
          />
        </div>
        <div className={styles["header-profile-container"]}>
          {/* <HeaderProfileContainer userDetails={userDetails} /> */}
          <div className="cursor" >
            <div className="cursor" >
              <AccountDemoSignedOut onClick={toggleDialog} name={userDetails.name} email={loggedUser.email} image={`../../../../assets/images/user.png`} />
            </div>
          </div>
          {/* <FontAwesomeIcon id='logout-button' icon={faSignOutAlt} className={styles["logout-icon"]} onClick={toggleDialog} /> */}
        </div>
      </div>
      <LogoutBox isOpen={visible} setIsSetOpen={setVisible} />
    </>
  );
}

export default Header;
