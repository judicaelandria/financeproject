import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box, List, ListItem } from "@chakra-ui/layout";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <Box>
      <List>
        <ListItem
          display="flex"
          justifyContent="space-between"
          width="100%"
          onClick={() => setIsOpen(!isOpen)}
          px="3"
          py="3"
          cursor="pointer"
          _hover={{ backgroundColor: "#FBFAFC", animation: "all .3s" }}
          borderRadius="md"
        >
          Logement <ArrowDownIcon />
        </ListItem>
        {isOpen && (
          <>
            <ListItem
              paddingLeft="6"
              py="2"
              borderRadius="md"
              _hover={{ backgroundColor: "#FBFAFC", animation: "all .3s" }}
              style={{
                backgroundColor: router.pathname.includes("housing")
                  ? "#FBFAFC"
                  : "none",
              }}
            >
              <Link href="/logement/housing">
                <a>Liste des bâtiments</a>
              </Link>
            </ListItem>
            <ListItem
              paddingLeft="6"
              py="2"
              borderRadius="md"
              _hover={{ backgroundColor: "#FBFAFC", animation: "all .3s" }}
              style={{
                backgroundColor: router.pathname.includes("region")
                  ? "#FBFAFC"
                  : "none",
              }}
            >
              <Link href="/logement/region">
                <a>Region</a>
              </Link>
            </ListItem>
            <ListItem
              paddingLeft="6"
              py="2"
              borderRadius="md"
              _hover={{ backgroundColor: "#FBFAFC", animation: "all .3s" }}
              style={{
                backgroundColor: router.pathname.includes("commnune")
                  ? "#FBFAFC"
                  : "none",
              }}
            >
              <Link href="/logement/commune">
                <a>commune</a>
              </Link>
            </ListItem>
            <ListItem
              paddingLeft="6"
              py="2"
              borderRadius="md"
              _hover={{ backgroundColor: "#FBFAFC", animation: "all .3s" }}
              style={{
                backgroundColor: router.pathname.includes("fokotany")
                  ? "#FBFAFC"
                  : "none",
              }}
            >
              <Link href="/logement/fokotany">
                <a>fokotany</a>
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default DropdownMenu;
