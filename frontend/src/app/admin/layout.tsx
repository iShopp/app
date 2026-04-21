import AdminSidebar from '@/components/admin/Sidebar';
import DashboardLayout from '@/components/dashboards/DashboardLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="KPIs, product and order management, analytics and automation" sidebar={<AdminSidebar />}>
      {children}
    </DashboardLayout>
  );
}
