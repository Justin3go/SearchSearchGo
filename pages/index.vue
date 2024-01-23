<template>
	<div
		class="d-flex justify-center bg-grey-lighten-5 overflow-hidden overflow-y-hidden"
	>
		<v-sheet
			class="px-md-16 px-2 pt-4"
			:elevation="2"
			height="100vh"
			:width="1024"
			border
			rounded
		>
			<v-data-iterator :items="curItems" :page="curPage" :items-per-page="10">
				<template #header>
					<div class="pb-4 d-flex justify-space-between">
						<span
							class="text-h4 font-italic font-weight-thin d-flex align-center"
						>
							<RunSvg style="height: 40px; width: 40px"></RunSvg>
							<span>Search Search Go...</span>
						</span>
						<MainMenu></MainMenu>
					</div>
					<SearchBar :input="curInput" @search="search" @clear="clear"></SearchBar>
				</template>
				<template #default="{ items }">
					<DataList
						:items="items"
						:total="curTotal"
						:page="curPage"
						@page-change="pageChange"
					></DataList>
				</template>
				<template #no-data>
					<template v-if="!curInput || !pending">
						<v-slide-x-reverse-transition>
							<BaseEmpty v-if="isInput"></BaseEmpty>
						</v-slide-x-reverse-transition>
						<v-slide-x-transition>
							<PleaseInput v-if="!isInput"></PleaseInput>
						</v-slide-x-transition>
					</template>
				</template>
			</v-data-iterator>
		</v-sheet>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { query = "", page = 1 } = route.query;
const router = useRouter()
const defaultData = { data: [], total: 0 };

const descriptionPrefix =  query  ? `正在搜索${query}... ，这是` : ''
useSeoMeta({
  ogTitle: 'SearchSearchGo--新一代阿里云盘搜索引擎',
  ogDescription: `${descriptionPrefix}一款极简体验、优雅、现代化、资源丰富、免费、无需登录的新一代阿里云盘搜索引擎，来体验找寻资源的快乐吧~`,
  ogImage: 'https://ssgo.app/logobg.png',
  twitterCard: 'summary',
})

interface IResultItem {
	title: string;
	pan_url: string;
	extract_code: string;
	highlight: string;
}

interface IResult {
	data: IResultItem[];
	total: number;
}

const curPage = ref(+(page || 1));

const curInput = ref((query || '') as string);
const isInput = computed(() => !!curInput.value);

let { data, pending }: { data: Ref<IResult>, pending: Ref<boolean> } = await useFetch("/api/search", {
	query: { query: curInput, pageNo: curPage, pageSize: 10 },
	immediate: !!query,
});
data.value = data.value || defaultData;

const curItems = computed(() => data.value.data);
const curTotal = computed(() => data.value.total);

function search(input: string) {
	curPage.value = 1;
	curInput.value = input;
	router.replace({ query: { ...route.query, query: input, page: 1 } })
}

function pageChange(page: number) {
	curPage.value = page;
	router.replace({ query: { ...route.query, page: page } })
}

function clear() {
	curInput.value = "";
	data.value = defaultData;
	// 这里就不替换参数了，保留上一次的感觉好一些
}
</script>
