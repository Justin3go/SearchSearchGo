<template>
	<div ref="scrollContainer" class="list-container">
		<template v-for="(item, i) in props.items" :key="i">
			<v-card
				class="mx-1 my-1 py-1 card"
				:href="panUrls[i]"
				target="_blank"
				append-icon="mdi-open-in-new"
			>
				<template #title>
					<span v-html="item.raw.highlight"></span>
				</template>
				<v-card-actions>
					<v-snackbar :timeout="2000">
						<template #activator="{ props }">
							<v-btn
								v-bind="props"
								class="ml-2"
								prepend-icon="mdi-code-block-brackets"
								@click.prevent
								@click.stop="copy(item.raw.extract_code)"
								>提取码</v-btn
							>
						</template>
						<template #actions>
							<v-icon
								:icon="item.raw.extract_code ? 'mdi-check' : 'mdi-bell-outline'"
							></v-icon>
						</template>
						{{ item.raw.extract_code ? "复制成功" : "无需提取码" }}
					</v-snackbar>
					<v-snackbar :timeout="2000">
						<template #activator="{ props }">
							<v-btn
								v-bind="props"
								prepend-icon="mdi-link-box-variant-outline"
								@click.prevent
								@click.stop="copy(item.raw.pan_url)"
								>复制链接</v-btn
							>
						</template>
						<template #actions>
							<v-icon icon="mdi-check"></v-icon>
						</template>
						复制成功
					</v-snackbar>
				</v-card-actions>
				<template #subtitle>
					<v-chip size="x-small" color="primary" label>
						{{ item.raw.extract_code ? "需提取码" : "无提取码" }}
					</v-chip>
				</template>
			</v-card>
		</template>
		<v-pagination
			class="mt-12 mb-6"
			v-model="page"
			:length="paginationLength"
			:total-visible="4"
		></v-pagination>
		<v-snackbar ref="snackbarRef"></v-snackbar>
	</div>
</template>

<script lang="ts" setup>
import { copyText } from "../utils/copyText";

interface IResultItem {
	raw: {
		title: string;
		pan_url: string;
		extract_code: string;
		highlight: string;
	};
}

interface IProps {
	items: IResultItem[];
	page: number;
	total: number;
}
// TODO 还可以增加一个历史浏览的功能，并在列表展示时增加tag，在菜单里面增加历史浏览的选项
const props = withDefaults(defineProps<IProps>(), {
	items: () => [],
	page: 1,
	total: 0,
});

const panUrls = computed(() => {
	return props.items.map((item) => "//" + item.raw.pan_url);
});

interface IEmits {
	(e: "pageChange", page: number): void;
}

const emit = defineEmits<IEmits>();
const page = ref(props.page); // 如果父组件传入了这个属性，则用其初始化page
watch(page, (newPage) => {
	emit("pageChange", newPage);
	scrollToTop();
});

const paginationLength = computed(() => {
	return Math.ceil(props.total / 10);
});

const snackbarRef = ref();
function copy(text: string) {
	copyText(text);
	snackbarRef.value.show({
		message: "复制成功",
		timeout: 3000, // 设置显示时间
		color: "success", // 设置颜色
	});
}

const scrollContainer = ref();
function scrollToTop() {
	scrollContainer.value.scrollTo({
		top: 0,
		// behavior: "smooth",
	});
}
</script>

<style lang="scss" scoped>
.list-container {
	height: calc(100vh - 160px);
	overflow-y: scroll;
}

.list-container::-webkit-scrollbar {
	display: none;
}
</style>
<style>
.highlight {
	background-color: #eceff1;
	font-weight: bold;
}
</style>
