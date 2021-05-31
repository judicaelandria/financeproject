import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import useCreate from "../../hooks/useCreate";
import useSave from "../../hooks/useSave";
import LayoutModal from "./Modal";

const AssignModal = ({ isOpen, onClose, lid }) => {
  const dates = [
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ];
  const occupants = [
    "Agent décisionnaire",
    "Epoux",
    "Enfant",
    "Famille",
    "Simple personne",
  ];
  const initialState = {
    decision: "",
    nom: "",
    prenom: "",
    sexe: "",
    dateDeNaissance: "",
    fonction: "",
    cin: "",
    anneeOccupation: "",
    occupantReel: "",
    acteDeMariage: "",
    nomConjoint: "",
    prenomConjoint: "",
    sexeConjoint: "",
    cinConjoint: "",
    dateDeNaissanceConjoint: "",
    isAdministrationEmploye: false,
  };
  const toast = useToast();
  const assignMutation = useCreate("occupant/create", "occupant");
  const logementMutation = useSave(`logement/${lid}/assign`, "batiment");
  const onAssign = (values) => {
    assignMutation.mutate(values, {
      onSuccess: () => {
        logementMutation.mutate(
          { isAttributed: true },
          {
            onSuccess: () => {
              onClose();
              toast({
                title: "Occupant bâtiment",
                description: "attribuer avec succès",
                position: "bottom",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            },
            onError: () => {
              toast({
                title: "Erreur",
                description: "Quelque chose a mal tourné",
                position: "bottom",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            },
          }
        );
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Quelque chose a mal tourné",
          position: "bottom",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };
  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Attribuer un bâtiment"
      size="2xl"
    >
      <Flex w="100%" flexDirection="column">
        <Formik initialValues={initialState} onSubmit={onAssign}>
          {({ values, handleChange }) => (
            <Form>
              <FormControl mt="4">
                <FormLabel fontSize="0.85rem">Décision d'attribution</FormLabel>
                <Input
                  value={values.decision}
                  onChange={handleChange}
                  name="decision"
                />
              </FormControl>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">Nom</FormLabel>
                  <Input
                    value={values.nom}
                    onChange={handleChange}
                    name="nom"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Prénom</FormLabel>
                  <Input
                    value={values.prenom}
                    onChange={handleChange}
                    name="prenom"
                  />
                </FormControl>
              </Flex>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">Date de naissance</FormLabel>
                  <Input
                    type="date"
                    value={values.dateDeNaissance}
                    onChange={handleChange}
                    name="dateDeNaissance"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Sexe</FormLabel>
                  <Select
                    placeholder="choisir"
                    value={values.sexe}
                    onChange={handleChange}
                    name="sexe"
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">N° CIN</FormLabel>
                  <Input
                    name="cin"
                    value={values.cin}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Fonction</FormLabel>
                  <Input
                    name="fonction"
                    onChange={handleChange}
                    value={values.fonction}
                  />
                </FormControl>
              </Flex>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">Année d'occupation</FormLabel>
                  <Select
                    placeholder="Choisir"
                    value={values.anneeOccupation}
                    name="anneeOccupation"
                    onChange={handleChange}
                  >
                    {dates.map((date) => (
                      <option value={date} key={date}>
                        {date}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Occupant réel</FormLabel>
                  <Select
                    onChange={handleChange}
                    placeholder="Choisir"
                    value={values.occupantReel}
                    name="occupantReel"
                  >
                    {occupants.map((occupant) => (
                      <option value={occupant} key={occupant}>
                        {occupant}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
              <Spacer height="6" />
              <Stack direction="column">
                <Heading as="h5" fontSize="1.2rem">
                  Information sur le conjoint
                </Heading>
                <Divider colorScheme="gray" variant="solid" />
              </Stack>
              <Spacer height="6" />
              <FormControl>
                <FormLabel fontSize="0.85rem">Acte de mariage</FormLabel>
                <Input
                  value={values.acteDeMariage}
                  name="acteDeMariage"
                  onChange={handleChange}
                />
              </FormControl>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">Nom</FormLabel>
                  <Input
                    name="nomConjoint"
                    value={values.nomConjoint}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Prénom</FormLabel>
                  <Input
                    name="prenomConjoint"
                    value={values.prenomConjoint}
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">Date de naissance</FormLabel>
                  <Input
                    type="date"
                    value={values.dateDeNaissanceConjoint}
                    name="dateDeNaissanceConjoint"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">Sexe</FormLabel>
                  <Select
                    placeholder="Choisir"
                    value={values.sexeConjoint}
                    name="sexeConjoint"
                    onChange={handleChange}
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex style={{ gap: "6px" }} marginTop="4">
                <FormControl>
                  <FormLabel fontSize="0.85rem">N° CIN</FormLabel>
                  <Input
                    value={values.cinConjoint}
                    name="cinConjoint"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="0.85rem">
                    Travail dans l'administration
                  </FormLabel>
                  <Switch
                    value={values.isAdministrationEmploye}
                    name="isAdministationEmploye"
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>
              <Box
                _focus="none"
                w="100%"
                display="flex"
                justifyContent="flex-end"
                mt="6"
              >
                <Button
                  type="submit"
                  backgroundColor="linkedin.400"
                  color="white"
                >
                  Sauvegarder
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Flex>
    </LayoutModal>
  );
};

export default AssignModal;
