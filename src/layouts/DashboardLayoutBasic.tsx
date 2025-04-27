import { AppProvider } from "@toolpad/core";
import { useDemoRouter } from "../hooks/useDemoRouter";
import Grid from "@mui/material/Grid";
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { SkeletonPlaceholder } from "../components/SkeletonPlaceholder";
import { NAVIGATION } from "../config/NavigationConfig";
import { demoTheme } from "../config/DemoTheme";

export default function DashboardLayoutBasic(props: any) {
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;
    
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <PageContainer>
                    <Grid container spacing={1}>
                        <Grid size={5} />
                        <Grid size={12} >
                            <SkeletonPlaceholder height={14} />
                        </Grid>
                        <Grid size={12} >
                            <SkeletonPlaceholder height={14} />
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
                            <SkeletonPlaceholder height={14} />
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