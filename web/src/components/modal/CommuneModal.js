import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import LayoutModal from "./Modal";
import { useToast } from "@chakra-ui/toast";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Skeleton } from "@chakra-ui/skeleton";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { Cookies } from "react-cookie";
import useCreate from "../../hooks/useCreate";
import useSave from "../../hooks/useSave";

const cookies = new Cookies();

const CommuneModal = ({ isOpen, onClose, isUpdate, currentItem }) => {
  const initialState = { nom: "", region: "" };
  const [form, setForm] = useState(
    isUpdate
      ? { nom: currentItem.nom, region: currentItem.region }
      : initialState
  );
  const toast = useToast();
  const communeMutation = useCreate("commune/create", "commune");
  const updateMutation = useSave(
    isUpdate && `commune/update/${currentItem._id}`,
    "commune"
  );

  const apply = () => {
    if (isUpdate) {
      updateMutation.mutate(form);
    } else {
      communeMutation.mutate(form);
    }
  };

  useEffect(() => {
    if (communeMutation.isSuccess) {
      toast({
        title: "Commune",
        description: "Commune crée avec succès",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (communeMutation.isError) {
      toast({
        title: "Erreur",
        description: "Quelque chose a mal tourné",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [communeMutation]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const { data, isError, isLoading } = useQuery("region", async () => {
    const res = await fetch(`${BASE_URL}/region/fetch`, {
      headers: {
        "x-auth-token": cookies.get("jwt"),
      },
    });
    return res.json();
  });

  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isUpdate ? "Mise à jour" : "Ajouter commune"}
    >
      <Flex w="100%" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="nom">Nom du commune</FormLabel>
          <Input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Entrer le nom du commune"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="admin">Region</FormLabel>
          {Array.isArray(data) && data.length > 0 && (
            <Select
              value={form.region}
              name="region"
              onChange={handleChange}
              id="admin"
              placeholder="Choisir un region"
              required="Veuillez selectionnez un region"
            >
              {data.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.nom}
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

export default CommuneModal;
