import UserSidebar from '@/components/users/Sidebar';
import DashboardLayout from '@/components/dashboards/DashboardLayout';

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="User Dashboard" subtitle="Orders, wishlist, coupons, addresses and payments" sidebar={<UserSidebar />}>
      {children}
    </DashboardLayout>
  );
}
