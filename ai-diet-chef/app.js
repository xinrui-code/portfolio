// ===== AI 减脂厨师 - 核心逻辑 =====

const App = {
  ingredients: [],
  currentCategory: 'all',
  allRecipes: RECIPES,

  // 🔑 AI API 配置（获取免费 Key: https://platform.deepseek.com）
  AI_API_KEY: '',  // 面试演示时填入临时 Key，用完即删
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
    document.getElementById('btnMealPlan').addEventListener('click', () => {
      this.generateMealPlan()
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
    const hasIngredients = this.ingredients.length > 0
    const btn = document.getElementById('btnSearch')
    const originalText = btn.innerHTML
    btn.innerHTML = '<span class="sparkle">🤔</span> AI 思考中...'
    btn.disabled = true

    let results = []

    if (this.USE_AI) {
      // 🤖 优先用真实 AI
      try {
        results = await this.callAI(hasIngredients)
      } catch (e) {
        console.log('AI 调用失败，使用本地匹配:', e.message)
      }
    }

    // 如果 AI 没结果，用本地匹配/随机推荐
    if (results.length === 0) {
      results = hasIngredients ? this.matchRecipes() : this.randomRecipes()
    }

    this.renderResults(results)
    btn.innerHTML = originalText
    btn.disabled = false
  },

  // 🔥 调用 DeepSeek AI（通过 CORS 代理）
  async callAI(hasIngredients) {
    const categoryText = this.currentCategory === 'diet' ? '只推荐低脂减脂餐。' :
                          this.currentCategory === 'cheat' ? '只推荐放纵美食。' :
                          '减脂餐和放纵餐都可以推荐。'

    let userPrompt
    if (hasIngredients) {
      userPrompt = '我手头有这些食材：' + this.ingredients.join('、') + '。请根据这些食材推荐菜谱。'
    } else {
      userPrompt = '请随机推荐 5 道美味的' + (this.currentCategory === 'diet' ? '减脂餐' : this.currentCategory === 'cheat' ? '放纵美食' : '减脂餐和放纵餐') + '，不限制食材。'
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.AI_API_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'system',
          content: '你是专业健身减脂厨师。推荐 4-6 道菜。返回纯 JSON 数组，不要 markdown。每道菜格式：{"name":"菜名","category":"diet或cheat","calories":数字,"protein":数字,"carbs":数字,"fat":数字,"time":"烹饪时间","difficulty":"简单/中等/困难","ingredients":["食材1"],"steps":["步骤1"],"tags":["标签"]}。' + categoryText
        }, {
          role: 'user',
          content: userPrompt
        }],
        temperature: 0.9,
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

  // 🎲 一键随机推荐（无食材时）
  randomRecipes() {
    let pool = this.allRecipes
    if (this.currentCategory !== 'all') {
      pool = pool.filter(r => r.category === this.currentCategory)
    }
    // 随机打乱取 6 个
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6).map(r => ({ recipe: r, score: 50, matchedCount: 0 }))
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

  // 📅 一键生成今日三餐
  generateMealPlan() {
    const pool = this.currentCategory === 'all' ? this.allRecipes :
      this.allRecipes.filter(r => r.category === this.currentCategory)

    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    // 尽量选不同类型的：早餐、午餐、晚餐
    const breakfast = shuffled.find(r => r.tags.includes('早餐') || r.time.includes('5分钟') || r.time.includes('10分钟')) || shuffled[0]
    const lunch = shuffled.find(r => r !== breakfast && (r.tags.includes('高蛋白') || r.tags.includes('快手'))) || shuffled[1]
    const dinner = shuffled.find(r => r !== breakfast && r !== lunch && (r.tags.includes('低卡') || r.tags.includes('暖汤'))) || shuffled[2]

    const meals = [
      { type: '🌅 早餐', ...breakfast },
      { type: '🌞 午餐', ...lunch },
      { type: '🌆 晚餐', ...dinner }
    ]

    const grid = document.getElementById('resultsGrid')
    const header = document.getElementById('resultsHeader')
    const empty = document.getElementById('emptyState')

    empty.style.display = 'none'
    header.style.display = 'flex'
    document.getElementById('resultsCount').textContent = '📅 今日推荐菜单'

    grid.innerHTML = `
      <div class="mealplan-meals">
        ${meals.map((m, i) => `
          <div class="mealplan-card" onclick="App.openDetail(${m.id})" style="animation-delay:${i*0.1}s">
            <span class="mp-icon">${m.type.slice(0,2)}</span>
            <div class="mp-info">
              <div class="mp-meal-type">${m.type}</div>
              <div class="mp-name">${m.name}</div>
              <div class="mp-meta">🔥 ${m.calories}千卡 · 🥩 ${m.protein}g蛋白 · ⏱ ${m.time}</div>
            </div>
            <span class="mp-arrow">→</span>
          </div>
        `).join('')}
      </div>
      <div style="text-align:center;margin-top:8px;color:var(--text-muted);font-size:13px">
        总热量：${meals.reduce((s,m)=>s+m.calories,0)} 千卡 · 蛋白质：${meals.reduce((s,m)=>s+m.protein,0)}g
      </div>
    `
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' })
  },

  // 📖 沉浸式菜谱详情
  openDetail(id) {
    const recipe = this.allRecipes.find(r => r.id === id)
    if (!recipe) return

    const heroClass = recipe.category === 'cheat' ? 'cheat' : ''
    const overlay = document.createElement('div')
    overlay.className = 'detail-overlay'
    overlay.id = 'detailOverlay'
    overlay.innerHTML = `
      <div class="detail-hero ${heroClass}">
        <button class="detail-close" onclick="document.getElementById('detailOverlay').remove();document.body.style.overflow=''">✕</button>
        <div class="detail-name">${recipe.name}</div>
        <div class="detail-stats">
          <div class="detail-stat"><div class="ds-val">${recipe.calories}</div><div class="ds-label">🔥 千卡</div></div>
          <div class="detail-stat"><div class="ds-val">${recipe.protein}g</div><div class="ds-label">🥩 蛋白质</div></div>
          <div class="detail-stat"><div class="ds-val">${recipe.carbs}g</div><div class="ds-label">🍚 碳水</div></div>
          <div class="detail-stat"><div class="ds-val">${recipe.fat}g</div><div class="ds-label">🧈 脂肪</div></div>
          <div class="detail-stat"><div class="ds-val">${recipe.time}</div><div class="ds-label">⏱ 时间</div></div>
        </div>
      </div>
      <div class="detail-body">
        <h3>🛒 食材清单</h3>
        <div class="detail-ingredients">${recipe.ingredients.map(i => `<span class="detail-ing">${i}</span>`).join('')}</div>

        <h3>👨‍🍳 分步教程（共 ${recipe.steps.length} 步）</h3>
        ${recipe.steps.map((step, idx) => `
          <div class="detail-step">
            <span class="ds-num">${idx + 1}</span>
            <span class="ds-text">${step}</span>
          </div>
        `).join('')}

        <div class="detail-tags">
          ${recipe.tags.map(t => `<span class="detail-tag">#${t}</span>`).join('')}
          <span class="detail-tag">${recipe.difficulty}</span>
        </div>
      </div>`

    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    overlay.scrollTop = 0
  },

  closeModal() {
    const overlay = document.getElementById('detailOverlay')
    if (overlay) { overlay.remove(); document.body.style.overflow = '' }
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
