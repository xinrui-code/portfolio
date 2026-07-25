// ===== AI 减脂厨师 - 核心逻辑 =====
const App = {
  ingredients: [], currentCategory: 'all', allRecipes: RECIPES,
  profile: { gender:'male', age:null, height:null, weight:null, targetCal:null },

  // 👤 填档案算热量
  setGender(g, el) {
    this.profile.gender = g
    document.querySelectorAll('.pf-radio').forEach(b => b.classList.remove('active'))
    el.classList.add('active')
    this.refreshProfile()
  },

  refreshProfile() {
    const age = parseInt(document.getElementById('pfAge').value)
    const height = parseInt(document.getElementById('pfHeight').value)
    const weight = parseInt(document.getElementById('pfWeight').value)
    this.profile.age = age; this.profile.height = height; this.profile.weight = weight

    if (age && height && weight) {
      // Mifflin-St Jeor
      let bmr = this.profile.gender === 'male'
        ? 10*weight + 6.25*height - 5*age + 5
        : 10*weight + 6.25*height - 5*age - 161
      const tdee = Math.round(bmr * 1.55) // 中等活动量
      const cutCal = Math.round(tdee - 400) // 减脂缺口

      let bmi = Math.round(weight/(height/100)**2 * 10)/10
      let suggestion = bmi < 18.5 ? '偏瘦，建议增肌' : bmi < 24 ? '标准，保持即可' : bmi < 28 ? '偏胖，建议减脂' : '肥胖，急需减脂'

      this.profile.targetCal = cutCal
      document.getElementById('pfResult').style.display = 'block'
      document.getElementById('pfResult').innerHTML = `📊 BMI ${bmi} · ${suggestion}<br>🔥 日消耗 ${tdee} 千卡 · 🎯 建议摄入 ${cutCal} 千卡/天（减脂缺口400千卡）`
    } else {
      this.profile.targetCal = null
      document.getElementById('pfResult').style.display = 'none'
    }
  },

  init() {
    this.bindEvents()
    // 档案输入自动计算
    ['pfAge','pfHeight','pfWeight'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => this.refreshProfile())
    })
    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => this.addIngredient(chip.dataset.ingredient))
    })
  },

  bindEvents() {
    const input = document.getElementById('ingredientInput')
    input.addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); this.addIngredient(input.value.trim()) } })
    document.getElementById('btnAdd').addEventListener('click', () => this.addIngredient(input.value.trim()))
    document.getElementById('btnSearch').addEventListener('click', () => this.search())
    document.getElementById('btnMealPlan').addEventListener('click', () => this.generateMealPlan())
    document.querySelectorAll('.pref-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pref-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        this.currentCategory = btn.dataset.category
        if(this.ingredients.length>0) this.search()
      })
    })
  },

  addIngredient(name) {
    if(!name) return
    name.split(/[,，、\s]+/).filter(n=>n.length>0).forEach(n => {
      if(!this.ingredients.includes(n)) this.ingredients.push(n)
    })
    document.getElementById('ingredientInput').value = ''
    this.renderTags()
  },

  removeIngredient(name) {
    this.ingredients = this.ingredients.filter(i => i !== name)
    this.renderTags()
    if(this.ingredients.length===0) this.clearResults()
  },

  renderTags() {
    const area = document.getElementById('tagsArea')
    area.innerHTML = this.ingredients.map(n => `<span class="tag">${n}<span class="tag-remove" data-name="${n}">✕</span></span>`).join('')
    area.querySelectorAll('.tag-remove').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); this.removeIngredient(btn.dataset.name) })
    })
  },

  // 🔍 食材匹配推荐
  search() {
    const btn = document.getElementById('btnSearch')
    btn.innerHTML = '🔍 匹配中...'; btn.disabled = true
    setTimeout(() => {
      const results = this.ingredients.length > 0 ? this.matchRecipes() : this.randomRecipes()
      this.renderResults(results)
      btn.innerHTML = '✨ AI 推荐菜谱'; btn.disabled = false
    }, 400)
  },

  matchRecipes() {
    return this.allRecipes
      .filter(r => this.currentCategory==='all' || r.category===this.currentCategory)
      .map(r => {
        let score = 0
        const uIng = this.ingredients.map(i=>i.toLowerCase())
        const rIng = r.ingredients.map(i=>i.toLowerCase())
        uIng.forEach(ui => { rIng.forEach(ri => { if(ri.includes(ui)||ui.includes(ri)) score+=10 }) })
        const matched = rIng.filter(ri => uIng.some(ui => ri.includes(ui)||ui.includes(ri))).length
        if(matched>0) score += (matched/rIng.length)*15
        return { recipe:r, score, matched }
      })
      .filter(x => x.score>0)
      .sort((a,b) => b.score-a.score)
      .slice(0, 6)
  },

  randomRecipes() {
    let pool = this.currentCategory==='all' ? this.allRecipes : this.allRecipes.filter(r=>r.category===this.currentCategory)
    return [...pool].sort(()=>Math.random()-0.5).slice(0,6).map(r=>({recipe:r,score:30,matched:0}))
  },

  // 📅 智能三餐搭配
  generateMealPlan() {
    const pool = this.currentCategory==='all' ? this.allRecipes : this.allRecipes.filter(r=>r.category===this.currentCategory)
    const shuffled = [...pool].sort(()=>Math.random()-0.5)

    const breakfast = shuffled.find(r=>r.mealType==='breakfast') || shuffled[0]
    const lunch = shuffled.find(r=>r.mealType==='lunch' && r!==breakfast) || shuffled[1]
    const dinner = shuffled.find(r=>r.mealType==='dinner' && r!==breakfast && r!==lunch) || shuffled[2]

    const meals = [
      { type:'🌅 早餐', icon:'🥣', ...breakfast },
      { type:'🌞 午餐', icon:'🍱', ...lunch },
      { type:'🌆 晚餐', icon:'🥬', ...dinner }
    ]
    const totalCal = meals.reduce((s,m)=>s+m.calories,0)
    const totalProtein = meals.reduce((s,m)=>s+m.protein,0)

    const grid = document.getElementById('resultsGrid')
    document.getElementById('resultsHeader').style.display = 'flex'
    document.getElementById('emptyState').style.display = 'none'
    document.getElementById('resultsCount').textContent = '📅 今日三餐推荐'

    // 个性化对比
    let extraInfo = ''
    if (this.profile.targetCal) {
      const diff = totalCal - this.profile.targetCal
      const icon = Math.abs(diff) < 150 ? '✅' : diff > 0 ? '⚠️' : '📉'
      extraInfo = ` · ${icon} 比目标${diff>0?'多':'少'}${Math.abs(diff)}千卡`
    }

    grid.innerHTML = `
      <div class="mealplan-summary">🔥 全天总热量 ${totalCal} 千卡 · 🥩 蛋白质 ${totalProtein}g${extraInfo}</div>
      <div class="mealplan-meals">
        ${meals.map((m,i) => `
          <div class="mealplan-card" onclick="App.openDetail(${m.id})" style="animation-delay:${i*0.1}s">
            <span class="mp-icon">${m.icon}</span>
            <div class="mp-info">
              <div class="mp-meal-type ${m.category}">${m.type} · ${m.category==='diet'?'减脂':'放纵'}</div>
              <div class="mp-name">${m.name}</div>
              <div class="mp-meta">🔥${m.calories}千卡 · 🥩${m.protein}g蛋白 · 🍚${m.carbs}g碳水 · ⏱${m.time}</div>
            </div>
            <span class="mp-arrow">→</span>
          </div>
        `).join('')}
      </div>`
    document.getElementById('resultsSection').scrollIntoView({behavior:'smooth'})
  },

  // ===== 渲染结果 =====
  renderResults(results) {
    const grid = document.getElementById('resultsGrid')
    document.getElementById('resultsHeader').style.display = 'flex'
    document.getElementById('emptyState').style.display = 'none'
    document.getElementById('resultsCount').textContent = `🎯 为你推荐 ${results.length} 个菜谱`

    if(results.length===0) {
      grid.innerHTML = `<div class="no-results"><div class="nr-icon">🔍</div><div class="nr-title">没找到匹配的</div><div class="nr-desc">试试换个食材组合？</div></div>`
      return
    }

    grid.innerHTML = results.map(({recipe}) => {
      const matchedIngs = this.ingredients.length>0 ? recipe.ingredients.map(ing => {
        const m = this.ingredients.some(ui => ing.toLowerCase().includes(ui.toLowerCase())||ui.toLowerCase().includes(ing.toLowerCase()))
        return `<span class="card-ingredient ${m?'matched':''}">${ing}</span>`
      }).join('') : recipe.ingredients.map(ing => `<span class="card-ingredient">${ing}</span>`).join('')

      return `<div class="recipe-card" onclick="App.openDetail(${recipe.id})">
        <div class="card-top"><span class="card-name">${recipe.name}</span><span class="card-category ${recipe.category}">${recipe.category==='diet'?'🥗减脂':'🍕放纵'}</span></div>
        <div class="card-meta"><span>🔥${recipe.calories}千卡</span><span>🥩${recipe.protein}g蛋白</span><span>⏱${recipe.time}</span><span>${recipe.mealType==='breakfast'?'🌅早餐':recipe.mealType==='lunch'?'🌞午餐':recipe.mealType==='dinner'?'🌆晚餐':'🍎加餐'}</span></div>
        <div class="card-ingredients">${matchedIngs}</div>
        <div class="card-tags">${recipe.tags.map(t=>`<span class="card-tag">#${t}</span>`).join('')}</div>
      </div>`
    }).join('')
    document.getElementById('resultsSection').scrollIntoView({behavior:'smooth'})
  },

  clearResults() {
    document.getElementById('resultsGrid').innerHTML = ''
    document.getElementById('resultsHeader').style.display = 'none'
    document.getElementById('emptyState').style.display = ''
  },

  // 📖 沉浸式详情
  openDetail(id) {
    const r = this.allRecipes.find(x=>x.id===id)
    if(!r) return
    const overlay = document.createElement('div')
    overlay.className = 'detail-overlay'
    overlay.id = 'detailOverlay'
    overlay.innerHTML = `
      <div class="detail-hero ${r.category==='cheat'?'cheat':''}">
        <button class="detail-close" onclick="document.getElementById('detailOverlay').remove();document.body.style.overflow=''">✕</button>
        <div class="detail-name">${r.name}</div>
        <div class="detail-stats">
          <div class="detail-stat"><div class="ds-val">${r.calories}</div><div class="ds-label">🔥千卡</div></div>
          <div class="detail-stat"><div class="ds-val">${r.protein}g</div><div class="ds-label">🥩蛋白质</div></div>
          <div class="detail-stat"><div class="ds-val">${r.carbs}g</div><div class="ds-label">🍚碳水</div></div>
          <div class="detail-stat"><div class="ds-val">${r.fat}g</div><div class="ds-label">🧈脂肪</div></div>
          <div class="detail-stat"><div class="ds-val">${r.time}</div><div class="ds-label">⏱时间</div></div>
        </div>
      </div>
      <div class="detail-body">
        <span class="detail-meal-badge">${r.mealType==='breakfast'?'🌅 早餐':r.mealType==='lunch'?'🌞 午餐':r.mealType==='dinner'?'🌆 晚餐':'🍎 加餐'} · ${r.category==='diet'?'减脂餐':'放纵餐'} · ${r.difficulty}</span>
        <h3>🛒 食材清单</h3>
        <div class="detail-ingredients">${r.ingredients.map(i=>`<span class="detail-ing">${i}</span>`).join('')}</div>
        <h3>👨‍🍳 制作步骤（共${r.steps.length}步）</h3>
        ${r.steps.map((s,i)=>`<div class="detail-step"><span class="ds-num">${i+1}</span><span class="ds-text">${s}</span></div>`).join('')}
        <div class="detail-tags">${r.tags.map(t=>`<span class="detail-tag">#${t}</span>`).join('')}</div>
      </div>`
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    overlay.onclick = e => { if(e.target===overlay){ overlay.remove(); document.body.style.overflow='' } }
  },

  showToast(msg) {
    const t = document.createElement('div')
    t.textContent = msg
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:24px;font-size:14px;z-index:9999'
    document.body.appendChild(t)
    setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300)},2000)
  }
}
document.addEventListener('DOMContentLoaded', () => App.init())
