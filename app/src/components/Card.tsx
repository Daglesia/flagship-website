import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface CardProps {
  title: string;
  description: string;
  icon: StaticImport;
  disabled?: boolean;
  footnote?: string;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  icon,
  footnote,
  disabled = false,
  onClick,
}: CardProps) {
  const footnoteJsx = () => {
    if (footnote) {
      return (
        <span className="absolute bottom-2 px-4 font-light">{footnote}</span>
      );
    }
    return null;
  };

  return (
    <div
      className={`tile ${disabled ? "tile--disabled" : ""} cursor-pointer gap-2 rounded-3xl bg-background__variant--light`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      <Image
        src={icon}
        alt="Daglesium Logo"
        priority
        className="img-background absolute inset-0 z-0 m-auto h-32 w-32 max-w-32 object-contain"
      />
      <h1 className="tile__title px-4 text-h3 text-primary">{title}</h1>
      <span className="tile__description px-4 text-p font-light">
        {description}
      </span>
      {footnoteJsx()}
    </div>
  );
}
