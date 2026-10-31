import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ app?: string; package?: string }>;
}

export default async function DirectDeleteAccountPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const appSlug = params.app || params.package || 'arrow-binge';
  const normalized = appSlug === 'arrow.binge' ? 'arrow-binge' : appSlug;
  redirect(`/apps/games/${normalized}/delete-account`);
}
