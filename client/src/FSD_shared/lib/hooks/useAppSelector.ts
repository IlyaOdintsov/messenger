import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/FSD_shared/store/store.tsx';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
