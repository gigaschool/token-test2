/**
 * Ando-san's 8-Bit World Data Configuration
 */

const ANDO_DATA = {
  profile: {
    name: "あんどうさん (ANDO-SAN)",
    role: "8-Bit 癒やし系マスコット & ゆるふわエンジニア",
    phrase: "「ぷにっ♪ 今日も一日、のんびり笑顔でいこうね！」",
    stats: [
      { label: "癒やしパワー", value: "9999", unit: "pts" },
      { label: "ぷにぷに度", value: "1000", unit: "%" },
      { label: "愛され歴", value: "8", unit: "Bit" },
      { label: "笑顔の眩しさ", value: "MAX", unit: "✨" }
    ],
    hobbies: ["どら焼きの食べ比べ", "日向ぼっこ", "ドット絵コードの鑑賞", "お茶を淹れること"]
  },

  fortunes: [
    { rank: "🌸 超大吉 🌸", message: "今日は最高の1日になるよ！甘いどら焼きを食べると運気爆上がり♪", color: "#ff477e" },
    { rank: "✨ 大吉 ✨", message: "あんどうさんがあなたの味方！焦らず笑顔でのんびり進もうね！", color: "#00f5d4" },
    { rank: "⭐ 中吉 ⭐", message: "新しい発見があるかも！休憩中においしいお茶を飲んでみてね。", color: "#ffb703" },
    { rank: "🍀 吉 🍀", message: "静かで平和な良い日。あんどうさんの笑顔パワーを分けてあげるね！", color: "#a855f7" },
    { rank: "💖 あんどう吉 💖", message: "あんどうさんと目が合ったあなた！今日はとにかくラッキーだよ！", color: "#ff85a1" }
  ],

  quotes: [
    "ぷにっ💕 なでなでしてくれてありがとう！",
    "えへへ♪ あんどうさんは今日も元気だよ！",
    "バグが出ても大丈夫！深呼吸してみようね 🍵",
    "きみのこと、いつでも応援してるからね！✨",
    "今日のおやつは何かな〜？どら焼きかな〜？",
    "なでなでメーター上昇中！ありがと〜！"
  ],

  items: [
    {
      id: "item-1",
      name: "名物 ぷにぷにどら焼き",
      icon: "assets/images/ando-dorayaki.jpg",
      isImage: true,
      desc: "あんどうさんの大好物！皮はもちもち、あんはほどよい甘さの極上品。",
      rarity: "Legendary 🌟"
    },
    {
      id: "item-2",
      name: "8-Bit ハートの結晶",
      icon: "💖",
      isImage: false,
      desc: "あんどうさんを撫でると溢れ出るとっても温かいハート。",
      rarity: "Super Rare ✨"
    },
    {
      id: "item-3",
      name: "特製 ほっこり緑茶",
      icon: "🍵",
      isImage: false,
      desc: "一口飲むだけで日頃の疲れがすーっと吹き飛ぶ魔法のお茶。",
      rarity: "Rare 🍀"
    },
    {
      id: "item-4",
      name: "ピカピカネクタイ",
      icon: "👔",
      isImage: false,
      desc: "あんどうさんのチャームポイント！結び目がいつでも100点満点。",
      rarity: "Special 🎀"
    }
  ]
};
