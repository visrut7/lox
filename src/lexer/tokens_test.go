package lexer

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// lexical analysis
func TestTokenDebug(t *testing.T) {
	assert.Equal(t, "IDENTIFIER", TokenTypeString(IDENTIFIER))
	assert.Equal(t, "NUMBER", TokenTypeString(NUMBER))
}
