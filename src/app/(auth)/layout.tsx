import { Flame } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh]">
      {/* Left — branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] lg:flex-col lg:justify-between bg-card border-r border-border/60 p-10 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="relative">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </h1>
        </div>
        <div className="relative">
          <div className="h-14 w-14 rounded-[--radius-xl] bg-brand-muted flex items-center justify-center mb-5">
            <Flame className="h-7 w-7 text-brand" strokeWidth={1.5} />
          </div>
          <blockquote className="text-lg font-medium leading-relaxed max-w-md">
            &ldquo;Down 22 lbs and stronger than I&apos;ve ever been. The program is intense but the coaching keeps you on track.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-text-secondary">
            Marcus T. &mdash; 12 weeks in the program
          </p>
        </div>
        <p className="relative text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Enter the Dragon
        </p>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile-only branding */}
          <div className="mb-8 lg:hidden">
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              ENTER THE <span className="text-brand">DRAGON</span>
            </h1>
            <p className="mt-1.5 text-sm text-text-secondary">Elite fitness & nutrition coaching</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
