import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import "./App.css";

export const App = () => {
  return (
    <ChakraProvider>
      <Box w="50%" mx="auto">
        <Heading as="h1">RPC CONVERTER</Heading>
        <Textarea placeholder="test" />
        <HStack>
          <Button
            leftIcon={<ArrowDownIcon />}
            colorScheme="teal"
            variant="outline"
          >
            逆ポーランド記法
          </Button>
          <Button
            leftIcon={<ArrowUpIcon />}
            colorScheme="teal"
            variant="outline"
          >
            中置記法
          </Button>
        </HStack>
        <Textarea placeholder="test" />
      </Box>
    </ChakraProvider>
  );
};
