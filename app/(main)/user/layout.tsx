import UserSidebar from "../../../components/UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <UserSidebar />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}