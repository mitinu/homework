<template>
  <transition name="fade">
    <div v-if="visible" class="alert" :class="`alert--${type}`">
      <div class="alert__content">
        <span class="alert__icon">
          <svg v-if="type === 'error'" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </span>
        <div class="alert__message">{{ message }}</div>
      </div>
      <button class="alert__close" @click="close">
        &times;
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'alertComponents',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'error', // 'error' или 'success'
      validator: value => ['error', 'success'].includes(value)
    },
    timeout: {
      type: Number,
      default: 5000 // Автоматическое закрытие через 5 сек
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.visible = true
    if (this.timeout > 0) {
      setTimeout(() => {
        this.close()
      }, this.timeout)
    }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.alert--error {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  color: #d32f2f;
}

.alert--success {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  color: #2e7d32;
}

.alert__content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert__icon {
  display: flex;
}

.alert__message {
  flex: 1;
}

.alert__close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  margin-left: 16px;
}

.alert__close:hover {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>