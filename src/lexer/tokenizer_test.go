package lexer

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTokenize_BasicTokenization(t *testing.T) {
	input := "var language = \"lox\";"
	expected := []Token{
		{Value: "var", Type: KEYWORD},
		{Value: "language", Type: IDENTIFIER},
		{Value: "=", Type: EQUAL},
		{Value: "\"lox\"", Type: STRING},
		{Value: ";", Type: SEMI_COLON},
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
		{Value: "for", Type: KEYWORD},
		{Value: "(", Type: LEFT_PAREN},
		{Value: "var", Type: KEYWORD},
		{Value: "i", Type: IDENTIFIER},
		{Value: "=", Type: EQUAL},
		{Value: "0", Type: NUMBER},
		{Value: ";", Type: SEMI_COLON},
		{Value: "i", Type: IDENTIFIER},
		{Value: "<", Type: LESS},
		{Value: "10", Type: NUMBER},
		{Value: ";", Type: SEMI_COLON},
		{Value: "i", Type: IDENTIFIER},
		{Value: "++", Type: PLUS_PLUS},
		{Value: ")", Type: RIGHT_PAREN},
		{Value: "{", Type: LEFT_BRACE},
		{Value: "x", Type: IDENTIFIER},
		{Value: "=", Type: EQUAL},
		{Value: "x", Type: IDENTIFIER},
		{Value: "+", Type: PLUS},
		{Value: "1.2", Type: NUMBER},
		{Value: ";", Type: SEMI_COLON},
		{Value: "}", Type: RIGHT_BRACE},
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
