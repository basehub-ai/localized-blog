import * as React from "react";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Pump } from "basehub/react-pump";
import type { LanguageEnum } from "@/.basehub/schema";
import { ClientSelectRoot } from "./client";

export function LanguageSelect({ locale }: { locale: LanguageEnum }) {
  return (
    <Pump
      queries={[
        {
          settings: {
            language: {
              variants: {
                apiName: true,
                id: true,
                label: true,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          settings: { language },
        },
      ]) => {
        "use server";
        return (
          <ClientSelectRoot defaultValue={locale}>
            <SelectTrigger className="ml-auto w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {language.variants.map((language) => (
                  <SelectItem key={language.id} value={language.apiName}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </ClientSelectRoot>
        );
      }}
    </Pump>
  );
}
