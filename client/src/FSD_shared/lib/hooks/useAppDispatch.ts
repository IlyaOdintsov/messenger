import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/FSD_shared/store/store.tsx';

export const useAppDispatch = () => useDispatch<AppDispatch>();
