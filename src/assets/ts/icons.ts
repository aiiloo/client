export const emojiCategories = [
  { id: 'smileys', name: 'Smileys', icon: '😊' },
  { id: 'people', name: 'People', icon: '👋' },
  { id: 'animals', name: 'Animals', icon: '🐱' },
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'activities', name: 'Activities', icon: '⚽' },
  { id: 'travel', name: 'Travel', icon: '🚗' },
  { id: 'objects', name: 'Objects', icon: '💡' },
  { id: 'symbols', name: 'Symbols', icon: '❤️' },
  { id: 'flags', name: 'Flags', icon: '🏁' }
]

export const allEmojisWithDescriptions: EmojiData[] = [
  // Smileys
  { emoji: '😀', description: 'grinning face happy smile', category: 'smileys' },
  { emoji: '😃', description: 'grinning face with big eyes happy smile', category: 'smileys' },
  { emoji: '😄', description: 'grinning face with smiling eyes happy smile', category: 'smileys' },
  { emoji: '😁', description: 'beaming face with smiling eyes happy smile', category: 'smileys' },
  { emoji: '😆', description: 'grinning squinting face happy smile laugh', category: 'smileys' },
  { emoji: '😅', description: 'grinning face with sweat happy smile relief', category: 'smileys' },
  { emoji: '😂', description: 'face with tears of joy laugh crying happy', category: 'smileys' },
  { emoji: '🤣', description: 'rolling on the floor laughing laugh happy', category: 'smileys' },
  { emoji: '😊', description: 'smiling face with smiling eyes happy blush', category: 'smileys' },
  { emoji: '😇', description: 'smiling face with halo angel innocent', category: 'smileys' },

  // People
  { emoji: '👋', description: 'waving hand hello goodbye', category: 'people' },
  { emoji: '🤚', description: 'raised back of hand stop', category: 'people' },
  { emoji: '✋', description: 'raised hand high five stop', category: 'people' },
  { emoji: '👌', description: 'ok hand perfect agree', category: 'people' },
  { emoji: '👍', description: 'thumbs up good like approve', category: 'people' },
  { emoji: '👎', description: 'thumbs down bad dislike disapprove', category: 'people' },
  { emoji: '👏', description: 'clapping hands applause praise', category: 'people' },
  { emoji: '🙌', description: 'raising hands celebration hooray', category: 'people' },
  { emoji: '🙏', description: 'folded hands please thank you pray', category: 'people' },
  { emoji: '🤝', description: 'handshake agreement deal', category: 'people' },

  // Animals
  { emoji: '🐶', description: 'dog face pet puppy animal', category: 'animals' },
  { emoji: '🐱', description: 'cat face pet kitten animal', category: 'animals' },
  { emoji: '🐭', description: 'mouse face animal rat', category: 'animals' },
  { emoji: '🐰', description: 'rabbit face bunny animal', category: 'animals' },
  { emoji: '🦊', description: 'fox face animal', category: 'animals' },
  { emoji: '🐻', description: 'bear face animal', category: 'animals' },
  { emoji: '🐼', description: 'panda face animal', category: 'animals' },
  { emoji: '🐨', description: 'koala face animal', category: 'animals' },
  { emoji: '🦁', description: 'lion face animal', category: 'animals' },
  { emoji: '🐯', description: 'tiger face animal', category: 'animals' },

  // Food
  { emoji: '🍎', description: 'red apple fruit food', category: 'food' },
  { emoji: '🍌', description: 'banana fruit food', category: 'food' },
  { emoji: '🍕', description: 'pizza food slice', category: 'food' },
  { emoji: '🍔', description: 'hamburger food burger', category: 'food' },
  { emoji: '🍟', description: 'french fries food', category: 'food' },
  { emoji: '🍦', description: 'ice cream food dessert', category: 'food' },
  { emoji: '🍩', description: 'doughnut food donut dessert', category: 'food' },
  { emoji: '🎂', description: 'birthday cake food dessert', category: 'food' },
  { emoji: '🍪', description: 'cookie food dessert biscuit', category: 'food' },
  { emoji: '🍫', description: 'chocolate bar food dessert', category: 'food' },

  // Activities
  { emoji: '⚽', description: 'soccer ball football sport', category: 'activities' },
  { emoji: '🏀', description: 'basketball sport', category: 'activities' },
  { emoji: '🏈', description: 'american football sport', category: 'activities' },
  { emoji: '⚾', description: 'baseball sport', category: 'activities' },
  { emoji: '🎾', description: 'tennis sport', category: 'activities' },
  { emoji: '🏐', description: 'volleyball sport', category: 'activities' },
  { emoji: '🏉', description: 'rugby football sport', category: 'activities' },
  { emoji: '🎱', description: 'pool 8 ball billiards sport', category: 'activities' },
  { emoji: '🏓', description: 'ping pong table tennis sport', category: 'activities' },
  { emoji: '🏸', description: 'badminton sport', category: 'activities' },

  // Travel
  { emoji: '🚗', description: 'car automobile vehicle', category: 'travel' },
  { emoji: '🚕', description: 'taxi cab vehicle', category: 'travel' },
  { emoji: '🚌', description: 'bus vehicle', category: 'travel' },
  { emoji: '🚑', description: 'ambulance vehicle', category: 'travel' },
  { emoji: '🚒', description: 'fire engine vehicle', category: 'travel' },
  { emoji: '🚓', description: 'police car vehicle', category: 'travel' },
  { emoji: '🚲', description: 'bicycle bike vehicle', category: 'travel' },
  { emoji: '✈️', description: 'airplane plane flight travel', category: 'travel' },
  { emoji: '🚀', description: 'rocket space travel', category: 'travel' },
  { emoji: '🚁', description: 'helicopter vehicle', category: 'travel' },

  // Objects
  { emoji: '💡', description: 'light bulb idea', category: 'objects' },
  { emoji: '📱', description: 'mobile phone smartphone', category: 'objects' },
  { emoji: '💻', description: 'laptop computer', category: 'objects' },
  { emoji: '⌚', description: 'watch time', category: 'objects' },
  { emoji: '📷', description: 'camera photo', category: 'objects' },
  { emoji: '🔋', description: 'battery power', category: 'objects' },
  { emoji: '📚', description: 'books reading', category: 'objects' },
  { emoji: '🎁', description: 'wrapped gift present', category: 'objects' },
  { emoji: '🔑', description: 'key lock', category: 'objects' },
  { emoji: '🔨', description: 'hammer tool', category: 'objects' },

  // Symbols
  { emoji: '❤️', description: 'red heart love', category: 'symbols' },
  { emoji: '💔', description: 'broken heart love', category: 'symbols' },
  { emoji: '💯', description: '100 hundred points perfect score', category: 'symbols' },
  { emoji: '💢', description: 'anger symbol mad', category: 'symbols' },
  { emoji: '💥', description: 'collision explosion boom', category: 'symbols' },
  { emoji: '💫', description: 'dizzy star', category: 'symbols' },
  { emoji: '💦', description: 'sweat droplets water splash', category: 'symbols' },
  { emoji: '💨', description: 'dashing away wind', category: 'symbols' },
  { emoji: '🕳️', description: 'hole', category: 'symbols' },
  { emoji: '💣', description: 'bomb explosion', category: 'symbols' },

  // Flags
  { emoji: '🏁', description: 'chequered flag finish race', category: 'flags' },
  { emoji: '🚩', description: 'triangular flag', category: 'flags' },
  { emoji: '🎌', description: 'crossed flags japan', category: 'flags' },
  { emoji: '🏴', description: 'black flag', category: 'flags' },
  { emoji: '🏳️', description: 'white flag surrender', category: 'flags' },
  { emoji: '🏳️‍🌈', description: 'rainbow flag lgbt pride', category: 'flags' },
  { emoji: '🏳️‍⚧️', description: 'transgender flag', category: 'flags' },
  { emoji: '🏴‍☠️', description: 'pirate flag', category: 'flags' },
  { emoji: '🇻🇳', description: 'flag Vietnam viet nam', category: 'flags' },
  { emoji: '🇺🇸', description: 'flag United States america usa', category: 'flags' }
]

export const emojisByCategory = {
  smileys: allEmojisWithDescriptions.filter((item) => item.category === 'smileys').map((item) => item.emoji),
  people: allEmojisWithDescriptions.filter((item) => item.category === 'people').map((item) => item.emoji),
  animals: allEmojisWithDescriptions.filter((item) => item.category === 'animals').map((item) => item.emoji),
  food: allEmojisWithDescriptions.filter((item) => item.category === 'food').map((item) => item.emoji),
  activities: allEmojisWithDescriptions.filter((item) => item.category === 'activities').map((item) => item.emoji),
  travel: allEmojisWithDescriptions.filter((item) => item.category === 'travel').map((item) => item.emoji),
  objects: allEmojisWithDescriptions.filter((item) => item.category === 'objects').map((item) => item.emoji),
  symbols: allEmojisWithDescriptions.filter((item) => item.category === 'symbols').map((item) => item.emoji),
  flags: allEmojisWithDescriptions.filter((item) => item.category === 'flags').map((item) => item.emoji)
}

export interface EmojiData {
  emoji: string
  description: string
  category: string
}
