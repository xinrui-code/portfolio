// ===== AI 减脂厨师 - 核心逻辑 =====

const App = {
  ingredients: [],
  currentCategory: 'all',
  allRecipes: RECIPES,

  init() {
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

  search() {
    if (this.ingredients.length === 0) {
      this.showToast('请先添加食材哦~')
      return
    }
    const btn = document.getElementById('btnSearch')
    const originalText = btn.innerHTML
    btn.innerHTML = '<span class="sparkle">🤔</span> AI 思考中...'
    btn.disabled = true

    setTimeout(() => {
      const results = this.matchRecipes()
      this.renderResults(results)
      btn.innerHTML = originalText
      btn.disabled = false
    }, 500)
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

// ===== AI API 接口预留 =====
// 未来接入真实 AI (DeepSeek/OpenAI) 只需取消注释并填入 API Key
// async function callAIChef(ingredients, preference) {
//   const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
//     body: JSON.stringify({
//       model: 'deepseek-chat',
//       messages: [{
//         role: 'system',
//         content: '你是专业健身减脂厨师。根据用户食材推荐 3 道菜，包含菜名、热量、三大营养素、做法步骤。' + (preference === 'diet' ? '只推荐减脂餐。' : preference === 'cheat' ? '只推荐放纵美食。' : '')
//       }, { role: 'user', content: '我有：' + ingredients.join('、') }],
//       temperature: 0.7
//     })
//   })
//   const data = await response.json()
//   return data.choices[0].message.content
// }

document.addEventListener('DOMContentLoaded', () => App.init())
