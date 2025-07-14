import { Button } from '@/shared/shadcn/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background h-screen md:bg-amber-100 lg:bg-amber-400">
      <Button className="bg-red-100">shadcn button</Button>
      <p className="txt-14-medium text-main md:txt-24-bold md:text-sub lg:txt-32-medium bg-back lg:text-red-500">
        프리텐다드 폰트, 반응형, font-size:62.5%, 폴더구조,
        LF설정(윈도우),settings.json,providers,프리티어,
      </p>
      <div className="border-sub-300 size-[12rem] rounded-[10rem] border-8 bg-amber-300"></div>
    </div>
  );
}
