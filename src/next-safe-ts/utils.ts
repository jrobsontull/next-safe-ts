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

function getHeaderObject(
  key: string,
  defaultValues: string[],
  values?: string[],
  extendDefaults = false
): Header | null {
  const header: Header = { key: key, value: '' };

  if (!values) {
    header['value'] = defaultValues.join(' ');
    return header;
  } else if (values.length === 0) {
    return null;
  }

  const mergedValueArray = extendDefaults
    ? [...defaultValues, ...values]
    : values;

  const uniqueValueArray = mergedValueArray.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  header['key'] = key;
  header['value'] = uniqueValueArray.join(' ');
  return header;
}

// typeguard for Header
function isValidHeader(header: any): header is Header {
  if (typeof header !== 'object') {
    return false;
  }
  return 'key' in header && 'value' in header;
}

export { headerArrayToString, getHeaderObject, isValidHeader };
