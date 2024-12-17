interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <main className="min-h-screen overflow-auto bg-blue-500 text-white ">
      <div className="mx-auto max-w-screen-xl h-full">{children}</div>
    </main>
  );
}
