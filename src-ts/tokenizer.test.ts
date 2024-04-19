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

test("tokenize: for loop", () => {
  const input = "for (var i = 0; i < 10; i++) { x = x + 1.2; }";

  const expected = [
    { value: "for", type: TokenType.KEYWORD },
    { value: "(", type: TokenType.LEFT_PAREN },
    { value: "var", type: TokenType.KEYWORD },
    { value: "i", type: TokenType.IDENTIFIER },
    { value: "=", type: TokenType.EQUAL },
    { value: "0", type: TokenType.NUMBER },
    { value: ";", type: TokenType.SEMI_COLON },
    { value: "i", type: TokenType.IDENTIFIER },
    { value: "<", type: TokenType.LESS },
    { value: "10", type: TokenType.NUMBER },
    { value: ";", type: TokenType.SEMI_COLON },
    { value: "i", type: TokenType.IDENTIFIER },
    { value: "++", type: TokenType.PLUS_PLUS },
    { value: ")", type: TokenType.RIGHT_PAREN },
    { value: "{", type: TokenType.LEFT_CURLY },
    { value: "x", type: TokenType.IDENTIFIER },
    { value: "=", type: TokenType.EQUAL },
    { value: "x", type: TokenType.IDENTIFIER },
    { value: "+", type: TokenType.PLUS },
    { value: "1.2", type: TokenType.NUMBER },
    { value: ";", type: TokenType.SEMI_COLON },
    { value: "}", type: TokenType.RIGHT_CURLY },
  ];

  const tokens = tokenize(input);

  assert.equal(expected.length, tokens.length);
  assert.deepStrictEqual(expected, tokens);
});

test("tokenize: arithmetic", () => {
  const input = `
	x = 1.2 * 3.4 + 5.6 / 7.8 - 9.0;
	y = x * 2 + (6 - 3) / 2;
	`;

  const expected = [
    { value: "x", type: TokenType.IDENTIFIER },
    { value: "=", type: TokenType.EQUAL },
    { value: "1.2", type: TokenType.NUMBER },
    { value: "*", type: TokenType.MULTIPLY },
    { value: "3.4", type: TokenType.NUMBER },
    { value: "+", type: TokenType.PLUS },
    { value: "5.6", type: TokenType.NUMBER },
    { value: "/", type: TokenType.DIVIDE },
    { value: "7.8", type: TokenType.NUMBER },
    { value: "-", type: TokenType.MINUS },
    { value: "9.0", type: TokenType.NUMBER },
    { value: ";", type: TokenType.SEMI_COLON },
    { value: "y", type: TokenType.IDENTIFIER },
    { value: "=", type: TokenType.EQUAL },
    { value: "x", type: TokenType.IDENTIFIER },
    { value: "*", type: TokenType.MULTIPLY },
    { value: "2", type: TokenType.NUMBER },
    { value: "+", type: TokenType.PLUS },
    { value: "(", type: TokenType.LEFT_PAREN },
    { value: "6", type: TokenType.NUMBER },
    { value: "-", type: TokenType.MINUS },
    { value: "3", type: TokenType.NUMBER },
    { value: ")", type: TokenType.RIGHT_PAREN },
    { value: "/", type: TokenType.DIVIDE },
    { value: "2", type: TokenType.NUMBER },
    { value: ";", type: TokenType.SEMI_COLON },
  ];

  const tokens = tokenize(input);

  assert.deepStrictEqual(expected, tokens);
});
