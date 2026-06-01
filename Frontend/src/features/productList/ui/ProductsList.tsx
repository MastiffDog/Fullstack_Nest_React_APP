import React, { useEffect, useState } from 'react';
import { appConfig } from 'src/app/config/config';
import { ProductService } from '../services/ProductService';
import { WorkListPanelComponent } from 'src/features/productList/components/workListPanel/workListPanel';
import { ProductTableComponent } from 'src/features/productList/components/productsTable/productsTable';
import { PaginationControlsComponent } from 'src/features/productList/components/pagination/Pagination';
import { ProgressBar } from 'src/shared/progressbar';

import { ConfirmModalWindow } from '../components/confirmModal/confirmModal';

import { WorksTableComponent } from '../components/worksTable/worksTable';

import { generateMockData } from 'src/mocks/works';
import axios from 'axios';


import styles from './productlist.module.css';

interface Product {
  id: number;
  title: string;
  brand?: string;
  sku?: string;
  rating?: number;
  price: number;
  stock?: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface SortSettings {
  column: string;
  direction: 'asc' | 'desc';
}

interface Params {
  limit: number;
  skip: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface IProps {
  addProductForm?: () => void;
  searchProduct: string;
  searchMode: boolean;
}

const mockWorks = generateMockData();


export const ProductsList: React.FunctionComponent<IProps> = ({ addProductForm, searchProduct, searchMode }) => {
  const LIMIT = appConfig.productsPerPage;
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [showConfirmModal, setConfirmModal] = useState(false);

  const savedSortSettings = localStorage.getItem('sortSettings');
  const [sortSettings, setSortSettings] = useState<SortSettings | null>(
    savedSortSettings ? JSON.parse(savedSortSettings) : null
  );

  

  

  const loadProductsNormal = async () => {
    try {
      const params: Params = {
        limit: LIMIT,
        skip: (pagination.currentPage - 1) * LIMIT,
      };

      if (sortSettings) {
        params.sortBy = sortSettings.column;
        params.order = sortSettings.direction;
      }

      const result = await ProductService.getProducts(params);
      setProducts(result.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(result.total / LIMIT),
      }));

      //Progress-bar simulation
      let loadedCount = 0;
      const totalItems = products.length;
      const intervalId = setInterval(() => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalItems * 100)));
        if (loadedCount >= totalItems) {
          clearInterval(intervalId);
          setTimeout(() => {
            setLoading(false);
          }, 2000); // delay to visualize the effect of the end of loading
        }
      }, 100);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const loadProductsSearch = async (term: string) => {
    try {
      const params: Params = {
        limit: LIMIT,
        skip: (pagination.currentPage - 1) * LIMIT,
      };
      const result = await ProductService.searchProducts(term, params);
      setProducts(result.data);


      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(result.total / LIMIT),
      }));

    } catch (error) {
      console.error(error);
    }
  };

  // const handleSort = (column: string) => {
  //   if (!sortSettings || sortSettings.column !== column) {
  //     setSortSettings({ column, direction: 'asc' });
  //   } else {
  //     setSortSettings((prev) => ({
  //       ...prev,
  //       direction: prev.direction === 'asc' ? 'desc' : 'asc',
  //     }));
  //   }
  // };

  const handleSort = (column: string) => {
  // 1. Проверяем, что кликнули по колонке "date"
  if (column !== 'date') {
    return; // Игнорируем клики по другим колонкам
  }

  // 2. Логика обновления состояния
  if (!sortSettings || sortSettings.column !== column) {
    // Если сортировки нет или она по другой колонке, начинаем новую
    setSortSettings({ column, direction: 'asc' });
  } else {
    // Если уже сортируем по этой колонке, меняем направление
    setSortSettings((prev) => {
      // Проверяем, что prev не null
      if (!prev) {
        // Если вдруг prev null, создаем объект заново
        return { column, direction: 'asc' };
      }
      
      // Возвращаем новый объект со всеми полями, обновляя только 'direction'
      return {
        ...prev, // Копируем все из предыдущего состояния (в т.ч. 'column')
        direction: prev.direction === 'asc' ? 'desc' : 'asc' // Меняем направление
      };
    });
  }
};





  const handleRefresh = () => {
    setProgress(0);
    setLoading(true);
    loadProductsNormal();
  }

  const totalPages = Math.max(1, pagination.totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  useEffect(() => {
    if (searchMode && searchProduct.trim()) {
      loadProductsSearch(searchProduct);
    } else {
      loadProductsNormal();
    }
  }, [pagination.currentPage, sortSettings, searchMode, searchProduct]);


  useEffect(() => {
    if (sortSettings) {
      localStorage.setItem('sortSettings', JSON.stringify(sortSettings));
    } else {
      localStorage.removeItem('sortSettings');
    }
  }, [sortSettings]);

  useEffect(() => {
    if (searchMode) {
      setPagination({ currentPage: 1, totalPages: 1 });
    }
    else {
      setPagination({ currentPage: 1, totalPages: 1 });
    }
  }, [searchMode]);

// remove selected

  const handleDeleteSelectedWorks = () => {
    setConfirmModal(false);
    console.log('items removed...');
  }


  return (
    <div>
      {false ?
        <ProgressBar
          progress={progress}
        />
        : (
          <div className={styles.main}>
            {/* <ProductListPanelComponent
              refreshWorks={handleRefresh}
              addWork={addProductForm}
              removeSelectedWorks={()=>{setConfirmModal(true)}}
            /> */}

            {/* <WorksTableComponent
              works={mockWorks}
              sortSettings={sortSettings}
              handleSort={handleSort}
            /> */}



            {/* <ProductTableComponent
              products={products}
              sortSettings={sortSettings}
              handleSort={handleSort}
            /> */}

            {/* <PaginationControlsComponent
              currentPage={pagination.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
        )}
        {
          showConfirmModal 
          ?
          <ConfirmModalWindow
            onCancel={()=>{setConfirmModal(false)}}
            onProceed={()=>{handleDeleteSelectedWorks()}}
          />
          : null  
        }  
    </div>
  );
};