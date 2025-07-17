import { FC } from 'react';
import { Card, Avatar } from '@progress/kendo-react-layout';
import styles from './profile-card-header.module.css';

export interface HeaderProfileContainerProps {
  userDetails: {
    name: string;
    clientType: string;
  };
}

export function HeaderProfileContainer(props: HeaderProfileContainerProps) {
  return (
    <Card className={styles["card-container"]}>
      <div className={styles["profile-container"]}>
        <Avatar type="image" themeColor={'success'}>
          <img className={styles["profile-avatar"]} src="../../../../../../assets/images/header-profile.png" alt="profile" />
        </Avatar>
        <div className={styles["position-container"]}>
          <div className={styles["profile-name"]}>{props.userDetails.name}</div>
          <div>{props.userDetails.clientType}</div>
        </div>
      </div>
    </Card>
  );
};

export default HeaderProfileContainer;

