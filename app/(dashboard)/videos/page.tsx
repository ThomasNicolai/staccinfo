import VideoList from './VideoList.server';

export default async function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Render the video list with progression data */}
      <VideoList />
    </div>
  );
}