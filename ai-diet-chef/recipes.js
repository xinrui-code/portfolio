// AI 减脂助手 - 菜谱数据库（100+ 道精选菜谱）
// 每道菜包含：名称、分类、食材、热量、营养素、做法步骤、标签

const RECIPES = [
  // ==================== 鸡胸肉系列 ====================
  {
    id: 1, name: '香煎鸡胸配西兰花', category: 'diet',
    ingredients: ['鸡胸肉', '西兰花', '蒜', '橄榄油', '盐', '黑胡椒'],
    calories: 320, protein: 45, carbs: 12, fat: 10,
    time: '20分钟', difficulty: '简单',
    steps: [
      '鸡胸肉用盐、黑胡椒腌制 10 分钟',
      '平底锅喷少量橄榄油，中火煎鸡胸每面 4-5 分钟至金黄',
      '西兰花焯水 2 分钟捞出',
      '装盘搭配，可淋少许柠檬汁'
    ],
    tags: ['高蛋白', '低脂', '快手']
  },
  {
    id: 2, name: '番茄鸡胸肉丸汤', category: 'diet',
    ingredients: ['鸡胸肉', '番茄', '鸡蛋', '葱', '姜', '盐'],
    calories: 280, protein: 38, carbs: 18, fat: 6,
    time: '25分钟', difficulty: '简单',
    steps: [
      '鸡胸肉剁成泥，加蛋清、少许盐搅拌上劲',
      '番茄切块，锅中少油炒出汁',
      '加水烧开，用勺子挖肉泥成丸子下锅',
      '煮 5 分钟至丸子浮起，加盐调味撒葱花'
    ],
    tags: ['高蛋白', '低脂', '暖汤']
  },
  {
    id: 3, name: '蒜香蜂蜜鸡胸', category: 'diet',
    ingredients: ['鸡胸肉', '蜂蜜', '蒜', '酱油', '橄榄油'],
    calories: 350, protein: 42, carbs: 22, fat: 9,
    time: '20分钟', difficulty: '简单',
    steps: [
      '鸡胸肉划几刀方便入味',
      '蜂蜜+酱油+蒜末调成酱汁，腌制 15 分钟',
      '平底锅小火慢煎，两面各 5 分钟',
      '剩余酱汁倒入锅中收汁淋在鸡胸上'
    ],
    tags: ['高蛋白', '美味', '快手']
  },
  {
    id: 4, name: '鸡胸时蔬炒饭（低卡版）', category: 'diet',
    ingredients: ['鸡胸肉', '糙米饭', '胡萝卜', '青豆', '玉米', '鸡蛋', '酱油'],
    calories: 420, protein: 35, carbs: 48, fat: 10,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉切丁，胡萝卜切丁',
      '锅中少油，先炒鸡蛋盛出',
      '炒鸡丁至变色，加入胡萝卜青豆玉米翻炒',
      '加入糙米饭和鸡蛋，少许酱油调味翻炒均匀'
    ],
    tags: ['高蛋白', '快手', '一锅出']
  },
  {
    id: 5, name: '水煮鸡胸凉拌', category: 'diet',
    ingredients: ['鸡胸肉', '黄瓜', '香菜', '蒜', '醋', '生抽', '辣椒油'],
    calories: 260, protein: 40, carbs: 8, fat: 7,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉冷水下锅，水开后煮 8 分钟关火焖 5 分钟',
      '捞出放凉撕成丝',
      '黄瓜切丝，加蒜末、醋、生抽、少许辣椒油拌匀'
    ],
    tags: ['高蛋白', '低脂', '爽口']
  },
  {
    id: 6, name: '咖喱鸡胸肉', category: 'diet',
    ingredients: ['鸡胸肉', '洋葱', '胡萝卜', '咖喱粉', '酸奶', '姜'],
    calories: 380, protein: 40, carbs: 30, fat: 12,
    time: '30分钟', difficulty: '中等',
    steps: [
      '鸡胸肉切块，用酸奶+咖喱粉腌制 20 分钟',
      '洋葱切丝，胡萝卜切块',
      '锅中小火炒香洋葱姜，加入鸡肉翻炒',
      '加水和胡萝卜炖煮 15 分钟至汤汁浓稠'
    ],
    tags: ['高蛋白', '美味', '异国风味']
  },

  // ==================== 鸡蛋系列 ====================
  {
    id: 7, name: '番茄炒蛋（低油版）', category: 'diet',
    ingredients: ['鸡蛋', '番茄', '葱', '盐', '糖'],
    calories: 240, protein: 16, carbs: 14, fat: 12,
    time: '10分钟', difficulty: '简单',
    steps: [
      '鸡蛋打散，番茄切块',
      '锅中喷少许油，中小火炒鸡蛋至八成熟盛出',
      '同一锅炒番茄至出汁',
      '倒回鸡蛋翻炒，加盐和少许糖调味'
    ],
    tags: ['快手', '家常', '低脂']
  },
  {
    id: 8, name: '蔬菜烘蛋', category: 'diet',
    ingredients: ['鸡蛋', '菠菜', '番茄', '洋葱', '蘑菇', '芝士'],
    calories: 310, protein: 22, carbs: 10, fat: 20,
    time: '20分钟', difficulty: '简单',
    steps: [
      '菠菜焯水切段，番茄洋葱蘑菇切片',
      '鸡蛋打散加盐，混合所有蔬菜',
      '倒入烤盘，撒少许芝士',
      '烤箱 180°C 烤 15 分钟或平底锅小火焖 10 分钟'
    ],
    tags: ['高蛋白', '低碳水', '西式']
  },
  {
    id: 9, name: '水波蛋牛油果吐司', category: 'diet',
    ingredients: ['鸡蛋', '牛油果', '全麦面包', '柠檬', '盐', '黑胡椒'],
    calories: 360, protein: 18, carbs: 28, fat: 22,
    time: '10分钟', difficulty: '中等',
    steps: [
      '水烧开加少许白醋，搅出漩涡打入鸡蛋煮 3 分钟',
      '牛油果压泥加柠檬汁盐黑胡椒',
      '全麦面包烤脆，抹牛油果泥',
      '放上水波蛋，撒黑胡椒'
    ],
    tags: ['网红', '高蛋白', '西式']
  },
  {
    id: 10, name: '紫菜蛋花汤', category: 'diet',
    ingredients: ['鸡蛋', '紫菜', '虾皮', '葱', '盐', '香油'],
    calories: 120, protein: 12, carbs: 6, fat: 6,
    time: '5分钟', difficulty: '简单',
    steps: [
      '水烧开，放入紫菜和虾皮',
      '鸡蛋打散，缓缓倒入锅中搅出蛋花',
      '加盐、香油、葱花即可'
    ],
    tags: ['快手', '低卡', '暖汤']
  },
  {
    id: 11, name: '鸡蛋豆腐羹', category: 'diet',
    ingredients: ['鸡蛋', '嫩豆腐', '虾仁', '葱', '生抽', '香油'],
    calories: 220, protein: 28, carbs: 6, fat: 10,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡蛋打散加等量温水，豆腐切小块放入碗中',
      '虾仁放在豆腐上，倒入蛋液',
      '蒸锅水开后放入，中火蒸 10 分钟',
      '出锅淋生抽和香油，撒葱花'
    ],
    tags: ['高蛋白', '嫩滑', '中式']
  },
  {
    id: 12, name: '西班牙土豆蛋饼', category: 'cheat',
    ingredients: ['鸡蛋', '土豆', '洋葱', '橄榄油', '盐'],
    calories: 450, protein: 20, carbs: 38, fat: 24,
    time: '30分钟', difficulty: '中等',
    steps: [
      '土豆切薄片，洋葱切丝',
      '多油煎土豆和洋葱至软',
      '沥油后混入打散的鸡蛋液',
      '平底锅少油，倒入蛋液小火慢煎，翻面再煎至金黄'
    ],
    tags: ['放纵餐', '西式', '饱腹']
  },

  // ==================== 鱼虾海鲜 ====================
  {
    id: 13, name: '清蒸鲈鱼', category: 'diet',
    ingredients: ['鲈鱼', '姜', '葱', '蒸鱼豉油', '料酒'],
    calories: 280, protein: 38, carbs: 4, fat: 12,
    time: '20分钟', difficulty: '简单',
    steps: [
      '鲈鱼处理干净，两面划刀，抹料酒腌制',
      '鱼身上铺姜片葱段',
      '蒸锅水开后放入，大火蒸 8-10 分钟',
      '倒掉蒸出的汤汁，淋蒸鱼豉油，热油浇在葱丝上'
    ],
    tags: ['高蛋白', '低脂', '中式经典']
  },
  {
    id: 14, name: '蒜蓉虾仁西兰花', category: 'diet',
    ingredients: ['虾仁', '西兰花', '蒜', '橄榄油', '盐', '料酒'],
    calories: 240, protein: 32, carbs: 10, fat: 8,
    time: '15分钟', difficulty: '简单',
    steps: [
      '虾仁用料酒和盐腌制 5 分钟',
      '西兰花焯水 2 分钟',
      '锅中少油，蒜末爆香',
      '加入虾仁翻炒至变色，加入西兰花翻炒均匀'
    ],
    tags: ['高蛋白', '低脂', '快手']
  },
  {
    id: 15, name: '番茄虾仁意面', category: 'diet',
    ingredients: ['虾仁', '意面', '番茄', '蒜', '橄榄油', '罗勒'],
    calories: 420, protein: 28, carbs: 52, fat: 12,
    time: '25分钟', difficulty: '简单',
    steps: [
      '意面煮熟备用（比包装少煮 1 分钟）',
      '番茄切块，蒜切片',
      '锅中少油炒香蒜片，加番茄炒出汁',
      '加虾仁翻炒至变色，拌入意面翻炒均匀'
    ],
    tags: ['高蛋白', '意面', '美味']
  },
  {
    id: 16, name: '香煎三文鱼', category: 'diet',
    ingredients: ['三文鱼', '柠檬', '盐', '黑胡椒', '黄油', '芦笋'],
    calories: 420, protein: 36, carbs: 2, fat: 30,
    time: '15分钟', difficulty: '简单',
    steps: [
      '三文鱼用盐和黑胡椒抹匀',
      '平底锅中火，放少许黄油',
      '鱼皮朝下煎 4 分钟，翻面再煎 3 分钟',
      '芦笋同锅煎熟，挤柠檬汁'
    ],
    tags: ['高蛋白', 'Omega3', '精致']
  },
  {
    id: 17, name: '酸菜鱼（低油版）', category: 'diet',
    ingredients: ['鱼片', '酸菜', '花椒', '干辣椒', '姜', '料酒', '蛋清'],
    calories: 340, protein: 35, carbs: 8, fat: 18,
    time: '30分钟', difficulty: '中等',
    steps: [
      '鱼片用蛋清料酒腌制',
      '锅中少油炒香酸菜和姜片',
      '加水烧开后滑入鱼片',
      '煮 2-3 分钟至鱼片变白，少油爆香花椒干辣椒淋上'
    ],
    tags: ['高蛋白', '下饭', '中式经典']
  },
  {
    id: 18, name: '白灼虾', category: 'diet',
    ingredients: ['虾', '姜', '葱', '料酒', '生抽', '醋'],
    calories: 200, protein: 36, carbs: 2, fat: 4,
    time: '10分钟', difficulty: '简单',
    steps: [
      '虾洗净去虾线',
      '水加姜片葱段料酒烧开',
      '放入虾煮 2-3 分钟至变红',
      '捞出蘸生抽+醋+姜末的蘸料'
    ],
    tags: ['高蛋白', '低脂', '快手']
  },
  {
    id: 19, name: '金汤鱼片', category: 'diet',
    ingredients: ['鱼片', '南瓜', '金针菇', '姜', '盐', '料酒'],
    calories: 280, protein: 32, carbs: 18, fat: 8,
    time: '25分钟', difficulty: '中等',
    steps: [
      '南瓜蒸熟压成泥',
      '锅中少油炒香姜片，加南瓜泥和水烧开',
      '放入金针菇煮 2 分钟',
      '滑入鱼片煮至变白，加盐调味'
    ],
    tags: ['高蛋白', '暖汤', '创意菜']
  },

  // ==================== 牛肉系列 ====================
  {
    id: 20, name: '牛排配时蔬', category: 'diet',
    ingredients: ['牛排', '芦笋', '小番茄', '蒜', '黄油', '黑胡椒', '盐'],
    calories: 480, protein: 42, carbs: 8, fat: 30,
    time: '15分钟', difficulty: '中等',
    steps: [
      '牛排提前 30 分钟从冰箱取出回温，用盐和黑胡椒抹匀',
      '大火热锅，放入牛排每面煎 3-4 分钟（五分熟）',
      '加黄油蒜瓣，用勺子浇黄油在牛排上',
      '芦笋和小番茄同锅煎熟，静置 5 分钟后切片'
    ],
    tags: ['高蛋白', '精致', '西式']
  },
  {
    id: 21, name: '牛肉蔬菜沙拉', category: 'diet',
    ingredients: ['牛肉', '生菜', '番茄', '黄瓜', '玉米粒', '橄榄油', '醋'],
    calories: 360, protein: 35, carbs: 20, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '牛肉切薄片，大火快煎至变色',
      '生菜撕碎，番茄黄瓜切片',
      '所有材料混合',
      '橄榄油+醋+少许盐调成油醋汁淋上'
    ],
    tags: ['高蛋白', '沙拉', '快手']
  },
  {
    id: 22, name: '番茄牛腩（减脂版）', category: 'diet',
    ingredients: ['牛腩', '番茄', '洋葱', '姜', '料酒', '生抽'],
    calories: 420, protein: 38, carbs: 22, fat: 18,
    time: '1小时', difficulty: '中等',
    steps: [
      '牛腩焯水去血沫，切块',
      '番茄洋葱切块',
      '锅中少油炒香洋葱姜片，加牛腩翻炒',
      '加番茄和水炖煮 40 分钟至牛肉软烂'
    ],
    tags: ['高蛋白', '暖胃', '中式']
  },
  {
    id: 23, name: '香菜拌牛肉', category: 'diet',
    ingredients: ['牛肉', '香菜', '蒜', '辣椒', '生抽', '醋', '花椒油'],
    calories: 300, protein: 36, carbs: 6, fat: 14,
    time: '15分钟', difficulty: '简单',
    steps: [
      '牛肉切薄片，沸水焯 30 秒变色立即捞出',
      '香菜切段，蒜切末，辣椒切圈',
      '所有调料混合成酱汁',
      '牛肉+香菜+酱汁拌匀'
    ],
    tags: ['高蛋白', '爽口', '快手']
  },
  {
    id: 24, name: '牛肉炒芦笋', category: 'diet',
    ingredients: ['牛肉', '芦笋', '蒜', '生抽', '蚝油', '料酒', '淀粉'],
    calories: 340, protein: 34, carbs: 14, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '牛肉切条用料酒+生抽+淀粉腌制',
      '芦笋去老皮切段，焯水 1 分钟',
      '大火热锅少油，牛肉快炒至变色盛出',
      '同锅炒芦笋，倒回牛肉加蚝油翻匀'
    ],
    tags: ['高蛋白', '快手', '中式']
  },

  // ==================== 猪肉系列 ====================
  {
    id: 25, name: '青椒炒瘦肉', category: 'diet',
    ingredients: ['猪瘦肉', '青椒', '蒜', '生抽', '料酒', '淀粉'],
    calories: 320, protein: 30, carbs: 12, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '瘦肉切丝用料酒+生抽+淀粉腌制',
      '青椒去籽切丝',
      '大火热锅少油，肉丝快炒至变色盛出',
      '同锅炒青椒至断生，倒回肉丝翻匀'
    ],
    tags: ['高蛋白', '家常', '快手']
  },
  {
    id: 26, name: '蒜泥白肉（低油版）', category: 'diet',
    ingredients: ['猪瘦肉', '蒜', '黄瓜', '生抽', '醋', '辣椒油'],
    calories: 310, protein: 32, carbs: 8, fat: 16,
    time: '25分钟', difficulty: '简单',
    steps: [
      '猪瘦肉冷水下锅，煮 15 分钟关火焖 10 分钟',
      '捞出切薄片，黄瓜切丝垫底',
      '蒜泥+生抽+醋+少许辣椒油调成酱汁',
      '肉片码在黄瓜上，淋酱汁'
    ],
    tags: ['高蛋白', '经典', '下饭']
  },
  {
    id: 27, name: '红烧肉（放纵版）', category: 'cheat',
    ingredients: ['五花肉', '冰糖', '生抽', '老抽', '八角', '桂皮', '姜', '料酒'],
    calories: 650, protein: 18, carbs: 30, fat: 52,
    time: '1小时', difficulty: '中等',
    steps: [
      '五花肉切块焯水',
      '锅中少油加冰糖小火炒糖色',
      '加入五花肉翻炒上色',
      '加生抽老抽八角桂皮姜片料酒和水，小火炖 40 分钟收汁'
    ],
    tags: ['放纵餐', '经典', '下饭神器']
  },
  {
    id: 28, name: '糖醋里脊', category: 'cheat',
    ingredients: ['猪里脊', '鸡蛋', '面粉', '番茄酱', '糖', '醋', '生抽'],
    calories: 550, protein: 28, carbs: 45, fat: 28,
    time: '25分钟', difficulty: '中等',
    steps: [
      '里脊切条，用盐料酒腌制',
      '鸡蛋+面粉调成面糊，里脊裹糊',
      '油温六成热炸至金黄捞出',
      '番茄酱+糖+醋+生抽调成糖醋汁，翻炒里脊裹匀'
    ],
    tags: ['放纵餐', '酸甜', '经典']
  },

  // ==================== 豆腐/素食 ====================
  {
    id: 29, name: '麻婆豆腐（低油版）', category: 'diet',
    ingredients: ['嫩豆腐', '瘦肉末', '豆瓣酱', '花椒粉', '葱', '姜', '蒜'],
    calories: 300, protein: 24, carbs: 14, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '豆腐切块，沸水焯 1 分钟',
      '锅中少油炒香肉末姜蒜',
      '加豆瓣酱炒出红油，加少量水',
      '放入豆腐轻轻推匀，煮 3 分钟勾芡，撒花椒粉葱花'
    ],
    tags: ['经典', '下饭', '中式']
  },
  {
    id: 30, name: '皮蛋拌豆腐', category: 'diet',
    ingredients: ['嫩豆腐', '皮蛋', '葱', '生抽', '醋', '香油', '蒜'],
    calories: 200, protein: 16, carbs: 8, fat: 12,
    time: '5分钟', difficulty: '简单',
    steps: [
      '豆腐扣在盘中',
      '皮蛋切丁放在豆腐上',
      '蒜末+生抽+醋+香油调汁淋上',
      '撒葱花即可'
    ],
    tags: ['快手', '低卡', '凉菜']
  },
  {
    id: 31, name: '干锅花菜', category: 'diet',
    ingredients: ['花菜', '五花肉', '干辣椒', '蒜', '生抽', '蚝油'],
    calories: 260, protein: 14, carbs: 18, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '花菜掰小朵焯水 1 分钟',
      '五花肉切薄片，煸出油',
      '加干辣椒蒜片爆香',
      '放入花菜大火翻炒，加生抽蚝油调味'
    ],
    tags: ['下饭', '家常', '快手']
  },
  {
    id: 32, name: '蚝油生菜', category: 'diet',
    ingredients: ['生菜', '蚝油', '蒜', '生抽', '淀粉'],
    calories: 80, protein: 3, carbs: 12, fat: 2,
    time: '5分钟', difficulty: '简单',
    steps: [
      '生菜焯水 30 秒捞出摆盘',
      '蒜末爆香，加蚝油+生抽+水+淀粉勾薄芡',
      '淋在生菜上即可'
    ],
    tags: ['低卡', '快手', '素菜']
  },
  {
    id: 33, name: '蒜蓉粉丝蒸娃娃菜', category: 'diet',
    ingredients: ['娃娃菜', '粉丝', '蒜', '蒸鱼豉油', '葱花'],
    calories: 160, protein: 5, carbs: 28, fat: 3,
    time: '15分钟', difficulty: '简单',
    steps: [
      '粉丝泡软，娃娃菜对半切开',
      '蒜剁成蒜蓉',
      '娃娃菜铺粉丝上，撒蒜蓉',
      '蒸锅水开后大火蒸 8 分钟，淋蒸鱼豉油'
    ],
    tags: ['低卡', '素菜', '鲜美']
  },

  // ==================== 主食/碳水 ====================
  {
    id: 34, name: '糙米饭', category: 'diet',
    ingredients: ['糙米', '水'],
    calories: 220, protein: 6, carbs: 46, fat: 2,
    time: '40分钟', difficulty: '简单',
    steps: [
      '糙米提前泡 2 小时',
      '米水比例 1:1.5',
      '电饭煲煮熟即可'
    ],
    tags: ['主食', '低GI', '基础']
  },
  {
    id: 35, name: '燕麦粥', category: 'diet',
    ingredients: ['燕麦', '牛奶', '蓝莓', '蜂蜜'],
    calories: 300, protein: 12, carbs: 48, fat: 8,
    time: '5分钟', difficulty: '简单',
    steps: [
      '燕麦和牛奶 1:3 比例',
      '小火煮 3-5 分钟至粘稠',
      '加蓝莓和少许蜂蜜'
    ],
    tags: ['早餐', '快手', '高纤维']
  },
  {
    id: 36, name: '红薯泥', category: 'diet',
    ingredients: ['红薯', '牛奶', '黄油'],
    calories: 200, protein: 3, carbs: 42, fat: 3,
    time: '25分钟', difficulty: '简单',
    steps: [
      '红薯蒸熟',
      '去皮压成泥',
      '加少许牛奶和黄油搅拌均匀'
    ],
    tags: ['主食', '低脂', '甜味']
  },
  {
    id: 37, name: '全麦鸡蛋饼', category: 'diet',
    ingredients: ['全麦面粉', '鸡蛋', '葱', '盐', '水'],
    calories: 280, protein: 16, carbs: 36, fat: 10,
    time: '10分钟', difficulty: '简单',
    steps: [
      '全麦面粉加水调成面糊，打入鸡蛋搅匀',
      '加葱花和盐',
      '平底锅少油，倒入面糊摊平',
      '两面煎至金黄'
    ],
    tags: ['早餐', '快手', '主食']
  },
  {
    id: 38, name: '番茄鸡蛋面', category: 'diet',
    ingredients: ['面条', '鸡蛋', '番茄', '葱', '盐', '生抽'],
    calories: 400, protein: 18, carbs: 56, fat: 12,
    time: '15分钟', difficulty: '简单',
    steps: [
      '番茄切块炒出汁，加水烧开',
      '打入鸡蛋搅散',
      '放入面条煮熟',
      '加盐生抽葱花调味'
    ],
    tags: ['主食', '家常', '暖胃']
  },

  // ==================== 放纵餐 ====================
  {
    id: 39, name: '经典牛肉汉堡', category: 'cheat',
    ingredients: ['牛肉', '汉堡胚', '芝士', '生菜', '番茄', '洋葱', '酸黄瓜'],
    calories: 650, protein: 35, carbs: 48, fat: 36,
    time: '20分钟', difficulty: '中等',
    steps: [
      '牛肉剁成肉饼，加盐黑胡椒调味',
      '大火煎肉饼每面 3 分钟，放芝士片盖上',
      '汉堡胚烤热',
      '组装：底胚+生菜+肉饼+番茄+洋葱+酸黄瓜+上胚'
    ],
    tags: ['放纵餐', '汉堡', '自制']
  },
  {
    id: 40, name: '奶油培根意面', category: 'cheat',
    ingredients: ['意面', '培根', '淡奶油', '帕玛森芝士', '蛋黄', '蒜', '黑胡椒'],
    calories: 620, protein: 24, carbs: 52, fat: 36,
    time: '20分钟', difficulty: '中等',
    steps: [
      '意面煮熟，培根切小块',
      '培根煎至酥脆',
      '蛋黄+淡奶油+芝士碎混合',
      '意面沥干，趁热拌入蛋奶液和培根，撒黑胡椒'
    ],
    tags: ['放纵餐', '意面', '浓郁']
  },
  {
    id: 41, name: '炸鸡翅', category: 'cheat',
    ingredients: ['鸡翅', '面粉', '鸡蛋', '面包糠', '盐', '黑胡椒', '辣椒粉'],
    calories: 520, protein: 32, carbs: 38, fat: 26,
    time: '30分钟', difficulty: '中等',
    steps: [
      '鸡翅用盐辣椒粉腌制 20 分钟',
      '依次裹面粉→蛋液→面包糠',
      '油温 170°C 炸 8-10 分钟至金黄',
      '捞出沥油，撒辣椒粉'
    ],
    tags: ['放纵餐', '炸鸡', '聚会']
  },
  {
    id: 42, name: '芝士焗饭', category: 'cheat',
    ingredients: ['米饭', '马苏里拉芝士', '培根', '玉米粒', '青豆', '番茄酱'],
    calories: 580, protein: 22, carbs: 56, fat: 30,
    time: '25分钟', difficulty: '简单',
    steps: [
      '米饭铺在烤盘底部',
      '铺上培根玉米青豆',
      '挤番茄酱，撒大量芝士',
      '烤箱 200°C 烤 10-12 分钟至芝士融化金黄'
    ],
    tags: ['放纵餐', '芝士', '焗饭']
  },
  {
    id: 43, name: '日式猪排饭', category: 'cheat',
    ingredients: ['猪排', '面包糠', '鸡蛋', '面粉', '米饭', '洋葱', '生抽', '糖'],
    calories: 680, protein: 35, carbs: 58, fat: 32,
    time: '30分钟', difficulty: '中等',
    steps: [
      '猪排用盐胡椒腌制，依次裹面粉→蛋液→面包糠',
      '油温 170°C 炸至金黄',
      '另锅煮洋葱+生抽+糖+水做酱汁，打入鸡蛋',
      '米饭上放猪排，浇酱汁蛋液'
    ],
    tags: ['放纵餐', '日式', '酥脆']
  },
  {
    id: 44, name: '火锅（低脂版搭配指南）', category: 'cheat',
    ingredients: ['牛肉片', '虾', '豆腐', '蔬菜', '菌菇', '火锅底料'],
    calories: 600, protein: 45, carbs: 20, fat: 36,
    time: '1小时', difficulty: '简单',
    steps: [
      '汤底选清汤或番茄锅，少用红油底料',
      '多涮牛肉片、虾、豆腐，少涮丸子午餐肉',
      '蔬菜菌菇随便吃',
      '蘸料选醋+蒜泥+香菜，少用麻酱'
    ],
    tags: ['放纵餐', '火锅', '聚会']
  },
  {
    id: 45, name: '自制披萨', category: 'cheat',
    ingredients: ['高筋面粉', '酵母', '马苏里拉芝士', '番茄酱', '培根', '青椒', '洋葱'],
    calories: 700, protein: 28, carbs: 65, fat: 35,
    time: '1小时', difficulty: '中等',
    steps: [
      '面粉+酵母+水揉成面团，发酵 30 分钟',
      '擀成饼皮，涂番茄酱',
      '撒芝士，铺培根青椒洋葱',
      '再撒一层芝士，烤箱 220°C 烤 12-15 分钟'
    ],
    tags: ['放纵餐', '披萨', '自制']
  },

  // ==================== 汤品 ====================
  {
    id: 46, name: '冬瓜排骨汤', category: 'diet',
    ingredients: ['排骨', '冬瓜', '姜', '枸杞', '盐', '料酒'],
    calories: 280, protein: 22, carbs: 10, fat: 16,
    time: '50分钟', difficulty: '简单',
    steps: [
      '排骨焯水去血沫',
      '冬瓜去皮切块',
      '排骨+姜片+水大火烧开转小火炖 30 分钟',
      '加冬瓜再炖 15 分钟，加盐枸杞调味'
    ],
    tags: ['暖汤', '低卡', '家常']
  },
  {
    id: 47, name: '菌菇豆腐汤', category: 'diet',
    ingredients: ['嫩豆腐', '金针菇', '香菇', '鸡蛋', '葱', '盐', '香油'],
    calories: 150, protein: 14, carbs: 10, fat: 6,
    time: '10分钟', difficulty: '简单',
    steps: [
      '香菇切片，金针菇去根',
      '水烧开加菌菇煮 3 分钟',
      '豆腐切块放入，煮 2 分钟',
      '淋入蛋液，加盐香油葱花'
    ],
    tags: ['低卡', '快手', '暖汤']
  },
  {
    id: 48, name: '番茄菌菇汤', category: 'diet',
    ingredients: ['番茄', '金针菇', '香菇', '鸡蛋', '葱', '盐'],
    calories: 120, protein: 10, carbs: 16, fat: 4,
    time: '15分钟', difficulty: '简单',
    steps: [
      '番茄切块炒出汁，加水烧开',
      '加入菌菇煮 5 分钟',
      '淋入蛋液搅出蛋花',
      '加盐葱花'
    ],
    tags: ['低卡', '暖汤', '素']
  },

  // ==================== 更多减脂餐 ====================
  {
    id: 49, name: '凉拌鸡丝黄瓜', category: 'diet',
    ingredients: ['鸡胸肉', '黄瓜', '香菜', '蒜', '生抽', '醋', '花椒油', '芝麻'],
    calories: 220, protein: 32, carbs: 8, fat: 7,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉煮熟撕成丝',
      '黄瓜切丝',
      '蒜泥+生抽+醋+花椒油调汁',
      '鸡丝+黄瓜丝+酱汁拌匀，撒芝麻香菜'
    ],
    tags: ['高蛋白', '低卡', '凉菜']
  },
  {
    id: 50, name: '泡菜豆腐锅', category: 'diet',
    ingredients: ['嫩豆腐', '泡菜', '金针菇', '鸡蛋', '葱', '辣椒粉'],
    calories: 260, protein: 20, carbs: 18, fat: 12,
    time: '15分钟', difficulty: '简单',
    steps: [
      '泡菜切段，锅中少油炒香',
      '加水烧开，放入豆腐块',
      '加金针菇煮 5 分钟',
      '打入鸡蛋，撒葱花辣椒粉'
    ],
    tags: ['暖汤', '韩式', '低卡']
  },
  {
    id: 51, name: '虾仁滑蛋', category: 'diet',
    ingredients: ['虾仁', '鸡蛋', '牛奶', '葱', '盐', '料酒'],
    calories: 260, protein: 30, carbs: 4, fat: 14,
    time: '10分钟', difficulty: '简单',
    steps: [
      '虾仁用料酒盐腌制',
      '鸡蛋+少许牛奶打散',
      '虾仁先煎至变色盛出',
      '小火炒蛋至半凝固，倒回虾仁轻轻推炒'
    ],
    tags: ['高蛋白', '快手', '嫩滑']
  },
  {
    id: 52, name: '鸡肉蔬菜卷', category: 'diet',
    ingredients: ['鸡胸肉', '生菜', '胡萝卜', '黄瓜', '全麦饼', '甜辣酱'],
    calories: 340, protein: 35, carbs: 32, fat: 8,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉煎熟切条',
      '胡萝卜黄瓜切丝',
      '全麦饼加热',
      '铺生菜+鸡肉+蔬菜丝，挤甜辣酱卷起'
    ],
    tags: ['高蛋白', '便携', '西式']
  },
  {
    id: 53, name: '三文鱼波奇饭', category: 'diet',
    ingredients: ['三文鱼', '糙米饭', '牛油果', '黄瓜', '海苔', '酱油', '芝麻'],
    calories: 480, protein: 32, carbs: 42, fat: 22,
    time: '10分钟', difficulty: '简单',
    steps: [
      '糙米饭铺碗底',
      '三文鱼切丁，牛油果黄瓜切片',
      '食材整齐码在饭上',
      '淋酱油，撒芝麻海苔碎'
    ],
    tags: ['高蛋白', '网红', '健康碗']
  },
  {
    id: 54, name: '孜然鸡胸肉丁', category: 'diet',
    ingredients: ['鸡胸肉', '洋葱', '青椒', '孜然粉', '辣椒粉', '盐', '料酒'],
    calories: 280, protein: 38, carbs: 12, fat: 8,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉切丁用料酒盐腌制',
      '洋葱青椒切块',
      '少油大火炒鸡丁至变色',
      '加洋葱青椒翻炒，撒孜然粉辣椒粉'
    ],
    tags: ['高蛋白', '烧烤味', '下饭']
  },
  {
    id: 55, name: '南瓜浓汤', category: 'diet',
    ingredients: ['南瓜', '洋葱', '牛奶', '黄油', '盐', '黑胡椒'],
    calories: 180, protein: 5, carbs: 28, fat: 6,
    time: '25分钟', difficulty: '简单',
    steps: [
      '南瓜去皮切块蒸熟',
      '洋葱切碎用黄油炒软',
      '南瓜+洋葱+牛奶用料理机打成泥',
      '倒回锅中加热，加盐黑胡椒调味'
    ],
    tags: ['低卡', '暖汤', '西式']
  },
  {
    id: 56, name: '五彩炒虾仁', category: 'diet',
    ingredients: ['虾仁', '玉米粒', '青豆', '胡萝卜', '蒜', '盐', '料酒'],
    calories: 240, protein: 28, carbs: 18, fat: 6,
    time: '15分钟', difficulty: '简单',
    steps: [
      '虾仁料酒腌制，胡萝卜切丁',
      '玉米青豆胡萝卜焯水',
      '蒜末爆香，虾仁炒至变色',
      '加入蔬菜翻炒，盐调味'
    ],
    tags: ['高蛋白', '快手', '色彩']
  },

  // ==================== 更多放纵餐 ====================
  {
    id: 57, name: '麻辣香锅', category: 'cheat',
    ingredients: ['虾', '牛肉', '藕片', '土豆', '花菜', '火锅底料', '干辣椒', '花椒'],
    calories: 650, protein: 35, carbs: 38, fat: 36,
    time: '25分钟', difficulty: '中等',
    steps: [
      '所有食材切好，分别焯水或炸熟',
      '锅中少油炒香火锅底料+干辣椒+花椒',
      '将所有食材倒入翻炒均匀',
      '撒白芝麻葱花出锅'
    ],
    tags: ['放纵餐', '麻辣', '聚会']
  },
  {
    id: 58, name: '可乐鸡翅', category: 'cheat',
    ingredients: ['鸡翅', '可乐', '生抽', '老抽', '姜', '料酒'],
    calories: 500, protein: 28, carbs: 35, fat: 24,
    time: '30分钟', difficulty: '简单',
    steps: [
      '鸡翅划两刀焯水',
      '锅中少油煎至两面金黄',
      '加可乐+生抽+老抽+姜片',
      '大火烧开转小火收汁至浓稠'
    ],
    tags: ['放纵餐', '经典', '下饭']
  },
  {
    id: 59, name: '意大利肉酱面', category: 'cheat',
    ingredients: ['意面', '牛肉末', '番茄', '洋葱', '蒜', '番茄酱', '红酒', '帕玛森芝士'],
    calories: 580, protein: 28, carbs: 56, fat: 26,
    time: '30分钟', difficulty: '中等',
    steps: [
      '洋葱蒜切碎炒香，加牛肉末炒散',
      '加番茄块和番茄酱，倒入少许红酒',
      '小火炖 15 分钟至浓稠',
      '意面煮熟拌入肉酱，撒芝士'
    ],
    tags: ['放纵餐', '意面', '经典']
  },
  {
    id: 60, name: '蛋挞', category: 'cheat',
    ingredients: ['蛋挞皮', '鸡蛋', '牛奶', '淡奶油', '糖'],
    calories: 200, protein: 5, carbs: 22, fat: 12,
    time: '30分钟', difficulty: '中等',
    steps: [
      '鸡蛋+牛奶+淡奶油+糖混合搅匀过滤',
      '蛋挞液倒入蛋挞皮八分满',
      '烤箱 200°C 预热',
      '烤 20-25 分钟至表面焦黄'
    ],
    tags: ['放纵餐', '甜品', '烘焙']
  },

  // ==================== 减脂早餐 ====================
  {
    id: 61, name: '隔夜燕麦杯', category: 'diet',
    ingredients: ['燕麦', '牛奶', '酸奶', '奇亚籽', '蓝莓', '香蕉'],
    calories: 350, protein: 14, carbs: 52, fat: 10,
    time: '5分钟（提前一晚）', difficulty: '简单',
    steps: [
      '燕麦+奇亚籽+牛奶+酸奶混合',
      '放入冰箱过夜',
      '早晨取出，铺上蓝莓香蕉',
      '直接享用'
    ],
    tags: ['早餐', '快手', '高纤维']
  },
  {
    id: 62, name: '金枪鱼三明治', category: 'diet',
    ingredients: ['金枪鱼罐头', '全麦面包', '生菜', '番茄', '鸡蛋', '沙拉酱'],
    calories: 380, protein: 28, carbs: 32, fat: 14,
    time: '10分钟', difficulty: '简单',
    steps: [
      '鸡蛋煮熟切片',
      '金枪鱼沥干加少许沙拉酱拌匀',
      '全麦面包烤热',
      '面包+生菜+番茄+金枪鱼+鸡蛋+面包'
    ],
    tags: ['高蛋白', '早餐', '便携']
  },
  {
    id: 63, name: '蛋白粉松饼', category: 'diet',
    ingredients: ['蛋白粉', '鸡蛋', '燕麦', '香蕉', '泡打粉'],
    calories: 320, protein: 30, carbs: 35, fat: 8,
    time: '15分钟', difficulty: '简单',
    steps: [
      '香蕉压泥，加鸡蛋+蛋白粉+燕麦+泡打粉搅匀',
      '平底锅不粘锅小火',
      '倒入面糊，表面冒泡翻面',
      '淋少许蜂蜜或酸奶'
    ],
    tags: ['高蛋白', '早餐', '健身']
  },
  {
    id: 64, name: '紫薯鸡蛋卷', category: 'diet',
    ingredients: ['紫薯', '鸡蛋', '牛奶', '盐'],
    calories: 250, protein: 14, carbs: 32, fat: 8,
    time: '20分钟', difficulty: '中等',
    steps: [
      '紫薯蒸熟压泥加少许牛奶',
      '鸡蛋打散加盐，摊成薄蛋皮',
      '紫薯泥均匀铺在蛋皮上',
      '卷起切段即可'
    ],
    tags: ['早餐', '颜值', '健康']
  },
  {
    id: 65, name: '希腊酸奶碗', category: 'diet',
    ingredients: ['希腊酸奶', '格兰诺拉麦片', '蓝莓', '草莓', '蜂蜜'],
    calories: 300, protein: 20, carbs: 38, fat: 8,
    time: '3分钟', difficulty: '简单',
    steps: [
      '希腊酸奶倒入碗中',
      '铺上麦片',
      '放上蓝莓草莓',
      '淋少许蜂蜜'
    ],
    tags: ['早餐', '快手', '高蛋白']
  },

  // ==================== 更多中式减脂餐 ====================
  {
    id: 66, name: '芹菜炒牛肉', category: 'diet',
    ingredients: ['牛肉', '芹菜', '干辣椒', '蒜', '生抽', '料酒'],
    calories: 300, protein: 32, carbs: 14, fat: 12,
    time: '15分钟', difficulty: '简单',
    steps: [
      '牛肉切丝用料酒生抽腌制',
      '芹菜切段',
      '大火爆炒牛肉至变色盛出',
      '同锅炒芹菜，倒回牛肉翻匀'
    ],
    tags: ['高蛋白', '家常', '快手']
  },
  {
    id: 67, name: '地三鲜（少油版）', category: 'diet',
    ingredients: ['茄子', '土豆', '青椒', '蒜', '生抽', '蚝油'],
    calories: 240, protein: 6, carbs: 38, fat: 8,
    time: '20分钟', difficulty: '中等',
    steps: [
      '茄子土豆青椒切块',
      '土豆茄子微波炉叮 3 分钟预熟',
      '锅中少油炒香蒜片',
      '加所有蔬菜翻炒，生抽蚝油调味'
    ],
    tags: ['素菜', '家常', '少油']
  },
  {
    id: 68, name: '清炒时蔬', category: 'diet',
    ingredients: ['西兰花', '胡萝卜', '木耳', '蒜', '盐', '蚝油'],
    calories: 120, protein: 6, carbs: 18, fat: 3,
    time: '10分钟', difficulty: '简单',
    steps: [
      '西兰花掰小朵，胡萝卜切片，木耳泡发',
      '所有蔬菜焯水 1 分钟',
      '蒜片爆香',
      '蔬菜入锅大火翻炒，盐蚝油调味'
    ],
    tags: ['低卡', '素菜', '快手']
  },
  {
    id: 69, name: '宫保鸡丁（减脂版）', category: 'diet',
    ingredients: ['鸡胸肉', '花生米', '黄瓜', '干辣椒', '蒜', '生抽', '醋', '淀粉'],
    calories: 360, protein: 36, carbs: 16, fat: 18,
    time: '20分钟', difficulty: '中等',
    steps: [
      '鸡胸肉切丁用生抽淀粉腌制',
      '黄瓜切丁，花生米烤箱烤脆',
      '少油炒鸡丁至变色',
      '加干辣椒蒜片黄瓜翻炒，生抽+醋+少许糖调味，最后拌入花生米'
    ],
    tags: ['高蛋白', '经典', '下饭']
  },
  {
    id: 70, name: '蒜蓉蒸茄子', category: 'diet',
    ingredients: ['茄子', '蒜', '生抽', '醋', '香油', '葱花', '辣椒'],
    calories: 100, protein: 3, carbs: 14, fat: 4,
    time: '15分钟', difficulty: '简单',
    steps: [
      '茄子对半切开，蒸 10 分钟至软',
      '蒜剁成蓉，加生抽醋香油调汁',
      '茄子撕成条',
      '淋上酱汁，撒葱花辣椒'
    ],
    tags: ['低卡', '素菜', '快手']
  },

  // ==================== 减脂晚餐轻食 ====================
  {
    id: 71, name: '魔芋凉皮', category: 'diet',
    ingredients: ['魔芋', '黄瓜', '豆芽', '香菜', '蒜', '辣椒油', '醋', '生抽'],
    calories: 120, protein: 4, carbs: 16, fat: 4,
    time: '10分钟', difficulty: '简单',
    steps: [
      '魔芋切条焯水',
      '黄瓜切丝，豆芽焯水',
      '所有材料混合',
      '加蒜泥+辣椒油+醋+生抽拌匀'
    ],
    tags: ['低卡', '凉拌', '轻食']
  },
  {
    id: 72, name: '蔬菜沙拉碗', category: 'diet',
    ingredients: ['生菜', '番茄', '黄瓜', '玉米粒', '鸡胸肉', '牛油果', '油醋汁'],
    calories: 320, protein: 28, carbs: 24, fat: 14,
    time: '10分钟', difficulty: '简单',
    steps: [
      '生菜撕碎铺碗底',
      '番茄黄瓜牛油果切片',
      '鸡胸肉切条',
      '所有食材摆好，淋油醋汁'
    ],
    tags: ['沙拉', '轻食', '高蛋白']
  },
  {
    id: 73, name: '味噌汤', category: 'diet',
    ingredients: ['味噌', '嫩豆腐', '海带', '葱', '水'],
    calories: 80, protein: 6, carbs: 10, fat: 2,
    time: '10分钟', difficulty: '简单',
    steps: [
      '海带泡发切小',
      '水烧开加海带煮 3 分钟',
      '豆腐切小块放入',
      '关火后融入味噌（不要煮沸腾），撒葱花'
    ],
    tags: ['低卡', '暖汤', '日式']
  },
  {
    id: 74, name: '烤蔬菜拼盘', category: 'diet',
    ingredients: ['南瓜', '西兰花', '彩椒', '口蘑', '橄榄油', '盐', '黑胡椒', '迷迭香'],
    calories: 200, protein: 8, carbs: 28, fat: 8,
    time: '30分钟', difficulty: '简单',
    steps: [
      '所有蔬菜切块',
      '橄榄油+盐+黑胡椒+迷迭香拌匀',
      '烤箱 200°C',
      '烤 20-25 分钟至边缘微焦'
    ],
    tags: ['低卡', '西式', '素']
  },
  {
    id: 75, name: '鸡肉凯撒沙拉', category: 'diet',
    ingredients: ['鸡胸肉', '罗马生菜', '面包丁', '帕玛森芝士', '凯撒酱', '柠檬'],
    calories: 340, protein: 35, carbs: 18, fat: 16,
    time: '15分钟', difficulty: '简单',
    steps: [
      '鸡胸肉煎熟切片',
      '生菜撕碎',
      '面包丁烤脆',
      '生菜+鸡肉+面包丁+芝士碎，淋凯撒酱挤柠檬汁'
    ],
    tags: ['沙拉', '高蛋白', '经典']
  },

  // ==================== 更多美味 ====================
  {
    id: 76, name: '葱油拌面', category: 'cheat',
    ingredients: ['面条', '葱', '生抽', '老抽', '糖', '油'],
    calories: 480, protein: 12, carbs: 55, fat: 22,
    time: '15分钟', difficulty: '简单',
    steps: [
      '葱切段，小火慢炸至焦黄',
      '面条煮熟沥干',
      '炸好的葱油+生抽+老抽+糖拌匀',
      '浇在面上，放炸葱段'
    ],
    tags: ['放纵餐', '面条', '经典']
  },
  {
    id: 77, name: '肉末茄子煲', category: 'cheat',
    ingredients: ['茄子', '猪肉末', '蒜', '豆瓣酱', '生抽', '葱'],
    calories: 420, protein: 18, carbs: 24, fat: 28,
    time: '20分钟', difficulty: '简单',
    steps: [
      '茄子切条',
      '多油煎茄子至软盛出',
      '锅留底油炒香肉末+豆瓣酱+蒜',
      '倒回茄子翻匀，小火焖 5 分钟'
    ],
    tags: ['放纵餐', '下饭', '家常']
  },
  {
    id: 78, name: '照烧鸡腿', category: 'diet',
    ingredients: ['鸡腿', '生抽', '蜂蜜', '料酒', '姜', '蒜'],
    calories: 380, protein: 35, carbs: 18, fat: 18,
    time: '25分钟', difficulty: '中等',
    steps: [
      '鸡腿去骨，用叉子扎孔方便入味',
      '生抽+蜂蜜+料酒+姜蒜调成照烧汁腌制 15 分钟',
      '平底锅小火，皮朝下煎至金黄',
      '翻面，倒入剩余酱汁收浓'
    ],
    tags: ['高蛋白', '日式', '美味']
  },
  {
    id: 79, name: '酸辣土豆丝', category: 'diet',
    ingredients: ['土豆', '干辣椒', '醋', '蒜', '盐', '花椒'],
    calories: 160, protein: 3, carbs: 32, fat: 3,
    time: '10分钟', difficulty: '简单',
    steps: [
      '土豆切细丝泡水去淀粉',
      '花椒干辣椒爆香',
      '大火快炒土豆丝 2 分钟',
      '加醋和盐翻炒均匀出锅'
    ],
    tags: ['低卡', '快手', '家常']
  },
  {
    id: 80, name: '烤鸡腿配蔬菜', category: 'diet',
    ingredients: ['鸡腿', '土豆', '胡萝卜', '洋葱', '蒜', '橄榄油', '迷迭香', '盐'],
    calories: 450, protein: 35, carbs: 32, fat: 18,
    time: '45分钟', difficulty: '简单',
    steps: [
      '鸡腿划刀用盐迷迭香腌制',
      '土豆胡萝卜洋葱切块',
      '所有食材铺烤盘，淋橄榄油',
      '烤箱 200°C 烤 35-40 分钟'
    ],
    tags: ['高蛋白', '烤箱菜', '简单']
  }
];
