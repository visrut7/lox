export enum TokenType {
  IDENTIFIER = "identifier",

  // separators
  SEMI_COLON = ";",
  LEFT_PAREN = "(",
  RIGHT_PAREN = ")",
  LEFT_BRACE = "[",
  RIGHT_BRACE = "]",
  LEFT_CURLY = "{",
  RIGHT_CURLY = "}",

  // operators
  PLUS_PLUS = "++",
  EQUAL = "=",
  PLUS = "+",
  MINUS = "-",
  LESS = "<",
  MULTIPLY = "*",
  DIVIDE = "/",

  // literals
  STRING = "string",
  NUMBER = "number",

  KEYWORD = "keyword",
}

export type Token = {
  value: string;
  type: TokenType;
};

export function is_keyword(value: string): boolean {
  return ["var", "for"].includes(value);
}
