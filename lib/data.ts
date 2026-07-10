export type Poem = {
  id: string
  title: string
  poet: string
  poetId: string
  theme: string
  body: string
  likes: number
  readingTime: string
}

export type Poet = {
  id: string
  name: string
  handle: string
  bio: string
  era: string
  followers: number
}

export type Comment = {
  id: string
  poemId: string
  author: string
  body: string
  timeAgo: string
}

export const themes = [
  'Aşk',
  'Ayrılık',
  'Deniz',
  'Gurbet',
  'Umut',
  'Sonbahar',
  'Şehir',
  'Yalnızlık',
] as const

export const poets: Poet[] = [
  {
    id: 'defne-aral',
    name: 'Defne Aral',
    handle: '@defnearal',
    bio: 'İstanbul’un dar sokaklarında dolaşan dizeler. Deniz, ayrılık ve sabahın ilk ışığı.',
    era: 'Çağdaş',
    followers: 12400,
  },
  {
    id: 'kerem-yildiz',
    name: 'Kerem Yıldız',
    handle: '@keremyildiz',
    bio: 'Gurbetin sesi, uzak şehirlerin şairi. Trenler, istasyonlar ve bekleyişler üzerine yazar.',
    era: 'Çağdaş',
    followers: 8730,
  },
  {
    id: 'mira-sena',
    name: 'Mira Sena',
    handle: '@mirasena',
    bio: 'Sessizliğin ve yalnızlığın peşinde. Kısa dizeler, uzun düşünceler.',
    era: 'Çağdaş',
    followers: 6210,
  },
  {
    id: 'ozan-deniz',
    name: 'Ozan Deniz',
    handle: '@ozandeniz',
    bio: 'Ege’nin tuzlu rüzgârıyla büyümüş dizeler. Umut ve deniz üzerine.',
    era: 'Çağdaş',
    followers: 9540,
  },
]

export const comments: Comment[] = [
  { id: 'c1', poemId: 'p1', author: 'Elif', body: 'Son dize içimi burktu, çok güzel.', timeAgo: '2 sa' },
  { id: 'c2', poemId: 'p1', author: 'Deniz', body: 'Sabah tarifi tam kalbime dokundu.', timeAgo: '5 sa' },
  { id: 'c3', poemId: 'p3', author: 'Aylin', body: 'Deniz feneri metaforu harika olmuş.', timeAgo: '1 g' },
  { id: 'c4', poemId: 'p6', author: 'Mert', body: 'Betonun ortasındaki yeşil inat… muhteşem.', timeAgo: '3 sa' },
  { id: 'c5', poemId: 'p8', author: 'Selin', body: 'Gramer benzetmesi çok yaratıcı.', timeAgo: '6 sa' },
]

export const poems: Poem[] = [
  {
    id: 'p1',
    title: 'Sabaha Kalan',
    poet: 'Defne Aral',
    poetId: 'defne-aral',
    theme: 'Aşk',
    body: `Perdeyi araladım, şehir uyuyordu hâlâ,
senin adın kaldı dilimin ucunda.
Bir fincan çay soğudu masanın üstünde,
sabah, seni beklemeyi öğretti bana.`,
    likes: 1243,
    readingTime: '1 dk',
  },
  {
    id: 'p2',
    title: 'İstasyon',
    poet: 'Kerem Yıldız',
    poetId: 'kerem-yildiz',
    theme: 'Gurbet',
    body: `Trenler kalkar, ben kalırım peronda,
her veda biraz daha küçültür şehri.
Cebimde buruşmuş bir bilet,
gitmeyi de bilemedim, kalmayı da.`,
    likes: 982,
    readingTime: '1 dk',
  },
  {
    id: 'p3',
    title: 'Deniz Feneri',
    poet: 'Ozan Deniz',
    poetId: 'ozan-deniz',
    theme: 'Deniz',
    body: `Karanlıkta bir ışık döner durur,
denize inat, geceye inat.
Belki biri döner diye evine,
belki biri hâlâ bekler diye.`,
    likes: 1567,
    readingTime: '1 dk',
  },
  {
    id: 'p4',
    title: 'Sessiz Oda',
    poet: 'Mira Sena',
    poetId: 'mira-sena',
    theme: 'Yalnızlık',
    body: `Duvarlar konuşmayı unuttu,
saat tik takını fısıldıyor yalnızca.
Ben de öğrendim susmayı,
kelimeler bitince başlar asıl şiir.`,
    likes: 734,
    readingTime: '1 dk',
  },
  {
    id: 'p5',
    title: 'Sonbahar Notları',
    poet: 'Defne Aral',
    poetId: 'defne-aral',
    theme: 'Sonbahar',
    body: `Yapraklar düşerken sayıyorum günleri,
her biri bir veda, her biri bir söz.
Rüzgâr topluyor arkamdan izleri,
sonbahar, en dürüst mevsimdir; her şeyi bırakır.`,
    likes: 1102,
    readingTime: '1 dk',
  },
  {
    id: 'p6',
    title: 'Umut Denen Şey',
    poet: 'Ozan Deniz',
    poetId: 'ozan-deniz',
    theme: 'Umut',
    body: `Bir tohum düşer çatlaklara,
kimse görmez, kimse bilmez.
Sonra bir sabah, betonun ortasında,
yeşil bir inat çıkar güneşe.`,
    likes: 2013,
    readingTime: '1 dk',
  },
  {
    id: 'p7',
    title: 'Şehrin Kalbi',
    poet: 'Kerem Yıldız',
    poetId: 'kerem-yildiz',
    theme: 'Şehir',
    body: `Kaldırımlar biriktirir ayak seslerini,
her adım bir cümle, her köşe bir virgül.
Şehir bir şiir yazar durmadan,
biz de dizeleriyiz farkında olmadan.`,
    likes: 856,
    readingTime: '1 dk',
  },
  {
    id: 'p8',
    title: 'Ayrılığın Grameri',
    poet: 'Mira Sena',
    poetId: 'mira-sena',
    theme: 'Ayrılık',
    body: `“Gidiyorum” dedin, geçmiş zaman oldu her şey,
sözcükler kaldı yarım, cümleler devrik.
Ben hâlâ şimdiki zamanda seni çekimliyorum,
oysa sen çoktan bir hikâyenin sonusun.`,
    likes: 1439,
    readingTime: '1 dk',
  },
]

export const poemOfTheDay: Poem = poems[5]
