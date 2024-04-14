package lexer

func Tokenize(input string) []Token {
	var tokens []Token

	buffer := ""
	string_mode := false

	for i := 0; i < len(input); i++ {
		switch input[i] {
		case ' ':
			if len(buffer) > 0 && !string_mode {
				tokens = append(tokens, Token{buffer, IDENTIFIER})
				buffer = ""
			}

			if string_mode {
				buffer += " "
			}

			continue
		case ';':
			tokens = append(tokens, Token{";", SEMI_COLON})
		case '=':
			tokens = append(tokens, Token{"=", EQUAL})
		case '+':
			tokens = append(tokens, Token{"+", PLUS})
		case '-':
			tokens = append(tokens, Token{"-", MINUS})
		case '*':
			tokens = append(tokens, Token{"*", ASTERISK})
		case '/':
			tokens = append(tokens, Token{"/", SLASH})
		case '"':
			if string_mode {
				tokens = append(tokens, Token{buffer, STRING})
				buffer = ""
				string_mode = false
			} else {
				string_mode = true
			}
		default:
			buffer += string(input[i])
			if buffer == "var" {
				tokens = append(tokens, Token{"var", VAR})
				buffer = ""
			}
			continue
		}
	}

	return tokens
}
