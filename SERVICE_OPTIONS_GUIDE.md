# Service Options System

## Overview
The database now supports dynamic, service-specific options. Each service can have unique configuration options with different types and pricing modifiers.

## Database Structure

### ServiceOption
Defines an option group for a service (e.g., "Current Rank", "Material Type")

- `label`: Display name (e.g., "Current Rank")
- `type`: Input type - "select", "range", "checkbox", "number"
- `required`: Whether this option must be selected
- `order`: Display order on the page
- `minValue/maxValue/step`: For range/number types

### ServiceOptionValue
Individual choices within an option (e.g., "Bronze", "Silver", "Gold")

- `label`: Display text
- `value`: Internal identifier
- `priceModifier`: Additional cost for this choice
- `order`: Display order

## Example: ARC Raiders Services

### Rank Boosting
```typescript
{
  name: "Rank Boosting",
  basePrice: 12.00,
  options: [
    {
      label: "Current Rank",
      type: "select",
      values: [
        { label: "Bronze", value: "bronze", priceModifier: 0 },
        { label: "Silver", value: "silver", priceModifier: 5 },
        { label: "Gold", value: "gold", priceModifier: 10 }
      ]
    },
    {
      label: "Desired Rank",
      type: "select",
      values: [
        { label: "Silver", value: "silver", priceModifier: 10 },
        { label: "Gold", value: "gold", priceModifier: 20 }
      ]
    }
  ]
}
```

### Loot Farming
```typescript
{
  name: "Loot Farming",
  basePrice: 20.00,
  options: [
    {
      label: "Material Type",
      type: "select",
      values: [
        { label: "Scrap Metal", value: "scrap_metal", priceModifier: 0 },
        { label: "Rare Alloys", value: "rare_alloys", priceModifier: 20 },
        { label: "Legendary Cores", value: "legendary_cores", priceModifier: 50 }
      ]
    },
    {
      label: "Quantity",
      type: "range",
      minValue: 100,
      maxValue: 10000,
      step: 100
    }
  ]
}
```

## API Response Format

When fetching a service via `/api/services/[serviceId]`:

```json
{
  "id": "service-id",
  "name": "Rank Boosting",
  "basePrice": 12.00,
  "options": [
    {
      "id": "option-id",
      "label": "Current Rank",
      "type": "select",
      "required": true,
      "order": 1,
      "values": [
        {
          "id": "value-id",
          "label": "Bronze",
          "value": "bronze",
          "priceModifier": 0,
          "order": 1
        }
      ]
    }
  ]
}
```

## Frontend Implementation

### Rendering Options Dynamically

```typescript
// In your service page component
const [selectedOptions, setSelectedOptions] = useState({});
const [totalPrice, setTotalPrice] = useState(service.basePrice);

// Calculate price based on selections
useEffect(() => {
  let price = Number(service.basePrice);
  
  service.options?.forEach(option => {
    const selectedValue = selectedOptions[option.id];
    if (selectedValue) {
      const value = option.values.find(v => v.value === selectedValue);
      if (value) {
        price += Number(value.priceModifier);
      }
    }
  });
  
  setTotalPrice(price);
}, [selectedOptions, service]);

// Render options
{service.options?.map((option) => (
  <div key={option.id}>
    <h3>{option.label}</h3>
    
    {option.type === 'select' && (
      <select 
        required={option.required}
        onChange={(e) => setSelectedOptions({
          ...selectedOptions,
          [option.id]: e.target.value
        })}
      >
        <option value="">Select {option.label}</option>
        {option.values.map(value => (
          <option key={value.id} value={value.value}>
            {value.label} 
            {value.priceModifier > 0 && ` (+$${value.priceModifier})`}
          </option>
        ))}
      </select>
    )}
    
    {option.type === 'range' && (
      <input
        type="range"
        min={option.minValue}
        max={option.maxValue}
        step={option.step}
        onChange={(e) => setSelectedOptions({
          ...selectedOptions,
          [option.id]: e.target.value
        })}
      />
    )}
    
    {option.type === 'checkbox' && (
      <div>
        {option.values.map(value => (
          <label key={value.id}>
            <input
              type="checkbox"
              value={value.value}
              onChange={(e) => {
                const current = selectedOptions[option.id] || [];
                setSelectedOptions({
                  ...selectedOptions,
                  [option.id]: e.target.checked 
                    ? [...current, value.value]
                    : current.filter(v => v !== value.value)
                });
              }}
            />
            {value.label} (+${value.priceModifier})
          </label>
        ))}
      </div>
    )}
  </div>
))}
```

## Adding New Services with Options

Update `seed.ts`:

```typescript
{
  name: "Your Service",
  basePrice: 25.00,
  options: [
    {
      label: "Your Option",
      type: "select",
      required: true,
      order: 1,
      values: [
        { label: "Choice 1", value: "choice1", priceModifier: 0, order: 1 },
        { label: "Choice 2", value: "choice2", priceModifier: 10, order: 2 }
      ]
    }
  ]
}
```

Then run: `npx tsx seed.ts`

## Benefits

1. **Flexible**: Each service can have completely different options
2. **Dynamic Pricing**: Price modifiers adjust based on selections
3. **Scalable**: Easy to add new options without code changes
4. **Type-Safe**: Multiple input types supported (select, range, checkbox, number)
5. **Ordered**: Control display order of options and values
