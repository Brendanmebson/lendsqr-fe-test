import React from 'react';
import { UserStatus } from '../../types';
import styles from './StatusBadge.module.scss';

interface Props {
  status: UserStatus;
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span className={`${styles.badge} ${styles[`badge--${status.toLowerCase()}`]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
