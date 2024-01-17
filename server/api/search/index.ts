interface ISearchQuery {
  pageNo: number;
  pageSize: number;
  query: string;
}

export default defineEventHandler(async (event) => {
  const { serverElasticsearchClient } = event.context;
  const { pageNo = 1, pageSize = 10, query }: ISearchQuery = getQuery(event);

  const esRes = await serverElasticsearchClient.search({
    index: process.env.ES_INDEX,
    body: {
      from: (pageNo - 1) * pageSize, // 从哪里开始
      size: pageSize, // 查询条数
      query: {
        match: {
          title: query, // 搜索查询到的内容
        },
      },
      highlight: {
        pre_tags: ["<span class='highlight'>"],
        post_tags: ['</span>'],
        fields: {
          title: {},
        },
        fragment_size: 40,
      },
    },
  });

  const finalRes = {
    took: esRes.body.took,
    total: esRes.body.hits.total.value,
    data: esRes.body.hits?.hits.map((item: any) => ({
      title: item._source.title,
      pan_url: item._source.pan_url,
      extract_code: item._source.extract_code,
      highlight: item.highlight,
    })),
  };

  return finalRes;
});
