import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<typeof Link>, "to"> & {
  to: string;
  children?: ReactNode;
};

export function AppLink({ to, ...props }: Props) {
  return <Link to={to as never} {...props} />;
}
