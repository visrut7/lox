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

  while (!result.done) {
    if (!result.value) {
      break;
    }

    const value = result.value[0];

    switch (value) {
      case TokenType.SEMI_COLON:
        tokens.push({ value, type: TokenType.SEMI_COLON });
        break;
      case TokenType.LEFT_PAREN:
        tokens.push({ value, type: TokenType.LEFT_PAREN });
        break;
      case TokenType.RIGHT_PAREN:
        tokens.push({ value, type: TokenType.RIGHT_PAREN });
        break;
      case TokenType.LEFT_BRACE:
        tokens.push({ value, type: TokenType.LEFT_BRACE });
        break;
      case TokenType.RIGHT_BRACE:
        tokens.push({ value, type: TokenType.RIGHT_BRACE });
        break;
      case TokenType.EQUAL:
        tokens.push({ value, type: TokenType.EQUAL });
        break;
      case TokenType.PLUS:
        tokens.push({ value, type: TokenType.PLUS });
        break;
      case TokenType.PLUS_PLUS:
        tokens.push({ value, type: TokenType.PLUS_PLUS });
        break;
      case TokenType.LESS:
        tokens.push({ value, type: TokenType.LESS });
        break;
      case TokenType.LEFT_CURLY:
        tokens.push({ value, type: TokenType.LEFT_CURLY });
        break;
      case TokenType.RIGHT_CURLY:
        tokens.push({ value, type: TokenType.RIGHT_CURLY });
        break;
      case TokenType.MULTIPLY:
        tokens.push({ value, type: TokenType.MULTIPLY });
        break;
      case TokenType.DIVIDE:
        tokens.push({ value, type: TokenType.DIVIDE });
        break;
      case TokenType.MINUS:
        tokens.push({ value, type: TokenType.MINUS });
        break;
      default:
        if (is_keyword(value)) {
          tokens.push({ value, type: TokenType.KEYWORD });
          break;
        }

        if (value.startsWith('"')) {
          tokens.push({ value, type: TokenType.STRING });
          break;
        }

        if (!isNaN(Number(value))) {
          tokens.push({ value, type: TokenType.NUMBER });
          break;
        }

        tokens.push({ value, type: TokenType.IDENTIFIER });

        break;
    }

    result = iterator.next();
  }

  return tokens;
}
