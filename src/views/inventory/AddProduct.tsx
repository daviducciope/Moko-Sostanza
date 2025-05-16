import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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

/**
 * Componente AddProduct per l'aggiunta di nuovi prodotti all'inventario
 * Supporta sia la visualizzazione per dentisti che per cliniche
 */
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
    
    // Converti i valori numerici
    if (name === 'quantity' || name === 'minQuantity' || name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Qui andrebbe implementata la logica per salvare il prodotto
    console.log('Prodotto da salvare:', formData);
    
    // Reindirizza alla pagina dell'inventario
    navigate(basePath);
  };

  return (
    <>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <Label htmlFor="name" value="Nome Prodotto *" />
                <TextInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nome del prodotto"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="category" value="Categoria *" />
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleziona categoria</option>
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <Label htmlFor="description" value="Descrizione" />
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descrizione del prodotto"
                />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="quantity" value="Quantità *" />
                  <TextInput
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit" value="Unità *" />
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
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="minQuantity" value="Quantità Minima *" />
                  <TextInput
                    id="minQuantity"
                    name="minQuantity"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.minQuantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price" value="Prezzo (€) *" />
                  <TextInput
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="supplier" value="Fornitore" />
                <TextInput
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Nome del fornitore"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="location" value="Posizione" />
                <TextInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Posizione in magazzino"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" value="Note" />
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Note aggiuntive"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button color="light" as={Link} to={basePath}>
              Annulla
            </Button>
            <Button type="submit" color="primary">
              Salva Prodotto
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
