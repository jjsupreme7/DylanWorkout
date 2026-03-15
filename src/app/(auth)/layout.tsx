export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </h1>
          <p className="mt-2 text-sm text-text-secondary">Elite fitness & nutrition coaching</p>
        </div>
        {children}
      </div>
    </div>
  );
}
