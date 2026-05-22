import { notFound } from "next/navigation";
import { mockCreator } from "@/data/mock/creator";
import { PublicProfileView } from "@/features/profile/components/public-profile-view";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  return <PublicProfileView />;
}
