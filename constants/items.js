const itemCodeToNameEntries = [
  ['01', 'Thread'],
  ['02', 'Stick'],
  ['03', 'Pelt'],
  ['04', 'Bone'],
  ['05', 'Coal'],
  ['06', 'Charcoal'],
  ['07', 'Powder'],
  ['08', 'Iron ore'],
  ['09', 'Cloth'],
  ['10', 'Silver ore'],
  ['11', 'Bauxite'],
  ['12', 'Cord'],
  ['13', 'Magic stone'],
  ['14', 'Wooden shaft'],
  ['15', 'Sapphire'],
  ['16', 'Solvent'],
  ['17', 'Ruby'],
  ['18', 'Hardener'],
  ['19', 'Steel'],
  ['20', 'Leather'],
  ['21', 'Bone powder'],
  ['22', 'String'],
  ['23', 'Coke'],
  ['24', 'Purified powder'],
  ['25', 'Silver alloy'],
  ['27', 'Steel mold'],
  ['28', 'Silver mold'],
  ['29', 'Blacksmith frame'],
  ['30', 'Artisan frame'],
  ['31', 'Rope'],
  ['32', 'Silver frame'],
  ['33', 'Metal plate'],
  ['34', 'Metallic fiber'],
  ['35', 'Crafted leather'],
  ['36', 'Quality Cloth'],
  ['37', 'Blacksmith Mold'],
  ['38', 'Artisan Mold'],
  ['39', 'Stinky Sumac'],
  ['40', 'Mercy Sassafras'],
  ['41', 'Cliff Rue'],
  ['42', 'Love Creeper'],
  ['43', 'Wolf Root'],
  ['44', 'Swamp Lavender'],
  ['45', 'White Blossom'],
  ['46', 'Ilaves'],
  ['47', 'Ephijora'],
  ['48', 'Storm Hyssop'],
  ['49', 'Cave Garlic'],
  ['50', 'Yellow Seed'],
  ['51', 'Tecceagrass'],
  ['52', 'Spring Bay Leaf'],
  ['53', 'Ash Rosemary'],
  ['54', 'Sanguine Parsley'],
  ['55', 'Sun Tarragon'],
  ['56', 'Maccunut'],
  ['57', 'Dragon Seed'],
  ['58', 'Queen\'s Pepper'],
  ['59', 'Plasma of abyss'],
  ['60', 'Ultramarine dust'],
  ['61', 'Ethereal bone'],
  ['62', 'Itacory'],
  ['63', 'Assassin Vine'],
  ['64', 'Kloliarway'],
  ['65', 'Astrulic'],
  ['66', 'Flammia Nut'],
  ['67', 'Plexisop'],
  ['68', 'Mammoth Dill'],
  ['69', 'Silver dust'],

  ['100', 'Pouch of gold'],
  ['501', 'Wrapping'],
  ['502', 'Leash'],

  ['504', 'Wooden arrows'],
  ['505', 'Wooden arrows pack'],
  ['506', 'Bottle of Remedy'],
  ['507', 'Remedy pack'],
  ['508', 'Bottle of Poison'],
  ['509', 'Poison pack'],
  ['510', 'Steel arrows'],
  ['511', 'Steel arrows pack'],
  ['512', 'Silver arrows'],
  ['513', 'Silver arrows pack'],
  ['514', 'Broad arrows'],
  ['515', 'Broad arrows pack'],
  ['516', 'Heavy arrows'],
  ['517', 'Heavy arrows pack'],
  ['518', 'Compound arrows'],
  ['519', 'Compound arrows pack'],

  ['614', '🎟Gift Coupon \'Pig\''],
  ['615', '🎟Gift Coupon \'Horse\''],
  ['616', '🎟Gift Coupon \'Owl\''],
  ['617', '🎟Gift Coupon \'Mouse\''],
  ['618', 'Hay'],
  ['619', 'Corn'],
  ['620', 'Hamsters'],
  ['621', 'Cheese'],
  ['623', '🎟Gift Coupon \'Ant\''],
  ['624', '🎟Gift Coupon \'Spider\''],
  ['625', '🎟Gift Coupon \'Haunted\''],
  ['626', '🎟Gift Coupon \'Camel\''],

  ['a01', 'Cloth jacket'],
  ['a02', 'Leather shirt'],
  ['a03', 'Chain mail'],
  ['a04', 'Silver cuirass'],
  ['a05', 'Mithril armor'],
  ['a06', 'Hat'],
  ['a07', 'Leather hood'],
  ['a08', 'Steel helmet'],
  ['a09', 'Silver helmet'],
  ['a10', 'Mithril helmet'],
  ['a11', 'Sandals'],
  ['a12', 'Leather shoes'],
  ['a13', 'Steel boots'],
  ['a14', 'Silver boots'],
  ['a15', 'Mithril boots'],
  ['a16', 'Gloves'],
  ['a17', 'Leather gloves'],
  ['a18', 'Steel gauntlets'],
  ['a19', 'Silver gauntlets'],
  ['a20', 'Mithril gauntlets'],
  ['a21', 'Wooden shield'],
  ['a22', 'Skeleton Buckler'],
  ['a23', 'Bronze shield'],
  ['a24', 'Silver shield'],
  ['a25', 'Mithril shield'],
  ['a26', 'Royal Guard Cape'],
  ['a27', 'Order Armor'],
  ['a28', 'Order Helmet'],
  ['a29', 'Order Boots'],
  ['a30', 'Order Gauntlets'],
  ['a31', 'Order Shield'],
  ['a32', 'Hunter Armor'],
  ['a33', 'Hunter Helmet'],
  ['a34', 'Hunter Boots'],
  ['a35', 'Hunter Gloves'],
  ['a36', 'Clarity Robe'],
  ['a37', 'Clarity Circlet'],
  ['a38', 'Clarity Shoes'],
  ['a39', 'Clarity Bracers'],
  ['a40', '✏️Pencil of Truth'],
  ['a41', 'Bard\'s Cape'],

  ['a45', 'Crusader Armor'],
  ['a46', 'Crusader Helmet'],
  ['a47', 'Crusader Boots'],
  ['a48', 'Crusader Gauntlets'],
  ['a49', 'Crusader Shield'],
  ['a50', 'Royal Armor'],
  ['a51', 'Royal Helmet'],
  ['a52', 'Royal Boots'],
  ['a53', 'Royal Gauntlets'],
  ['a54', 'Royal Shield'],
  ['a55', 'Ghost Armor'],
  ['a56', 'Ghost Helmet'],
  ['a57', 'Ghost Boots'],
  ['a58', 'Ghost Gloves'],
  ['a59', 'Lion Armor'],
  ['a60', 'Lion Helmet'],
  ['a61', 'Lion Boots'],
  ['a62', 'Lion Gloves'],
  ['a63', 'Demon Robe'],
  ['a64', 'Demon Circlet'],
  ['a65', 'Demon Shoes'],
  ['a66', 'Demon Bracers'],
  ['a67', 'Divine Robe'],
  ['a68', 'Divine Circlet'],
  ['a69', 'Divine Shoes'],
  ['a70', 'Divine Bracers'],
  ['a71', 'Storm Cloak'],
  ['a72', 'Durable Cloak'],
  ['a73', 'Blessed Cloak'],
  ['a74', 'Hiking Jar'],
  ['a75', 'Hiking Bag'],
  ['a76', 'Stick of Wisdom'],

  ['a78', 'Council Armor'],
  ['a79', 'Council Helmet'],
  ['a80', 'Council Boots'],
  ['a81', 'Council Gauntlets'],
  ['a82', 'Council Shield'],
  ['a83', 'Griffin Armor'],
  ['a84', 'Griffin Helmet'],
  ['a85', 'Griffin Boots'],
  ['a86', 'Griffin Gloves'],
  ['a87', 'Celestial Armor'],
  ['a88', 'Celestial Helmet'],
  ['a89', 'Celestial Boots'],
  ['a90', 'Celestial Bracers'],

  ['a100', 'Assault Cape'],
  ['a101', 'Craftsman Apron'],
  ['a102', 'Stoneskin Cloak'],

  ['bx3', 'Zombie Box'],
  ['bx4', 'Ancient Box'],
  ['ch1', 'Zombie Chest'],
  ['ch2', 'Ancient Chest'],
  ['hk', 'Hunter Kit'],

  ['k01', 'Champion blade'],
  ['k02', 'Trident blade'],
  ['k03', 'Hunter shaft'],
  ['k04', 'War hammer head'],
  ['k05', 'Hunter blade'],
  ['k06', 'Order Armor piece'],
  ['k07', 'Order Helmet fragment'],
  ['k08', 'Order Boots part'],
  ['k09', 'Order Gauntlets part'],
  ['k10', 'Order shield part'],
  ['k11', 'Hunter Armor part'],
  ['k12', 'Hunter Helmet fragment'],
  ['k13', 'Hunter Boots part'],
  ['k14', 'Hunter Gloves part'],
  ['k15', 'Clarity Robe piece'],
  ['k16', 'Clarity Circlet fragment'],
  ['k17', 'Clarity Shoes part'],
  ['k18', 'Clarity Bracers part'],
  ['k19', 'Thundersoul blade'],
  ['k20', 'Doomblade blade'],
  ['k21', 'Eclipse blade'],
  ['k22', 'Guard\'s blade'],
  ['k23', 'King\'s Defender blade'],
  ['k24', 'Raging Lance blade'],
  ['k25', 'Composite Bow shaft'],
  ['k26', 'Lightning Bow shaft'],
  ['k27', 'Hailstorm Bow shaft'],
  ['k28', 'Imperial Axe head'],
  ['k29', 'Skull Crusher head'],
  ['k30', 'Dragon Mace head'],
  ['k31', 'Ghost blade'],
  ['k32', 'Lion blade'],
  ['k33', 'Crusader Armor piece'],
  ['k34', 'Crusader Helmet fragment'],
  ['k35', 'Crusader Boots part'],
  ['k36', 'Crusader Gauntlets part'],
  ['k37', 'Crusader shield part'],
  ['k38', 'Royal Armor piece'],
  ['k39', 'Royal Helmet fragment'],
  ['k40', 'Royal Boots part'],
  ['k41', 'Royal Gauntlets part'],
  ['k42', 'Royal shield part'],
  ['k43', 'Ghost Armor part'],
  ['k44', 'Ghost Helmet fragment'],
  ['k45', 'Ghost Boots part'],
  ['k46', 'Ghost Gloves part'],
  ['k47', 'Lion Armor part'],
  ['k48', 'Lion Helmet fragment'],
  ['k49', 'Lion Boots part'],
  ['k50', 'Lion Gloves part'],
  ['k51', 'Demon Robe piece'],
  ['k52', 'Demon Circlet fragment'],
  ['k53', 'Demon Shoes part'],
  ['k54', 'Demon Bracers part'],
  ['k55', 'Divine Robe piece'],
  ['k56', 'Divine Circlet fragment'],
  ['k57', 'Divine Shoes part'],
  ['k58', 'Divine Bracers part'],
  ['k59', 'Storm Cloak part'],
  ['k60', 'Durable Cloak part'],
  ['k61', 'Blessed Cloak part'],

  ['k78', 'Council Armor part'],
  ['k79', 'Council Helmet part'],
  ['k80', 'Council Boots part'],
  ['k81', 'Council Gauntlets part'],
  ['k82', 'Council Shield part'],
  ['k83', 'Griffin Armor part'],
  ['k84', 'Griffin Helmet part'],
  ['k85', 'Griffin Boots part'],
  ['k86', 'Griffin Gloves part'],
  ['k87', 'Celestial Armor part'],
  ['k88', 'Celestial Helmet part'],
  ['k89', 'Celestial Boots part'],
  ['k90', 'Celestial Bracers part'],
  ['k91', 'Griffin Knife part'],
  ['k92', 'Minotaur Sword part'],
  ['k93', 'Phoenix Sword part'],
  ['k94', 'Heavy Fauchard part'],
  ['k95', 'Guisarme part'],
  ['k96', 'Meteor Bow part'],
  ['k97', 'Nightfall Bow part'],
  ['k98', 'Black Morningstar part'],
  ['k99', 'Maiming Bulawa part'],
  ['k100', 'Assault Cape part'],
  ['k101', 'Craftsman Apron part'],
  ['k102', 'Stoneskin Cloak part'],

  ['p01', 'Vial of Rage'],
  ['p02', 'Potion of Rage'],
  ['p03', 'Bottle of Rage'],
  ['p04', 'Vial of Peace'],
  ['p05', 'Potion of Peace'],
  ['p06', 'Bottle of Peace'],
  ['p07', 'Vial of Greed'],
  ['p08', 'Potion of Greed'],
  ['p09', 'Bottle of Greed'],
  ['p10', 'Vial of Nature'],
  ['p11', 'Potion of Nature'],
  ['p12', 'Bottle of Nature'],
  ['p13', 'Vial of Mana'],
  ['p14', 'Potion of Mana'],
  ['p15', 'Bottle of Mana'],
  ['p16', 'Vial of Twilight'],
  ['p17', 'Potion of Twilight'],
  ['p18', 'Bottle of Twilight'],
  ['p19', 'Vial of Morph'],
  ['p20', 'Potion of Morph'],
  ['p21', 'Bottle of Morph'],
  ['pl1', 'Vial of Oblivion'],
  ['pl3', 'Bottle of Oblivion'],

  ['pap', 'Accuracy Pill'],
  ['pgs', 'Garlic Stew'],
  ['phw', 'Holy Water'],
  ['pmp', 'Monster Pheromones'],
  ['psb', 'Silver Blood'],
  ['pvd', 'Vial of Defiance'],

  ['r01', 'Champion Sword recipe'],
  ['r02', 'Trident recipe'],
  ['r03', 'Hunter Bow recipe'],
  ['r04', 'War hammer recipe'],
  ['r05', 'Hunter Dagger recipe'],
  ['r06', 'Order Armor recipe'],
  ['r07', 'Order Helmet recipe'],
  ['r08', 'Order Boots recipe'],
  ['r09', 'Order Gauntlets recipe'],
  ['r10', 'Order shield recipe'],
  ['r11', 'Hunter Armor recipe'],
  ['r12', 'Hunter Helmet recipe'],
  ['r13', 'Hunter Boots recipe'],
  ['r14', 'Hunter Gloves recipe'],
  ['r15', 'Clarity Robe recipe'],
  ['r16', 'Clarity Circlet recipe'],
  ['r17', 'Clarity Shoes recipe'],
  ['r18', 'Clarity Bracers recipe'],
  ['r19', 'Thundersoul Sword recipe'],
  ['r20', 'Doomblade Sword recipe'],
  ['r21', 'Eclipse recipe'],
  ['r22', 'Guard\'s Spear recipe'],
  ['r23', 'King\'s Defender recipe'],
  ['r24', 'Raging Lance recipe'],
  ['r25', 'Composite Bow recipe'],
  ['r26', 'Lightning Bow recipe'],
  ['r27', 'Hailstorm Bow recipe'],
  ['r28', 'Imperial Axe recipe'],
  ['r29', 'Skull Crusher recipe'],
  ['r30', 'Dragon Mace recipe'],
  ['r31', 'Ghost Dagger recipe'],
  ['r32', 'Lion Knife recipe'],
  ['r33', 'Crusader Armor recipe'],
  ['r34', 'Crusader Helmet recipe'],
  ['r35', 'Crusader Boots recipe'],
  ['r36', 'Crusader Gauntlets recipe'],
  ['r37', 'Crusader shield recipe'],
  ['r38', 'Royal Armor recipe'],
  ['r39', 'Royal Helmet recipe'],
  ['r40', 'Royal Boots recipe'],
  ['r41', 'Royal Gauntlets recipe'],
  ['r42', 'Royal shield recipe'],
  ['r43', 'Ghost Armor recipe'],
  ['r44', 'Ghost Helmet recipe'],
  ['r45', 'Ghost Boots recipe'],
  ['r46', 'Ghost Gloves recipe'],
  ['r47', 'Lion Armor recipe'],
  ['r48', 'Lion Helmet recipe'],
  ['r49', 'Lion Boots recipe'],
  ['r50', 'Lion Gloves recipe'],
  ['r51', 'Demon Robe recipe'],
  ['r52', 'Demon Circlet recipe'],
  ['r53', 'Demon Shoes recipe'],
  ['r54', 'Demon Bracers recipe'],
  ['r55', 'Divine Robe recipe'],
  ['r56', 'Divine Circlet recipe'],
  ['r57', 'Divine Shoes recipe'],
  ['r58', 'Divine Bracers recipe'],
  ['r59', 'Storm Cloak recipe'],
  ['r60', 'Durable Cloak recipe'],
  ['r61', 'Blessed Cloak recipe'],

  ['r78', 'Council Armor recipe'],
  ['r79', 'Council Helmet recipe'],
  ['r80', 'Council Boots recipe'],
  ['r81', 'Council Gauntlets recipe'],
  ['r82', 'Council Shield recipe'],
  ['r83', 'Griffin Armor recipe'],
  ['r84', 'Griffin Helmet recipe'],
  ['r85', 'Griffin Boots recipe'],
  ['r86', 'Griffin Gloves recipe'],
  ['r87', 'Celestial Armor recipe'],
  ['r88', 'Celestial Helmet recipe'],
  ['r89', 'Celestial Boots recipe'],
  ['r90', 'Celestial Bracers recipe'],
  ['r91', 'Griffin Knife recipe'],
  ['r92', 'Minotaur Sword recipe'],
  ['r93', 'Phoenix Sword recipe'],
  ['r94', 'Heavy Fauchard recipe'],
  ['r95', 'Guisarme recipe'],
  ['r96', 'Meteor Bow recipe'],
  ['r97', 'Nightfall Bow recipe'],
  ['r98', 'Black Morningstar recipe'],
  ['r99', 'Maiming Bulawa recipe'],
  ['r100', 'Assault Cape recipe'],
  ['r101', 'Craftsman Apron recipe'],
  ['r102', 'Stoneskin Cloak recipe'],

  ['s01', '📕Scroll of Rage'],
  ['s02', '📕Scroll of Peace'],
  ['s03', '📗Scroll of Rage'],
  ['s04', '📗Scroll of Peace'],
  ['s05', '📘Scroll of Rage'],
  ['s06', '📘Scroll of Peace'],
  ['s07', '📙Scroll of Rage'],
  ['s08', '📙Scroll of Peace'],
  ['s11', '📕Rare Scroll of Rage'],
  ['s12', '📕Rare Scroll of Peace'],
  ['s13', '📗Rare Scroll of Rage'],
  ['s14', '📗Rare Scroll of Peace'],
  ['s15', '📘Rare Scroll of Rage'],
  ['s16', '📘Rare Scroll of Peace'],
  ['s17', '📙Rare Scroll of Rage'],
  ['s18', '📙Rare Scroll of Peace'],
  ['s50', '🖋️Scroll of Engraving'],
  ['s51', '✒️Scroll of Engraving'],
  ['er', 'Elder\'s recommendation'],
  ['pol', 'Proof of Loyalty'],
  ['tch', 'Torch'],
  ['td1', 'Colorless shard'],
  ['tlt', 'Loyalty Trophy'],

  ['w01', 'Wooden sword'],
  ['w02', 'Short sword'],
  ['w03', 'Long sword'],
  ['w04', 'Widow sword'],
  ['w05', 'Knight\'s sword'],
  ['w06', 'Elven sword'],
  ['w07', 'Rapier'],
  ['w08', 'Short spear'],
  ['w09', 'Long spear'],
  ['w10', 'Lance'],
  ['w11', 'Elven spear'], 
  ['w12', 'Halberd'],
  ['w13', 'Kitchen knife'],
  ['w14', 'Battle knife'],
  ['w15', 'Steel dagger'],
  ['w16', 'Silver dagger'],
  ['w17', 'Mithril dagger'], 
  ['w18', 'Short Bow'],
  ['w19', 'Wooden Bow'],
  ['w20', 'Long Bow'],
  ['w21', 'Elven Bow'], 
  ['w22', 'Forest Bow'],
  ['w23', 'Club'],
  ['w24', 'Bone club'],
  ['w25', 'Heavy club'],
  ['w26', 'Steel axe'],
  ['w27', 'Mithril axe'],
  ['w28', 'Champion Sword'],
  ['w29', 'Trident'],
  ['w30', 'Hunter Bow'],
  ['w31', 'War hammer'],
  ['w32', 'Hunter dagger'],
  ['w33', 'Thundersoul Sword'],
  ['w34', 'Doomblade Sword'],

  ['w36', 'Guard\'s Spear'],
  ['w37', 'King\'s Defender'],

  ['w39', 'Composite Bow'],
  ['w40', 'Lightning Bow'],
  ['w41', 'Hailstorm Bow'],
  ['w42', 'Imperial Axe'],
  ['w43', 'Skull Crusher'],
  ['w44', 'Dragon Mace'],
  ['w45', 'Ghost dagger'],
  ['w46', 'Lion knife'],

  ['w91', 'Griffin Knife'],
  ['w92', 'Minotaur Sword'],
  ['w93', 'Phoenix Sword'],
  ['w94', 'Heavy Fauchard'],
  ['w95', 'Guisarme'],
  ['w96', 'Meteor Bow'],
  ['w97', 'Nightfall Bow'],
  ['w98', 'Black Morningstar'],
  ['w99', 'Maiming Bulawa']
];

module.exports = itemCodeToNameEntries;