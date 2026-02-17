import Image from "next/image";

type MediaBoxProps = {
  src: string;
  alt: string;
  /** pvz: "16/10", "4/3", "1/1" */
  ratio?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function MediaBox({
  src,
  alt,
  ratio = "16/10",
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: MediaBoxProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-900/10 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
