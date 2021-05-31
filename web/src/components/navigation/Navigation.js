import {
  Box,
  Heading,
  Stack,
  Image,
  HStack,
  ListItem,
  ListIcon,
  List,
  Spacer,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
} from "@chakra-ui/react";
import { UnlockIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import useUserStore from "../../store/useUserStore";
import { DropdownMenu } from "../menu";

const Navigation = () => {
  const router = useRouter();
  const { user, logout } = useUserStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  return (
    <Box position="fixed" top="0" left="0" maxW="20%" width="80%" py="4" px="4">
      <Stack>
        <HStack>
          <Image
            boxSize="2.5rem"
            src="/images/favicon.ico"
            alt="logo"
            mr="5px"
          />
          <Heading fontSize="md" color="#39484A" fontFamily="Poppins">
            {user && user.nom} <Spacer width="4" />
          </Heading>
          <Menu>
            <MenuButton
              backgroundColor="white"
              _focus={{ backgroundColor: "white" }}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            />
            <MenuList maxW="100px">
              <MenuItem
                onClick={() => {
                  router.push("/");
                  setTimeout(() => {
                    logout();
                  }, 200);
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <List marginTop={"3.5rem !important"} spacing={3}>
          <ListItem
            py="3"
            px="3"
            style={{
              backgroundColor: router.pathname.includes("dashboard")
                ? "#FBFAFC"
                : "none",
            }}
            borderRadius="md"
            width="100%"
          >
            <ListIcon as={UnlockIcon} color="#B9C4CC" />
            <Link href="/dashboard">
              <a>En attente</a>
            </Link>
          </ListItem>
          <ListItem
            px="3"
            py="3"
            borderRadius="md"
            style={{
              backgroundColor: router.pathname.includes("room")
                ? "#FBFAFC"
                : "none",
            }}
          >
            <ListIcon as={CheckIcon} color="#B9C4CC" />
            <Link href="/room">
              <a>Utilisateur actif</a>
            </Link>
          </ListItem>
          <DropdownMenu />
        </List>
      </Stack>
    </Box>
  );
};

export default Navigation;
