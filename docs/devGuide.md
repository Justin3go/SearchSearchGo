# 开发指南

## 起步

启动项目：

```shell
npm i -g pnpm
pnpm i
pnpm dev
```

环境变量：

|变量名|是否必需|描述|例子|
|-|-|-|-|
|ES_URL|是|ElasticSearch的地址|`http://localhost:9200`|
|ES_INDEX|是|ElasticSearch的索引|aliyunpan|
|ES_AUTH_USERNAME|否|ElasticSearch的用户名|elastic|
|ES_AUTH_PASSWORD|否|ElasticSearch的密码|changeme|

除此之外，如果你需要导入自己的Analytics，请修改`plugins/XXXAnalytics.ts`中的id为你自己的id

> 本仓库不提供爬虫以及数据索引部分，所以数据接口需要你自己搭建，或者自己mock一些数据来进行开发

## 项目结构

整体来说偏简单，毕竟只有一个页面，算是真正的“单页面应用”了🤣🤣🤣

### sever apis

|路径|参数|描述|
|-|-|-|
|/api/search|query: string, pageNo: number, pageSize: number|搜索接口|
|/api/search/suggest|input: string|自动补全接口|

### components

整个单页面主要由下方的三个组件组成

- SearchBar：搜索框
- DataList：搜索结果列表
- MainMenu：主菜单

至于其余的组件，则是一些占位组件，比如`Loading`、`Empty`等

### plugins

- baiduAnalytics：百度统计（需要替换其中的id）
- googleAnalytics：谷歌统计（需要替换其中的id）
- vuetify：vuetify的官方安装配置，仅在其中增加了深浅模式切换的逻辑

## ElasticSearch索引结构

你的ES索引结构至少需要以下字段：

```python
suggest = Completion(analyzer=analyzer('ik_smart'))
pan_url = Keyword()
title = Text(analyzer="ik_max_word")
extract_code = Keyword()
```

## ElasticSearch-8如何修改

首先，你需要安装对应版本的`@elastic/elasticsearch`：

```shell
pnpm add @elastic/elasticsearch@8
pnpm add -D @types/elasticsearch
```

然后请修改`server/api/search/index.ts`中的代码为如下代码（删除其中的`.body`即可）：

```typescript
import { client } from "~/server/elasticsearch";

interface ISearchQuery {
  pageNo: number;
  pageSize: number;
  query: string;
}

export default defineEventHandler(async (event) => {
  const { pageNo = 1, pageSize = 10, query }: ISearchQuery = getQuery(event);

  const esRes = await client.search({
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
    took: esRes.took,
    total: esRes.hits.total.value,
    data: esRes.hits?.hits.map((item: any) => ({
      title: item._source.title,
      pan_url: item._source.pan_url,
      extract_code: item._source.extract_code,
      highlight: item.highlight?.title?.[0] || '',
    })),
  };

  return finalRes;
});
```

以及修改`server/api/search/suggest.ts`中的代码为如下代码（删除其中的`.body`即可）：

```typescript
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

  const finalRes = esRes.suggest.suggest[0]?.options.map((item: any) => item._source.suggest)

  return finalRes;
});
```