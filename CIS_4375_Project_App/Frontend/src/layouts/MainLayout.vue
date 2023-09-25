<template>
  <q-layout view="hHh lpR fFf" class="">
    <q-header class=" q-py-xs shadow-2 rounded-borders" height-hint="58" style="background-color: #666262;">
      <q-toolbar>
        <q-btn flat roundcccccbenfrdj @click="drawer = !drawer" aria-label="Menu" icon="menu" />
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <img src="src/assets/CISD_Logo.png" style="margin-left: 8px; height:70px;">
        </q-btn>
        <q-space />

        <div>
          <h5 style="font-weight: bold;">IT Helpdesk</h5>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <div v-if="!userSignedIn">
            <q-btn style="margin-right: 20px;"
              @click="openSignInDialog"
              label="Sign In"
              color="primary"
              icon="account_circle"
            />
          </div>
            

            <!-- <q-btn round flat style="margin-right: 10px;">
              <q-avatar size="46px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <q-tooltip>Account</q-tooltip>
            </q-btn> -->
            <div v-else>
              <q-btn
                round flat style="margin-right: 20px;"
                color="primary"
                :icon="userAvatar"
                @click="showUserProfileMenu = !showUserProfileMenu"
              >
              </q-btn>
            </div>

            <q-menu v-if="showUserProfileMenu" anchor="bottom-right">
              <q-list>
                <q-item>
                  <q-item-section> {{ user }} </q-item-section>
                  <q-item-section> {{ email }} </q-item-section>
                </q-item>
                <q-item clickable @click="showUserProfile">
                  <q-item-section> User Profile </q-item-section>
                </q-item>
                <q-item clickable @click="signOut">
                  <q-item-section> Logout </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          
        </div>

        <q-dialog v-model="showSignInDialog">
          <SignIn @close="closeSignInDialog" />
        </q-dialog>

      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="!drawer || miniState"
        @click.capture="drawerClick"
        :width="230"
        :breakpoint="500"
        elevated
        style="margin-top: 20px;"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding style="font-size: medium; font-weight: bold; color: #666262 ;" >
            <q-item clickable v-ripple style="margin-top: ;" 
            @click="$router.push('/dashboard')">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>


          <q-list>
            <q-expansion-item
            expand-separator
            icon="support_agent"
            label="Requests"
            
            default-opened>
            <q-item clickable v-ripple style="margin-left: 20px; color: #666262;"
            
            @click="$router.push('/newrequest')"  >
              <q-item-section avatar>
                <q-icon name="library_add" />
              </q-item-section>

              <q-item-section>
                New Request
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple style="margin-left: 20px;  color: #666262;"
            
            @click="$router.push('/requests')" >
              <q-item-section avatar>
                <q-icon name="preview" />
              </q-item-section>

              <q-item-section>
                View Requests
              </q-item-section>
            </q-item>
            </q-expansion-item>

          </q-list>

            <q-item clickable v-ripple style="margin-top: 10px;"
            @click="$router.push('/reports')" >
              <q-item-section avatar>
                <q-icon name="equalizer" />
              </q-item-section>

              <q-item-section>
                Reorts
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple style="margin-top: 10px;"
            @click="$router.push('/knowledge')" >
              <q-item-section avatar>
                <q-icon name="storage" />
              </q-item-section>

              <q-item-section>
                Knowledge Base
              </q-item-section>
            </q-item>
            <q-separator  style="margin-top: 10px;"/>


            
            <q-item clickable v-ripple style="margin-top: 10px;"
            @click="$router.push('/settings')" >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

  
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            icon="chevron_left"
            @click="miniState = true"
          style="background-color: #b90101; color:aliceblue;"
          />
        </div>
      </q-drawer>

   
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { route } from 'quasar/wrappers'
import { ref } from 'vue'
import SignIn from 'pages/SignIn.vue'
import { QDialog } from 'quasar'


export default {
  name: 'MyLayout',

  components: {
    SignIn
  },

  data() {
    return {
      userSignedIn: false,
      user: '',
      email: '',
      userAvatar: '',
      showUserProfileMenu: false,
    }
  },

  methods: {
    signOut() {
      this.userSignedIn = false;
      this.$router.push('/');

    } 
  },

  // created() {
  //   firebase.auth().onAuthStateChanged((auth) => {
  //     if (auth) {
  //       this.user = auth.displayName
  //       this.email = auth.email
  //       this.userAvatar = auth.profile
  //       this.userSignedIn = true
  //     } else {
  //       console.log('User name is null')
  //     }
  //   })
  // },

  setup() {
    const miniState = ref(false)
    const showSignInDialog = ref(false)

    const openSignInDialog = () => {
      showSignInDialog.value = true;
    }

    const closeSignInDialog = () => {
      showSignInDialog.value = false;
    }


    function toggleLeftDrawer() {
      drawer.value = !drawer.value
    }

    return {
      drawer: ref(false),
      miniState,
      openSignInDialog,
      showSignInDialog,
      closeSignInDialog,



    toggleLeftDrawer,


      drawerClick (e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation()
        }
      }}

    }
  }

</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>