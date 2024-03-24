"use client";

import { paths } from "@/routes/paths";

export type NavbarConfingReturnType = {
  title: string;
  href: string;
  duration: number;
  isPublic: boolean;
};

export const useNavbarConfig: NavbarConfingReturnType[] = [
  {
    title: "navbar.how_works",
    href: paths.how_works,
    duration: 0.75,
    isPublic: true,
  },
  {
    title: "navbar.features",
    href: paths.features,
    duration: 1,
    isPublic: true,
  },
  {
    title: "navbar.about_us",
    href: paths.about_us,
    duration: 1.25,
    isPublic: true,
  },
  {
    title: "Quizs",
    href: paths.quizes.root,
    duration: 1.55,
    isPublic: false,
  },
];
