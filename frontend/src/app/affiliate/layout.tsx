import AffiliateSidebar from '@/components/affiliate/Sidebar';
import DashboardLayout from '@/components/dashboards/DashboardLayout';

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Affiliate Dashboard" subtitle="Links, conversions, earnings and banners" sidebar={<AffiliateSidebar />}>
      {children}
    </DashboardLayout>
  );
}
