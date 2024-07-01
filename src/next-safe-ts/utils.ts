function headerArrayToString<
  T extends Record<string, string[] | string | undefined>,
>(headers: T): string {
  return Object.entries(headers)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(' ')}`;
      }
      if (value !== undefined) {
        return `${key}: ${value}`;
      }
      return ''; // Handle cases where value is undefined
    })
    .filter(Boolean) // Remove empty lines if you want
    .join('\n');
}

export { headerArrayToString };
