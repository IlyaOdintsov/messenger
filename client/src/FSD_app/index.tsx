import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '../FSD_shared/store/store.tsx';
import { MobileBlocker } from '@/FSD_widgets/MobileBlocker/MobileBlocker.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MobileBlocker>
			<Provider store={store}>
				<App />
			</Provider>
		</MobileBlocker>
	</StrictMode>
);
