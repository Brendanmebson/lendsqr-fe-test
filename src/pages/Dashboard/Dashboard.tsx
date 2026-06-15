import React from 'react';
import styles from './Dashboard.module.scss';

// Icon imports
import iconU from '../../assets/icons/U.png';
import iconAU from '../../assets/icons/AU.png';
import iconUWL from '../../assets/icons/UWL.png';
import iconUWS from '../../assets/icons/UWS.png';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboard__title}>Dashboard</h1>
      <p className={styles.dashboard__subtitle}>Welcome to the Lendsqr Admin Console</p>

      <div className={styles.dashboard__cards}>
        {[
          { label: 'Total Users', value: '2,453', icon: iconU },
          { label: 'Active Users', value: '2,453', icon: iconAU },
          { label: 'Users with Loans', value: '12,453', icon: iconUWL },
          { label: 'Users with Savings', value: '102,453', icon: iconUWS },
        ].map(card => (
          <div key={card.label} className={styles.dashboard__card}>
            <div className={styles['dashboard__card-icon']}>
              <img src={card.icon} alt={card.label} width={35} height={35} />
            </div>
            <p className={styles['dashboard__card-label']}>{card.label}</p>
            <p className={styles['dashboard__card-value']}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className={styles.dashboard__placeholder}>
        <p>More dashboard analytics coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;
