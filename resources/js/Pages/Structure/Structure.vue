<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import {ref, h} from "vue";
import Network from '@/Pages/Structure/Partials/Network.vue';
import Listing from '@/Pages/Structure/Partials/Listing.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { wTrans } from 'laravel-vue-i18n';
import Empty from '@/Components/Empty.vue';

const props = defineProps({
    tab: Number,
})

const user = usePage().props.auth.user;
const showEmpty = ref(false); // State to control the visibility of Empty component

const tabs = ref([
        {
            title: wTrans('public.network'),
            component: h(Network)
        },
        {
            title: wTrans('public.listing'),
            component: h(Listing),
        }
]);

const activeIndex = ref(props.tab);
// Function to handle the noData event from the Network component
const handleNoData = () => {
  console.log('Handling noData event');
  showEmpty.value = true;
};

</script>

<template>
    <AuthenticatedLayout :title="$t('public.structure')">
        <div v-if="!showEmpty">
            <Tabs v-if="user.role === 'agent'" class="flex flex-col gap-5 self-stretch" v-model:value="activeIndex">
                <TabList>
                    <Tab v-for="(tab, index) in tabs" :key="tab.title" :value="index">
                        {{ $t(tab.title) }}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel v-for="(tab, index) in tabs" :key="tab.component" :value="index">
                        <component
                            v-if="index === 0" 
                            :is="tab.component" 
                            @noData="handleNoData" 
                        />
                        <!-- Render Listing component -->
                        <component 
                            v-else
                            :is="tab.component" 
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Network
                v-else
                @noData="handleNoData"
            />
        </div>
        <Empty v-else :title="$t('public.empty_downline_title')" :message="$t('public.empty_downline_message')">
            <template #image>
                <img src="/img/no_data/empty_downline.svg"  alt="" class="w-60 h-[180px]">
            </template>
        </Empty>
    </AuthenticatedLayout>
</template>
