package lexer

type TokenType int

const (
	// special tokens
	IDENTIFIER TokenType = iota
	SEMI_COLON

	// operators
	EQUAL
	PLUS
	MINUS
	ASTERISK
	SLASH

	// literals
	STRING
	NUMBER

	// keywords
	VAR
)

type Token struct {
	Value string
	Type  TokenType
}

func TokenTypeString(t TokenType) string {
	switch t {
	case IDENTIFIER:
		return "IDENTIFIER"
	case VAR:
		return "VAR"
	case EQUAL:
		return "EQUAL"
	case STRING:
		return "STRING"
	case SEMI_COLON:
		return "SEMI_COLON"
	case NUMBER:
		return "NUMBER"
	case PLUS:
		return "PLUS"
	case MINUS:
		return "MINUS"
	case ASTERISK:
		return "ASTERISK"
	case SLASH:
		return "SLASH"
	default:
		return "UNKNOWN"
	}
}
