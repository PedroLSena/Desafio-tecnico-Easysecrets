import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalesState, SalesData } from '../../Types/sale';
import { Produto } from '../../Types/produto';
import mockData from '../../Mock/data.json';

const initialState: SalesState = {
  data: mockData as SalesData,
  selectedProducts: ['Refrigerante', 'Suco', 'Salgadinho'],
  selectedMonths: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  chartType: 'line',
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSelectedProducts: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload;
    },
    setSelectedMonths: (state, action: PayloadAction<string[]>) => {
      state.selectedMonths = action.payload;
    },
    setChartType: (state, action: PayloadAction<'line' | 'bar' | 'area'>) => {
      state.chartType = action.payload;
    },
    toggleProduct: (state, action: PayloadAction<string>) => {
      const product = action.payload;
      if (state.selectedProducts.includes(product)) {
        state.selectedProducts = state.selectedProducts.filter(p => p !== product);
      } else {
        state.selectedProducts.push(product);
      }
    },
    addProduto: (state, action: PayloadAction<Produto>) => {
      const existingProduct = state.data.find(p => p.produto === action.payload.produto);
      if (!existingProduct) {
        state.data.push(action.payload);
        state.selectedProducts.push(action.payload.produto);
      }
    },
    updateProduto: (state, action: PayloadAction<{ oldName: string; produto: Produto }>) => {
      const { oldName, produto } = action.payload;
      const index = state.data.findIndex(p => p.produto === oldName);
      if (index !== -1) {
        state.data[index] = produto;
        
        if (oldName !== produto.produto) {
          const selectedIndex = state.selectedProducts.indexOf(oldName);
          if (selectedIndex !== -1) {
            state.selectedProducts[selectedIndex] = produto.produto;
          }
        }
      }
    },
    deleteProduto: (state, action: PayloadAction<string>) => {
      const productName = action.payload;
      state.data = state.data.filter(p => p.produto !== productName);
      state.selectedProducts = state.selectedProducts.filter(p => p !== productName);
    },
  },
});

export const {
  setSelectedProducts,
  setSelectedMonths,
  setChartType,
  toggleProduct,
  addProduto,
  updateProduto,
  deleteProduto,
} = salesSlice.actions;

export default salesSlice.reducer;