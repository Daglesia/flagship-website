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
    if(footnote) {
      return <span className="absolute bottom-0 h-10 text-h5 font-light px-8 h-8">
        {footnote}
      </span>
    }
    return null;
  }

  return (
    <div
      className={`tile ${disabled ? "tile--disabled" : ""} gap-8 aspect-video bg-background__variant--light rounded-3xl cursor-pointer`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
          <Image
            src={icon}
            alt="Daglesium Logo"
            priority
            className="max-w-32 w-32 m-auto absolute z-0 left-0 right-0 img-background"
          />
      <h1 className="tile__title text-h2 text-primary px-8">{title}</h1>
      <span className="tile__description text-h3 font-light px-8 h-24">
        {description}
      </span>
      {footnoteJsx()}
    </div>
  );
}