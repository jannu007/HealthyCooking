// 調理法テンプレート: 食材データベースと組み合わせて大量のレシピを自動生成する
const DISH_TEMPLATES = [
  {
    id: "soup",
    time: "15分",
    poolA: ["protein", "bean", "seaweed"],
    poolB: ["vegetable", "mushroom", "seaweed"],
    extraIngredients: ["だし汁 400ml", "味噌 大さじ2"],
    nameFn: (a, b) => `${a.name}と${b.name}の味噌汁`,
    stepsFn: (a, b) => [
      "鍋にだし汁を入れて温める。",
      `${a.name}と${b.name}を食べやすい大きさに切る（乾物は水で戻しておく）。`,
      `だしが温まったら${a.name}と${b.name}を加え、煮立たせすぎないように加熱する。`,
      "火を止めて味噌を溶き入れたら完成。",
    ],
  },
  {
    id: "stirfry",
    time: "15分",
    poolA: ["protein", "bean"],
    poolB: ["vegetable", "mushroom", "carb"],
    extraIngredients: ["醤油 小さじ2", "ごま油 適量"],
    nameFn: (a, b) => `${a.name}と${b.name}の炒め物`,
    stepsFn: (a, b) => [
      `${a.name}と${b.name}を一口大に切る。`,
      `フライパンにごま油を熱し、${a.name}を炒める。`,
      `火が通ってきたら${b.name}を加えてさらに炒め合わせる。`,
      "醤油で味を調えて完成。",
    ],
  },
  {
    id: "salad",
    time: "10分",
    poolA: ["vegetable", "bean"],
    poolB: ["vegetable", "bean"],
    extraIngredients: ["オリーブオイル・塩こしょう 適量"],
    nameFn: (a, b) => `${a.name}と${b.name}のサラダ`,
    stepsFn: (a, b) => [
      `${a.name}と${b.name}を食べやすい大きさに切る（加熱が必要なものは下茹でする）。`,
      "ボウルに入れ、オリーブオイルと塩こしょうで和える。",
      "器に盛り付けて完成。",
    ],
  },
  {
    id: "simmered",
    time: "25分",
    poolA: ["protein", "bean"],
    poolB: ["vegetable", "carb", "seaweed"],
    extraIngredients: ["だし汁 150ml", "醤油・みりん 各大さじ1"],
    nameFn: (a, b) => `${a.name}と${b.name}の煮物`,
    stepsFn: (a, b) => [
      `${a.name}と${b.name}を一口大に切る（乾物は戻しておく）。`,
      `鍋にだし汁、${a.name}、${b.name}を入れて煮立たせる。`,
      "醤油とみりんを加え、弱火で汁気が少なくなるまでじっくり煮て完成。",
    ],
  },
  {
    id: "smoothie",
    time: "5分",
    poolA: ["fruit"],
    poolB: ["fruit", "dairy"],
    extraIngredients: [],
    nameFn: (a, b) => `${a.name}と${b.name}のスムージー`,
    stepsFn: (a, b) => [
      `${a.name}と${b.name}を適当な大きさに切る。`,
      "ミキサーに入れ、なめらかになるまで撹拌する。",
      "グラスに注いで完成。",
    ],
  },
  {
    id: "aemono",
    time: "10分",
    poolA: ["vegetable"],
    poolB: ["seaweed", "bean"],
    extraIngredients: ["ポン酢または白だし 適量"],
    nameFn: (a, b) => `${a.name}と${b.name}の和え物`,
    stepsFn: (a, b) => [
      `${a.name}は食べやすく切って軽く茹でる。`,
      `粗熱を取り、${b.name}と合わせる。`,
      "ポン酢や白だしで和えて完成。",
    ],
  },
];

function uniq(arr) {
  return [...new Set(arr)];
}

function buildSummary(tags, a, b) {
  const labels = tags.map((t) => HEALTH_TAGS[t].label);
  if (labels.length >= 2) {
    return `${labels[0]}と${labels[1]}が期待できる、${a.name}と${b.name}の組み合わせ。`;
  }
  return `${labels[0]}が期待できる、${a.name}と${b.name}の組み合わせ。`;
}

function buildRecipeFromPair(template, a, b) {
  const tags = uniq([...a.tags, ...b.tags]).slice(0, 3);
  const nutrientNames = uniq([
    ...a.nutrients.map((n) => n.name),
    ...b.nutrients.map((n) => n.name),
  ]).slice(0, 4);

  const details = [
    ...a.nutrients.map((n) => `${a.name}に含まれる${n.name}は、${n.effect}`),
    ...b.nutrients.map((n) => `${b.name}に含まれる${n.name}は、${n.effect}`),
  ].slice(0, 4);

  return {
    id: `gen-${template.id}-${a.id}-${b.id}`,
    name: template.nameFn(a, b),
    emoji: a.emoji,
    time: template.time,
    tags,
    ingredients: [`${a.name} ${a.qty}`, `${b.name} ${b.qty}`, ...template.extraIngredients],
    steps: template.stepsFn(a, b),
    nutrients: nutrientNames,
    effect: {
      summary: buildSummary(tags, a, b),
      details,
    },
  };
}

function generateCombinatorialRecipes() {
  const seen = new Set();
  const recipes = [];

  DISH_TEMPLATES.forEach((template) => {
    const poolA = INGREDIENTS.filter((i) => template.poolA.includes(i.category));
    const poolB = INGREDIENTS.filter((i) => template.poolB.includes(i.category));

    poolA.forEach((a) => {
      poolB.forEach((b) => {
        if (a.id === b.id) return;
        const key = `${template.id}::${[a.id, b.id].sort().join("-")}`;
        if (seen.has(key)) return;
        seen.add(key);
        recipes.push(buildRecipeFromPair(template, a, b));
      });
    });
  });

  return recipes;
}
