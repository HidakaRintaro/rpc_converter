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
  const [infixValue, setInfixValue] = useState("");
  const [rpcValue, setRpcValue] = useState("");

  const onChangeCheckInfix = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z\d+\-*/.()\s]*$/) != null) {
      setInfixValue(val);
    }
  };

  const onChangeCheckRpc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z\d+\-*/.\s]*$/) != null) {
      setRpcValue(val);
    }
  };

  const rpcConvert = () => {
    const rpc: string[] = [];
    const infix: string[] = formulaDisassembly(infixValue);
    const stack: string[] = [];
    for (const v of infix) {
      if (v.match(/\+|\-|\*|\//) != null) {
        if (stack.length > 0) {
          if (opeCompare(v, stack.pop() ?? "")) {
            for (let i: number = stack.length - 1; i >= 0; i--) {
              let pop: string | undefined = stack.pop();
              pop ? rpc.push(pop) : rpc.push();
            }
          }
        }
        stack.push(v);
      } else if ("(" === v) {
        stack.push(v);
      } else if (")" === v) {
        for (const ope of stack) {
          if ("(" === ope) {
            stack.pop();
            break;
          }
          let pop: string | undefined = stack.pop();
          pop ? rpc.push(pop) : rpc.push();
        }
      } else {
        rpc.push(v);
      }
      // 残りの符号を出力
      while (stack.length > 0) {
        let pop: string | undefined = stack.pop();
        pop ? rpc.push(pop) : rpc.push();
      }
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
            value={infixValue}
            onChange={onChangeCheckInfix}
          />
        </FormControl>
        <Center>
          <ButtonGroup variant="outline" mb="5">
            <Button
              leftIcon={<ArrowDownIcon />}
              colorScheme="teal"
              onClick={rpcConvert}
            >
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
            value={rpcValue}
            onChange={onChangeCheckRpc}
          />
        </FormControl>
      </Container>
    </ChakraProvider>
  );
};

// 式を演算子で配列に分解する
const formulaDisassembly = (inputVal: string): string[] => {
  const val = inputVal.replace(/\s+/g, "");
  const ary = val.split("");
  const list: string[] = [];
  let i: number = 0;
  let b: boolean = true;
  for (const s of ary) {
    if (s.match(/[+\-*/()]/) == null) {
      if (!b) {
        i++;
      }
      list[i] = (list[i] ?? "") + s;
      b = true;
    } else {
      i++;
      list[i] = s;
      b = false;
    }
  }
  return list;
};

// 演算子の優先順位を判断する
// スタックの優先順位がトークン以上の時true、トークンの優先順位がスタックより大きい時false
const opeCompare = (token: string, stack: string): boolean => {
  const i: number = opePriority(token) - opePriority(stack);
  return i >= 0;
};

// 演算子を数値化する
const opePriority = (ope: string): number => {
  if ("*" === ope || "/" === ope) {
    return 1;
  } else if ("+" === ope || "-" === ope) {
    return 2;
  }
  // () の時
  return 99;
};
