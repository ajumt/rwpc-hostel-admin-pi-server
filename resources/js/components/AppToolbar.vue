<template>
  <v-app-bar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
    </v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="handleDrawerToggle"></v-app-bar-nav-icon>
      <v-text-field
        flat
        style="padding-top:25px;"
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        >
      </v-text-field>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items>
        <v-btn text href="mailto:wangqiangshen@gmail.com">
          Hire Me
        </v-btn>   
      </v-toolbar-items> -->
    
      <!-- <v-btn icon href="https://github.com/tookit/vue-material-admin">
        <v-icon class="fa-2x">fa-github</v-icon>
      </v-btn> -->
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="slide-y-transition">
        <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
        <v-badge v-if="notifications.length>0" color="red" overlap>
          <span slot="badge">{{ notifications.length }}</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        <v-icon v-else medium>notifications</v-icon>
        </v-btn>
        </template>
        <notification-list :items="notifications"></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="slide-y-transition">
        <template v-slot:activator="{ on }">
        <v-btn icon large text v-on="on">
          <v-avatar size="30px">
            <img :src="userProfile.image==undefined?'images/default.png':userProfile.image" alt="A"/>
          </v-avatar>
        </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
  </v-app-bar>
</template>
<script>
import NotificationList from '@/js/components/widgets/list/NotificationList';
import Util from '@/js/util';
import User from '@/js/database/models/User'
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  created:function(){
    this.initialize();
  },
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        href:'#/shop/user/profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        href:'#/app/settings',
        click: (e) => {
          
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          console.log(e);
          window.getApp.$emit('APP_LOGOUT');
        }
      },
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    userProfile(){
      return {};//this.$store.getters.getUserProfile
    },
    notifications(){
      return [];
    }
  },
  methods: {
    initialize(){
      User.fetch()
    },
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
