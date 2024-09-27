import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
