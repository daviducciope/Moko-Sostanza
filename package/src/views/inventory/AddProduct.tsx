import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router';

// Categorie di prodotti predefinite
const productCategories = [
  'Materiale monouso',
  'Materiale dentale',
  'Farmaci',
  'Strumenti',
  'Attrezzature',
  'Altro'
];

// Unità di misura predefinite
const measurementUnits = [
  'pz',
  'conf',
  'set',
  'ml',
  'l',
  'g',
  'kg',
  'siringhe',
  'fiale',
  'rotoli',
  'scatole'
];

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/inventory' : '/inventory';

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    quantity: 0,
    unit: 'pz',
    minQuantity: 0,
    price: 0,
    supplier: '',
    location: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'minQuantity' || name === 'price'
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Qui andrebbe la logica per salvare il prodotto
    console.log('Dati prodotto:', formData);

    // Reindirizza all'inventario dopo il salvataggio
    navigate(basePath);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Nuovo Prodotto</h5>
          <Link to={basePath} className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'inventario</span>
          </Link>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nome Prodotto" />
            </div>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Es. Guanti in lattice (M)"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Categoria" />
            </div>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleziona categoria</option>
              {productCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descrizione" />
          </div>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrizione dettagliata del prodotto..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Quantità" />
            </div>
            <TextInput
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              min={0}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="unit" value="Unità di Misura" />
            </div>
            <Select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            >
              {measurementUnits.map((unit, index) => (
                <option key={index} value={unit}>{unit}</option>
              ))}
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="minQuantity" value="Quantità Minima" />
            </div>
            <TextInput
              id="minQuantity"
              name="minQuantity"
              type="number"
              value={formData.minQuantity}
              onChange={handleChange}
              min={0}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Prezzo (€)" />
            </div>
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              min={0}
              step={0.01}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="supplier" value="Fornitore" />
            </div>
            <TextInput
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Es. MedSupplies"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Posizione in Magazzino" />
            </div>
            <TextInput
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Es. Scaffale A3"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="notes" value="Note" />
          </div>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Note aggiuntive..."
            rows={2}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button color="light" onClick={() => navigate(basePath)}>
            Annulla
          </Button>
          <Button type="submit" color="primary">
            Salva
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
