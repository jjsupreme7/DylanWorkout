import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ImageWithOverlayProps {
  src: string;
  alt: string;
  overlay?: number;
  className?: string;
  priority?: boolean;
}

export function ImageWithOverlay({
  src,
  alt,
  overlay = 0.6,
  className,
  priority = false,
}: ImageWithOverlayProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: overlay }}
      />
    </div>
  );
}
