import { useState, useEffect, useCallback } from 'react';
import { User, FilterParams } from '../types';
import { fetchUsers, filterUsers } from '../services/api';
import { getPaginationState, savePaginationState } from '../services/storage';

export function useUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});

  const saved = getPaginationState();
  const [currentPage, setCurrentPage] = useState(saved.page);
  const [pageSize, setPageSize] = useState(saved.pageSize);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await fetchUsers();
        if (!cancelled) {
          setAllUsers(users);
          setFilteredUsers(users);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load users. Please try again.');
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { cancelled = true; };
  }, []);

  const applyFilters = useCallback((newFilters: FilterParams) => {
    setFilters(newFilters);
    const filtered = filterUsers(allUsers, newFilters);
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [allUsers]);

  const resetFilters = useCallback(() => {
    setFilters({});
    setFilteredUsers(allUsers);
    setCurrentPage(1);
  }, [allUsers]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    savePaginationState(page, pageSize);
  }, [pageSize]);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    savePaginationState(1, size);
  }, []);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    users: paginatedUsers,
    allUsers,
    filteredUsers,
    loading,
    error,
    filters,
    currentPage,
    pageSize,
    totalPages,
    totalUsers: filteredUsers.length,
    applyFilters,
    resetFilters,
    handlePageChange,
    handlePageSizeChange,
  };
}
