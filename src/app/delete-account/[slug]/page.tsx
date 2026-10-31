import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DirectDeleteAccountSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const normalized = slug === 'arrow.binge' ? 'arrow-binge' : slug;
  redirect(`/apps/games/${normalized}/delete-account`);
}
