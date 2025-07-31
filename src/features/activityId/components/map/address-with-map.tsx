import KakaoMap from '@/features/activityId/components/map/kakao-map';

const AddressWithMap = ({ address }: { address: string }) => {
  return (
    <>
      <section className="flex flex-col gap-[0.8rem]">
        <h2 className="text-[1.6rem] font-bold text-gray-950">오시는 길</h2>
        <p className="text-[1.4rem] font-semibold text-gray-800">{address}</p>
        <div
          id="map"
          className="mb-[4rem] h-[18rem] w-full overflow-hidden rounded-[1.6rem]"
        >
          <KakaoMap />
        </div>
      </section>
    </>
  );
};
export default AddressWithMap;
