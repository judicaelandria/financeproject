import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import LayoutModal from "./Modal";
import { useToast } from "@chakra-ui/toast";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { BASE_URL } from "../../utils/constants";
import { Cookies } from "react-cookie";
import { useQuery } from "react-query";
import { Skeleton } from "@chakra-ui/skeleton";
import useCreate from "../../hooks/useCreate";
import useSave from "../../hooks/useSave";

const cookies = new Cookies();

const FokotanyModal = ({ isOpen, onClose, isUpdate, currentItem }) => {
  const initialState = { nom: "", commune: "" };
  const [form, setForm] = useState(
    isUpdate
      ? { nom: currentItem.nom, commune: currentItem.commune }
      : initialState
  );
  const toast = useToast();
  const fokotanyMutation = useCreate("fokotany/create", "fokotany");

  const updateMutation = useSave(
    isUpdate && `fokotany/update/${currentItem._id}`,
    "fokotany"
  );
  const apply = () => {
    if (isUpdate) {
      updateMutation.mutate(form);
    } else {
      fokotanyMutation.mutate(form);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const { data, isError, isLoading } = useQuery("commune", async () => {
    const res = await fetch(`${BASE_URL}/commune/fetch`, {
      headers: {
        "x-auth-token": cookies.get("jwt"),
      },
    });
    return res.json();
  });

  useEffect(() => {
    if (fokotanyMutation.isSuccess) {
      toast({
        title: "Fokotany",
        description: "Fokotany crée avec succès",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (fokotanyMutation.isError) {
      toast({
        title: "Erreur",
        description: "Quelque chose a mal tourné",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fokotanyMutation]);

  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isUpdate ? "Mis a jour" : "Ajouter Fokotany"}
    >
      <Flex w="100%" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="nom">Nom du fokotany</FormLabel>
          <Input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Entrer le nom du fokotany"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="admin">Commune</FormLabel>
          {Array.isArray(data) && data.length > 0 && (
            <Select
              value={form.commune}
              name="commune"
              onChange={handleChange}
              id="admin"
              placeholder="Choisir un commune"
              required="Veuillez selectionnez un commune"
            >
              {data.map((commune) => (
                <option key={commune._id} value={commune._id}>
                  {commune.nom}
                </option>
              ))}
            </Select>
          )}
          {isLoading && <Skeleton />}
          {isError && (
            <Heading fontSize="1rem" color="red.400">
              Quelques choses a mal tourné, veuillez rechargez votre navigateur
            </Heading>
          )}
        </Box>
        <Flex justifyContent="flex-end" alignItems="baseline">
          <Button
            onClick={(event) => {
              event.preventDefault();
              apply();
              onClose();
            }}
            backgroundColor="linkedin.400"
            type="submit"
            _hover="none"
            color="white"
          >
            {isUpdate ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Flex>
      </Flex>
    </LayoutModal>
  );
};

export default FokotanyModal;
