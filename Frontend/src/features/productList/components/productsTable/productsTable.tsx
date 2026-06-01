import React from 'react';
import { Product } from '../../../../entities/product/productModel';
import mockButtons from '../../../../shared/icons/mock_buttons.svg';
import styles from './productsTable.module.css';

export interface IProductTableProps {
  products: Product[];
  sortSettings: { column: string; direction: 'asc' | 'desc' } | null;
  handleSort: (column: string) => void;
}

export const ProductTableComponent: React.FC<IProductTableProps> = ({
  products,
  sortSettings,
  handleSort,
}) => {
  return (
    <table className={styles.table}>
      <thead className={styles.table_head}>
        <tr>
          <th className={styles.table_check}>
            <input type="checkbox" />
          </th>
          <th className={styles.table_head_line_left}
            onClick={() => handleSort('title')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'title' ? 'bold' : '',
            }}
          >
            Наименование
            {sortSettings?.column === 'title' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('brand')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'brand' ? 'bold' : '',
            }}
          >
            Вендор
            {sortSettings?.column === 'brand' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('sku')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'sku' ? 'bold' : '',
            }}
          >
            Артикул
            {sortSettings?.column === 'sku' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('rating')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'rating' ? 'bold' : '',
            }}
          >
            Оценка
            {sortSettings?.column === 'rating' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('price')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'price' ? 'bold' : '',
            }}
          >
            Цена
            {sortSettings?.column === 'price' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('stock')}
            style={{
              cursor: 'pointer',
              fontWeight: sortSettings?.column === 'stock' ? 'bold' : '',
            }}
          >
            Количество
            {sortSettings?.column === 'stock' && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
          <th className={styles.table_head_line}></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            className={styles.table_row}
            key={product.id}
          >
            <td className={styles.table_check && styles.table_row_line}>
              <input type="checkbox" />
            </td>
            <td className={styles.table_row_line_left}>{product.title}</td>
            <td className={styles.table_row_line}>{product.brand ?? '-'}</td>
            <td className={styles.table_row_line}>{product.sku ?? '-'}</td>
            <td className={product.rating < 3 ? styles.table_rating_red : styles.table_row_line}>
              {product.rating != null ? `${product.rating}/5` : '-'}
            </td>
            <td className={styles.table_row_line}>{product.price.toFixed(2)} ₽</td>
            <td className={styles.table_row_line}>{product.stock != null ? product.stock : '-'}</td>
            <td className={styles.table_row_line}>
              <div className={styles.table_mock_buttons}>
                <img src={mockButtons} alt="" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};