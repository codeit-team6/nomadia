import AllActivities from '@/features/activities/components/all-activities';
import BannerCarousel from '@/features/activities/components/banner-carousel';
import BestActivities from '@/features/activities/components/best-activities';
import Search from '@/features/activities/components/search';

const ActivitiesPage = () => {
  return (
    <main className="bg-background flex w-full flex-col gap-10">
      <BannerCarousel />
      <Search />
      <BestActivities />
      <AllActivities />
    </main>
  );
};

export default ActivitiesPage;
