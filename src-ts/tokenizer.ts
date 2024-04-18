import { Token, TokenType, is_keyword } from "./tokens";

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

    raw_regex += `|\\${token_value}`;
  });

  // numbers
  raw_regex += "|\\d+\\.\\d+";

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

    switch (result.value[0]) {
      case TokenType.SEMI_COLON:
        tokens.push({ value: result.value[0], type: TokenType.SEMI_COLON });
        break;
      case TokenType.LEFT_PAREN:
        tokens.push({ value: result.value[0], type: TokenType.LEFT_PAREN });
        break;
      case TokenType.RIGHT_PAREN:
        tokens.push({ value: result.value[0], type: TokenType.RIGHT_PAREN });
        break;
      case TokenType.LEFT_BRACE:
        tokens.push({ value: result.value[0], type: TokenType.LEFT_BRACE });
        break;
      case TokenType.RIGHT_BRACE:
        tokens.push({ value: result.value[0], type: TokenType.RIGHT_BRACE });
        break;
      case TokenType.EQUAL:
        tokens.push({ value: result.value[0], type: TokenType.EQUAL });
        break;
      case TokenType.PLUS:
        tokens.push({ value: result.value[0], type: TokenType.PLUS });
        break;
      default:
        if (is_keyword(result.value[0])) {
          console.log("got keyword", result.value[0]);
          tokens.push({ value: result.value[0], type: TokenType.KEYWORD });
          break;
        }

        if (result.value[0].startsWith('"')) {
          tokens.push({ value: result.value[0], type: TokenType.STRING });
          break;
        }

        if (!isNaN(Number(result.value[0]))) {
          tokens.push({ value: result.value[0], type: TokenType.NUMBER });
          break;
        }

        tokens.push({ value: result.value[0], type: TokenType.IDENTIFIER });

        break;
    }

    result = iterator.next();
  }

  return tokens;
}
