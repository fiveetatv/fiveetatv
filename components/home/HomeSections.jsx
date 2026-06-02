"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Landing from "./components/Landing";
import BetterThanSection from "./components/BetterThanSection";
import Certificate from "./components/Certificate";

const Products = dynamic(() => import("./components/Products"), { ssr: true });
const Why = dynamic(() => import("./components/Why"), { ssr: true });
const VideoSection = dynamic(() => import("./components/VideoSection"), { ssr: true });
const Review = dynamic(() => import("./components/Review"), { ssr: true });
const Story = dynamic(() => import("./components/Story"), { ssr: true });

function ProductsLoading() {
  const items = [1, 2, 3];
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-muted rounded w-48 mx-auto" />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(function(i) {
            return <div key={i} className="h-80 bg-muted rounded-2xl" />;
          })}
        </div>
      </div>
    </div>
  );
}

export default function HomeSections({ products }) {
  return (
    <div className="bg-background text-foreground w-full">
      <Landing />
      <BetterThanSection />
      <Suspense fallback={null}>
        <Certificate />
      </Suspense>
      <Suspense fallback={<ProductsLoading />}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 space-y-16 md:space-y-24 lg:space-y-32">
          <Products products={products} />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <Story />
      </Suspense>
      <Suspense fallback={null}>
        <Why />
      </Suspense>
      <Suspense fallback={null}>
        <VideoSection products={products} />
      </Suspense>
      <Suspense fallback={null}>
        <Review />
      </Suspense>
    </div>
  );
}
