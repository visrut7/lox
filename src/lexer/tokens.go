package lexer

type TokenType int

const (
	IDENTIFIER TokenType = iota

	// separators
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

func (t Token) String() string {

	if t.Type == STRING || t.Type == IDENTIFIER || t.Type == NUMBER {
		return "Type: " + TokenTypeString(t.Type) + " Value: '" + t.Value + "'"
	}

	return "Type: " + TokenTypeString(t.Type)
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
