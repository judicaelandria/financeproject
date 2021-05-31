import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Heading } from "@chakra-ui/layout";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { Cookies } from "react-cookie";
import useUserStore from "../../store/useUserStore";
import { BASE_URL } from "../../utils/constants";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { SkeletonText } from "@chakra-ui/skeleton";
import { Tooltip } from "@chakra-ui/tooltip";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import formatDate from "../../utils/formatDate";
import HouseModal from "../../components/modal/HouseModal";
import { useState } from "react";
import AssignModal from "../../components/modal/AssignModal";
import useSave from "../../hooks/useSave";
import { useToast } from "@chakra-ui/toast";

const cookies = new Cookies();

const Housing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [lid, setLid] = useState();
  const toast = useToast();
  const { user } = useUserStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );
  const { data, error, isLoading } = useQuery("batiment", async () => {
    const res = await fetch(`${BASE_URL}/logement/fetch`, {
      headers: {
        "x-auth-token": cookies.get("jwt"),
      },
    });
    return res.json();
  });

  const logementMutation = useSave(`logement/${lid}/assign`, "batiment");
  return (
    <Layout>
      <SEO title="Liste des bâtiments" />
      <Box width={"100%"}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h3" fontSize="1.5rem" color="blackAlpha.900">
            Liste des bâtiments
          </Heading>
          <Button
            disabled={user.admin}
            _hover="none"
            backgroundColor="green.400"
            color="white"
            onClick={() => {
              onOpen();
              setIsUpdate(false);
            }}
          >
            Ajouter
          </Button>
        </Box>
        <Box
          mt="8"
          width="100%"
          borderRadius="lg"
          backgroundColor="#fff"
          px="1"
          py="1"
        >
          <Table variant="striped" size="lg">
            <Thead>
              <Tr>
                <Th>Type de bâtiment</Th>
                <Th>Localication</Th>
                <Th>Adresse</Th>
                <Th>Nom hôtel</Th>
                <Th>Date d'inscription</Th>
                {user && user.isAdmin && <Th>Action</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && (
                <Tr>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                </Tr>
              )}
              {data &&
                data.length > 0 &&
                data.map((info) => (
                  <Tr key={info._id}>
                    <Td>{info.typeBatiment}</Td>
                    <Td>{info.localisation}</Td>
                    <Td>{info.adresse}</Td>
                    <Td>{info.nomHotel}</Td>
                    <Td>{formatDate(info.createdAt)}</Td>
                    {user && user.isAdmin && (
                      <Td>
                        <Tooltip label="Attribuer">
                          <Button
                            _hover={{ backgroundColor: "gree.600" }}
                            backgroundColor="green.400"
                            color="white"
                            disabled={info.isAttributed}
                            onClick={() => {
                              setIsAssignOpen(true);
                              setLid(info._id);
                            }}
                          >
                            {info.isAttributed ? "Attribuée" : "Attribuer"}
                          </Button>
                        </Tooltip>
                        {info.isAttributed && (
                          <Tooltip
                            cursor="pointer"
                            label="Supprimer attribution"
                          >
                            <DeleteIcon
                              cursor="pointer"
                              width="6"
                              height="6"
                              color="red.400"
                              onClick={() => {
                                setLid(info._id);
                                setTimeout(() => {
                                  logementMutation.mutate(
                                    { isAttributed: false },
                                    {
                                      onSuccess: () => {
                                        toast({
                                          title: "Occupant bâtiment",
                                          description: "Attribution supprimer",
                                          position: "bottom",
                                          status: "success",
                                          duration: 5000,
                                          isClosable: true,
                                        });
                                      },
                                      onError: () => {
                                        toast({
                                          title: "Erreur",
                                          description:
                                            "Quelque chose a mal tourné",
                                          position: "bottom",
                                          status: "error",
                                          duration: 5000,
                                          isClosable: true,
                                        });
                                      },
                                    }
                                  );
                                }, 200);
                              }}
                            />
                          </Tooltip>
                        )}
                      </Td>
                    )}
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {error && (
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              py="12"
            >
              <Heading fontSize="1.5rem" fontWeight="medium">
                <SearchIcon />
                Nous avons rencontré un problème
              </Heading>
            </Box>
          )}
          {Array.isArray(data) && data.length === 0 && (
            <Box
              width="100%"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Heading fontSize="md">Aucune donnée disponible</Heading>
            </Box>
          )}
        </Box>
      </Box>
      {isOpen && (
        <HouseModal
          isOpen={isOpen}
          onClose={onClose}
          isUpdate={isUpdate}
          currentItem={currentItem}
        />
      )}
      {isAssignOpen && (
        <AssignModal
          isOpen={isAssignOpen}
          onClose={() => setIsAssignOpen(false)}
          lid={lid}
        />
      )}
    </Layout>
  );
};

export default Housing;
