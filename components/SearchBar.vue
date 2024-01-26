<template>
	<v-combobox
		ref="combobox"
		v-model="input"
		menu-icon=""
		prepend-inner-icon="mdi-magnify"
		clearable
		placeholder="新一代阿里云盘搜索引擎..."
		variant="solo"
		no-data-text="暂无合适的搜索建议..."
		:loading="isLoadingSuggest"
		:items="suggestItems"
		@keyup.enter="clickSearch"
		@click:clear="clickClear"
		@update:modelValue="inputChange"
	>
		<template #append-inner>
			<v-btn
				class="ml-2"
				append-icon="mdi-arrow-down-right"
				color="black"
				@mousedown.stop
				@click.stop="clickSearch"
				>搜索</v-btn
			>
		</template>
	</v-combobox>
</template>

<script lang="ts" setup>
import debounce from "lodash-es/debounce";

interface IProps {
	input: string;
}
// TODO 还可以增加一个历史浏览的功能，并在列表展示时增加tag，在菜单里面增加历史浏览的选项
const props = withDefaults(defineProps<IProps>(), {
	input: "",
});

interface IEmits {
	(e: "search", input: string): void;
	(e: "clear"): void;
}

const emit = defineEmits<IEmits>();

const input = ref(props.input); // 如果父组件传入了这个属性，则用其初始化input
const suggestItems: Ref<string[]> = ref([]);
const isLoadingSuggest = ref(false);
// 这个组件没有对应的点击选择下拉项的的click事件
const isSelectSuggest = computed(() =>
	suggestItems.value.includes(input.value)
);

async function inputChange() {
	if (!input.value) {
		emit("clear");
		return;
	}
	// 如果是点击选择下拉项，则不再重新加载下拉项，并触发搜索
	if (isSelectSuggest.value) {
		suggestItems.value = [];
		clickSearch();
		return;
	}

	debounceLoadSuggestFn();
}

async function loadSuggest() {
	isLoadingSuggest.value = true;
	try {
		const data: string[] = await $fetch("/api/search/suggest", {
			query: { input: input.value },
		});
		suggestItems.value = data;
	} catch (e) {
		suggestItems.value = [];
	} finally {
		isLoadingSuggest.value = false;
	}
}
const debounceLoadSuggestFn = debounce(loadSuggest, 300);

const combobox = ref();
function clickSearch() {
	combobox.value.blur();
	if (!input.value) return;
	emit("search", input.value);
}

function clickClear() {
	suggestItems.value = [];
	emit("clear");
}
</script>

<style></style>
