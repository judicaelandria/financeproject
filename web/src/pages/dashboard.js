import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Layout from "../components/layout/Layout";
import { BASE_URL } from "../utils/constants";
import { Cookies } from "react-cookie";
import UserModal from "../components/modal/UserModal";
import { useState } from "react";
import useUserStore from "../store/useUserStore";
import shallow from "zustand/shallow";
import formatDate from "../utils/formatDate";
import SEO from "../components/seo/SEO";

const cookies = new Cookies();

const Dashboard = () => {
  const [uid, setUid] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );
  const { data, error, isLoading } = useQuery("inactive", async () => {
    const res = await fetch(`${BASE_URL}/users/inactive`, {
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
        <Heading as="h3" fontSize="1.5rem" color="blackAlpha.900">
          En attente d'activation
        </Heading>
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
                <Th>Matricule</Th>
                <Th>Login</Th>
                <Th>Unité administrative</Th>
                <Th>Contact</Th>
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
                    <Td>{info.matricule}</Td>
                    <Td>{info.Login}</Td>
                    <Td>{info.uniteAdmin}</Td>
                    <Td>{info.telMobile}</Td>
                    <Td>{formatDate(info.createdAt)}</Td>
                    {user && user.isAdmin && (
                      <Td>
                        <Tooltip label="Activez le compte">
                          <CheckIcon
                            cursor="pointer"
                            color="green.600"
                            width="1.3em"
                            height="1.3em"
                            onClick={() => {
                              onOpen();
                              setUid(info._id);
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
      {isOpen && <UserModal isOpen={isOpen} onClose={onClose} uid={uid} />}
    </Layout>
  );
};

export default Dashboard;
