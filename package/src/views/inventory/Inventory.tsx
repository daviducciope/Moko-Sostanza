import { useState, useEffect } from 'react';
import { Table, Badge, Button, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

// Dati di esempio per l'inventario
const inventoryData = [
  {
    id: 1,
    name: 'Guanti in lattice (S)',
    category: 'Materiale monouso',
    quantity: 150,
    unit: 'pz',
    minQuantity: 50,
    price: 0.15,
    supplier: 'MedSupplies',
    lastOrder: '10/10/2023'
  },
  {
    id: 2,
    name: 'Guanti in lattice (M)',
    category: 'Materiale monouso',
    quantity: 200,
    unit: 'pz',
    minQuantity: 50,
    price: 0.15,
    supplier: 'MedSupplies',
    lastOrder: '10/10/2023'
  },
  {
    id: 3,
    name: 'Guanti in lattice (L)',
    category: 'Materiale monouso',
    quantity: 120,
    unit: 'pz',
    minQuantity: 50,
    price: 0.15,
    supplier: 'MedSupplies',
    lastOrder: '10/10/2023'
  },
  {
    id: 4,
    name: 'Mascherine chirurgiche',
    category: 'Materiale monouso',
    quantity: 300,
    unit: 'pz',
    minQuantity: 100,
    price: 0.10,
    supplier: 'MedSupplies',
    lastOrder: '05/10/2023'
  },
  {
    id: 5,
    name: 'Composito dentale A1',
    category: 'Materiale dentale',
    quantity: 15,
    unit: 'siringhe',
    minQuantity: 5,
    price: 25.00,
    supplier: 'DentalPro',
    lastOrder: '01/09/2023'
  },
  {
    id: 6,
    name: 'Composito dentale A2',
    category: 'Materiale dentale',
    quantity: 12,
    unit: 'siringhe',
    minQuantity: 5,
    price: 25.00,
    supplier: 'DentalPro',
    lastOrder: '01/09/2023'
  },
  {
    id: 7,
    name: 'Composito dentale A3',
    category: 'Materiale dentale',
    quantity: 8,
    unit: 'siringhe',
    minQuantity: 5,
    price: 25.00,
    supplier: 'DentalPro',
    lastOrder: '01/09/2023'
  },
  {
    id: 8,
    name: 'Anestetico locale',
    category: 'Farmaci',
    quantity: 50,
    unit: 'fiale',
    minQuantity: 20,
    price: 3.50,
    supplier: 'PharmaDent',
    lastOrder: '15/09/2023'
  },
  {
    id: 9,
    name: 'Frese diamantate assortite',
    category: 'Strumenti',
    quantity: 30,
    unit: 'set',
    minQuantity: 10,
    price: 45.00,
    supplier: 'DentalTools',
    lastOrder: '20/08/2023'
  },
  {
    id: 10,
    name: 'Carta per sterilizzazione',
    category: 'Materiale monouso',
    quantity: 5,
    unit: 'rotoli',
    minQuantity: 3,
    price: 18.00,
    supplier: 'MedSupplies',
    lastOrder: '25/09/2023'
  }
];

const Inventory = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredInventory, setFilteredInventory] = useState(inventoryData);

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/inventory' : '/inventory';

  // Filtra l'inventario in base al termine di ricerca e alla categoria
  useEffect(() => {
    let filtered = inventoryData;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredInventory(filtered);
  }, [searchTerm, categoryFilter]);

  // Estrai le categorie uniche per il filtro
  const categories = [...new Set(inventoryData.map(item => item.category))];

  // Determina lo stato dell'inventario in base alla quantità
  const getInventoryStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= minQuantity * 0.5) {
      return { status: 'Critico', class: 'bg-lighterror text-error' };
    } else if (quantity <= minQuantity) {
      return { status: 'Basso', class: 'bg-lightwarning text-warning' };
    } else {
      return { status: 'OK', class: 'bg-lightsuccess text-success' };
    }
  };

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h5 className="card-title">Gestione Magazzino</h5>
            <Button color="primary" className="flex items-center gap-2" as={Link} to={`${basePath}/add`}>
              <Icon icon="solar:add-circle-outline" height={20} />
              Nuovo Prodotto
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <TextInput
                id="search-inventory"
                type="text"
                placeholder="Cerca prodotto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={HiSearch}
              />
            </div>
            <Select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full"
            >
              <option value="">Tutte le categorie</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable className="table-auto w-full">
            <Table.Head>
              <Table.HeadCell className="p-4">Prodotto</Table.HeadCell>
              <Table.HeadCell className="p-4">Categoria</Table.HeadCell>
              <Table.HeadCell className="p-4">Quantità</Table.HeadCell>
              <Table.HeadCell className="p-4">Prezzo</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden md:table-cell">Fornitore</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden lg:table-cell">Ultimo Ordine</Table.HeadCell>
              <Table.HeadCell className="p-4">Stato</Table.HeadCell>
              <Table.HeadCell className="p-4">Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const status = getInventoryStatus(item.quantity, item.minQuantity);
                  return (
                    <Table.Row key={item.id}>
                      <Table.Cell className="p-4">
                        <div className="flex gap-2 items-center">
                          <div>
                            <h6 className="text-sm font-medium">{item.name}</h6>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <p className="text-sm">{item.category}</p>
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <p className="text-sm">{item.quantity} {item.unit}</p>
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <p className="text-sm">€{item.price.toFixed(2)}</p>
                      </Table.Cell>
                      <Table.Cell className="p-4 hidden md:table-cell">
                        <p className="text-sm">{item.supplier}</p>
                      </Table.Cell>
                      <Table.Cell className="p-4 hidden lg:table-cell">
                        <p className="text-sm">{item.lastOrder}</p>
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <Badge className={status.class}>
                          {status.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="p-4">
                        <div className="flex gap-2">
                          <Button color="secondary" size="xs" as={Link} to={`${basePath}/edit/${item.id}`}>
                            <Icon icon="solar:pen-outline" height={16} />
                          </Button>
                          <Button color="failure" size="xs">
                            <Icon icon="solar:trash-bin-trash-outline" height={16} />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={8} className="text-center py-4">
                    <p className="text-gray-500">Nessun prodotto trovato</p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-sm text-gray-500">
              Totale prodotti: <span className="font-medium">{filteredInventory.length}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button color="light" size="sm" className="flex items-center gap-2">
              <Icon icon="solar:printer-outline" height={16} />
              <span className="hidden sm:inline">Stampa Inventario</span>
              <span className="sm:hidden">Stampa</span>
            </Button>
            <Button color="warning" size="sm" className="flex items-center gap-2">
              <Icon icon="solar:sort-by-time-outline" height={16} />
              <span className="hidden sm:inline">Ordina Prodotti Bassi</span>
              <span className="sm:hidden">Ordina</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
