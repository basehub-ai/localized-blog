"use client";
import { LanguagesEnum } from "@/.basehub/schema";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Select } from "../select";
import { useRouter } from "next/navigation";

export const ClientSelectRoot = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: LanguagesEnum;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (pathname === `/${value}` || pathname.startsWith(`/${value}/`)) {
      return;
    }

    router.push(pathname.replace(`/${defaultValue}`, `/${value}`));
  }, [value, defaultValue, pathname, router]);

  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={setValue}>
      {children}
    </Select>
  );
};
