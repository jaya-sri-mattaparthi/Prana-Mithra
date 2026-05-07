'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const medicinesData = [
  {
    name: 'Paracetamol',
    form: '500mg Tablet',
    shop: 'Ram Medicals, Paderu',
    stock: 'In Stock',
    lastUpdated: 'Today, 9:00 AM',
  },
  {
    name: 'Oral Rehydration Salts (ORS)',
    form: 'Sachet',
    shop: 'Village General Store',
    stock: 'In Stock',
    lastUpdated: 'Today, 10:30 AM',
  },
  {
    name: 'Amoxicillin',
    form: '250mg Capsule',
    shop: 'Apollo Pharmacy stall, Araku',
    stock: 'Low Stock',
    lastUpdated: 'Yesterday, 5:00 PM',
  },
  {
    name: 'Cough Syrup',
    form: '100ml Bottle',
    shop: 'Ram Medicals, Paderu',
    stock: 'In Stock',
    lastUpdated: 'Today, 9:00 AM',
  },
  {
    name: 'Band-Aids',
    form: 'Assorted Pack',
    shop: 'Village General Store',
    stock: 'Out of Stock',
    lastUpdated: '2 days ago',
  },
  {
    name: 'Iron & Folic Acid Tablets',
    form: 'Tablet Strip',
    shop: 'ASHA-provided stock',
    stock: 'In Stock',
    lastUpdated: 'Today, 8:00 AM',
  },
  {
    name: 'Cetirizine',
    form: '10mg Tablet',
    shop: 'Apollo Pharmacy stall, Araku',
    stock: 'In Stock',
    lastUpdated: 'Yesterday, 5:00 PM',
  },
];

export default function PharmacyTrackerPage() {
  const { t } = useLanguage();

  const medicines = medicinesData.map((med) => ({
    ...med,
    name: t(med.name),
    form: t(med.form),
    shop: t(med.shop),
    stock: t(med.stock),
    lastUpdated: t(med.lastUpdated),
  }));

  const getStockBadgeVariant = (stock: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (stock === t('In Stock')) return 'default';
    if (stock === t('Low Stock')) return 'secondary';
    if (stock === t('Out of Stock')) return 'destructive';
    return 'outline';
  };
  
  const getStockBadgeClass = (stock: string): string => {
    if (stock === t('In Stock')) return 'bg-green-100 text-green-800 border-green-200';
    if (stock === t('Low Stock')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return '';
  }

  return (
    <div className="space-y-8 content-to-read">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          {t('Pharmacy Availability Tracker')}
        </h1>
        <p className="text-muted-foreground">
          {t('Find availability of essential medicines in local pharmacies and general stores.')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('Search for a medicine...')}
            className="pl-10 text-lg p-6 rounded-full"
          />
        </div>
        <p className="text-sm text-center text-muted-foreground md:max-w-xs">
          {t('Stock information is updated periodically. Please call the shop to confirm availability.')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('Medicine Stock')}</CardTitle>
          <CardDescription>
            {t('A list of available medicines and their status.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Medicine')}</TableHead>
                <TableHead>{t('Available At')}</TableHead>
                <TableHead>{t('Status')}</TableHead>
                <TableHead>{t('Last Updated')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((med) => (
                <TableRow key={med.name + med.shop}>
                  <TableCell>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {med.form}
                    </div>
                  </TableCell>
                  <TableCell>{med.shop}</TableCell>
                  <TableCell>
                    <Badge variant={getStockBadgeVariant(med.stock)} className={getStockBadgeClass(med.stock)}>
                      {med.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {med.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
