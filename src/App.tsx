import { ChangeEvent, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Center,
  ChakraProvider,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import "./App.css";

export const App = () => {
  const [rpcValue, setRpcValue] = useState("");
  const [infixValue, setInfixValue] = useState("");

  const onChangeCheckRpc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z\d\+\-\*\/\.\s]*$/) != null) {
      setRpcValue(val);
    }
  };

  const onChangeCheckInfix = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z\d\+\-\*\/\.\s]*$/) != null) {
      setInfixValue(val);
    }
  };

  return (
    <ChakraProvider>
      <Container mt="3">
        <Heading as="h1" mb="3">
          逆ポーランド記法 変換器
        </Heading>
        <Text color="gray.600" mb="6">
          一般的な数式(中置記法)と逆ポーランド記法の相互変換器です。
        </Text>
        <FormControl>
          <FormLabel>一般的な数式(中置記法)</FormLabel>
          <FormHelperText>
            数字(0~9)、演算子(+-*/)、丸括弧、変数(英数字)を使用可能です。
            <br />
            全て半角文字で入力してください。
          </FormHelperText>
          <Textarea
            mb="5"
            placeholder="a + b - c"
            value={rpcValue}
            onChange={onChangeCheckRpc}
          />
        </FormControl>
        <Center>
          <ButtonGroup variant="outline" mb="5">
            <Button leftIcon={<ArrowDownIcon />} colorScheme="teal">
              逆ポーランド記法
            </Button>
            <Button leftIcon={<ArrowUpIcon />} colorScheme="teal">
              中置記法
            </Button>
          </ButtonGroup>
        </Center>
        <FormControl>
          <FormLabel>逆ポーランド記法</FormLabel>
          <FormHelperText>
            数字(0~9)、演算子(+-*/)、丸括弧を使用可能です。要素間は空白を入れてください。
            <br />
            全て半角文字で入力してください。
          </FormHelperText>
          <Textarea
            placeholder="a b + c -"
            value={infixValue}
            onChange={onChangeCheckInfix}
          />
        </FormControl>
      </Container>
    </ChakraProvider>
  );
};

// const RpcConvert = (formula: string) => {};
