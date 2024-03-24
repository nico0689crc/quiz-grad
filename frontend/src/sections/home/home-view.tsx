"use client";

import { Stack } from "@mui/material";
import Hero from "./componentes/hero";

const HomeView = () => {
  return (
    <Stack flexGrow={1}>
      <Hero />
    </Stack>
  );
};

export default HomeView;
