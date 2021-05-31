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
  Select,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import * as Yup from "yup";
import useUserStore from "../store/useUserStore";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import SEO from "../components/seo/SEO";

const validation = Yup.object().shape({
  email: Yup.string().required("Ce champ est obligatoire").email(),
  passwordConfirmation: Yup.string().required("Ce champ est obligatoire"),
  nom: Yup.string().required("Ce champ est obligatoire"),
  prenom: Yup.string().required("Ce champ est obligatoire"),
  matricule: Yup.string().required("Ce champ est obligatoire"),
  uniteAdmin: Yup.string().required("Ce champ est obligatoire"),
  telMobile: Yup.string().required("Ce champ est obligatoire"),
  Login: Yup.string().required("Ce champ est obligatoire"),
  password: Yup.string().required("Ce champ est obligatoire"),
});

const Register = ({ todos }) => {
  const initialState = {
    email: "",
    password: "",
    passwordConfirmation: "",
    nom: "",
    prenom: "",
    matricule: "",
    uniteAdmin: "",
    telMobile: "",
    Login: "",
  };

  const { error, success, inscription } = useUserStore(
    (state) => ({
      error: state.error,
      success: state.successRegister,
      inscription: state.register,
    }),
    shallow
  );
  const toast = useToast();
  const router = useRouter();

  const register = (values) => {
    if (values.password === values.passwordConfirmation) {
      const formRegistration = {
        email: values.email,
        password: values.password,
        nom: values.nom,
        prenom: values.prenom,
        matricule: values.matricule,
        uniteAdmin: values.uniteAdmin,
        telMobile: values.telMobile.toString(),
        Login: values.Login,
      };
      inscription(formRegistration);
    } else {
      toast({
        title: "Mot de passe",
        description: "Le mot de passe doit être identique",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (success) {
      router.push("/");
      toast({
        title: "Inscription fait avec succès",
        description: "Attendez que votre compte soit activez",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Inscription",
        description: "Failed",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, error]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <SEO title="S'inscrire" />
      <Stack spacing={8} mx={"auto"} maxW={"6xl"} width={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Connectez-vous à votre compte</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Déjà membre?{" "}
            <Link href="/">
              <a style={{ color: "blue.400" }}>se connecter</a>
            </Link>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={4}
        >
          <Formik
            initialValues={initialState}
            validationSchema={validation}
            onSubmit={register}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <Flex
                    style={{ gap: "6px" }}
                    justifyContent={{
                      base: "space-between",
                      md: "space-between",
                      small: "space-between",
                    }}
                    flexDirection={{ base: "row", md: "row", small: "column" }}
                  >
                    <FormControl id="nom">
                      <FormLabel>Nom</FormLabel>
                      <Input
                        type="text"
                        placeholder="Entrer votre nom"
                        value={values.nom}
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                        name="nom"
                      />
                      <FormErrorMessage>{errors.nom}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="prenom">
                      <FormLabel>Prénom</FormLabel>
                      <Input
                        type="text"
                        placeholder="Entrer votre prénom"
                        value={values.prenom}
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                        name="prenom"
                      />
                      <FormErrorMessage>{errors.prenom}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    style={{ gap: "6px" }}
                    justifyContent={{
                      base: "space-between",
                      md: "space-between",
                      small: "center",
                    }}
                    flexDirection={{ base: "row", md: "row", small: "column" }}
                  >
                    <FormControl id="email">
                      <FormLabel>Adresse email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Entrer votre adresse email"
                        value={values.email}
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                        name="email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="matricule">
                      <FormLabel>Numéro matricule</FormLabel>
                      <Input
                        type="text"
                        placeholder="Entrer votre numéro matricule"
                        value={values.matricule}
                        onChange={handleChange}
                        name="matricule"
                        required="Ce champ est obligatoire"
                      />
                      <FormErrorMessage>{errors.matricule}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    style={{ gap: "6px" }}
                    justifyContent={{
                      base: "space-between",
                      md: "space-between",
                      small: "center",
                    }}
                    flexDirection={{ base: "row", md: "row", small: "column" }}
                  >
                    <FormControl id="telMobile">
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <Input
                        type="number"
                        placeholder="Entrer votre numéro téléphone"
                        value={values.telMobile}
                        name="telMobile"
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                      />
                      <FormErrorMessage>{errors.telMobile}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="Login">
                      <FormLabel>Login</FormLabel>
                      <Input
                        type="text"
                        placeholder="Entrer votre login"
                        value={values.Login}
                        name="Login"
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                      />
                      <FormErrorMessage>{errors.Login}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <FormControl id="uniteAdmin">
                    <FormLabel>Unité administrative</FormLabel>
                    <Select
                      value={values.uniteAdmin}
                      name="uniteAdmin"
                      onChange={handleChange}
                      id="unit"
                      placeholder="Selectionnez une unité administrative"
                      required="Ce champ est obilgatoire"
                    >
                      <option value="tribunal">Tribunal</option>
                      <option value="finance">Finance</option>
                    </Select>
                  </FormControl>
                  <Flex
                    style={{ gap: "6px" }}
                    justifyContent={{
                      base: "space-between",
                      md: "space-between",
                      small: "center",
                    }}
                    flexDirection={{ base: "row", md: "row", small: "column" }}
                  >
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
                    <FormControl id="confirmationPassword">
                      <FormLabel>Confirmation du mot de passe</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirmation du mot de passe"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        required="Ce champ est obligatoire"
                        name="passwordConfirmation"
                      />
                      <FormErrorMessage>
                        {errors.passwordConfirmation}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      S'inscire
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

export default Register;
