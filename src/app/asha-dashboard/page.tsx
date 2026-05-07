'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Activity,
  Baby,
  Bell,
  Users,
  PlusCircle,
  ExternalLink,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const tasksData = [
  {
    patient: 'Sunita Devi',
    task: 'Postnatal Visit',
    dueDate: 'Today',
    priority: 'High',
    status: 'Pending',
  },
  {
    patient: 'Ramesh Kumar',
    task: 'TB Medication Follow-up',
    dueDate: 'Today',
    priority: 'High',
    status: 'Pending',
  },
  {
    patient: 'Geeta Singh (Child)',
    task: 'Vaccination Reminder',
    dueDate: 'Tomorrow',
    priority: 'Medium',
    status: 'Pending',
  },
  {
    patient: 'Village Meeting',
    task: 'Hygiene Awareness Session',
    dueDate: 'In 2 days',
    priority: 'Low',
    status: 'Scheduled',
  },
  {
    patient: 'Anjali Sharma',
    task: 'Antenatal Check-up',
    dueDate: 'In 3 days',
    priority: 'Medium',
    status: 'Scheduled',
  },
  {
    patient: 'Aarav Patel',
    task: 'Growth Monitoring',
    dueDate: 'Completed',
    priority: 'Medium',
    status: 'Done',
  },
];

const emergencyContactsData = [
  { name: 'ASHA Supervisor', number: '98765 43210' },
  { name: 'Ambulance', number: '102' },
  { name: 'Local Clinic', number: '0123-456789' },
  { name: 'Emergency Helpline', number: '112' },
];

export default function AshaDashboardPage() {
  const ashaImage = PlaceHolderImages.find((img) => img.id === 'asha-worker');
  const { t } = useLanguage();

  const tasks = tasksData.map((task) => ({
    ...task,
    patient: t(task.patient),
    task: t(task.task),
    dueDate: t(task.dueDate),
    priority: t(task.priority),
    status: t(task.status),
  }));

  const emergencyContacts = emergencyContactsData.map((contact) => ({
    ...contact,
    name: t(contact.name),
  }));

  return (
    <div className="space-y-8 content-to-read">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            {t('ASHA Worker Dashboard')}
          </h1>
          <p className="text-muted-foreground">{t('Welcome back, Kavita!')}</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('New Task')}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Pending Tasks')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t('2 high-priority')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Maternal Cases')}</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t('1 new this week')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Total Patients')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              {t('in your assigned area')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('System Alerts')}</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              {t('High-risk pregnancy detected')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('My Task List')}</CardTitle>
          <CardDescription>
            {t('A list of your upcoming and pending tasks.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Patient / Task')}</TableHead>
                <TableHead>{t('Due Date')}</TableHead>
                <TableHead>{t('Priority')}</TableHead>
                <TableHead>{t('Status')}</TableHead>
                <TableHead className="text-right">{t('Action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.task}>
                  <TableCell>
                    <div className="font-medium">{task.patient}</div>
                    <div className="text-sm text-muted-foreground">{task.task}</div>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={task.priority === 'High' ? 'destructive' : 'secondary'}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" disabled={task.status === t('Done')}>
                      {task.status === t('Done') ? t('Completed') : t('View')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('Emergency Contacts')}</CardTitle>
            <CardDescription>
              {t('Quick access to essential contact numbers.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.name}
                className="flex justify-between items-center"
              >
                <span className="text-muted-foreground">{contact.name}</span>
                <Button variant="outline" asChild>
                  <a href={`tel:${contact.number}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {contact.number}
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('ASHA Program Portal')}</CardTitle>
            <CardDescription>
              {t('Access the official government portal for ASHA workers for guidelines and resources.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link
                href="https://hmfw.ap.gov.in/asha-program.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t('Visit Website')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
