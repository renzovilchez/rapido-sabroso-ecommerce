import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const normalizeUser = (user) => ({
  customerId: user.customerId || user.id_cliente || user.idCliente || '',
  adminId: user.adminId || user.id_admin || user.idAdmin || '',
  firstName: user.firstName || user.nombre || '',
  lastName: user.lastName || user.apellidos || '',
  email: user.email || user.correo || '',
  address: user.address || user.direccion || '',
  ruc: user.ruc || '',
  dni: user.dni || '',
  businessName: user.businessName || user.razon_social || '',
  taxAddress: user.taxAddress || user.direccion_fiscal || '',
  role: user.role || 'customer',
});

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      login: (token, user) =>
        set({ token, user: normalizeUser(user), isHydrated: true }),
      logout: () => {
        set({ token: null, user: null });
      },
      setUser: (user) => set({ user: normalizeUser(user) }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ isHydrated: true });
      },
    }
  )
);

export default useAuthStore;
