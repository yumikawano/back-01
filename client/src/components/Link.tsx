import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export function Link({ to, children }: LinkProps) {
  return (
    <RouterLink to={to}>
      {children}
    </RouterLink>
  );
}
