import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailsRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/apps/games/${slug}`);
}
