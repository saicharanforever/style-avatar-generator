
import React from "react";
import { Compare } from "@/components/ui/compare";

interface CompareDemoProps {
  firstImage: string;
  secondImage: string;
  className?: string;
}

export function CompareDemo({ firstImage, secondImage, className }: CompareDemoProps) {
  return (
    <div className="p-2 sm:p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 w-full max-w-sm sm:max-w-md lg:max-w-lg">
      <Compare
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageClassName="object-cover object-center"
        secondImageClassname="object-cover object-center"
        className="h-[300px] w-full sm:h-[350px] md:h-[400px] lg:h-[450px]"
        slideMode="hover"
      />
    </div>
  );
}
