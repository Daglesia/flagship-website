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
        <span className="text-h5 absolute bottom-0 h-10 h-8 px-8 font-light">
          {footnote}
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`tile ${disabled ? "tile--disabled" : ""} aspect-video cursor-pointer gap-8 rounded-3xl bg-background__variant--light`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      <Image
        src={icon}
        alt="Daglesium Logo"
        priority
        className="img-background absolute left-0 right-0 z-0 m-auto w-32 max-w-32"
      />
      <h1 className="tile__title px-8 text-h2 text-primary">{title}</h1>
      <span className="tile__description h-24 px-8 text-h3 font-light">
        {description}
      </span>
      {footnoteJsx()}
    </div>
  );
}
