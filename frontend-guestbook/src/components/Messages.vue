<template>
  <div class="h-full w-full flex p-30 space-x-4">
    <form @submit.prevent="handleSubmit" class="form-container space-y-6" ref="formRef">
      <input type="text" name="name" placeholder="Name" required class="form-input" />
      <input type="text" name="message" placeholder="Message" required class="form-input" />
      <button type="submit" class="btn-submit">Send Message</button>
      <p v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</p>
    </form>

    <div class="messages-container">
      <div
        class="message-container mb-4"
        v-for="m in messages"
        :key="m._id"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
          <div class="text-left">
            <p class="text-sm text-gray-600">
              <span class="font-semibold text-[var(--color-text)]">Nom :</span> {{ m.name }}
            </p>
            <p class="text-base">
              <span class="font-semibold text-[var(--color-text)]">Message :</span> {{ m.message }}
            </p>
          </div>
          <div class="text-right text-sm text-gray-500 whitespace-nowrap">
            {{ new Date(m.createdAt).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessages, addMessage } from '../api/message' // addMessage à créer côté API

const messages = ref([])
const error = ref('')
const formRef = ref(null)

onMounted(async () => {
  messages.value = await getMessages()
})

async function handleSubmit() {
  error.value = ''
  const form = formRef.value
  if (!form) return

  const formData = new FormData(form)
  const name = formData.get('name')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  

  try {
    await addMessage( name, message )
    messages.value = await getMessages()
    form.reset()
  } catch (e) {
    console.log(e)
    error.value = e?.message || 'Internal Server Error'
  }
}
</script>
