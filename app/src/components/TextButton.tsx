export interface TextButtonProps {
  text: string;
}

export default function TextButton({ text }: TextButtonProps) {
  return (
    <button className="relative min-w-48 w-fit h-14 bg-primary rounded-3xl flex place-items-center justify-center cursor-pointer hover:bg-secondary__variant--dark">
      <p className="text-h3 text-background px-8">{text}</p>
    </button>
  );
}
