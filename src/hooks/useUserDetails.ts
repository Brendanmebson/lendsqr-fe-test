import { useState, useEffect } from 'react';
import { User } from '../types';
import { fetchUserById } from '../services/api';
import { saveUserToStorage, getUserFromStorage } from '../services/storage';

export function useUserDetails(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      // Try cache first
      const cached = getUserFromStorage(id);
      if (cached) {
        setUser(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserById(id);
        saveUserToStorage(data);
        setUser(data);
        setLoading(false);
      } catch {
        setError('Failed to load user details. Please try again.');
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return { user, loading, error };
}
