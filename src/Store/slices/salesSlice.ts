import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalesState, SalesData } from '../../Types/sale';
import { Produto } from '../../Types/produto';
import mockData from '../../Mock/data.json';

const loadState = (): SalesState | undefined => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = localStorage.getItem('salesState');
      if (serializedState === null) {
        return undefined;
      }
      const parsedState = JSON.parse(serializedState) as SalesState;
      return parsedState;
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
      return undefined;
    }
  }
  return undefined;
};

const persistedState = loadState();

const initialMockData: SalesData = (mockData as any[]).map(product => ({
  ...product,
  id: product.id.toString()
})) as SalesData;

const initialState: SalesState = {
  data: persistedState ? persistedState.data : initialMockData,
  selectedProducts: persistedState ? persistedState.selectedProducts : ['Refrigerante', 'Suco', 'Salgadinho'],
  selectedMonths: persistedState ? persistedState.selectedMonths : ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  chartType: persistedState ? persistedState.chartType : 'line',
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
    setChartType: (state, action: PayloadAction<'line' | 'bar' | 'pie'>) => {
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
      const newProduct = { ...action.payload };
      if (!newProduct.id) {
          newProduct.id = Date.now().toString();
      }
      const existingProduct = state.data.find(p => p.id === newProduct.id);
      if (!existingProduct) {
        state.data.push(newProduct);
        state.selectedProducts.push(newProduct.produto);
      }
    },
    updateProduto: (state, action: PayloadAction<Produto>) => {
      const updatedProduto = action.payload;
      const index = state.data.findIndex(p => p.id === updatedProduto.id);
      if (index !== -1) {
        const oldProdutoName = state.data[index].produto;
        state.data[index] = updatedProduto;
        
        if (oldProdutoName !== updatedProduto.produto) {
          const selectedIndex = state.selectedProducts.indexOf(oldProdutoName);
          if (selectedIndex !== -1) {
            state.selectedProducts[selectedIndex] = updatedProduto.produto;
          }
        }
      }
    },
    deleteProduto: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productToDelete = state.data.find(p => p.id === productId);
      
      state.data = state.data.filter(p => p.id !== productId);
      
      if (productToDelete) {
        state.selectedProducts = state.selectedProducts.filter(p => p !== productToDelete.produto);
      }
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