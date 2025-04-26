import { styled } from '@mui/material/styles';

export const SkeletonPlaceholder = styled('div')<{height: number}>(({theme, height}) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '""',
}));