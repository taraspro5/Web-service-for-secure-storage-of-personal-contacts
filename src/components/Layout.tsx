import { Container } from "@mui/material";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return <Container>{children}</Container>;
};
