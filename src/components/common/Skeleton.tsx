import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  className = '',
}) => (
  <div
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
);

export const TableSkeleton: React.FC = () => (
  <div className={styles['table-skeleton']} aria-label="Loading users...">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className={styles['table-skeleton__row']}>
        {Array.from({ length: 6 }).map((_, j) => (
          <Skeleton key={j} width={j === 5 ? '80px' : '100%'} height="14px" />
        ))}
      </div>
    ))}
  </div>
);
