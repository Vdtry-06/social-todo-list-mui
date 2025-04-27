import * as React from 'react';
import { Router } from '@toolpad/core/AppProvider';

export function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    return React.useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => setPathname(String(path)),
    }), [pathname]);
}