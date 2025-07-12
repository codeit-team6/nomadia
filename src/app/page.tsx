import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button>shadcn button</Button>
      <p className="tablet:text-amber-700 p-[3rem] text-[2.1rem] font-bold">
        프리텐다드 폰트, 반응형, font-size:62.5%, 폴더구조,
        LF설정(윈도우),settings.json,providers,프리티어,
      </p>
    </div>
  );
}
