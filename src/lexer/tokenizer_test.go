package lexer

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTokenize_BasicTokenization(t *testing.T) {
	input := "var language = \"lox\"\n\n      \n\n;"
	expected := []Token{
		{"var", KEYWORD, 1},
		{"language", IDENTIFIER, 1},
		{"=", EQUAL, 1},
		{"\"lox\"", STRING, 1},
		{";", SEMI_COLON, 5},
	}

	tokens := Tokenize(input)

	assert.Equal(t, len(expected), len(tokens))
	assert.Equal(t, expected[0], tokens[0], "Expected "+expected[0].String())
	assert.Equal(t, expected[1], tokens[1], "Expected "+expected[1].String())
	assert.Equal(t, expected[2], tokens[2], "Expected "+expected[2].String())
	assert.Equal(t, expected[3], tokens[3], "Expected "+expected[3].String())
	assert.Equal(t, expected[4], tokens[4], "Expected "+expected[4].String())
}

func TestTokenize_ForLoop(t *testing.T) {
	input := "for (var i = 0; i < 10; i++) { x = x + 1.2; }"
	expected := []Token{
		{"for", KEYWORD, 1},
		{"(", LEFT_PAREN, 1},
		{"var", KEYWORD, 1},
		{"i", IDENTIFIER, 1},
		{"=", EQUAL, 1},
		{"0", NUMBER, 1},
		{";", SEMI_COLON, 1},
		{"i", IDENTIFIER, 1},
		{"<", LESS, 1},
		{"10", NUMBER, 1},
		{";", SEMI_COLON, 1},
		{"i", IDENTIFIER, 1},
		{"++", PLUS_PLUS, 1},
		{")", RIGHT_PAREN, 1},
		{"{", LEFT_CURLY, 1},
		{"x", IDENTIFIER, 1},
		{"=", EQUAL, 1},
		{"x", IDENTIFIER, 1},
		{"+", PLUS, 1},
		{"1.2", NUMBER, 1},
		{";", SEMI_COLON, 1},
		{"}", RIGHT_CURLY, 1},
	}

	tokens := Tokenize(input)

	assert.Equal(t, len(expected), len(tokens))

	assert.Equal(t, expected[0], tokens[0], "Expected "+expected[0].String())
	assert.Equal(t, expected[4], tokens[4], "Expected "+expected[4].String())
	assert.Equal(t, expected[8], tokens[8], "Expected "+expected[8].String())
	assert.Equal(t, expected[12], tokens[12], "Expected "+expected[12].String())
	assert.Equal(t, expected[16], tokens[16], "Expected "+expected[16].String())
	assert.Equal(t, expected[17], tokens[17], "Expected "+expected[17].String())
	assert.Equal(t, expected[19], tokens[19], "Expected "+expected[19].String())
	assert.Equal(t, expected[20], tokens[20], "Expected "+expected[20].String())
}

func TestTokenize_Arithmatic(t *testing.T) {
	input := "\nx = 1.2 * 3.4 + 5.6 / 7.8 - 9.0;\ny = x * 2 + (6 - 3) / 2;"

	expected := []Token{
		{"x", IDENTIFIER, 2},
		{"=", EQUAL, 2},
		{"1.2", NUMBER, 2},
		{"*", MULTIPLY, 2},
		{"3.4", NUMBER, 2},
		{"+", PLUS, 2},
		{"5.6", NUMBER, 2},
		{"/", DIVIDE, 2},
		{"7.8", NUMBER, 2},
		{"-", MINUS, 2},
		{"9.0", NUMBER, 2},
		{";", SEMI_COLON, 2},
		{"y", IDENTIFIER, 3},
		{"=", EQUAL, 3},
		{"x", IDENTIFIER, 3},
		{"*", MULTIPLY, 3},
		{"2", NUMBER, 3},
		{"+", PLUS, 3},
		{"(", LEFT_PAREN, 3},
		{"6", NUMBER, 3},
		{"-", MINUS, 3},
		{"3", NUMBER, 3},
		{")", RIGHT_PAREN, 3},
		{"/", DIVIDE, 3},
		{"2", NUMBER, 3},
		{";", SEMI_COLON, 3},
	}

	tokens := Tokenize(input)

	assert.Equal(t, len(expected), len(tokens))

	assert.Equal(t, expected[0], tokens[0], "Expected "+expected[0].String())
	assert.Equal(t, expected[2], tokens[2], "Expected "+expected[2].String())
	assert.Equal(t, expected[4], tokens[4], "Expected "+expected[4].String())
	assert.Equal(t, expected[6], tokens[6], "Expected "+expected[6].String())
	assert.Equal(t, expected[8], tokens[8], "Expected "+expected[8].String())
	assert.Equal(t, expected[10], tokens[10], "Expected "+expected[10].String())
	assert.Equal(t, expected[12], tokens[12], "Expected "+expected[12].String())
}
