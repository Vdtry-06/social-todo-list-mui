
import { Navigation } from "@toolpad/core/AppProvider";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';

export const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'list-items',
        title: 'List items',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'action',
        title: 'Action',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'create-item',
                title: 'Create item',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'get-item',
                title: 'Get item',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'update-item',
                title: 'Update item',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'delete-item',
                title: 'Delete item',
                icon: <DescriptionIcon />,
            }
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];