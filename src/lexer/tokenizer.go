package lexer

import (
	"regexp"
)

func Tokenize(input string) []Token {
	finders := `=|;|\(|\)|{|}|\+\+|\<|\+|"([^"]*)"|\d+\.\d+|\w+`
	re := regexp.MustCompile(finders)
	raw_tokens := re.FindAllString(input, -1)

	tokens := []Token{}

	for i := 0; i < len(raw_tokens); i++ {
		switch raw_tokens[i] {
		case " ":
			continue
		case "=":
			tokens = append(tokens, Token{"=", EQUAL})
		case ";":
			tokens = append(tokens, Token{";", SEMI_COLON})
		case "+":
			tokens = append(tokens, Token{"+", PLUS})
		case "++":
			tokens = append(tokens, Token{"++", PLUS_PLUS})
		case "<":
			tokens = append(tokens, Token{"<", LESS})
		case "(":
			tokens = append(tokens, Token{"(", LEFT_PAREN})
		case ")":
			tokens = append(tokens, Token{")", RIGHT_PAREN})
		case "{":
			tokens = append(tokens, Token{"{", LEFT_BRACE})
		case "}":
			tokens = append(tokens, Token{"}", RIGHT_BRACE})
		default:
			if is_keyword(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], KEYWORD})
				continue
			}

			if is_string(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], STRING})
				continue
			}

			if is_number(raw_tokens[i]) {
				tokens = append(tokens, Token{raw_tokens[i], NUMBER})
				continue
			}

			tokens = append(tokens, Token{raw_tokens[i], IDENTIFIER})
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
