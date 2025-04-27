import { AppProvider } from "@toolpad/core";
import { useDemoRouter } from "../hooks/useDemoRouter";
import Grid from "@mui/material/Grid";
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { SkeletonPlaceholder } from "../components/SkeletonPlaceholder";
import { NAVIGATION } from "../config/NavigationConfig";
import { demoTheme } from "../config/DemoTheme";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ListItems from "../pages/list/ListItems";
import CreateItem from "../pages/analytics/CreateItem";
import GetItem from "../pages/analytics/GetItem";
import UpdateItem from "../pages/analytics/UpdateItem";
import DeleteItem from "../pages/analytics/DeleteItem";

export default function DashboardLayoutBasic(props: any) {
    const { window } = props;
    const router = useDemoRouter(window?.location?.pathname || '/dashboard');
    const demoWindow = window ? window() : undefined;

    const renderContent = () => {
        const path = router.pathname;
        switch(path) {
            case '/dashboard': return <DashboardPage />;
            case '/list-items': return <ListItems />;
            case '/action/create-item': return <CreateItem/>
            case '/action/get-item': return <GetItem/>
            case '/action/update-item': return <UpdateItem/>
            case '/action/delete-item': return <DeleteItem/>
            default:
                return (
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <h2>Page Not Found</h2>
                        </Grid>
                    </Grid>
                );
        }     
    }
    
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    {renderContent()}
                    <Grid container spacing={1}>
                        <Grid size={5} />
                        <Grid size={12} >
                            <SkeletonPlaceholder height={50} />
                        </Grid>
                        <Grid size={4}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                        <Grid size={8}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                        <Grid size={12}>
                            <SkeletonPlaceholder height={150} />
                        </Grid>
                        <Grid size={12}>
                            <SkeletonPlaceholder height={50} />
                        </Grid>
                        <Grid size={3}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                        <Grid size={3}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                        <Grid size={3}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                        <Grid size={3}>
                            <SkeletonPlaceholder height={100} />
                        </Grid>
                    </Grid>
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}