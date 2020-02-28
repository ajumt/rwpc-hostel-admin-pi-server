<template>
    <div>
        <app-drawer class="app--drawer"></app-drawer>
		<app-toolbar class="app--toolbar"></app-toolbar>
		<v-content>
			<!-- Page Header -->
			<page-header v-if="$route.meta.breadcrumb"></page-header>
			<div class="page-wrapper pb-5 mb-3">
                <slot name="default">
                </slot>
			</div>   
				<!-- App Footer -->
			<v-footer height="auto" :fixed="true" class="white pa-3 app--footer">
				<span class="caption"><a href="proinn.in">ProInn Technolect</a> Design &copy; {{ new Date().getFullYear() }}</span>
				<v-spacer></v-spacer>
				<span class="caption mr-1"> Made With passion and </span> <v-icon color="pink" small>favorite</v-icon>
			</v-footer>
		</v-content>
    </div>
</template>

<script>
import AppDrawer from '@/js/components/AppDrawer';
import AppToolbar from '@/js/components/AppToolbar';
import PageHeader from '@/js/components/PageHeader';
export default {
    
  	// components: {
	// 	AppDrawer,
	// 	AppToolbar,
	// 	PageHeader,
	// },
}
</script>