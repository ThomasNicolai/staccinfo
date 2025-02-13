export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const articleData = {
    slug: slug,
    content: 'Lorem Ipsum'
  };
  return <div>My Post: {slug}</div>;
}
