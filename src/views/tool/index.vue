<script setup lang="ts">
type ToolItem = {
  title: string
  description: string
  path: string
  icon: string
  status?: string
}

const tools: ToolItem[] = [
  {
    title: '二维码生成器',
    description: '生成可下载的二维码，支持尺寸、边距、颜色和渲染格式调整。',
    path: '/tool/qrcode',
    icon: 'QR',
    status: '常用',
  },
]
</script>

<template>
  <main class="tool-page">
    <section class="tool-header" aria-labelledby="tool-title">
      <p>Tools</p>
      <h1 id="tool-title">工具箱</h1>
      <span>选择一个工具开始使用，后续新增工具只需补充入口配置。</span>
    </section>

    <section class="tool-grid" aria-label="工具列表">
      <RouterLink v-for="tool in tools" :key="tool.path" class="tool-card" :to="tool.path">
        <span class="tool-icon" aria-hidden="true">{{ tool.icon }}</span>
        <span class="tool-content">
          <span class="tool-title-row">
            <strong>{{ tool.title }}</strong>
            <em v-if="tool.status">{{ tool.status }}</em>
          </span>
          <span>{{ tool.description }}</span>
        </span>
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.tool-page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 40px;
  background: #f4f7fb;
  color: #172033;
}

.tool-header {
  max-width: 920px;
  margin: 0 auto 24px;
}

.tool-header p {
  margin: 0 0 8px;
  color: #5b6b80;
  font-size: 14px;
  font-weight: 700;
}

.tool-header h1 {
  margin: 0;
  color: #101827;
  font-size: 30px;
  line-height: 1.2;
}

.tool-header span {
  display: block;
  margin-top: 10px;
  color: #5b6b80;
  font-size: 15px;
  line-height: 1.7;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  max-width: 920px;
  margin: 0 auto;
}

.tool-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  min-width: 0;
  border: 1px solid #dbe3ee;
  border-radius: 8px;
  padding: 18px;
  color: inherit;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  box-shadow: 0 12px 30px rgba(31, 45, 61, 0.06);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.tool-card:hover,
.tool-card:focus-visible {
  border-color: #3178c6;
  box-shadow: 0 16px 36px rgba(31, 45, 61, 0.1);
  transform: translateY(-2px);
}

.tool-card:focus-visible {
  outline: 3px solid rgba(49, 120, 198, 0.18);
  outline-offset: 2px;
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  color: #ffffff;
  background: #3178c6;
  font-size: 16px;
  font-weight: 800;
}

.tool-content {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.tool-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.tool-title-row strong {
  min-width: 0;
  color: #172033;
  font-size: 17px;
  line-height: 1.35;
}

.tool-title-row em {
  flex: none;
  border: 1px solid #cbd6e2;
  border-radius: 999px;
  padding: 2px 8px;
  color: #406078;
  background: #f8fafc;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.tool-content > span:last-child {
  color: #5b6b80;
  font-size: 14px;
  line-height: 1.65;
}

@media (max-width: 560px) {
  .tool-page {
    padding: 20px;
  }

  .tool-header {
    margin-bottom: 18px;
  }

  .tool-header h1 {
    font-size: 26px;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;
    padding: 16px;
  }

  .tool-icon {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }

  .tool-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
