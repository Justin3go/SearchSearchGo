import { client } from "~/server/elasticsearch";

interface ISuggestQuery {
  input: string;
}

export default defineEventHandler(async (event) => {
  const { input }: ISuggestQuery = getQuery(event);

  const esRes = await client.search({
    index: process.env.ES_INDEX,
    body: {
      suggest: {
        suggest: {
          prefix: input,
          completion: {
            field: "suggest"
          }
        }
      }
    },
  });

  const finalRes = esRes.body.suggest.suggest[0]?.options.map((item: any) => item._source.suggest)

  return finalRes;
});
