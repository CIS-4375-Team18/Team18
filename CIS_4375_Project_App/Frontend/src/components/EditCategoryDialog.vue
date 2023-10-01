<template>
    <q-dialog v-model="showCategoryDialog" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Update Category</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input label="Category Name" dense v-model="category" autofocus />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-toggle
                    label="Status"
                    v-model="isCategoryActive"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    left-label
                />
                <span v-if="isCategoryActive">ACTIVE</span>
                <span v-if="!isCategoryActive">INACTIVE</span>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click="closeDialog" />
                <q-btn color="blue" label="Save" @click="saveChanges" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    data() {
        return {
            categoryId: 0,
            showCategoryDialog: true,
            category: '',
            isCategoryActive: true,
        };
    },
    props: {
        // category id
        id: Number,
        // category name
        name: String, 
        // category active status
        isActive: Boolean,
    },
    created() {
        this.categoryId = this.id;
        this.category = this.name;
        this.isCategoryActive = this.isActive;
    },
    methods: {
        closeDialog() {
            // hide dialog
            this.showCategoryDialog = false;
            // notify parent component to close dialog
            this.$emit("close-dialog", false);
        },
        saveChanges() {
            // notify parent to save dialog with the following values
            this.$emit("save-dialog", {
                TICKET_CATEGORY_ID: this.categoryId,
                TICKET_CATEGORY_DESC: this.category,
                ACTIVE_STATUS_ID: this.isCategoryActive ? 1 : 2, // 1 is active, 2 is inactive
                ACTIVE_STATUS_DESC: this.isCategoryActive ? "ACTIVE" : "INACTIVE",
            });
        },
  },
};
</script>
