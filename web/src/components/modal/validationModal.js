import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import useUpdate from "../../hooks/useUpdate";
import LayoutModal from "./Modal";

const ValidationModal = ({ isOpen, onClose, uid }) => {
  const userMutation = useUpdate(uid, "active");
  return (
    <LayoutModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Voulez-vous vraiment supprimer cet utilisateur"
    >
      <Box
        width="100%"
        display="flex"
        style={{ gap: "10px" }}
        alignItems="center"
      >
        <Button
          onClick={onClose}
          backgroundColor="white"
          border="1px solid grey"
        >
          Annuler
        </Button>
        <Button
          onClick={() => {
            onClose();
            userMutation.mutate({ isAdmin: false, userStatus: false });
          }}
          backgroundColor="red.500"
        >
          Supprimer
        </Button>
      </Box>
    </LayoutModal>
  );
};

export default ValidationModal;
