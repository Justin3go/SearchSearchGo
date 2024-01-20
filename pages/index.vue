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
					<SearchBar @search="search" @clear="clear"></SearchBar>
				</template>
				<template #default="{ items }">
					<DataList
						:items="items"
						:total="curTotal"
						@page-change="pageChange"
					></DataList>
				</template>
				<template #no-data>
					<template v-if="!pending">
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
const { query = "", pageNo = 1 } = route.query;
const defaultData = { data: [], total: 0 };

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

const curPage = ref(pageNo as number);

const curInput = ref(query as string);
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
}

function pageChange(page: number) {
	curPage.value = page;
}

function clear() {
	curInput.value = "";
	data.value = defaultData;
}
</script>
