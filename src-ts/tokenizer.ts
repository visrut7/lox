import { Token, TokenType, is_keyword } from "./tokens";

function escape_regex(value: string): string {
  return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function get_finders(): RegExp {
  let raw_regex = "";

  Object.values(TokenType).forEach((token_value) => {
    if (
      token_value === TokenType.IDENTIFIER ||
      token_value === TokenType.STRING ||
      token_value === TokenType.NUMBER ||
      token_value === TokenType.KEYWORD
    ) {
      return;
    }

    raw_regex += `|${escape_regex(token_value)}`;
  });

  // new line
  raw_regex = "|\\n" + raw_regex;

  // numbers
  raw_regex += "|\\d+(\\.\\d+)?";

  // identifiers
  raw_regex += "|[a-zA-Z_][a-zA-Z0-9_]*";

  // strings
  raw_regex += '|".*?"';

  raw_regex = raw_regex.slice(1);
  return new RegExp(raw_regex, "g");
}

export function tokenize(input: string): Token[] {
  const finders = get_finders();
  const iterator = input.matchAll(finders);
  const tokens: Token[] = [];

  let result = iterator.next();

  let line_number = 1;

  while (!result.done) {
    if (!result.value) {
      break;
    }

    const value = result.value[0];

    switch (value) {
      case TokenType.SEMI_COLON:
        tokens.push({
          value,
          type: TokenType.SEMI_COLON,
          line_no: line_number,
        });
        break;
      case TokenType.LEFT_PAREN:
        tokens.push({
          value,
          type: TokenType.LEFT_PAREN,
          line_no: line_number,
        });
        break;
      case TokenType.RIGHT_PAREN:
        tokens.push({
          value,
          type: TokenType.RIGHT_PAREN,
          line_no: line_number,
        });
        break;
      case TokenType.LEFT_BRACE:
        tokens.push({
          value,
          type: TokenType.LEFT_BRACE,
          line_no: line_number,
        });
        break;
      case TokenType.RIGHT_BRACE:
        tokens.push({
          value,
          type: TokenType.RIGHT_BRACE,
          line_no: line_number,
        });
        break;
      case TokenType.EQUAL:
        tokens.push({ value, type: TokenType.EQUAL, line_no: line_number });
        break;
      case TokenType.PLUS:
        tokens.push({ value, type: TokenType.PLUS, line_no: line_number });
        break;
      case TokenType.PLUS_PLUS:
        tokens.push({ value, type: TokenType.PLUS_PLUS, line_no: line_number });
        break;
      case TokenType.LESS:
        tokens.push({ value, type: TokenType.LESS, line_no: line_number });
        break;
      case TokenType.LEFT_CURLY:
        tokens.push({
          value,
          type: TokenType.LEFT_CURLY,
          line_no: line_number,
        });
        break;
      case TokenType.RIGHT_CURLY:
        tokens.push({
          value,
          type: TokenType.RIGHT_CURLY,
          line_no: line_number,
        });
        break;
      case TokenType.MULTIPLY:
        tokens.push({ value, type: TokenType.MULTIPLY, line_no: line_number });
        break;
      case TokenType.DIVIDE:
        tokens.push({ value, type: TokenType.DIVIDE, line_no: line_number });
        break;
      case TokenType.MINUS:
        tokens.push({ value, type: TokenType.MINUS, line_no: line_number });
        break;
      default:
        if (is_keyword(value)) {
          tokens.push({ value, type: TokenType.KEYWORD, line_no: line_number });
          break;
        }

        if (value.startsWith('"')) {
          tokens.push({ value, type: TokenType.STRING, line_no: line_number });
          break;
        }

        if (value === "\n") {
          line_number += 1;
          break;
        }

        if (!isNaN(Number(value))) {
          tokens.push({ value, type: TokenType.NUMBER, line_no: line_number });
          break;
        }

        tokens.push({
          value,
          type: TokenType.IDENTIFIER,
          line_no: line_number,
        });

        break;
    }

    result = iterator.next();
  }

  return tokens;
}
