import ThemeToggle from '../components/main/ThemeSwitch';
const MainLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
        <section className="w-full flex-1 min-h-0 flex flex-col">
          <ThemeToggle />
            {children}
        </section>
    </main>
  );
};

export default MainLayout;