import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';
import { Skeleton } from '../../components/common/Skeleton';
import styles from './UserDetails.module.scss';

const TABS = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

const StarRating: React.FC<{ tier: number }> = ({ tier }) => (
  <div className={styles.details__stars} aria-label={`User tier ${tier} of 3`}>
    {[1, 2, 3].map(i => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24"
        fill={i <= tier ? '#E9B200' : 'none'}
        stroke="#E9B200" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const Field: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className={styles.details__field}>
    <label>{label}</label>
    <p>{value || '—'}</p>
  </div>
);

const ProfileSkeleton: React.FC = () => (
  <div className={styles.details__profile_card || styles['details__profile-card']}>
    <div className={styles['details__skeleton-profile']}>
      <Skeleton width="100px" height="100px" borderRadius="50%" />
      <div style={{ flex: 1 }}>
        <Skeleton width="200px" height="22px" />
        <div style={{ marginTop: 8 }}><Skeleton width="120px" height="14px" /></div>
      </div>
    </div>
  </div>
);

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading, error } = useUserDetails(id || '');
  const [activeTab, setActiveTab] = useState(0);

  if (loading) {
    return (
      <div>
        <button className={styles.details__back} onClick={() => navigate('/users')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Users
        </button>
        <ProfileSkeleton />
        <div className={styles['details__content-card']} style={{ marginTop: 24 }}>
          <div style={{ padding: 32 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <Skeleton width="120px" height="12px" />
                <div style={{ marginTop: 8 }}><Skeleton width="180px" height="16px" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div>
        <button className={styles.details__back} onClick={() => navigate('/users')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Users
        </button>
        <div className={styles['details__content-card']}>
          <div className={styles.details__error} role="alert">
            <p className={styles['details__error-text']}>
              {error || 'User not found.'}
            </p>
            <button onClick={() => navigate('/users')}>Back to Users</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back */}
      <button className={styles.details__back} onClick={() => navigate('/users')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Users
      </button>

      {/* Page header */}
      <div className={styles.details__header}>
        <h1>User Details</h1>
        <div className={styles.details__actions}>
          <button className={styles['details__blacklist-btn']}>Blacklist User</button>
          <button className={styles['details__activate-btn']}>Activate User</button>
        </div>
      </div>

      {/* Profile card */}
      <div className={styles['details__profile-card']}>
        <div className={styles['details__profile-top']}>
          {/* Avatar */}
          <div className={styles.details__avatar} aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          {/* Name & ID */}
          <div className={styles['details__name-block']}>
            <h2>{user.fullName}</h2>
            <p>LSQFf{user.id.slice(-6)}g90</p>
          </div>

          {/* Tier */}
          <div className={styles.details__tier}>
            <p>User's Tier</p>
            <StarRating tier={user.userTier} />
          </div>

          {/* Balance */}
          <div className={styles['details__balance-block']}>
            <p className={styles.details__balance}>{user.accountBalance}</p>
            <p className={styles.details__bank}>{user.accountNumber}/{user.bank}</p>
          </div>
        </div>

        {/* Tabs */}
        <nav className={styles.details__tabs} role="tablist" aria-label="User detail sections">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`tabpanel-${idx}`}
              id={`tab-${idx}`}
              className={`${styles.details__tab} ${activeTab === idx ? styles.active : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div
        className={styles['details__content-card']}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 0 && (
          <>
            {/* Personal Information */}
            <section className={styles.details__section} aria-labelledby="personal-info">
              <h3 id="personal-info">Personal Information</h3>
              <div className={styles.details__grid}>
                <Field label="Full Name" value={user.fullName} />
                <Field label="Phone Number" value={user.phoneNumber} />
                <Field label="Email Address" value={user.email} />
                <Field label="BVN" value={user.bvn} />
                <Field label="Gender" value={user.gender} />
                <Field label="Marital Status" value={user.maritalStatus} />
                <Field label="Children" value={user.children} />
                <Field label="Type of Residence" value={user.typeOfResidence} />
              </div>
            </section>

            {/* Education & Employment */}
            <section className={styles.details__section} aria-labelledby="edu-emp">
              <h3 id="edu-emp">Education and Employment</h3>
              <div className={styles['details__grid-2']}>
                <Field label="Level of Education" value={user.levelOfEducation} />
                <Field label="Employment Status" value={user.employmentStatus} />
                <Field label="Sector of Employment" value={user.sectorOfEmployment} />
                <Field label="Duration of Employment" value={user.durationOfEmployment} />
                <Field label="Office Email" value={user.officeEmail} />
                <Field label="Monthly Income" value={user.monthlyIncome} />
                <Field label="Loan Repayment" value={user.loanRepayment} />
              </div>
            </section>

            {/* Socials */}
            <section className={styles.details__section} aria-labelledby="socials">
              <h3 id="socials">Socials</h3>
              <div className={styles['details__grid-3']}>
                <Field label="Twitter" value={user.twitter} />
                <Field label="Facebook" value={user.facebook} />
                <Field label="Instagram" value={user.instagram} />
              </div>
            </section>

            {/* Guarantors */}
            <section className={styles.details__section} aria-labelledby="guarantors">
              <h3 id="guarantors">Guarantor</h3>
              {user.guarantors.map((g, i) => (
                <div key={i} style={{ marginBottom: i < user.guarantors.length - 1 ? 32 : 0 }}>
                  <div className={styles['details__grid-2']}>
                    <Field label="Full Name" value={g.fullName} />
                    <Field label="Phone Number" value={g.phoneNumber} />
                    <Field label="Email Address" value={g.email} />
                    <Field label="Relationship" value={g.relationship} />
                  </div>
                  {i < user.guarantors.length - 1 && (
                    <hr style={{ border: 'none', borderTop: '1px solid #213F7D1A', margin: '24px 0' }} />
                  )}
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab !== 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#8B8B8B' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <p style={{ fontSize: 16 }}>{TABS[activeTab]} coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
