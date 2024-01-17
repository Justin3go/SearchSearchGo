interface ISuggestQuery {
  input: string;
}

export default defineEventHandler(async (event) => {
  const { serverElasticsearchClient } = event.context;
  const { input }: ISuggestQuery = getQuery(event);

  const esRes = await serverElasticsearchClient.search({
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
