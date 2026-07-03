// ===== AI 减脂厨师 - 核心逻辑 =====

const App = {
  ingredients: [],
  currentCategory: 'all',
  allRecipes: RECIPES,

  // 🔑 AI API 配置（获取免费 Key: https://platform.deepseek.com）
  AI_API_KEY: 'sk-b16c2b79d9e04a829dddef4259582bd9',
  AI_API_URL: 'https://api.deepseek.com/v1/chat/completions',
  USE_AI: false,   // 是否启用 AI（有 Key 自动启用）

  init() {
    // 如果有 API Key 则启用 AI
    if (this.AI_API_KEY) {
      this.USE_AI = true
      console.log('🤖 AI 模式已启用')
    }
    this.bindEvents()
    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => this.addIngredient(chip.dataset.ingredient))
    })
  },

  bindEvents() {
    const input = document.getElementById('ingredientInput')
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.addIngredient(input.value.trim())
      }
    })

    document.getElementById('btnAdd').addEventListener('click', () => {
      this.addIngredient(input.value.trim())
    })

    document.getElementById('btnSearch').addEventListener('click', () => {
      this.search()
    })

    document.querySelectorAll('.pref-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pref-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        this.currentCategory = btn.dataset.category
        if (this.ingredients.length > 0) this.search()
      })
    })

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeModal()
    })
  },

  addIngredient(name) {
    if (!name) return
    const names = name.split(/[,，、\s]+/).filter(n => n.length > 0)
    names.forEach(n => {
      if (this.ingredients.includes(n)) return
      if (n.length < 1) return
      this.ingredients.push(n)
    })
    document.getElementById('ingredientInput').value = ''
    this.renderTags()
  },

  removeIngredient(name) {
    this.ingredients = this.ingredients.filter(i => i !== name)
    this.renderTags()
    if (this.ingredients.length === 0) this.clearResults()
  },

  renderTags() {
    const area = document.getElementById('tagsArea')
    area.innerHTML = this.ingredients.map(name => `
      <span class="tag">
        ${name}
        <span class="tag-remove" data-name="${name}">✕</span>
      </span>
    `).join('')
    area.querySelectorAll('.tag-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.removeIngredient(btn.dataset.name)
      })
    })
  },

  async search() {
    if (this.ingredients.length === 0) {
      this.showToast('请先添加食材哦~')
      return
    }
    const btn = document.getElementById('btnSearch')
    const originalText = btn.innerHTML
    btn.innerHTML = '<span class="sparkle">🤔</span> AI 思考中...'
    btn.disabled = true

    let results = []

    if (this.USE_AI) {
      // 🤖 优先用真实 AI
      try {
        results = await this.callAI()
      } catch (e) {
        console.log('AI 调用失败，使用本地匹配:', e.message)
      }
    }

    // 如果 AI 没结果，用本地匹配
    if (results.length === 0) {
      results = this.matchRecipes()
    }

    this.renderResults(results)
    btn.innerHTML = originalText
    btn.disabled = false
  },

  // 🔥 调用 DeepSeek AI
  async callAI() {
    const preference = this.currentCategory === 'diet' ? '只推荐低脂减脂餐。' :
                       this.currentCategory === 'cheat' ? '只推荐放纵美食。' :
                       '减脂餐和放纵餐都可以推荐。'

    const response = await fetch(this.AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.AI_API_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'system',
          content: '你是专业健身减脂厨师。用户告诉你手头食材，你推荐 3-5 道菜。返回纯 JSON 数组，不要 markdown。每道菜格式：{"name":"菜名","category":"diet或cheat","calories":数字,"protein":数字,"carbs":数字,"fat":数字,"time":"烹饪时间","difficulty":"简单/中等/困难","ingredients":["食材1","食材2"],"steps":["步骤1","步骤2"],"tags":["标签"]}。' + preference
        }, {
          role: 'user',
          content: '我手头有这些食材：' + this.ingredients.join('、')
        }],
        temperature: 0.8,
        max_tokens: 2000
      })
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    // 解析 AI 返回的 JSON
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```/g, '').trim()
    const recipes = JSON.parse(jsonStr)

    // 给每个菜谱一个临时 ID
    return recipes.map((r, i) => ({
      recipe: { ...r, id: 'ai-' + i },
      score: 100,
      matchedCount: r.ingredients.length
    }))
  },

  matchRecipes() {
    const scored = this.allRecipes.map(recipe => {
      let score = 0
      const userIngredients = this.ingredients.map(i => i.toLowerCase())
      const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase())

      userIngredients.forEach(ui => {
        recipeIngredients.forEach(ri => {
          if (ri.includes(ui) || ui.includes(ri)) score += 10
        })
      })

      userIngredients.forEach(ui => {
        recipeIngredients.forEach(ri => {
          if (ui.length >= 2 && ri.length >= 2) {
            if (ri.includes(ui.slice(0, 2)) || ui.includes(ri.slice(0, 2))) score += 3
          }
        })
      })

      const matchedCount = recipeIngredients.filter(ri =>
        userIngredients.some(ui => ri.includes(ui) || ui.includes(ri))
      ).length

      if (matchedCount > 0) {
        score += (matchedCount / recipeIngredients.length) * 15
      }

      if (this.currentCategory !== 'all' && recipe.category !== this.currentCategory) {
        score = -1
      }

      return { recipe, score, matchedCount }
    })

    return scored.filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 6)
  },

  renderResults(results) {
    const grid = document.getElementById('resultsGrid')
    const header = document.getElementById('resultsHeader')
    const empty = document.getElementById('emptyState')
    const countEl = document.getElementById('resultsCount')

    if (results.length === 0) {
      grid.innerHTML = `<div class="no-results"><div class="nr-icon">🔍</div><div class="nr-title">没有找到匹配的菜谱</div><div class="nr-desc">试试换个食材组合？比如「鸡蛋+番茄」</div></div>`
      header.style.display = 'none'
      empty.style.display = 'none'
      return
    }

    empty.style.display = 'none'
    header.style.display = 'flex'
    countEl.textContent = `🎯 为你找到 ${results.length} 个推荐`

    grid.innerHTML = results.map(({ recipe }) => {
      const categoryLabel = recipe.category === 'diet' ? '🥗 减脂' : '🍕 放纵'
      const ingredientTags = recipe.ingredients.map(ing => {
        const isMatched = this.ingredients.some(ui =>
          ing.toLowerCase().includes(ui.toLowerCase()) || ui.toLowerCase().includes(ing.toLowerCase())
        )
        return `<span class="card-ingredient ${isMatched ? 'matched' : ''}">${ing}</span>`
      }).join('')

      return `<div class="recipe-card" data-id="${recipe.id}" onclick="App.openDetail(${recipe.id})">
          <div class="card-top">
            <span class="card-name">${recipe.name}</span>
            <span class="card-category ${recipe.category}">${categoryLabel}</span>
          </div>
          <div class="card-meta">
            <span>🔥 ${recipe.calories} 千卡</span>
            <span>🥩 ${recipe.protein}g 蛋白</span>
            <span>⏱ ${recipe.time}</span>
            <span>📊 ${recipe.difficulty}</span>
          </div>
          <div class="card-ingredients">${ingredientTags}</div>
          <div class="card-tags">${recipe.tags.map(t => `<span class="card-tag">#${t}</span>`).join('')}</div>
        </div>`
    }).join('')

    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' })
  },

  clearResults() {
    document.getElementById('resultsGrid').innerHTML = ''
    document.getElementById('resultsHeader').style.display = 'none'
    document.getElementById('emptyState').style.display = ''
  },

  openDetail(id) {
    const recipe = this.allRecipes.find(r => r.id === id)
    if (!recipe) return

    const modal = document.getElementById('modalOverlay')
    const content = document.getElementById('modalContent')

    content.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-name">${recipe.name}</div>
      <div class="modal-meta">
        <div class="modal-stat"><div class="stat-val">${recipe.calories}</div><div class="stat-label">🔥 千卡</div></div>
        <div class="modal-stat"><div class="stat-val">${recipe.protein}g</div><div class="stat-label">🥩 蛋白质</div></div>
        <div class="modal-stat"><div class="stat-val">${recipe.carbs}g</div><div class="stat-label">🍚 碳水</div></div>
        <div class="modal-stat"><div class="stat-val">${recipe.fat}g</div><div class="stat-label">🧈 脂肪</div></div>
        <div class="modal-stat"><div class="stat-val">${recipe.time}</div><div class="stat-label">⏱ 时间</div></div>
      </div>
      <div class="modal-section">
        <h3>🛒 食材清单</h3>
        <div class="modal-ingredients">${recipe.ingredients.map(i => `<span class="modal-ingredient">${i}</span>`).join('')}</div>
      </div>
      <div class="modal-section">
        <h3>👨‍🍳 做法步骤</h3>
        <div class="modal-steps">${recipe.steps.map((step, idx) => `
          <div class="modal-step"><span class="step-num">${idx + 1}</span><span class="step-text">${step}</span></div>
        `).join('')}</div>
      </div>
      <button class="modal-close" onclick="App.closeModal()">关闭</button>`

    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  },

  closeModal() {
    document.getElementById('modalOverlay').style.display = 'none'
    document.body.style.overflow = ''
  },

  showToast(msg) {
    const toast = document.createElement('div')
    toast.textContent = msg
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:24px;font-size:14px;z-index:9999;'
    document.body.appendChild(toast)
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300) }, 2000)
  }
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', () => App.init())
