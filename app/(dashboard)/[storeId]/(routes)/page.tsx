interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
