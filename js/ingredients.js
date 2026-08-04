// 食材データベース: レシピ自動生成の材料となる、身近な食材と栄養情報
// category: protein(肉・魚・卵・大豆製品) / vegetable / mushroom / seaweed / bean(豆・大豆加工品) / fruit / dairy / carb
const INGREDIENTS = [
  // --- protein ---
  { id: "chicken-breast", name: "鶏むね肉", emoji: "🍗", category: "protein", qty: "100g", kcal: 110, tags: ["fatigue", "diet"],
    nutrients: [
      { name: "イミダゾールジペプチド", effect: "抗酸化作用を持ち、疲労感の軽減に役立つとされる成分です。" },
      { name: "高たんぱく・低脂質", effect: "筋肉の材料になる良質なたんぱく質を、脂質を抑えて摂取できます。" },
    ] },
  { id: "chicken-thigh", name: "鶏もも肉", emoji: "🍗", category: "protein", qty: "100g", kcal: 200, tags: ["fatigue"],
    nutrients: [
      { name: "良質なたんぱく質", effect: "筋肉や皮膚など体の組織を作る材料になります。" },
      { name: "ビタミンB群", effect: "糖質・脂質のエネルギー代謝を助け、疲労回復をサポートします。" },
    ] },
  { id: "pork-thin", name: "豚こま肉", emoji: "🥩", category: "protein", qty: "100g", kcal: 210, tags: ["fatigue"],
    nutrients: [
      { name: "ビタミンB1", effect: "糖質をエネルギーに変える代謝に不可欠で、不足すると疲労感につながりやすい栄養素です。" },
    ] },
  { id: "beef-thin", name: "牛こま肉", emoji: "🥩", category: "protein", qty: "100g", kcal: 220, tags: ["bone", "immune"],
    nutrients: [
      { name: "鉄分", effect: "赤血球のヘモグロビンの材料となり、貧血予防に役立ちます。" },
      { name: "亜鉛", effect: "新陳代謝や免疫機能の維持に関わるミネラルです。" },
    ] },
  { id: "salmon", name: "生鮭", emoji: "🐟", category: "protein", qty: "1切れ", kcal: 130, tags: ["skin", "eye"],
    nutrients: [
      { name: "アスタキサンチン", effect: "強い抗酸化力を持ち、紫外線などによる肌ダメージのケアに役立つとされています。" },
      { name: "オメガ3脂肪酸", effect: "血液をサラサラに保つ働きが知られ、巡りの良い体づくりをサポートします。" },
    ] },
  { id: "mackerel", name: "さば", emoji: "🐟", category: "protein", qty: "1/2切れ", kcal: 105, tags: ["eye", "bone"],
    nutrients: [
      { name: "DHA・EPA", effect: "血流の健康維持に関わるとされ、目の網膜の健康にも関与すると言われる脂肪酸です。" },
      { name: "ビタミンD", effect: "カルシウムの吸収を助け、骨の健康に関わります。" },
    ] },
  { id: "tuna-can", name: "ツナ缶", emoji: "🐟", category: "protein", qty: "1缶", kcal: 120, tags: ["eye", "diet"],
    nutrients: [
      { name: "DHA・EPA", effect: "血液をサラサラに保つ働きが知られる脂肪酸です。" },
      { name: "高たんぱく質", effect: "少量でもしっかりたんぱく質を補給できます。" },
    ] },
  { id: "egg", name: "卵", emoji: "🥚", category: "protein", qty: "2個", kcal: 150, tags: ["skin", "fatigue"],
    nutrients: [
      { name: "良質なたんぱく質", effect: "必須アミノ酸をバランス良く含み、体づくりの材料になります。" },
      { name: "ビタミンB群", effect: "たんぱく質や脂質の代謝を助けます。" },
    ] },
  { id: "tofu", name: "豆腐", emoji: "🍲", category: "protein", qty: "1/2丁", kcal: 105, tags: ["bone", "diet"],
    nutrients: [
      { name: "大豆イソフラボン", effect: "女性ホルモンに似た働きをするとされ、骨の健康維持をサポートすると考えられています。" },
      { name: "低カロリー・高たんぱく", effect: "カロリーを抑えながらたんぱく質を補給できます。" },
    ] },
  { id: "natto", name: "納豆", emoji: "🫘", category: "protein", qty: "1パック", kcal: 90, tags: ["gut", "bone"],
    nutrients: [
      { name: "ナットウキナーゼ", effect: "発酵の過程で作られる酵素で、血流の健康維持に関わるとされています。" },
      { name: "ビタミンK2", effect: "骨の形成に関わる栄養素です。" },
    ] },

  // --- vegetable ---
  { id: "cabbage", name: "キャベツ", emoji: "🥬", category: "vegetable", qty: "2枚", kcal: 15, tags: ["gut", "diet"],
    nutrients: [
      { name: "ビタミンU（キャベジン）", effect: "胃の粘膜を保護し、修復を助ける働きがあるとされています。" },
      { name: "食物繊維", effect: "腸内環境を整え、便通をサポートします。" },
    ] },
  { id: "carrot", name: "にんじん", emoji: "🥕", category: "vegetable", qty: "1/2本", kcal: 25, tags: ["eye", "skin"],
    nutrients: [
      { name: "β-カロテン", effect: "体内でビタミンAに変換され、目や皮膚の粘膜の健康維持に役立ちます。" },
    ] },
  { id: "spinach", name: "ほうれん草", emoji: "🥬", category: "vegetable", qty: "1/2束", kcal: 20, tags: ["bone", "skin"],
    nutrients: [
      { name: "鉄分", effect: "貧血予防に役立つミネラルです。" },
      { name: "ビタミンA", effect: "目や皮膚の粘膜を健康に保つ働きがあります。" },
    ] },
  { id: "beansprout", name: "もやし", emoji: "🌱", category: "vegetable", qty: "1袋", kcal: 30, tags: ["fatigue", "diet"],
    nutrients: [
      { name: "アスパラギン酸", effect: "エネルギー代謝を助けるアミノ酸で、疲労回復サポートに使われる成分です。" },
      { name: "低カロリー", effect: "かさ増しにも使え、食べ過ぎ防止に役立ちます。" },
    ] },
  { id: "onion", name: "玉ねぎ", emoji: "🧅", category: "vegetable", qty: "1/2個", kcal: 35, tags: ["gut", "fatigue"],
    nutrients: [
      { name: "硫化アリル", effect: "血流のサポートに関わるとされる香り成分です。" },
      { name: "オリゴ糖", effect: "腸内の善玉菌のエサとなり、腸内環境を整えます。" },
    ] },
  { id: "bellpepper", name: "ピーマン", emoji: "🫑", category: "vegetable", qty: "2個", kcal: 15, tags: ["skin", "immune"],
    nutrients: [
      { name: "ビタミンC", effect: "熱に強く、コラーゲンの生成をサポートします。" },
      { name: "β-カロテン", effect: "皮膚や粘膜の健康維持に役立ちます。" },
    ] },
  { id: "broccoli", name: "ブロッコリー", emoji: "🥦", category: "vegetable", qty: "1/4株", kcal: 25, tags: ["immune", "skin"],
    nutrients: [
      { name: "ビタミンC", effect: "免疫細胞の働きをサポートし、肌のコラーゲン生成にも関わります。" },
      { name: "スルフォラファン", effect: "抗酸化作用があるとされる成分です。" },
    ] },
  { id: "tomato", name: "トマト", emoji: "🍅", category: "vegetable", qty: "1個", kcal: 30, tags: ["skin", "immune"],
    nutrients: [
      { name: "リコピン", effect: "強い抗酸化作用を持ち、紫外線などによる肌ダメージケアに役立つとされています。" },
      { name: "ビタミンC", effect: "コラーゲン生成や免疫の働きをサポートします。" },
    ] },
  { id: "cucumber", name: "きゅうり", emoji: "🥒", category: "vegetable", qty: "1本", kcal: 14, tags: ["diet"],
    nutrients: [
      { name: "カリウム", effect: "体内の余分な塩分の排出を助け、むくみ対策に役立つとされています。" },
    ] },
  { id: "daikon", name: "大根", emoji: "🥗", category: "vegetable", qty: "5cm", kcal: 25, tags: ["gut"],
    nutrients: [
      { name: "消化酵素（アミラーゼ）", effect: "でんぷんの消化をサポートする働きがあるとされています。" },
      { name: "ビタミンC", effect: "抗酸化作用のある栄養素です。" },
    ] },
  { id: "eggplant", name: "なす", emoji: "🍆", category: "vegetable", qty: "1本", kcal: 20, tags: ["gut", "skin"],
    nutrients: [
      { name: "ナスニン", effect: "皮の紫色に含まれる抗酸化ポリフェノールです。" },
      { name: "食物繊維", effect: "腸内環境を整える働きがあります。" },
    ] },
  { id: "zucchini", name: "ズッキーニ", emoji: "🥒", category: "vegetable", qty: "1/2本", kcal: 14, tags: ["diet"],
    nutrients: [
      { name: "カリウム", effect: "むくみ対策に役立つとされるミネラルです。" },
      { name: "低カロリー", effect: "満足感を保ちながら摂取カロリーを抑えやすい食材です。" },
    ] },
  { id: "komatsuna", name: "小松菜", emoji: "🥬", category: "vegetable", qty: "1/2束", kcal: 14, tags: ["bone"],
    nutrients: [
      { name: "カルシウム", effect: "骨の健康維持に欠かせないミネラルです。" },
      { name: "鉄分", effect: "貧血予防に役立ちます。" },
    ] },
  { id: "lotus-root", name: "れんこん", emoji: "🥗", category: "vegetable", qty: "5cm", kcal: 55, tags: ["gut", "immune"],
    nutrients: [
      { name: "食物繊維", effect: "腸内環境を整える働きがあります。" },
      { name: "ビタミンC", effect: "免疫の働きをサポートします。" },
    ] },

  // --- mushroom ---
  { id: "shimeji", name: "しめじ", emoji: "🍄", category: "mushroom", qty: "1/2株", kcal: 10, tags: ["sugar", "immune"],
    nutrients: [
      { name: "β-グルカン", effect: "糖質の吸収スピードを緩やかにし、食後血糖値の急上昇を抑える働きがあるとされています。" },
      { name: "ビタミンD", effect: "カルシウムの吸収を助けます。" },
    ] },
  { id: "enoki", name: "えのき", emoji: "🍄", category: "mushroom", qty: "1/2袋", kcal: 15, tags: ["gut"],
    nutrients: [
      { name: "食物繊維", effect: "腸内の善玉菌のエサになり、便通をサポートします。" },
      { name: "ナイアシン", effect: "エネルギー代謝を助けるビタミンです。" },
    ] },
  { id: "maitake", name: "まいたけ", emoji: "🍄", category: "mushroom", qty: "1/2パック", kcal: 10, tags: ["immune", "bone"],
    nutrients: [
      { name: "β-グルカン", effect: "免疫の働きをサポートするとされる食物繊維です。" },
      { name: "ビタミンD", effect: "骨の健康に関わる栄養素です。" },
    ] },
  { id: "shiitake", name: "しいたけ", emoji: "🍄", category: "mushroom", qty: "2枚", kcal: 10, tags: ["gut"],
    nutrients: [
      { name: "エリタデニン", effect: "血流の健康維持に関わるとされる成分です。" },
      { name: "食物繊維", effect: "腸内環境を整えます。" },
    ] },

  // --- seaweed ---
  { id: "wakame", name: "わかめ", emoji: "🌊", category: "seaweed", qty: "大さじ1(乾燥)", kcal: 5, tags: ["bone", "gut"],
    nutrients: [
      { name: "カルシウム・ヨウ素", effect: "骨の健康や、代謝に関わる甲状腺ホルモンの材料になります。" },
      { name: "水溶性食物繊維", effect: "腸内環境を整える働きがあります。" },
    ] },
  { id: "hijiki", name: "ひじき", emoji: "🌊", category: "seaweed", qty: "10g(乾燥)", kcal: 15, tags: ["bone", "gut"],
    nutrients: [
      { name: "鉄分・カルシウム", effect: "貧血予防や骨密度の維持に役立つとされています。" },
      { name: "食物繊維", effect: "便のかさを増やし、便通を整える助けになります。" },
    ] },
  { id: "nori", name: "焼きのり", emoji: "🍙", category: "seaweed", qty: "1枚", kcal: 5, tags: ["immune", "skin"],
    nutrients: [
      { name: "β-カロテン・ビタミンC", effect: "皮膚や粘膜の健康、免疫の働きをサポートします。" },
      { name: "ミネラル", effect: "微量ながら多様なミネラルを補給できます。" },
    ] },

  // --- bean ---
  { id: "soybean", name: "蒸し大豆", emoji: "🫘", category: "bean", qty: "50g", kcal: 85, tags: ["bone", "diet"],
    nutrients: [
      { name: "大豆たんぱく質", effect: "骨を作るコラーゲンの材料にもなる良質なたんぱく質です。" },
      { name: "イソフラボン", effect: "骨からのカルシウム流出を抑える働きが期待されています。" },
    ] },
  { id: "chickpea", name: "ひよこ豆", emoji: "🫘", category: "bean", qty: "50g(水煮)", kcal: 75, tags: ["gut", "diet"],
    nutrients: [
      { name: "食物繊維", effect: "腸内環境を整え、満腹感の持続にも役立ちます。" },
      { name: "植物性たんぱく質", effect: "低脂質にたんぱく質を補給できます。" },
    ] },
  { id: "edamame", name: "枝豆", emoji: "🫛", category: "bean", qty: "50g(さやなし)", kcal: 65, tags: ["fatigue"],
    nutrients: [
      { name: "ビタミンB1", effect: "糖質の代謝を助け、疲労回復をサポートします。" },
      { name: "大豆たんぱく質", effect: "体づくりに役立つ良質なたんぱく質です。" },
    ] },
  { id: "atsuage", name: "厚揚げ", emoji: "🍢", category: "bean", qty: "1/2枚", kcal: 115, tags: ["bone", "diet"],
    nutrients: [
      { name: "良質なたんぱく質", effect: "豆腐よりも凝縮された形で摂取できます。" },
      { name: "カルシウム", effect: "骨の健康維持に役立ちます。" },
    ] },

  // --- fruit ---
  { id: "banana", name: "バナナ", emoji: "🍌", category: "fruit", qty: "1本", kcal: 90, tags: ["fatigue", "gut"],
    nutrients: [
      { name: "カリウム", effect: "余分な塩分の排出を助け、むくみ対策に役立つとされています。" },
      { name: "ビタミンB群", effect: "糖質からのエネルギー産生を助けます。" },
    ] },
  { id: "apple", name: "りんご", emoji: "🍎", category: "fruit", qty: "1/2個", kcal: 65, tags: ["gut", "skin"],
    nutrients: [
      { name: "ペクチン（食物繊維）", effect: "腸内環境を整える水溶性食物繊維です。" },
      { name: "ポリフェノール", effect: "抗酸化作用があるとされています。" },
    ] },
  { id: "strawberry", name: "いちご", emoji: "🍓", category: "fruit", qty: "5粒", kcal: 25, tags: ["skin", "immune"],
    nutrients: [
      { name: "ビタミンC", effect: "コラーゲン生成をサポートし、免疫の働きにも関わります。" },
      { name: "食物繊維", effect: "腸内環境を整えます。" },
    ] },
  { id: "kiwi", name: "キウイ", emoji: "🥝", category: "fruit", qty: "1個", kcal: 45, tags: ["immune", "gut"],
    nutrients: [
      { name: "ビタミンC", effect: "1個で免疫サポートに役立つ量を摂取しやすい果物です。" },
      { name: "食物繊維・酵素", effect: "消化のサポートに役立つとされています。" },
    ] },
  { id: "orange", name: "オレンジ", emoji: "🍊", category: "fruit", qty: "1個", kcal: 70, tags: ["immune", "fatigue"],
    nutrients: [
      { name: "ビタミンC", effect: "免疫の働きと肌の健康をサポートします。" },
      { name: "クエン酸", effect: "疲労回復のサポートに役立つとされる成分です。" },
    ] },
  { id: "blueberry", name: "ブルーベリー", emoji: "🫐", category: "fruit", qty: "大さじ2", kcal: 10, tags: ["eye", "skin"],
    nutrients: [
      { name: "アントシアニン", effect: "目の健康維持に役立つとされる抗酸化色素です。" },
      { name: "食物繊維", effect: "腸内環境を整えます。" },
    ] },

  // --- dairy ---
  { id: "yogurt", name: "ヨーグルト", emoji: "🥛", category: "dairy", qty: "100g", kcal: 60, tags: ["gut", "bone"],
    nutrients: [
      { name: "乳酸菌", effect: "腸内の善玉菌を増やし、腸内フローラのバランスを整える助けになります。" },
      { name: "カルシウム", effect: "骨の健康維持に役立ちます。" },
    ] },
  { id: "milk", name: "牛乳", emoji: "🥛", category: "dairy", qty: "100ml", kcal: 65, tags: ["bone"],
    nutrients: [
      { name: "カルシウム", effect: "骨や歯の形成に欠かせないミネラルです。" },
      { name: "良質なたんぱく質", effect: "体づくりの材料になります。" },
    ] },
  { id: "cheese", name: "チーズ", emoji: "🧀", category: "dairy", qty: "1枚", kcal: 60, tags: ["bone"],
    nutrients: [
      { name: "カルシウム・たんぱく質", effect: "骨と筋肉の両方の材料を効率よく補給できます。" },
    ] },

  // --- carb ---
  { id: "sweetpotato", name: "さつまいも", emoji: "🍠", category: "carb", qty: "1/2本", kcal: 130, tags: ["gut", "skin"],
    nutrients: [
      { name: "食物繊維・ヤラピン", effect: "腸のぜん動運動を促し、便通を助けると言われています。" },
      { name: "ビタミンC", effect: "でんぷんに守られ加熱による損失が少ないのが特徴です。" },
    ] },
  { id: "potato", name: "じゃがいも", emoji: "🥔", category: "carb", qty: "1個", kcal: 75, tags: ["immune", "diet"],
    nutrients: [
      { name: "ビタミンC", effect: "加熱に強く、効率よく摂取できます。" },
      { name: "カリウム", effect: "むくみ対策に役立つとされています。" },
    ] },
  { id: "pumpkin", name: "かぼちゃ", emoji: "🎃", category: "carb", qty: "1/8個", kcal: 135, tags: ["immune", "skin"],
    nutrients: [
      { name: "β-カロテン", effect: "皮膚や粘膜の健康維持、免疫サポートに役立ちます。" },
      { name: "食物繊維", effect: "腸内環境を整えます。" },
    ] },
  { id: "brownrice", name: "玄米ごはん", emoji: "🍚", category: "carb", qty: "1膳", kcal: 250, tags: ["gut", "fatigue"],
    nutrients: [
      { name: "食物繊維", effect: "白米に比べて豊富で、腸内環境を整えます。" },
      { name: "ビタミンB1", effect: "糖質代謝を助け、疲労回復をサポートします。" },
    ] },
];
