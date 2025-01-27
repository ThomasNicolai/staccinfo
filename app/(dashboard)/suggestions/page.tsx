import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
        <CardDescription>View all suggestions and their votes.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
