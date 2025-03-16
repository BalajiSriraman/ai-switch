export const magicJsonParser = (json: string): {} => {
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
};
