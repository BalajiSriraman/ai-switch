export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("afterResponse", async (e, res) => {
    await saveUsageAndResponseToDB({
      user: e.context.user.name,
      // @ts-ignore
      usage: res?.body?.usage ?? {},
      // @ts-ignore
      response: res?.body?.object ?? {},
    });
  });
});
