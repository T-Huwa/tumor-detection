"use client";

import Router from "next/router";
import { useState, useEffect } from "react";

import { AuthForm } from "@/components/auth-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-start p-1 md:p-4 bg-[url('/home-bg.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/home-bg.jpg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-blue-600/10"></div>
      </div>

      <div className="container max-w-xxl z-10 md:mr-8 md:justify-end">
        <AuthForm />
      </div>
    </div>
  );
}
