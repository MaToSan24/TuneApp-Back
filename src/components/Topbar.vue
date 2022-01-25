<template>
	<div class="layout-topbar">

        <router-link to="/" class="layout-topbar-logo mr-3">
            <img alt="Rose Logo" :src="RoseLogo" />
            <span class="mr-3">ROSE</span>
            <img alt="Wecaremed Logo" :src="WecaremedLogo" class="ml-2" />

        </router-link>
        
        <InputSwitch id="appMode" v-model="toggleValue" @click="toggleView" />
        <label id="app-mode-label" for="appMode">{{appModeText}} use mode</label>
        
        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <span>Logged in as Example User</span>
                <button class="p-link layout-topbar-button user-button" @click="toggleMenu">
                    <i class="pi pi-user"></i>
                </button>
            </li>

            <Menu ref="menu" :model="overlayMenuItems" :popup="true" />

            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Are you sure you want to log out?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info"/>
                    <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text p-button-info" autofocus />
                </template>
            </Dialog>
        </ul>

	</div>

</template>

<script>
import RoseLogo from '@/assets/ROSE Logo.png'
import WecaremedLogo from '@/assets/Wecaremed Logo.png'
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import { mapState, mapActions } from 'vuex'
import Badge from 'primevue/badge'

export default {
    components: {
        Menu,
        Dialog,
        Button,
        InputSwitch,
        Badge
    },
    props: ['projectInfo'],
    data() {
        return {
            RoseLogo: RoseLogo,
            WecaremedLogo: WecaremedLogo,
            displayConfirmation: false,
            overlayMenuItems: [
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () => {this.openConfirmation()}
                },
            ],
        }
    },
    methods: {
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
        openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
        ...mapActions([
        "toggleView"
        ]),
        // calculateCF() {
        //     this.axios.put(`/projects/calculateCF/${this.$route.params.id}`)
        //     .then((response) => {
        //         // this.project = response.data;
        //         console.log(response.data)
        //     })
        //     .catch((e)=>{
        //         console.log('error' + e);
        //     })
        // },
        getTextColorFromCFIndex(cfIndex) {
            if (cfIndex < 3)
                return "success"
            else if (cfIndex > 3 & cfIndex < 5)
                return "warning"
            else
                return "danger"
        }
    },
    computed: {
        ...mapState([
            'toggleValue', 'appModeText'
        ])
    }
}
</script>

<style>
    #app-mode-label {
        margin-left: 0.75rem;
        line-height: 1;
    }
</style>

<style scoped>
    h1 {
        font-size: 3rem;
    }
</style>