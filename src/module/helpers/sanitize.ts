/**
 * Utility function to sanitize values received from the native modules.
 *
 * @remarks
 * Sanitization does the following:
 * - Replaces `null` values with `undefined`.
 *
 * @param value The value to sanitize.
 * @returns Sanitized value.
 */
export function sanitize(value: unknown): unknown {
  // null - replace with `undefined`
  if (value === null) {
    return undefined;
  }

  // empty string - replace with `undefined`
  if (value === '') {
    return undefined;
  }

  // array - recursively iterate over each element
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }

  // dictionary - recursively sanitize the values
  if (typeof value === 'object') {
    const sanitized: { [key: string]: unknown } = {};
    for (const key in value) {
      sanitized[key] = sanitize(value[key as keyof typeof value]);
    }
    return sanitized;
  }

  // all others - no change
  return value;
}
