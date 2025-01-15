export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="duration-300 ease-in-out animate-in fade-in">
      {children}
    </div>
  );
}
