export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-8 lg:px-12">
      <main className="max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}