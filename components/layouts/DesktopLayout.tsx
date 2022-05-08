import { Grid, GridItem } from "@chakra-ui/react";

import Navbar from "@/common/Navbar";

interface IDesktopLayout {
  children?: React.ReactNode;
}

const DesktopLayout = ({ children }: IDesktopLayout) => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(1, 1fr)"
      templateColumns={"repeat( 9, 1fr)"}
      gap={0}
    >
      <GridItem width={"20vh"} colSpan={1} shadow="sm">
        <Navbar />
      </GridItem>
      <GridItem colSpan={8} bg="#f5f5f5">
        {children}
      </GridItem>
    </Grid>
  );
};
export default DesktopLayout;
