# 使用docker构建部署

1. 构建镜像

```shell
docker build -t ssgo .
docker images
```

2. 运行容器

```shell
docker run -d -p 3000:3000 -e ES_URL='http://localhost:9200' -e ES_INDEX='aliyunpan' -e ES_AUTH_USERNAME='elastic' -e ES_AUTH_PASSWORD='changeme' ssgo
```

之后访问`http://localhost:3000`即可
