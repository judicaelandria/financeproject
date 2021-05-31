import { Box, Flex, HStack } from "@chakra-ui/layout";
import Navigation from "../navigation/Navigation";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "../../store/useUserStore";
import shallow from "zustand/shallow";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";

const cookies = new Cookies();

const Layout = ({ children }) => {
  const { fetchUser } = useUserStore(
    (state) => ({
      fetchUser: state.fetchUser,
      user: state.user,
    }),
    shallow
  );
  const router = useRouter();
  useEffect(() => {
    if (!cookies.get("jwt")) {
      router.push("/login");
    } else {
      fetchUser();
    }
  }, [cookies.get("jwt")]);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => router.push("/dashboard")}
    >
      <Box minH="100vh" minW="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          backgroundColor="#fff"
        >
          <Navigation />
          <Box marginLeft="20%" maxW="80%" width="80%" py="4" px="4">
            <Box
              backgroundColor="#FBFAFC"
              borderRadius="lg"
              py="6"
              px="6"
              minH="90vh"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default Layout;
