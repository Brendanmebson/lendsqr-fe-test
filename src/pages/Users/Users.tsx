import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { getOrganizations } from '../../services/api';
import { FilterParams, User } from '../../types';
import StatusBadge from '../../components/common/StatusBadge';
import Pagination from '../../components/common/Pagination';
import { TableSkeleton } from '../../components/common/Skeleton';
import styles from './Users.module.scss';

// Icon imports
import iconU from '../../assets/icons/U.png';
import iconAU from '../../assets/icons/AU.png';
import iconUWL from '../../assets/icons/UWL.png';
import iconUWS from '../../assets/icons/UWS.png';

// ─── Stat Card ───────────────────────────────────────────────────────────────
const statCards = [
  { label: 'Users', value: '2,453', color: '#DF18FF', bgColor: '#FFF0FF', icon: iconU },
  { label: 'Active Users', value: '2,453', color: '#5718FF', bgColor: '#EEE8FF', icon: iconAU },
  { label: 'Users with Loans', value: '12,453', color: '#F55F44', bgColor: '#FFF3F0', icon: iconUWL },
  { label: 'Users with Savings', value: '102,453', color: '#FF3670', bgColor: '#FFE8EF', icon: iconUWS },
];

// ─── Filter Dropdown ─────────────────────────────────────────────────────────
interface FilterDropdownProps {
  onApply: (f: FilterParams) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApply, onReset, onClose }) => {
  const [local, setLocal] = useState<FilterParams>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const set = (key: keyof FilterParams, val: string) => setLocal(p => ({ ...p, [key]: val }));

  return (
    <div className={styles.filter} ref={ref} role="dialog" aria-label="Filter users">
      <div className={styles.filter__field}>
        <label htmlFor="f-org">Organization</label>
        <select id="f-org" value={local.organization || ''} onChange={e => set('organization', e.target.value)}>
          <option value="">Select</option>
          {getOrganizations().map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className={styles.filter__field}>
        <label htmlFor="f-username">Username</label>
        <input id="f-username" placeholder="User" value={local.username || ''} onChange={e => set('username', e.target.value)}/>
      </div>
      <div className={styles.filter__field}>
        <label htmlFor="f-email">Email</label>
        <input id="f-email" type="email" placeholder="Email" value={local.email || ''} onChange={e => set('email', e.target.value)}/>
      </div>
      <div className={styles.filter__field}>
        <label htmlFor="f-date">Date</label>
        <input id="f-date" type="date" value={local.date || ''} onChange={e => set('date', e.target.value)}/>
      </div>
      <div className={styles.filter__field}>
        <label htmlFor="f-phone">Phone Number</label>
        <input id="f-phone" placeholder="Phone Number" value={local.phoneNumber || ''} onChange={e => set('phoneNumber', e.target.value)}/>
      </div>
      <div className={styles.filter__field}>
        <label htmlFor="f-status">Status</label>
        <select id="f-status" value={local.status || ''} onChange={e => set('status', e.target.value)}>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className={styles.filter__actions}>
        <button className={styles.filter__reset} onClick={() => { setLocal({}); onReset(); }}>Reset</button>
        <button className={styles.filter__apply} onClick={() => { onApply(local); onClose(); }}>Filter</button>
      </div>
    </div>
  );
};

// ─── Row Actions Menu ─────────────────────────────────────────────────────────
interface ActionsMenuProps {
  user: User;
  onClose: () => void;
  openUpward?: boolean;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ user, onClose, openUpward }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const menuClass = `${styles['users__actions-menu']} ${openUpward ? styles['users__actions-menu--upward'] : ''}`;

  return (
    <div className={menuClass} ref={ref} role="menu" aria-label={`Actions for ${user.username}`}>
      <button role="menuitem" onClick={() => { navigate(`/users/${user.id}`); onClose(); }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        View Details
      </button>
      <button role="menuitem" onClick={onClose}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/>
        </svg>
        Blacklist User
      </button>
      <button role="menuitem" onClick={onClose}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <polyline points="16 11 18 13 22 9"/>
        </svg>
        Activate User
      </button>
    </div>
  );
};

// ─── Main Users Page ──────────────────────────────────────────────────────────
const Users: React.FC = () => {
  const {
    users, loading, error,
    currentPage, pageSize, totalPages, totalUsers,
    applyFilters, resetFilters,
    handlePageChange, handlePageSizeChange,
  } = useUsers();

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  const handleFilterToggle = useCallback(() => setFilterOpen(p => !p), []);

  return (
    <div className={styles.users}>
      <h1 className={styles.users__title}>Users</h1>

      {/* Stat cards */}
      <div className={styles.users__stats}>
        {statCards.map(card => (
          <div key={card.label} className={styles['users__stat-card']}>
            <div className={styles['users__stat-card-icon']}>
              <img src={card.icon} alt={card.label} width={35} height={35} />
            </div>
            <p className={styles['users__stat-card-label']}>{card.label}</p>
            <p className={styles['users__stat-card-value']}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className={styles['users__table-wrapper']}>
          <TableSkeleton />
        </div>
      ) : error ? (
        <div className={styles['users__table-wrapper']}>
          <div className={styles.users__error} role="alert">
            <div className={styles['users__error-icon']}>⚠️</div>
            <p className={styles['users__error-text']}>{error}</p>
            <button className={styles['users__error-retry']} onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles['users__table-wrapper']}>
            <div className={styles['users__table-scroll']}>
              <table className={styles.users__table} aria-label="Users list">
                <thead>
                  <tr>
                    {[
                      { key: 'organization', label: 'Organization' },
                      { key: 'username', label: 'Username' },
                      { key: 'email', label: 'Email' },
                      { key: 'phoneNumber', label: 'Phone Number' },
                      { key: 'dateJoined', label: 'Date Joined' },
                      { key: 'status', label: 'Status' },
                    ].map(col => (
                      <th key={col.key} scope="col">
                        <div className={styles['users__th-inner']}>
                          {col.label}
                          <button
                            ref={col.key === 'organization' ? filterBtnRef : undefined}
                            onClick={col.key === 'organization' ? handleFilterToggle : undefined}
                            aria-label={`Filter by ${col.label}`}
                            aria-expanded={col.key === 'organization' ? filterOpen : undefined}
                            aria-haspopup={col.key === 'organization' ? 'true' : undefined}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <line x1="4" y1="6" x2="20" y2="6"/>
                              <line x1="7" y1="12" x2="17" y2="12"/>
                              <line x1="10" y1="18" x2="14" y2="18"/>
                            </svg>
                          </button>
                          {col.key === 'organization' && filterOpen && (
                            <FilterDropdown
                              onApply={applyFilters}
                              onReset={resetFilters}
                              onClose={() => setFilterOpen(false)}
                            />
                          )}
                        </div>
                      </th>
                    ))}
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className={styles.users__empty}>
                          <div className={styles['users__empty-icon']}>🔍</div>
                          <p className={styles['users__empty-text']}>No users match your filters</p>
                          <p className={styles['users__empty-sub']}>Try adjusting or resetting your filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user.id}>
                        <td>{user.organization}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.dateJoined}</td>
                        <td><StatusBadge status={user.status} /></td>
                        <td>
                          <div className={`${styles.users__actions} ${activeMenu === user.id ? styles['users__actions--active'] : ''}`}>
                            <button
                              className={styles['users__actions-btn']}
                              onClick={() => setActiveMenu(p => p === user.id ? null : user.id)}
                              aria-label={`More actions for ${user.username}`}
                              aria-expanded={activeMenu === user.id}
                              aria-haspopup="menu"
                            >
                              <svg width="4" height="18" viewBox="0 0 4 18" fill="currentColor">
                                <circle cx="2" cy="2" r="2"/><circle cx="2" cy="9" r="2"/><circle cx="2" cy="16" r="2"/>
                              </svg>
                            </button>
                            {activeMenu === user.id && (
                              <ActionsMenu
                                user={user}
                                onClose={() => setActiveMenu(null)}
                                openUpward={idx >= users.length - 2 && users.length > 2}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles['users__pagination-wrap']}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalUsers}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
