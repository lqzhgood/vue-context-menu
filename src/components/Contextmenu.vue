<template>
	<div></div>
</template>

<script>
import Vue from 'vue';
import { getElementsByClassName } from '../util';
import { COMPONENT_NAME } from '../constant';
export default {
	name: 'vue-contextMenu-2',
	mounted() {
		const SubmenuConstructor = Vue.component(COMPONENT_NAME);
		this.mainMenuInstance = new SubmenuConstructor();
		this.mainMenuInstance.items = this.items;
		this.mainMenuInstance.commonClass = {
			menu: this.$style.menu,
			menuItem: this.$style.menu_item,
			clickableMenuItem: this.$style.menu_item__clickable,
			unClickableMenuItem: this.$style.menu_item__unClickable,
		};
		this.mainMenuInstance.position = {
			x: this.position.x,
			y: this.position.y,
			width: 0,
			height: 0,
		};
		this.mainMenuInstance.style.minWidth = this.style.minWidth;
		this.mainMenuInstance.style.zIndex = this.style.zIndex;
		this.mainMenuInstance.customClass = this.customClass;
		this.mainMenuInstance.$mount();
		document.body.appendChild(this.mainMenuInstance.$el);
		this.addListener();
	},
	data: () => ({
		items: [],
		position: {
			x: 0,
			y: 0,
		},
		style: {
			zIndex: 2,
			minWidth: 150,
		},
		mainMenuInstance: null,
		customClass: null,
		mouseListening: false,
	}),
	methods: {
		async mousewheelListener() {
			await this.close();
		},
		async mouseDownListener(e) {
			let el = e.target;
			const menus = getElementsByClassName(this.$style.menu);
			// eslint-disable-next-line no-loop-func
			while (!menus.find(m => m === el) && el.parentElement) {
				el = el.parentElement;
			}
			if (!menus.find(m => m === el)) {
				await this.close();
			}
		},
		async mouseClickListener(e) {
			let el = e.target;
			const menus = getElementsByClassName(this.$style.menu);
			const menuItems = getElementsByClassName(this.$style.menu_item);
			// eslint-disable-next-line no-loop-func
			while (!menus.find(m => m === el) && !menuItems.find(m => m === el) && el.parentElement) {
				el = el.parentElement;
			}

			if (menuItems.find(m => m === el)) {
				const unClickableMenuItems = getElementsByClassName(this.$style.menu_item__unClickable);
				if (e.button !== 0 || unClickableMenuItems.find(m => m === el)) {
					return;
				}
				await this.close();
				return;
			}
			if (!menus.find(m => m === el)) {
				await this.close();
			}
		},
		addListener() {
			if (!this.mouseListening) {
				document.addEventListener('click', this.mouseClickListener);
				document.addEventListener('mousedown', this.mouseDownListener);
				document.addEventListener('mousewheel', this.mousewheelListener);
				this.mouseListening = true;
			}
		},
		removeListener() {
			if (this.mouseListening) {
				document.removeEventListener('click', this.mouseClickListener);
				document.removeEventListener('mousedown', this.mouseDownListener);
				document.removeEventListener('mousewheel', this.mousewheelListener);
				this.mouseListening = false;
			}
		},
		async close() {
			this.removeListener();
			if (this.mainMenuInstance) {
				await this.mainMenuInstance.close();
			}
			this.$destroy();
		},
	},
};
</script>

<style module>
.menu,
.menu_item,
.menu_item__clickable,
.menu_item__unClickable {
	box-sizing: border-box;
}
</style>