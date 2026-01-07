'use client';

import { useCurrency } from '@/app/context/CurrencyContext';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { DollarSign, Check } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const currentCurrency = currencies.find((c) => c.code === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <DollarSign className="h-5 w-5" />
          <span className="sr-only">Select Currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code as any)}
            className="cursor-pointer flex items-center justify-between"
          >
            <span>
              {curr.symbol} {curr.name}
            </span>
            {currency === curr.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
