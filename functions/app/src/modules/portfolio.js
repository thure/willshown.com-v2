import publicPortfolio from '../config/portfolio.public'

export const resolveItem = (id, privatePortfolio) => {
  if (id) {
    if (privatePortfolio) {
      const privateItem = privatePortfolio.structure.find(
        item => item.id === id
      )
      if (privateItem) return { portfolio: privatePortfolio, item: privateItem }
    }
    const publicItem = publicPortfolio.structure.find(item => item.id === id)
    if (publicItem) return { portfolio: publicPortfolio, item: publicItem }
    else return { item: null, portfolio: null }
  } else return { item: null, portfolio: null }
}

export const resolveDeck = (id, privatePortfolio) => {
  if (id) {
    if (privatePortfolio) {
      const privateItem = privatePortfolio.decks[id]
      if (privateItem) return { portfolio: privatePortfolio, item: privateItem }
    }
    const publicItem = publicPortfolio.decks[id]
    if (publicItem) return { portfolio: publicPortfolio, item: publicItem }
    else return { item: null, portfolio: null }
  } else return { item: null, portfolio: null }
}
