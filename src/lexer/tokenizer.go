package lexer

import (
	"regexp"
)

func Tokenize(input string) []Token {
	// order of finders is important
	// ex: if we put \w+ before \d+\.\d+ then it will match "1.2" as two tokens
	finders := `\n|=|;|\(|\)|{|}|\+\+|\<|\+|-|\/|\*|"([^"]*)"|\d+(\.\d+)?|\w+`

	re := regexp.MustCompile(finders)
	raw_tokens := re.FindAllString(input, -1)

	tokens := []Token{}

	line_no := 1

	for i := 0; i < len(raw_tokens); i++ {
		switch raw_tokens[i] {
		case "\n":
			line_no += 1
			continue
		case " ":
			continue
		case "=":
			tokens = append(tokens, Token{"=", EQUAL, line_no})
		case ";":
			tokens = append(tokens, Token{";", SEMI_COLON, line_no})
		case "+":
			tokens = append(tokens, Token{"+", PLUS, line_no})
		case "++":
			tokens = append(tokens, Token{"++", PLUS_PLUS, line_no})
		case "<":
			tokens = append(tokens, Token{"<", LESS, line_no})
		case "(":
			tokens = append(tokens, Token{"(", LEFT_PAREN, line_no})
		case ")":
			tokens = append(tokens, Token{")", RIGHT_PAREN, line_no})
		case "{":
			tokens = append(tokens, Token{"{", LEFT_CURLY, line_no})
		case "}":
			tokens = append(tokens, Token{"}", RIGHT_CURLY, line_no})
		case "/":
			tokens = append(tokens, Token{"/", DIVIDE, line_no})
		case "*":
			tokens = append(tokens, Token{"*", MULTIPLY, line_no})
		default:
			if is_keyword(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], KEYWORD, line_no})
				continue
			}

			if is_string(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], STRING, line_no})
				continue
			}

			if is_number(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], NUMBER, line_no})
				continue
			}

			tokens = append(tokens, Token{raw_tokens[i], IDENTIFIER, line_no})
		}
	}

	return tokens
}

func is_keyword(s string) bool {
	keywords := []string{"var", "for"}

	// return true if s is in the array
	for _, keyword := range keywords {
		if s == keyword {
			return true
		}
	}

	return false
}

func is_string(s string) bool {
	if s[0] == '"' && s[len(s)-1] == '"' {
		return true
	}

	return false
}

func is_number(s string) bool {
	is_matched, err := regexp.MatchString(`\d+`, s)
	return is_matched && err == nil
}
