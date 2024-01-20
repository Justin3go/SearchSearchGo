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
					<v-btn class="ml-2" prepend-icon="mdi-code-block-brackets"
						>提取码</v-btn
					>
					<v-btn prepend-icon="mdi-link-box-variant-outline">复制链接</v-btn>
				</v-card-actions>
			</v-card>
		</template>
		<v-pagination
			class="mt-12 mb-6"
			v-model="page"
			:length="paginationLength"
			:total-visible="4"
		></v-pagination>
	</div>
</template>

<script lang="ts" setup>
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
	background-color: #ECEFF1;
	font-weight: bold;
}
</style>
