# 设置基础镜像
ARG NODE_VERSION=18.14.2
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# 构建阶段
FROM base as build
COPY --link package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --production=false
COPY --link . .
RUN pnpm run build
# RUN pnpm prune

# 运行阶段
FROM base
ENV PORT=$PORT
COPY --from=build /src/.output /src/.output
CMD ["node", ".output/server/index.mjs"]
