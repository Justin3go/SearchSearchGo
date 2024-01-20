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
import { debounce } from "lodash";

interface IEmits {
	(e: "search", input: string): void;
	(e: "clear"): void;
}

const emit = defineEmits<IEmits>();

const input = ref("");
const suggestItems: Ref<string[]> = ref([]);
const isLoadingSuggest = ref(false);

async function inputChange() {
	if (!input.value) {
		emit("clear");
		return;
	}
	debounce(loadSuggest, 300)();
}

async function loadSuggest() {
	const data: string[] = await $fetch("/api/search/suggest", {
		query: { input: input.value },
	});
	suggestItems.value = data;
}

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
