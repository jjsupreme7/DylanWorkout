import Image from "next/image";
import { Shield } from "lucide-react";

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh]">
      {/* Left — branding panel with background photo (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] lg:flex-col lg:justify-between relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/backgrounds/apply-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="45vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-black/20" />

        <div className="relative p-10">
          <h1 className="font-heading text-2xl font-bold tracking-wider">
            ENTER THE <span className="text-brand">DRAGON</span>
          </h1>
        </div>

        <div className="relative p-10">
          <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center mb-5">
            <Shield className="h-7 w-7 text-brand" strokeWidth={1.5} />
          </div>
          <blockquote className="text-lg font-medium leading-relaxed max-w-md">
            &ldquo;The difference is the coaching. Every check-in gets a real response, every program gets adjusted. It&apos;s not a subscription — it&apos;s a partnership.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-text-secondary">
            Sarah K. &mdash; 6 months in the program
          </p>
        </div>

        <p className="relative p-10 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Enter the Dragon
        </p>
      </div>

      {/* Right — form area */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 bg-bg">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
