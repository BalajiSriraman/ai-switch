import { Client, fql } from "fauna";

export const db = new Client({
  secret: useRuntimeConfig().faunaSecret,
  endpoint: new URL(useRuntimeConfig().faunaEndpoint),
});

export const saveUsageAndResponseToDB = async (object: {}) => {
  try {
    const query = fql`
    AiSwitch.create(${object})
  `;
    await db.query(query);
  } catch (error) {
    console.error(error);
  }
};
