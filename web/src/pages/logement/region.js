import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import { useState } from "react";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import useUserStore from "../../store/useUserStore";
import { BASE_URL } from "../../utils/constants";
import { Cookies } from "react-cookie";
import AddModal from "../../components/modal/AddModal";

const cookies = new Cookies();

const Region = () => {
  const [uid, setUid] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const { user } = useUserStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );
  const { data, error, isLoading } = useQuery("region", async () => {
    const res = await fetch(`${BASE_URL}/region/fetch`, {
      headers: {
        "x-auth-token": cookies.get("jwt"),
      },
    });
    return res.json();
  });
  return (
    <Layout>
      <SEO title="En attente de validation" />
      <Box width={"100%"}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h3" fontSize="1.5rem" color="blackAlpha.900">
            Region
          </Heading>
          <Button
            _disabled={!user.admin}
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
          <Table>
            <Thead>
              <Tr>
                <Th>Nom</Th>
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
                </Tr>
              )}
              {data &&
                data.length > 0 &&
                data.map((info) => (
                  <Tr key={info._id}>
                    <Td>{info.nom}</Td>
                    {user && user.isAdmin && (
                      <Td>
                        <Tooltip label="Mettre à jour le region">
                          <EditIcon
                            cursor="pointer"
                            color="green.600"
                            width="1.3em"
                            height="1.3em"
                            onClick={() => {
                              setCurrentItem(info);
                              setIsUpdate(true);
                              onOpen();
                            }}
                          />
                        </Tooltip>
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
        <AddModal
          isOpen={isOpen}
          onClose={onClose}
          isUpdate={isUpdate}
          currentItem={currentItem}
        />
      )}
    </Layout>
  );
};

export default Region;
