"use client";

import merge from "lodash/merge";
// date fns
import { enUS as enUSAdapter, es as esESAdapter } from "date-fns/locale";

// core (MUI)
import { enUS as enUSCore, esES as esESCore } from "@mui/material/locale";

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: merge(enUSCore),
    adapterLocale: enUSAdapter,
    icon: "flagpack:gb-nir",
    numberFormat: {
      code: "en-US",
      currency: "USD",
    },
  },
  {
    label: "Español",
    value: "es",
    systemValue: merge(esESCore),
    adapterLocale: esESAdapter,
    icon: "flagpack:es",
    numberFormat: {
      code: "es-Es",
      currency: "EUR",
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
