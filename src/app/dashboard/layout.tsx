const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
