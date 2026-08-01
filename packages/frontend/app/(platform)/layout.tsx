import Sidebar from '@/components/layout/Sidebar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#030712]">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-8 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
