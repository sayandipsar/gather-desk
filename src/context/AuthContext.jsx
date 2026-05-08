import { createContext, useContext, useMemo, useState } from 'react';
import { loadDb } from '../firebase/localDb';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const employees = loadDb().employees;
  const [userId, setUserId] = useState('emp001');
  const user = useMemo(() => employees.find((emp) => emp.id === userId), [employees, userId]);

  return (
    <AuthContext.Provider value={{ user, userId, setUserId, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
