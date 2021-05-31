import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import LayoutModal from "./Modal";
import { useToast } from "@chakra-ui/toast";
import { Input } from "@chakra-ui/input";
import useCreate from "../../hooks/useCreate";
import useSave from "../../hooks/useSave";

const AddModal = ({ isOpen, onClose, isUpdate, currentItem }) => {
  const [nom, setNom] = useState(isUpdate ? currentItem.nom : "");
  const toast = useToast();
  const regionMutation = useCreate("region/create", "region");
  const updateMutation = useSave(`region/update/${currentItem._id}`, "region");

  const apply = () => {
    if (isUpdate) {
      updateMutation.mutate({ nom: nom });
    } else {
      regionMutation.mutate({ nom: nom });
    }
  };

  const handleChange = (event) => {
    setNom(event.target.value);
  };

  useEffect(() => {
    if (regionMutation.isSuccess) {
      toast({
        title: "Region",
        description: "Region crée avec succès",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (regionMutation.isError) {
      toast({
        title: "Erreur",
        description: "Quelque chose a mal tourné",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [regionMutation]);

  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isUpdate ? "Mise à jour" : "Ajouter region"}
    >
      <Flex w="100%" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="nom">Nom du région</FormLabel>
          <Input
            name="nom"
            value={nom}
            onChange={handleChange}
            placeholder="Entrer le nom du région"
          />
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

export default AddModal;
