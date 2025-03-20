# Changelog

## [1.1.0](https://github.com/Justin3go/SearchSearchGo/compare/v1.0.2...v1.1.0) (2025-03-20)


### Features

* 优化二维码展示样式，增加容器和尺寸设置 ([7009d1c](https://github.com/Justin3go/SearchSearchGo/commit/7009d1ce1eb99e83b8e015ce77f4d83de792d6e1))
* 修改二维码获取提示文本，简化说明 ([34452ba](https://github.com/Justin3go/SearchSearchGo/commit/34452ba2ee1d719bceefc693005813ac0efc00ff))
* 更新二维码获取提示文本，明确操作步骤 ([472adbd](https://github.com/Justin3go/SearchSearchGo/commit/472adbdfa15770681c4d7b56a4dec96056846b63))
* 更新空状态提示文本和链接，指向新站点 ([57d7295](https://github.com/Justin3go/SearchSearchGo/commit/57d729576cce1080886da2e6c7be73d6f81d418d))
* 添加访问验证组件及API支持 ([0564b2c](https://github.com/Justin3go/SearchSearchGo/commit/0564b2c80f49d00027bfddaef0efd8452c852e8b))
* 调整搜索框标题样式，优化字体大小 ([44b8b76](https://github.com/Justin3go/SearchSearchGo/commit/44b8b76c1ab7e05b483359939f5b61c9348091d2))

## [1.0.2](https://github.com/Justin3go/SearchSearchGo/compare/v1.0.1...v1.0.2) (2024-02-22)


### Bug Fixes

* remove dead link ([cec8385](https://github.com/Justin3go/SearchSearchGo/commit/cec8385a1b0388a1ebae06e251c129a9f02f7fad))


### Docs

* add changelog ([ddb8b66](https://github.com/Justin3go/SearchSearchGo/commit/ddb8b66ef646b67fe86cb54d283695caf80b5dbb))

## [1.0.1](https://github.com/Justin3go/SearchSearchGo/compare/v1.0.0...v1.0.1) (2024-02-03)


### CI

* update release branch to master ([e54140b](https://github.com/Justin3go/SearchSearchGo/commit/e54140bc0d7963a2b0b5266d7f1a7643b39b8e7a))

## 1.0.0 (2024-02-03)


### Features

* Add app head title and favicon ([b6bb4fd](https://github.com/Justin3go/SearchSearchGo/commit/b6bb4fd50b15d2ff446d135829a8a8339221b55f))
* Add baidu and google analytics ([bc86a2a](https://github.com/Justin3go/SearchSearchGo/commit/bc86a2a9b3e88cf4762b1ea8163f8bcbcc5612f4))
* Add LoadingIndicator component and implement loading state in DataList ([a98b004](https://github.com/Justin3go/SearchSearchGo/commit/a98b004140a3740a04e6960748b52f8bf3a43f4b))
* Add meta tags for SEO and update ogDescription in index.vue ([8abc7f8](https://github.com/Justin3go/SearchSearchGo/commit/8abc7f8206a706887065f1feb785bc4baa8443fe))
* Add new components and styles ([95f24ca](https://github.com/Justin3go/SearchSearchGo/commit/95f24cae1c29def926b599020c3dd991ab48e86a))
* add nuxt-elasticsearch module and search api ([d72615b](https://github.com/Justin3go/SearchSearchGo/commit/d72615be382a3bf4e86f7f796a2b1bae77f3385b))
* Add page prop to DataList and SearchBar components ([f408a17](https://github.com/Justin3go/SearchSearchGo/commit/f408a178876eab36e2e6aa01401aa5e7534b6559))
* Add skeleton loader for pending state in DataList component ([deb9d03](https://github.com/Justin3go/SearchSearchGo/commit/deb9d0346375b65f6bc68bbee2eb5e057d718e2f))
* add Vuetify configuration and components ([c2f34e9](https://github.com/Justin3go/SearchSearchGo/commit/c2f34e98444675f0f5a87c40398ca474f47078ed))
* initial docker config ([f0dccae](https://github.com/Justin3go/SearchSearchGo/commit/f0dccaefcc507a3a084e669125ed6c62a4e674f9))
* Refactor DataList component and add copyText utility function ([08bf4db](https://github.com/Justin3go/SearchSearchGo/commit/08bf4db3b1b36bccf0953f137316ccd9400f8b93))
* Refactor DataList.vue and search/index.ts, Add highlight ([5070f8d](https://github.com/Justin3go/SearchSearchGo/commit/5070f8dff2224b367a84019ecd3d7be52d4632ab))
* Refactor MainMenu.vue component and add website disclaimer dialog ([d0a6d12](https://github.com/Justin3go/SearchSearchGo/commit/d0a6d1269e82ee8b781c532c36f939d629e4dcac))
* update styles and add dark/light theme toggle ([0355856](https://github.com/Justin3go/SearchSearchGo/commit/03558569ca09fd1e2cd0ae3fd3ea1322b3f5938b))


### Bug Fixes

* Add click event for selecting suggest items in SearchBar.vue ([bae85c8](https://github.com/Justin3go/SearchSearchGo/commit/bae85c829018ce769ec65c28d145c7b3b0030428))
* Persist user theme in Cookies ([2133536](https://github.com/Justin3go/SearchSearchGo/commit/2133536bb1c9ddd8626f2351fd2507d658f05d20))
* Refactor DataList and SearchBar components, add scrollToTop functionality ([c9300e1](https://github.com/Justin3go/SearchSearchGo/commit/c9300e1fb992819b0634ead6ef8a19b64f1c7e74))
* Update component titles and placeholders ([c0c85a2](https://github.com/Justin3go/SearchSearchGo/commit/c0c85a2ef1a485bab4054c62c5258e8f9d0ad05d))
* Update DataList.vue component ([a3535b4](https://github.com/Justin3go/SearchSearchGo/commit/a3535b4c53cedbaa44636a78e849f282b5f2fc8a))
* update link colors in MainMenu.vue ([6fbd84a](https://github.com/Justin3go/SearchSearchGo/commit/6fbd84ab8f74ef9764233076757fd8a7c00edec1))
* update themeCookie expiration date ([6c3c6a6](https://github.com/Justin3go/SearchSearchGo/commit/6c3c6a6d54573c531cd23cf65f34d2f52a342f5e))
* use elasticsearch client instead of nuxt-elasticsearch ([03fde2b](https://github.com/Justin3go/SearchSearchGo/commit/03fde2be2b34257d4a75a18cb12e20974e87467a))


### Docs

* add devGuide ([08745d3](https://github.com/Justin3go/SearchSearchGo/commit/08745d3304e35632d785905a901d9847dff14643))
* add docker deployment options ([daf7ed6](https://github.com/Justin3go/SearchSearchGo/commit/daf7ed6e19bd3eb00a0533af7d4bdc7ea0049c47))
* delete src readme ([df264f1](https://github.com/Justin3go/SearchSearchGo/commit/df264f17d08821372b8393562814cb4090680ebe))
* README ([d9d8754](https://github.com/Justin3go/SearchSearchGo/commit/d9d8754594eb955c2809286100b24653a14dfc0d))
* update issue templates ([fc6d453](https://github.com/Justin3go/SearchSearchGo/commit/fc6d45326c3ecee751b5728a7ae41517c937adbc))
* update README href ([a14227a](https://github.com/Justin3go/SearchSearchGo/commit/a14227a70486acfcfc921c3a57f900f4e7ef3af6))


### CI

* add release.yml ([4932d2b](https://github.com/Justin3go/SearchSearchGo/commit/4932d2bdf865bcf096957698093da7f021aa9dc6))
