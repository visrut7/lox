import assert from "node:assert";
import test from "node:test";

import { tokenize } from "./tokenizer";
import { TokenType } from "./tokens";

test("tokenize: basic tokenization", () => {
  const input = 'var language = "lox"\n   \n    \n\n;';

  const expected = [
    { value: "var", type: TokenType.KEYWORD, line_no: 1 },
    { value: "language", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "=", type: TokenType.EQUAL, line_no: 1 },
    { value: '"lox"', type: TokenType.STRING, line_no: 1 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 5 },
  ];

  const tokens = tokenize(input);

  assert.deepStrictEqual(expected, tokens);
});

test("tokenize: for loop", () => {
  const input = "for (var i = 0; i < 10; i++) { x = x + 1.2; }";

  const expected = [
    { value: "for", type: TokenType.KEYWORD, line_no: 1 },
    { value: "(", type: TokenType.LEFT_PAREN, line_no: 1 },
    { value: "var", type: TokenType.KEYWORD, line_no: 1 },
    { value: "i", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "=", type: TokenType.EQUAL, line_no: 1 },
    { value: "0", type: TokenType.NUMBER, line_no: 1 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 1 },
    { value: "i", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "<", type: TokenType.LESS, line_no: 1 },
    { value: "10", type: TokenType.NUMBER, line_no: 1 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 1 },
    { value: "i", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "++", type: TokenType.PLUS_PLUS, line_no: 1 },
    { value: ")", type: TokenType.RIGHT_PAREN, line_no: 1 },
    { value: "{", type: TokenType.LEFT_CURLY, line_no: 1 },
    { value: "x", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "=", type: TokenType.EQUAL, line_no: 1 },
    { value: "x", type: TokenType.IDENTIFIER, line_no: 1 },
    { value: "+", type: TokenType.PLUS, line_no: 1 },
    { value: "1.2", type: TokenType.NUMBER, line_no: 1 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 1 },
    { value: "}", type: TokenType.RIGHT_CURLY, line_no: 1 },
  ];

  const tokens = tokenize(input);

  assert.equal(expected.length, tokens.length);
  assert.deepStrictEqual(expected, tokens);
});

test("tokenize: arithmetic", () => {
  const input =
    "\nx = 1.2 * 3.4 + 5.6 / 7.8 - 9.0;\ny = x * 2 + (6 - 3) / 2;\n";

  const expected = [
    { value: "x", type: TokenType.IDENTIFIER, line_no: 2 },
    { value: "=", type: TokenType.EQUAL, line_no: 2 },
    { value: "1.2", type: TokenType.NUMBER, line_no: 2 },
    { value: "*", type: TokenType.MULTIPLY, line_no: 2 },
    { value: "3.4", type: TokenType.NUMBER, line_no: 2 },
    { value: "+", type: TokenType.PLUS, line_no: 2 },
    { value: "5.6", type: TokenType.NUMBER, line_no: 2 },
    { value: "/", type: TokenType.DIVIDE, line_no: 2 },
    { value: "7.8", type: TokenType.NUMBER, line_no: 2 },
    { value: "-", type: TokenType.MINUS, line_no: 2 },
    { value: "9.0", type: TokenType.NUMBER, line_no: 2 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 2 },
    { value: "y", type: TokenType.IDENTIFIER, line_no: 3 },
    { value: "=", type: TokenType.EQUAL, line_no: 3 },
    { value: "x", type: TokenType.IDENTIFIER, line_no: 3 },
    { value: "*", type: TokenType.MULTIPLY, line_no: 3 },
    { value: "2", type: TokenType.NUMBER, line_no: 3 },
    { value: "+", type: TokenType.PLUS, line_no: 3 },
    { value: "(", type: TokenType.LEFT_PAREN, line_no: 3 },
    { value: "6", type: TokenType.NUMBER, line_no: 3 },
    { value: "-", type: TokenType.MINUS, line_no: 3 },
    { value: "3", type: TokenType.NUMBER, line_no: 3 },
    { value: ")", type: TokenType.RIGHT_PAREN, line_no: 3 },
    { value: "/", type: TokenType.DIVIDE, line_no: 3 },
    { value: "2", type: TokenType.NUMBER, line_no: 3 },
    { value: ";", type: TokenType.SEMI_COLON, line_no: 3 },
  ];

  const tokens = tokenize(input);

  assert.deepStrictEqual(expected, tokens);
});
