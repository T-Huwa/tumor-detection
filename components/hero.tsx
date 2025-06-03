"use client";

import Image from "next/image";
import SplitText from "./anim/split-text";
import Link from "next/link";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function Hero({ isDoctor = false }: { isDoctor: boolean }) {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col-reverse items-center justify-center gap-12 py-16 md:flex-row md:py-24 lg:py-32">
      <div className="flex flex-1 flex-col space-y-6 text-center md:text-left">
        <div className="space-y-4">
          <SplitText
            text="Advanced Brain Tumor Detection System"
            className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl"
            delay={50}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="mx-auto max-w-[42rem] text-lg leading-normal text-white md:mx-0">
            Leveraging AI and machine learning to provide accurate, rapid
            detection and classification of brain tumors from MRI scans.
          </p>
        </div>
        {isDoctor && (
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
            <Link
              href={"/user/analyze"}
              className="p-3 text-white rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
            >
              Start Predicting
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-xl border border-gray-300 shadow-xl md:max-w-md">
          <Image
            src="/tumor-img.jpg"
            alt="Brain MRI scan with tumor detection overlay"
            width={600}
            height={600}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-teal-500/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-md bg-background/80 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Tumor detected</p>
                <p className="text-xs text-muted-foreground">
                  Glioblastoma - 98.7% confidence
                </p>
              </div>
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
