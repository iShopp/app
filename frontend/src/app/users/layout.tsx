import UserSidebar from '@/components/users/Sidebar';

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <div className="hidden md:block shrink-0">
        <UserSidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
