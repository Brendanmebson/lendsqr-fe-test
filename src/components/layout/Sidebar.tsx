import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

// Icon imports
import iconDashboard from '../../assets/icons/Dashboard.png';
import iconUsers from '../../assets/icons/Users.png';
import iconGuarantors from '../../assets/icons/Guarantors.png';
import iconLoans from '../../assets/icons/Loans.png';
import iconDecisionModels from '../../assets/icons/DecisionModels.png';
import iconSavings from '../../assets/icons/Savings.png';
import iconWhitelist from '../../assets/icons/Whitelist.png';
import iconKarma from '../../assets/icons/Karma.png';
import iconOrganization from '../../assets/icons/Organizations.png';
import iconLoanProducts from '../../assets/icons/LoanProducts.png';
import iconSavingsProducts from '../../assets/icons/SavingsProducts.png';
import iconFeesCharges from '../../assets/icons/Fees&Charges.png';
import iconTransactions from '../../assets/icons/Transactions.png';
import iconServices from '../../assets/icons/Services.png';
import iconServiceAccount from '../../assets/icons/ServiceAccount.png';
import iconSettlements from '../../assets/icons/Settlements.png';
import iconReports from '../../assets/icons/Reports.png';
import iconPreferences from '../../assets/icons/Preferences.png';
import iconFeesPricing from '../../assets/icons/Fees&Pricing.png';
import iconAuditLogs from '../../assets/icons/AuditLogs.png';
import iconSwitchOrg from '../../assets/icons/SwitchOrganizations.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const customerLinks = [
  { label: 'Users', icon: iconUsers, path: '/users' },
  { label: 'Guarantors', icon: iconGuarantors, path: '/guarantors' },
  { label: 'Loans', icon: iconLoans, path: '/loans' },
  { label: 'Decision Models', icon: iconDecisionModels, path: '/decision-models' },
  { label: 'Savings', icon: iconSavings, path: '/savings' },
  { label: 'Loan Requests', icon: iconLoans, path: '/loan-requests' },
  { label: 'Whitelist', icon: iconWhitelist, path: '/whitelist' },
  { label: 'Karma', icon: iconKarma, path: '/karma' },
];

const businessLinks = [
  { label: 'Organization', icon: iconOrganization, path: '/organization' },
  { label: 'Loan Products', icon: iconLoanProducts, path: '/loan-products' },
  { label: 'Savings Products', icon: iconSavingsProducts, path: '/savings-products' },
  { label: 'Fees and Charges', icon: iconFeesCharges, path: '/fees-charges' },
  { label: 'Transactions', icon: iconTransactions, path: '/transactions' },
  { label: 'Services', icon: iconServices, path: '/services' },
  { label: 'Service Account', icon: iconServiceAccount, path: '/service-account' },
  { label: 'Settlements', icon: iconSettlements, path: '/settlements' },
  { label: 'Reports', icon: iconReports, path: '/reports' },
];

const settingsLinks = [
  { label: 'Preferences', icon: iconPreferences, path: '/preferences' },
  { label: 'Fees and Pricing', icon: iconFeesPricing, path: '/fees-pricing' },
  { label: 'Audit Logs', icon: iconAuditLogs, path: '/audit-logs' },
];

const SidebarItem: React.FC<{ label: string; icon: string; path: string }> = ({ label, icon, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `${styles.sidebar__item} ${isActive ? styles.active : ''}`
    }
  >
    <span className={styles['sidebar__item-icon']}>
      <img src={icon} alt={label} />
    </span>
    {label}
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('lendsqr_auth');
    navigate('/login');
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Main navigation">
        <div className={styles.sidebar__org}>
          <img src={iconSwitchOrg} alt="Switch Organization" width={16} height={16} />
          <span className={styles['sidebar__org-text']}>Switch Organization</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${styles.sidebar__item} ${isActive ? styles.active : ''}`}
        >
          <span className={styles['sidebar__item-icon']}>
            <img src={iconDashboard} alt="Dashboard" />
          </span>
          Dashboard
        </NavLink>

        <nav className={styles.sidebar__nav}>
          <p className={styles['sidebar__section-label']}>Customers</p>
          {customerLinks.map(link => <SidebarItem key={link.path} {...link} />)}

          <p className={styles['sidebar__section-label']}>Businesses</p>
          {businessLinks.map(link => <SidebarItem key={link.path} {...link} />)}

          <p className={styles['sidebar__section-label']}>Settings</p>
          {settingsLinks.map(link => <SidebarItem key={link.path} {...link} />)}
        </nav>

        <div className={styles.sidebar__logout}>
          <button className={styles['sidebar__logout-btn']} onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
          <p className={styles['sidebar__logout-version']}>v1.2.0</p>
        </div>
      </aside>

      {isOpen && (
        <div className={styles['sidebar-overlay']} onClick={onClose} aria-hidden="true" />
      )}
    </>
  );
};

export default Sidebar;
