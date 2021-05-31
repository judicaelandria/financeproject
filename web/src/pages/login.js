import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import * as Yup from "yup";
import useUserStore from "../store/useUserStore";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";
import SEO from "../components/seo/SEO";
import ErrorFallback from "../components/ErrorFallback";

const validation = Yup.object().shape({
  email: Yup.string().required("Ce champ est obligatoire").email(),
  password: Yup.string().required("Ce champ est obligatoire"),
});

const Login = () => {
  const initialState = { email: "", password: "" };
  const toast = useToast();
  const router = useRouter();
  const { login, error, success, invalidCredentials } = useUserStore(
    (state) => ({
      login: state.signIn,
      success: state.success,
      error: state.error,
      invalidCredentials: state.invalidCredentials,
    }),
    shallow
  );
  const signIn = (values) => {
    login(values);
  };

  useEffect(() => {
    if (success) {
      router.push("/dashboard");
    } else if (error) {
      toast({
        title: "Connexion failed",
        description:
          "Erreur lors de votre connexion ou votre compte n'a pas encore été activé par l'administrateur",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (invalidCredentials) {
      toast({
        title: "Connexion failed",
        description: "Email ou mot de passe incorrect",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, error, invalidCredentials]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <SEO title="Se connecter" />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Connectez-vous à votre compte</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Pas encore membre?{" "}
            <Link href="/register">
              <a style={{ color: "blue.400" }}>s'inscrire</a>
            </Link>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={initialState}
            validationSchema={validation}
            onSubmit={signIn}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Adresse email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Entrer votre adresse email"
                      value={values.email}
                      onChange={handleChange}
                      required="Ce champ est obligatoire"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Entrer votre mot de passe"
                      value={values.password}
                      onChange={handleChange}
                      required="Ce champ est obligatoire"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Connexion
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
