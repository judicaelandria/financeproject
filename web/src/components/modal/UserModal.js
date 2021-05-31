import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { FormLabel } from "@chakra-ui/form-control";
import { Box, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useEffect, useState } from "react";
import LayoutModal from "./Modal";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import useUpdate from "../../hooks/useUpdate";

const UserModal = ({ isOpen, onClose, uid }) => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);
  const toast = useToast();
  const userMutation = useUpdate(uid, "inactive");

  const apply = () => {
    userMutation.mutate({
      isAdmin: role === "admin" ? true : false,
      userStatus: status,
    });
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.checked);
  };

  useEffect(() => {
    if (userMutation.isSuccess) {
      toast({
        title: "Rôle mise à jour",
        description: "Le compte a été activé",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else if (userMutation.isError) {
      toast({
        title: "Erreur",
        description:
          "Quelque chose a mal tourné, et nous ne pouvons pas mettre à jour cette utilisateur",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [userMutation]);

  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Modifier information utilisateur"
    >
      <Flex w="100%" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          marginBottom="3"
          width="100%"
        >
          <FormLabel htmlFor="admin">Rôle utilisateur</FormLabel>
          <Select
            value={role}
            name="role"
            onChange={handleChange}
            id="admin"
            placeholder="Attribuez un rôle à l'utilisateur"
            required="Veuillez selectionnez une rôle"
          >
            <option value="simple">Simple utilisateur</option>
            <option value="admin">Administrateur</option>
          </Select>
        </Box>
        <Flex justifyContent="space-between" alignItems="baseline">
          <Checkbox name="status" checked={status} onChange={handleStatus}>
            Activez le compte
          </Checkbox>
          <Button
            onClick={(event) => {
              event.preventDefault();
              apply();
              onClose();
            }}
            backgroundColor="linkedin.400"
            type="submit"
            _hover="none"
          >
            {userMutation.isLoading && <Spinner />}
            Appliquer
          </Button>
        </Flex>
      </Flex>
    </LayoutModal>
  );
};

export default UserModal;
