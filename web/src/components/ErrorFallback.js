import { Box, Button, Heading, Stack, Image } from "@chakra-ui/react";
import SEO from "./seo/SEO";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box minW="100vw" minH="100vh" px="32" py="24">
      <SEO title={error.message} />
      <Stack alignItems="center">
        <Image src="/images/404.png" alt="404" boxSize="20em" />
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading fontSize="2rem" fontWeight="bold" color="#11152C">
            Whoops :(
          </Heading>
          <Heading py="4" as="pre" fontSize="1rem" fontWeight="medium">
            {error.message}
          </Heading>
          <Button
            backgroundColor="linkedin.400"
            color="white"
            _hover="none"
            onClick={resetErrorBoundary}
          >
            Back to Home
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ErrorFallback;
