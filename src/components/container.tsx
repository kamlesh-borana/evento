function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl m-auto bg-white/[2%] min-h-screen flex flex-col">
      {children}
    </div>
  );
}

export default Container;
