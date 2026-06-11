export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute h-full top-0 left-0 border-r-4 border-r-primary bg-background__variant--light">
        
      </div>
      <div>{children}</div>
    </>
  );
}
