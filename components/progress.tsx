"use client";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";

export default function Progress({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      NProgress.done(false);
    });
  }, [Router]);
  return <>{children}</>;
}
