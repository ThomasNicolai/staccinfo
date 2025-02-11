// app/page.tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4 text-lg">
        Use the sidebar to navigate to Suggestions, Customers, Products, and
        Articles.
      </p>
    </div>
  );
}
