export interface TextButtonProps {
  text: string;
}

export default function TextButton({ text }: TextButtonProps) {
  return (
    <button className="relative flex h-14 w-fit min-w-48 cursor-pointer place-items-center justify-center rounded-3xl bg-primary hover:bg-secondary__variant--dark">
      <p className="px-8 text-h3 text-background">{text}</p>
    </button>
  );
}
