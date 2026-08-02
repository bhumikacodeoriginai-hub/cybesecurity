import Sidebar from '@/components/layout/Sidebar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark-950">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="pt-14 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
