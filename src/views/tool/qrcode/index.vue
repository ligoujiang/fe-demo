<template>
  <main class="qr-page">
    <section class="qr-panel qr-settings" aria-labelledby="qr-title">
      <div class="page-heading">
        <h1 id="qr-title">二维码生成器</h1>
      </div>

      <label class="field field-textarea">
        <span>内容</span>
        <textarea
          v-model="qrValue"
          maxlength="800"
          rows="7"
          placeholder="输入网址、文本、联系方式等内容"
        ></textarea>
      </label>

      <div class="form-grid">
        <label class="field">
          <span>尺寸</span>
          <input v-model.number="size" min="160" max="420" step="20" type="range" />
          <output>{{ size }} px</output>
        </label>

        <label class="field">
          <span>边距</span>
          <input v-model.number="margin" min="0" max="8" step="1" type="range" />
          <output>{{ margin }}</output>
        </label>

        <label class="field">
          <span>前景色</span>
          <input v-model="foreground" type="color" />
        </label>

        <label class="field">
          <span>背景色</span>
          <input v-model="background" type="color" />
        </label>
      </div>

      <div class="control-row">
        <fieldset class="segmented-control">
          <legend>纠错等级</legend>
          <label v-for="option in levelOptions" :key="option.value">
            <input v-model="level" :value="option.value" type="radio" name="level" />
            <span>{{ option.label }}</span>
          </label>
        </fieldset>

        <fieldset class="segmented-control">
          <legend>渲染</legend>
          <label v-for="option in renderOptions" :key="option.value">
            <input v-model="renderAs" :value="option.value" type="radio" name="renderAs" />
            <span>{{ option.label }}</span>
          </label>
        </fieldset>
      </div>
    </section>

    <section class="qr-panel qr-preview" aria-label="二维码预览">
      <div class="preview-header">
        <div>
          <p>预览</p>
          <h2>{{ hasContent ? '实时生成' : '等待输入' }}</h2>
        </div>
        <button
          class="download-button"
          type="button"
          :disabled="!hasContent"
          @click="downloadQrCode"
        >
          下载二维码
        </button>
      </div>

      <div ref="previewRef" class="preview-stage" :class="{ empty: !hasContent }">
        <QrcodeVue
          v-if="hasContent"
          id="qr-code-preview"
          :value="trimmedValue"
          :size="size"
          :level="level"
          :margin="margin"
          :foreground="foreground"
          :background="background"
          :render-as="renderAs"
        />
        <p v-else>输入内容后生成二维码</p>
      </div>

      <dl class="meta-list">
        <div>
          <dt>字符数</dt>
          <dd>{{ qrValue.length }}/800</dd>
        </div>
        <div>
          <dt>格式</dt>
          <dd>{{ renderAs.toUpperCase() }}</dd>
        </div>
        <div>
          <dt>纠错</dt>
          <dd>{{ level }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import QrcodeVue, { type Level, type RenderAs } from 'qrcode.vue'

type Choice<T extends string> = {
  label: string
  value: T
}

const qrValue = ref('https://example.com')
const size = ref(240)
const margin = ref(2)
const foreground = ref('#111827')
const background = ref('#ffffff')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('canvas')
const previewRef = ref<HTMLElement | null>(null)

const levelOptions: Choice<Level>[] = [
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'Q', value: 'Q' },
  { label: 'H', value: 'H' },
]

const renderOptions: Choice<RenderAs>[] = [
  { label: 'Canvas', value: 'canvas' },
  { label: 'SVG', value: 'svg' },
]

const trimmedValue = computed(() => qrValue.value.trim())
const hasContent = computed(() => trimmedValue.value.length > 0)

const downloadQrCode = () => {
  if (!hasContent.value || !previewRef.value) return

  const filename = `qrcode-${Date.now()}.${renderAs.value === 'canvas' ? 'png' : 'svg'}`

  if (renderAs.value === 'canvas') {
    const canvas = previewRef.value.querySelector('canvas')
    if (!canvas) return

    triggerDownload(canvas.toDataURL('image/png'), filename)
    return
  }

  const svg = previewRef.value.querySelector('svg')
  if (!svg) return

  const svgSource = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([svgSource], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

const triggerDownload = (url: string, filename: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}
</script>

<style scoped>
.qr-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(320px, 520px);
  gap: 24px;
  padding: 40px;
  background:
    linear-gradient(135deg, rgba(235, 241, 248, 0.92), rgba(247, 248, 250, 0.94)), #f4f7fb;
  color: #172033;
}

.qr-panel {
  border: 1px solid #dbe3ee;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 50px rgba(31, 45, 61, 0.08);
}

.qr-settings {
  padding: 28px;
}

.page-heading {
  margin-bottom: 24px;
}

.page-heading p,
.preview-header p {
  margin: 0 0 6px;
  color: #5b6b80;
  font-size: 14px;
}

.page-heading h1,
.preview-header h2 {
  margin: 0;
  color: #101827;
  font-size: 28px;
  line-height: 1.2;
}

.field {
  display: grid;
  gap: 10px;
  min-width: 0;
  color: #243145;
  font-size: 14px;
  font-weight: 600;
}

.field textarea,
.field input[type='range'] {
  width: 100%;
}

.field textarea {
  resize: vertical;
  min-height: 150px;
  border: 1px solid #cbd6e2;
  border-radius: 8px;
  padding: 14px;
  color: #172033;
  font: inherit;
  font-weight: 400;
  line-height: 1.6;
  background: #ffffff;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.field textarea:focus {
  border-color: #3178c6;
  box-shadow: 0 0 0 3px rgba(49, 120, 198, 0.14);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.field output {
  color: #5b6b80;
  font-weight: 500;
}

.field input[type='color'] {
  width: 64px;
  height: 40px;
  border: 1px solid #cbd6e2;
  border-radius: 8px;
  padding: 4px;
  background: #ffffff;
  cursor: pointer;
}

.control-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.segmented-control {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  border: 0;
  padding: 0;
  min-inline-size: 0;
}

.segmented-control legend {
  width: 100%;
  margin-bottom: 10px;
  color: #243145;
  font-size: 14px;
  font-weight: 600;
}

.segmented-control label {
  cursor: pointer;
}

.segmented-control input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.segmented-control span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  height: 38px;
  border: 1px solid #cbd6e2;
  border-radius: 8px;
  padding: 0 14px;
  color: #34445a;
  background: #ffffff;
  font-size: 14px;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.segmented-control input:checked + span {
  border-color: #3178c6;
  color: #ffffff;
  background: #3178c6;
}

.qr-preview {
  display: flex;
  flex-direction: column;
  padding: 28px;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.download-button {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  padding: 0 18px;
  color: #ffffff;
  background: #1f7a5f;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;
}

.download-button:hover:not(:disabled) {
  background: #176348;
}

.download-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.preview-stage {
  flex: 1;
  min-height: 360px;
  display: grid;
  place-items: center;
  border: 1px dashed #c4cfdb;
  border-radius: 8px;
  padding: 28px;
  background:
    linear-gradient(45deg, #f6f8fb 25%, transparent 25%),
    linear-gradient(-45deg, #f6f8fb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f6f8fb 75%),
    linear-gradient(-45deg, transparent 75%, #f6f8fb 75%), #ffffff;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0;
  background-size: 20px 20px;
}

.preview-stage.empty {
  color: #6b7a90;
  background: #f8fafc;
}

.preview-stage :deep(canvas),
.preview-stage :deep(svg) {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 16px 36px rgba(31, 45, 61, 0.14);
}

.meta-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 22px 0 0;
}

.meta-list div {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  background: #fbfdff;
}

.meta-list dt {
  color: #6b7a90;
  font-size: 12px;
}

.meta-list dd {
  margin: 4px 0 0;
  color: #172033;
  font-size: 16px;
  font-weight: 700;
}

@media (max-width: 860px) {
  .qr-page {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .preview-stage {
    min-height: 300px;
  }
}

@media (max-width: 560px) {
  .qr-settings,
  .qr-preview {
    padding: 20px;
  }

  .form-grid,
  .control-row,
  .meta-list {
    grid-template-columns: 1fr;
  }

  .preview-header {
    align-items: stretch;
    flex-direction: column;
  }

  .download-button {
    width: 100%;
  }
}
</style>
