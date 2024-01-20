<template>
	<div class="list-container">
		<template v-for="(item, i) in props.items" :key="i">
			<v-card
				class="mx-1 my-1 py-2 card"
				:href="panUrls[i]"
				target="_blank"
				append-icon="mdi-open-in-new"
			>
				<template v-slot:title>
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
	total: number;
}
// TODO 还可以增加一个历史浏览的功能，并在列表展示时增加tag，在菜单里面增加历史浏览的选项
// TODO 监听滚动区域，在背景可以展示图像移动，反正要考虑下滚动区域
const props = withDefaults(defineProps<IProps>(), {
	items: () => [],
	total: 0,
});

const panUrls = computed(() => {
	return props.items.map((item) => "//" + item.raw.pan_url);
});

interface IEmits {
	(e: "pageChange", page: number): void;
}

const emit = defineEmits<IEmits>();
const page = ref(1);
watch(page, (newPage) => {
	emit("pageChange", newPage);
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
