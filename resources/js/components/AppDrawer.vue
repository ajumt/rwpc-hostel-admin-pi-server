<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
    >
    <v-app-bar color="primary darken-1" dark>
      <img v-bind:src="computeLogo" id="logo-img" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">ProSchool</span>
      </v-toolbar-title>
    </v-app-bar>
      <v-list dense nav expand class=" pb-5 mb-3">
        
        <template v-for="(item, i) in menus">
            <!--group with subitems-->
            <v-list-group v-if="item.items&&havePermission(item.permission)" :key="item.name" :group="item.group" no-action="no-action">
              <v-icon slot="prependIcon" medium style="margin-right:5px" color="primary" >{{item.icon}}</v-icon>
              <v-list-item slot="activator" ripple="ripple">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <template v-for="(subItem, i) in item.items">
                <!--sub group-->
                <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" sub-group="sub-group">
                  <v-list-item slot="activator" ripple="ripple">
                    <v-list-item-content>
                      <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">
                    <v-list-item-content>
                      <v-list-item-title>{{ grand.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
                <!--child item-->
                <v-list-item v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple">
                  <v-list-item-content>
                    <v-list-item-title><span>{{ subItem.title }}</span></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="subItem.action">
                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-group>
            <v-subheader v-else-if="item.header&&havePermission(item.permission)" :key="i">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!--top-level link-->
            <v-list-item v-else-if="havePermission(item.permission)" :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="item.name">
              <v-list-item-action v-if="item.icon">
                <v-icon style="margin-right:5px">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="item.subAction">
                <v-icon class="success--text">{{ item.subAction }}</v-icon>
              </v-list-item-action>
            </v-list-item>
        </template>
      </v-list>            
  </v-navigation-drawer>
</template>
<script>
import User from '@/js/database/models/User'
export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,  
  }),
  computed: {
    menus(){
      return []
    },
    user(){
      return this.$store.getters.getUserProfile;
    },
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/images/app-logo.png';
    },
    userLoggedIn(){
      return User.isLoggedIn();
    },
    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    }    
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
    this.initialize();
  },
  

  methods: {
    initialize(){
      this.$store.dispatch('loadAppMenu');
    },
    genChildTarget (item, subItem) {
      // console.log(item.group);
      // console.log(subItem.name);
      // console.log(subItem.component);
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
    havePermission(permissionName){
      return true;//this.$store.getters.getMenuPermissions[permissionName]!=undefined?
                  //this.$store.getters.getMenuPermissions[permissionName]==0?false:true:false;
    }
  }
};
</script>
<style lang="stylus">
#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: hidden
  .v-navigation-drawer__content
    overflow: hidden
    .v-list-group__header__prepend-icon
      margin-right:5px
#logo-img{
  background-color: white;
  border-radius: 50%;
  padding: 5px;
}
</style>
