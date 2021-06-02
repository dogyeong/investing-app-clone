import { getAnalyses, getItemDetail, getNews } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  itemDetail: {
    name: '', // 이름
    symbol: '',
    category: '', // 소속
    adjClose: '', // 이전 종가
    adjLow: '', // 이전 최저가
    adjHigh: '', // 이전 최고가
    close: '', // 종가
    open: '', // 시가
    volume: '', //  거래량
    acronym: '', //
    high: '', // 최고가
    low: '', // 최저가
    price: '100',
    upDownPrice: '100',
    time: '100',
    currency: 'dallor',
  },
  news: [],
  analyses: [],
});

// getter 설정

const getters = {
  // itemCollections: (state) => {
  //   return [state.stockItems, state.indexItems, state.cryptoItems];
  // },
};

// actions 설정
const actions = {
  async getItemDetail({ commit }, { symbols }) {
    try {
      const itemDetail = await getItemDetail({ symbols });

      if (itemDetail) {
        commit('changeItemDetail', itemDetail);

        return true;
      }

      throw new Error('Getting item detail was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  async getNews({ commit }, { offset, limit }) {
    try {
      const news = await getNews({ offset, limit });

      if (news) {
        commit('changeNews', news);

        return true;
      }

      throw new Error('Getting news was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  async getAnalyses({ commit }, { offset, limit }) {
    try {
      const analyses = await getAnalyses({ offset, limit });

      console.log(analyses);
      if (analyses) {
        commit('changeAnalyses', analyses);

        return true;
      }

      throw new Error('Getting analyses was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  changeItemDetail(state, itemDetail) {
    const { name, symbol, adj_close, adj_high, adj_low, close, open, volume, stock_exchange, high, low } = itemDetail;

    state.itemDetail = {
      ...state.itemDetail,
      name,
      symbol,
      category: stock_exchange.acronym,
      adjClose: adj_close,
      adjHigh: adj_high,
      adjLow: adj_low,
      close,
      open,
      volume,
      acronym: stock_exchange.acronym,
      high,
      low,
    };
  },

  changeNews(state, news) {
    state.news = news;
  },

  changeAnalyses(state, analyses) {
    state.analyses = analyses;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
