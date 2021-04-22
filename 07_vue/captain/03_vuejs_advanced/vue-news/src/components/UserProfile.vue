<template>
  <div>
    <div class="user-container">
      <div>
        <i class="fas fa-user"></i>
      </div>
      <div class="user-description">
        <slot name="username">
          <!-- 상위 컴포넌트에서 정의할 영역 -->
        </slot>
        <div class="time">
          <slot name="time">
            <!-- 상위 컴포넌트에서 정의할 영역 -->
          </slot>
          <slot name="karma">
            <!-- 상위 컴포넌트에서 정의할 영역 -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
}
</script>

<style scoped>
  .user-container {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }

  .fa-user {
    font-size: 2.5rem;
  }

  .user-description {
    padding-left: 8px;
  }

  .time {
    font-size: 0.7rem;
  }
</style>