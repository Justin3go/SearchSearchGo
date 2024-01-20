<template>
	<v-menu>
		<template v-slot:activator="{ props }">
			<v-btn icon="mdi-menu" variant="text" v-bind="props">
			</v-btn>
		</template>
		<v-list>
			<v-list-item
				v-for="(item, index) in menuItems"
				:key="index"
				:value="index"
			>
				<v-list-item-title
					class="d-flex justify-space-between"
					@click="item.clickFn"
				>
					<v-icon :icon="item.icon"></v-icon>
					<span class="ml-2">
						{{ item.title }}
					</span>
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts" setup>
// TODO
const menuItems = ref([
	{
		title: "网站声明",
		icon: "mdi-checkbox-blank-badge-outline",
		clickFn: () => {

		},
	},
	{
		title: "意见反馈",
		icon: "mdi-github",
		clickFn: () => {

		},
	},
]);
</script>

<style></style>
