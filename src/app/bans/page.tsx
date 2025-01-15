import { type Metadata } from "next";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loading } from '@/components/shared/feedback/loading';

export const metadata: Metadata = {
  title: "ExhibitionRP Bans",
  description: "View in-game bans.",
};

const Bans = dynamic(
  () => import('./_components/bans'),
  { 
    loading: () => <Loading />,
    ssr: true
  }
);

export default function BansPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <Suspense fallback={<Loading />}>
        <Bans />
      </Suspense>
    </main>
  );
}
