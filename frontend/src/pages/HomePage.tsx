import { useHealthStatus } from '../hooks/useHealthStatus';

function HomePage() {
  const apiStatus = useHealthStatus();

  return (
    <main className="home-page">
      <p>API status: {apiStatus}</p>
      <p>Notes dashboard, editor, and auth screens will live here.</p>
    </main>
  );
}

export default HomePage;
