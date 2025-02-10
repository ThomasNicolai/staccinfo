import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileAttachment } from '@/components/file-attachment';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold">Vi ønsker dine innspill</h1>
          <p className="text-gray-400">Her får du fullstendig oversikt over dine moduler hos oss.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="bg-blue-500 p-6 text-white cursor-pointer">
            <CardTitle>Nytt forslag</CardTitle>
            <Button className="text-xl">+</Button>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Knapp</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur elit. Sed do eiusmod...
              </CardDescription>
              <FileAttachment fileName="Skjermbilde Escali Financials.zip" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}