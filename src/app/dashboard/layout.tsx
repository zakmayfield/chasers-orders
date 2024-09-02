import { DashboardTemplate } from '@/features/dashboard/templates/DashboardTemplate';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
