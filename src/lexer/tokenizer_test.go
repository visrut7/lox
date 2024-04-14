package lexer

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTokenize(t *testing.T) {
	input := "var language = \"lox\";"
	tokens := Tokenize(input)

	assert.Equal(t, 5, len(tokens))

	token1 := Token{Value: "var", Type: VAR}
	token2 := Token{Value: "language", Type: IDENTIFIER}
	token3 := Token{Value: "=", Type: EQUAL}
	token4 := Token{Value: "lox", Type: STRING}
	token5 := Token{Value: ";", Type: SEMI_COLON}

	assert.Equal(t, token1, tokens[0], "Expected "+token1.String())
	assert.Equal(t, token2, tokens[1], "Expected "+token2.String())
	assert.Equal(t, token3, tokens[2], "Expected "+token3.String())
	assert.Equal(t, token4, tokens[3], "Expected "+token4.String())
	assert.Equal(t, token5, tokens[4], "Expected "+token5.String())
}
