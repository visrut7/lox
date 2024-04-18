import assert from "node:assert";
import test from "node:test";

import { tokenize } from "./tokenizer";
import { TokenType } from "./tokens";

test("tokenize: basic tokenization", () => {
  const input = 'var language = "lox";';

  const expected = [
    { value: "var", type: TokenType.KEYWORD },
    { value: "language", type: TokenType.IDENTIFIER },
    { value: "=", type: TokenType.EQUAL },
    { value: '"lox"', type: TokenType.STRING },
    { value: ";", type: TokenType.SEMI_COLON },
  ];

  const tokens = tokenize(input);

  assert.deepStrictEqual(expected, tokens);
});
