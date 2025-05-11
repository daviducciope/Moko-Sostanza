import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea, Table } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface InvoiceFormProps {
  isEdit?: boolean;
  invoiceData?: {
    id?: number;
    patient: string;
    date: string;
    dueDate: string;
    invoiceNumber: string;
    paymentMethod: string;
    notes: string;
    items: {
      id: number;
      description: string;
      quantity: number;
      unitPrice: number;
      tax: number;
      total: number;
    }[];
  };
}

const InvoiceForm = ({ isEdit = false, invoiceData }: InvoiceFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient: invoiceData?.patient || '',
    date: invoiceData?.date || new Date().toISOString().split('T')[0],
    dueDate: invoiceData?.dueDate || '',
    invoiceNumber: invoiceData?.invoiceNumber || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    paymentMethod: invoiceData?.paymentMethod || 'Contanti',
    notes: invoiceData?.notes || '',
  });

  const [items, setItems] = useState(
    invoiceData?.items || [
      {
        id: 1,
        description: '',
        quantity: 1,
        unitPrice: 0,
        tax: 22,
        total: 0
      }
    ]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Ricalcola il totale se necessario
          if (field === 'quantity' || field === 'unitPrice' || field === 'tax') {
            const quantity = field === 'quantity' ? Number(value) : item.quantity;
            const unitPrice = field === 'unitPrice' ? Number(value) : item.unitPrice;
            const tax = field === 'tax' ? Number(value) : item.tax;

            const subtotal = quantity * unitPrice;
            const taxAmount = subtotal * (tax / 100);
            updatedItem.total = subtotal + taxAmount;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([
      ...items,
      {
        id: newId,
        description: '',
        quantity: 1,
        unitPrice: 0,
        tax: 22,
        total: 0
      }
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Qui andrebbe la logica per salvare la fattura
    console.log('Dati fattura:', { ...formData, items });

    // Reindirizza all'elenco fatture dopo il salvataggio
    navigate('/billing/invoices');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="patient" value="Paziente" />
          </div>
          <TextInput
            id="patient"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            placeholder="Nome del paziente"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="invoiceNumber" value="Numero Fattura" />
          </div>
          <TextInput
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="INV-2023-001"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="date" value="Data Emissione" />
          </div>
          <TextInput
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="dueDate" value="Data Scadenza" />
          </div>
          <TextInput
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="paymentMethod" value="Metodo di Pagamento" />
          </div>
          <Select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Contanti">Contanti</option>
            <option value="Carta di Credito">Carta di Credito</option>
            <option value="Bonifico">Bonifico Bancario</option>
            <option value="Assegno">Assegno</option>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <Label value="Voci Fattura" />
          <Button color="light" size="sm" onClick={addItem} type="button" className="no-print">
            <Icon icon="solar:add-circle-outline" className="mr-1" />
            Aggiungi Voce
          </Button>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell>Descrizione</Table.HeadCell>
            <Table.HeadCell>Quantità</Table.HeadCell>
            <Table.HeadCell>Prezzo Unitario (€)</Table.HeadCell>
            <Table.HeadCell>IVA (%)</Table.HeadCell>
            <Table.HeadCell>Totale (€)</Table.HeadCell>
            <Table.HeadCell className="no-print"></Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {items.map(item => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <TextInput
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Descrizione"
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                    min={1}
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                    min={0}
                    step={0.01}
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    type="number"
                    value={item.tax}
                    onChange={(e) => handleItemChange(item.id, 'tax', Number(e.target.value))}
                    min={0}
                    max={100}
                    required
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextInput
                    value={item.total.toFixed(2)}
                    readOnly
                  />
                </Table.Cell>
                <Table.Cell className="no-print">
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => removeItem(item.id)}
                    type="button"
                    disabled={items.length === 1}
                  >
                    <Icon icon="solar:trash-bin-trash-outline" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex justify-end mt-4">
          <div className="w-64">
            <div className="flex justify-between py-2 border-t">
              <span className="font-medium">Totale:</span>
              <span className="font-bold">€ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
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
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 no-print">
        <Button color="light" onClick={() => navigate('/billing/invoices')}>
          Annulla
        </Button>
        <Button type="submit" color="primary">
          {isEdit ? 'Aggiorna' : 'Salva'}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
