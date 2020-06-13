import React from "react";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Drug
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price')}
            >
              Estimated Cash Price
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('stock')}
              className={getClassNamesFor('stock')}
            >
              GoodRx Coupon
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('saving')}
              className={getClassNamesFor('saving')}
            >
              Saving
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>{item.stock}</td>
            <td>{item.saving}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Table() {
  return (
    <div className="App">
      <ProductTable
        products={[
          { id: 1, name: 'atorvastatin', price: '$80.41', stock: '$7.68',saving: '90%' },
          { id: 2, name: 'sildenafil', price: '$208.83', stock: '$10.41',saving: '5%' },
          { id: 3, name: 'Zoloft (sertraline)', price: '$31.41', stock: '6.52' ,saving: '79%' },
          { id: 4, name: 'Lexapro (escitalopram)', price: '$70.05', stock: '7.21' ,saving: '89%'},
          { id: 5, name: 'losartan', price: '$46.60', stock: '$6.29',saving: '76%' },
          { id: 6, name: 'amlodipine', price: '$26.94', stock: '$9.04', saving: '71%' },
          { id: 7, name: 'azithromycin', price: '$121.02', stock: '12.48' , saving: '89%' },
        ]}
      />
    </div>
  );
}
