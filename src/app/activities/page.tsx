import AllActivities from '@/features/activities/components/all-activities';
import BannerCarousel from '@/features/activities/components/banner-carousel';
import BestActivities from '@/features/activities/components/best-activities';

const ActivitiesPage = () => {
  return (
    <main className="bg-background flex w-full flex-col gap-10">
      <BannerCarousel />
      {/* <Search /> */}
      <BestActivities />
      <AllActivities />
    </main>
  );
};

export default ActivitiesPage;
