function getValidCredentials() {
  const multiUsers = process.env.TEST_USERS_JSON;

  if (multiUsers) {
    try {
      const parsed = JSON.parse(multiUsers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      throw new Error('TEST_USERS_JSON is not valid JSON.');
    }
  }

  const username = process.env.TEST_USER;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Missing credentials. Set TEST_USER and TEST_PASSWORD (or TEST_USERS_JSON).'
    );
  }

  return [{ username, password }];
}

export { getValidCredentials };
