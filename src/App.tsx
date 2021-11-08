import { ChangeEvent, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Center,
  ChakraProvider,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import "./App.css";
import theme from "./theme";

export const App = () => {
  const [infixValue, setInfixValue] = useState("");
  const [rpcValue, setRpcValue] = useState("");

  const onChangeCheckInfix = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z+\-*/^()\s]*$/) != null) {
      setInfixValue(val);
    }
  };

  const onChangeCheckRpc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.match(/^[A-Za-z+\-*/^\s]*$/) != null) {
      setRpcValue(val);
    }
  };

  const infixToRpc = () => {
    const rpc: string[] = [];
    const infix: string[] = formulaDisassembly(infixValue);
    const stack: string[] = [];
    for (const v of infix) {
      if (v.match(/[+\-*/^]/) != null) {
        while (stack.length > 0 && opeCompare(v, stack[stack.length - 1])) {
          let pop: string | undefined = stack.pop();
          pop ? rpc.push(pop) : rpc.push();
        }
        stack.push(v);
      } else if ("(" === v) {
        stack.push(v);
      } else if (")" === v) {
        for (let i = stack.length; i > 0; i--) {
          if ("(" === stack[i - 1]) {
            stack.pop();
            break;
          }
          let pop: string | undefined = stack.pop();
          pop ? rpc.push(pop) : rpc.push();
        }
      } else {
        rpc.push(v);
      }
    }
    // 残りの符号を出力
    while (stack.length > 0) {
      let pop: string | undefined = stack.pop();
      pop ? rpc.push(pop) : rpc.push();
    }
    setRpcValue(rpc.join(" "));
  };

  const rpcToInfix = () => {
    const infix: string[] = [];
    const rpc: string[] = rpcValue.split(/\s+/);
    for (const v of rpc) {
      if (v.match(/[+\-*/^]/) != null) {
        const back = infix.pop();
        const front = infix.pop();
        infix.push("(" + [front, v, back].join(" ") + ")");
      } else {
        infix.push(v);
      }
    }
    setInfixValue(infix.pop() ?? "");
  };

  return (
    <ChakraProvider theme={theme}>
      <Container my="3">
        <Heading as="h1" mb="3">
          逆ポーランド記法 変換器
        </Heading>
        <Text mb="6">
          一般的な数式(中置記法)と逆ポーランド記法の相互変換器です。
        </Text>
        <ColorModeBtn />
        <FormControl>
          <FormLabel>一般的な数式(中置記法)</FormLabel>
          <FormHelperText>
            変数(英字)、演算子(+-*/)、丸括弧を使用可能です。
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
          <ButtonGroup variant="outline" mb="5" aria>
            <IconButton
              aria-label="to rpc"
              colorScheme="teal"
              onClick={infixToRpc}
              icon={<ArrowDownIcon />}
            />
            <IconButton
              aria-label="to infix"
              colorScheme="teal"
              onClick={rpcToInfix}
              icon={<ArrowUpIcon />}
            />
          </ButtonGroup>
        </Center>
        <FormControl>
          <FormLabel>逆ポーランド記法</FormLabel>
          <FormHelperText>
            変数(英字)、演算子(+-*/)、丸括弧を使用可能です。要素間は空白を入れてください。
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

const ColorModeBtn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="center">
      <IconButton
        // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
        mb={10}
        textAlign="center"
        aria-label="colorMode Switch"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Box>
  );
};

// 式を演算子で配列に分解する
const formulaDisassembly = (inputVal: string): string[] => {
  const val = inputVal.replace(/\s+/g, "");
  const ary = val.split("");
  const list: string[] = [];
  let i: number = 0;
  for (const s of ary) {
    if (s.match(/[+\-*/^()]/) != null) {
      if (list[i] != null) i++;
      list[i] = s;
      i++;
    } else {
      list[i] = (list[i] ?? "") + s;
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
  if ("^" === ope) {
    return 1;
  } else if ("*" === ope || "/" === ope) {
    return 2;
  } else if ("+" === ope || "-" === ope) {
    return 3;
  }
  // () の時
  return 99;
};

// 数式の無駄な括弧を外す
const delBrackets = (infix: string): string => {
  return "";
};
