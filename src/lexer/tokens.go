package lexer

type TokenType int

const (
	IDENTIFIER TokenType = iota

	// separators
	SEMI_COLON
	LEFT_PAREN
	RIGHT_PAREN
	LEFT_BRACE
	RIGHT_BRACE

	// operators
	EQUAL
	PLUS
	MINUS
	PLUS_PLUS
	LESS
	MULTIPLY
	DIVIDE

	// literals
	STRING
	NUMBER

	KEYWORD
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
		return "identifier"
	case KEYWORD:
		return "keyword"
	case EQUAL:
		return "equal"
	case STRING:
		return "string"
	case SEMI_COLON:
		return "semi_colon"
	case NUMBER:
		return "number"
	case PLUS:
		return "plus"
	case MINUS:
		return "minus"
	case MULTIPLY:
		return "multiply"
	case DIVIDE:
		return "divide"
	case PLUS_PLUS:
		return "plus_plus"
	case LESS:
		return "less"
	case LEFT_PAREN:
		return "left_paren"
	case RIGHT_PAREN:
		return "right_paren"
	case LEFT_BRACE:
		return "left_brace"
	case RIGHT_BRACE:
		return "right_brace"
	default:
		return "unknown"
	}
}
