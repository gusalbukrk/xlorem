/** Remove words that doesn't contain at least one alphanumeric character. */
function removeWordsNotContainingAlphanumericChar(text: string): string {
  return text.replace(/(^|\s)[^\s\w]+(?=(\s|$))/g, '');
}

export default removeWordsNotContainingAlphanumericChar;
