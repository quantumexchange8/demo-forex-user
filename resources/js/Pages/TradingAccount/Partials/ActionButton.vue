<script setup>
import Button from "@/Components/Button.vue";
import { SwitchHorizontal01Icon } from "@/Components/Icons/outline";
import { IconInfoOctagonFilled } from '@tabler/icons-vue';
import {computed, ref} from 'vue';
import { useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Select from "primevue/select";
import IconField from 'primevue/iconfield';
import axios from 'axios';
import InputNumber from "primevue/inputnumber";

const props = defineProps({
    account: Object,
});

const showDepositDialog = ref(false);
const showTransferDialog = ref(false);
const transferOptions = ref([]);
const selectedAccount = ref(0);

const getOptions = async () => {
    try {
        const response = await axios.get('/account/getOptions');
        transferOptions.value = response.data.transferOptions;
    } catch (error) {
        console.error('Error changing locale:', error);
    }
};

getOptions();

// Computed property to exclude 'meta_login' from account.meta_login
const filteredTransferOptions = computed(() => {
    if (!transferOptions.value.length) {
        return [];
    }

    return transferOptions.value.filter(option => option.name !== props.account.meta_login);
});

const openDialog = (dialogRef) => {
    if (dialogRef === 'deposit') {
        showDepositDialog.value = true;
    } else if (dialogRef === 'transfer') {
        showTransferDialog.value = true;
    }
}

const closeDialog = (dialogName) => {
    if (dialogName === 'deposit') {
        showDepositDialog.value = false;
        depositForm.reset();
    } else if (dialogName === 'transfer') {
        showTransferDialog.value = false;
        transferForm.reset();
    }
}

const depositForm = useForm({
    meta_login: props.account.meta_login,
});

const transferForm = useForm({
    account_id: props.account.id,
    to_meta_login: '',
    amount: 0,
});

const toggleFullAmount = () => {
    if (transferForm.amount) {
        transferForm.amount = 0;
    } else {
        transferForm.amount = Number(props.account.balance);
    }
};

const submitForm = (formType) => {
    if (formType === 'deposit') {
        depositForm.post(route('account.deposit_to_account'), {
            onSuccess: () => closeDialog('deposit'),
        });
    } else if (formType === 'transfer') {
        transferForm.to_meta_login = selectedAccount.value.name;
        transferForm.post(route('account.internal_transfer'), {
            onSuccess: () => closeDialog('transfer'),
        });
    }
}
</script>

<template>
    <Button
        type="button"
        variant="gray-outlined"
        size="sm"
        class="w-full"
        @click="openDialog('deposit')"
        :disabled="account.status === 'pending'"
    >
        {{ $t('public.deposit') }}
    </Button>
    <Button
        type="button"
        variant="gray-outlined"
        size="sm"
        pill
        iconOnly
        @click="openDialog('transfer')"
        :disabled="account.status === 'pending'"
    >
        <SwitchHorizontal01Icon class="w-4 text-gray-950" />
    </Button>

    <Dialog v-model:visible="showDepositDialog" :header="$t('public.deposit')" modal class="dialog-xs sm:dialog-sm">
        <div class="flex flex-col items-center gap-8 self-stretch">
            <div class="flex flex-col justify-center items-center py-4 px-8 gap-2 self-stretch bg-gray-200">
                <span class="text-gray-500 text-center text-xs font-medium">#{{ props.account.meta_login }} - {{ $t('public.current_account_balance') }}</span>
                <span class="text-gray-950 text-center text-xl font-semibold">$ {{ props.account.balance }}</span>
            </div>
            <div class="flex flex-col items-center self-stretch">
                <div class="h-2 self-stretch bg-info-500"></div>
                <div class="flex justify-center items-start py-3 gap-3 self-stretch">
                    <div class="text-info-500">
                        <IconInfoOctagonFilled size="20" stroke-width="1.25" />
                    </div>
                    <div class="flex flex-col items-start gap-1 flex-grow">
                        <span class="self-stretch text-gray-950 text-sm font-semibold">{{ $t('public.deposit_info_header') }}</span>
                        <span class="self-stretch text-gray-500 text-xs">
                            {{ $t('public.deposit_info_message') }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center pt-5 gap-4 self-stretch sm:pt-7">
            <Button type="button" variant="primary-flat" @click.prevent="submitForm('deposit')">{{ $t('public.deposit_now') }}</Button>
        </div>
    </Dialog>

    <Dialog v-model:visible="showTransferDialog" :header="$t('public.transfer')" modal class="dialog-xs sm:dialog-sm">
        <form @submit.prevent="submitForm('transfer')">
            <div class="flex flex-col items-center gap-5 self-stretch">
                <div class="flex flex-col justify-center items-center py-4 px-8 gap-2 self-stretch bg-gray-200">
                    <span class="text-gray-500 text-center text-xs font-medium">#{{ props.account.meta_login }} - {{ $t('public.current_account_balance') }}</span>
                    <span class="text-gray-950 text-center text-xl font-semibold">$ {{ props.account.balance }}</span>
                </div>
                <div class="flex flex-col items-start gap-1 self-stretch">
                    <InputLabel for="to_meta_login" :value="$t('public.transfer_to')" />
                    <Select
                        v-model="selectedAccount"
                        :options="filteredTransferOptions"
                        optionLabel="name"
                        :placeholder="$t('public.transfer_to_placeholder')"
                        class="w-full"
                        scroll-height="236px"
                        :disabled="!filteredTransferOptions.length"
                    />
                    <span class="self-stretch text-gray-500 text-xs">{{ $t('public.balance') }}: $ {{ selectedAccount ? selectedAccount.value : selectedAccount }}</span>
                    <InputError :message="transferForm.errors.to_meta_login" />
                </div>

                <div class="flex flex-col items-start gap-1 self-stretch">
                    <InputLabel for="amount" :value="$t('public.amount')" />
                    <div class="relative w-full">
                        <InputNumber
                            v-model="transferForm.amount"
                            inputId="currency-us"
                            prefix="$ "
                            class="w-full"
                            inputClass="py-3 px-4"
                            :min="0"
                            :step="100"
                            :minFractionDigits="2"
                            fluid
                            autofocus
                            :invalid="!!transferForm.errors.amount"
                        />
                        <div
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm font-semibold"
                            :class="{
                                    'text-primary-500': !transferForm.amount,
                                    'text-error-500': transferForm.amount,
                                }"
                            @click="toggleFullAmount"
                        >
                            {{ transferForm.amount ? $t('public.clear') : $t('public.full_amount') }}
                        </div>
                    </div>
                    <InputError :message="transferForm.errors.amount" />
                </div>
            </div>
            <div class="flex justify-end items-center pt-5 gap-4 self-stretch sm:pt-7">
                <Button
                    type="button"
                    variant="gray-tonal"
                    class="w-full sm:w-[120px]"
                    @click.prevent="closeDialog('transfer')"
                >
                    {{ $t('public.cancel') }}
                </Button>
                <Button
                    variant="primary-flat"
                    class="w-full sm:w-[120px]"
                    @click.prevent="submitForm('transfer')"
                    :disabled="depositForm.processing || transferForm.processing"
                >
                    {{ $t('public.confirm') }}
                </Button>
            </div>
        </form>
    </Dialog>
</template>
