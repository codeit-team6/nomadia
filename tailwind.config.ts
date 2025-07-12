import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        // 모바일 우선이므로 기본은 모바일 (~375)
        tablet: "376px", // 376 이상
        desktop: "745px", // 745 이상
      },
    },
  },
};

export default config;
