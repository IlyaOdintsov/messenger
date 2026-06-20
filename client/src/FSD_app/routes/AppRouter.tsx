import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout.tsx';
import { ChatsPage } from '../../FSD_pages/ChatsPage/ChatsPage.tsx';
import { ChatBox } from '../../FSD_widgets/ChatBox/ChatBox.tsx';
import { RegisterPage } from '../../FSD_pages/RegisterPage/RegisterPage.tsx';
import { StepperProvider } from '../../FSD_shared/lib/hooks/useStepper.tsx';
import { ForgotPassword } from '../../FSD_pages/ForgotPassword/ForgotPassword.tsx';
import { ResetPassword } from '../../FSD_pages/ResetPassword/ResetPassword.tsx';
import { ProfilePage } from '../../FSD_pages/ProfilePage/ProfilePage.tsx';
import { SettingsPage } from '../../FSD_pages/SettingsPage/SettingPage.tsx';
import { RequireAuth } from './RequireAuth.tsx';
import { ContactsPage } from '../../FSD_pages/ContactsPage/ContactsPage.tsx';
import { ContactBox } from '../../FSD_widgets/ContactBox/ContactBox.tsx';
import { LoginPage } from '@/FSD_pages/LoginPage/LoginPage.tsx';
import { ComingSoonPage } from '@/FSD_pages/ComingSoonPage/ComingSoonPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				index: true,
				element: 'err',
			},
			{
				path: 'chats',
				element: <ChatsPage />,
				children: [
					{
						index: true,
						element: <ChatBox />,
					},
					{
						path: ':chatId',
						element: <ChatBox />,
					},
					{
						path: '*',
						element: <ChatBox />,
					},
				],
			},
			{
				path: 'contacts',
				element: <ContactsPage />,
				children: [
					{
						index: true,
						element: <ContactBox />,
					},
					{
						path: ':contactId',
						element: <ContactBox />,
					},
					{
						path: '*',
						element: <ContactBox />,
					},
				],
			},
			{
				path: 'Notifications',
				element: <ComingSoonPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
			{
				path: '*',
				element: <>error</>,
			},
		],
	},
	{
		path: 'login',
		element: <LoginPage />,
	},
	{
		path: 'forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: 'reset-password',
		element: <ResetPassword />,
	},
	{
		path: 'register',
		element: (
			<StepperProvider maxSteps={5}>
				<RegisterPage />
			</StepperProvider>
		),
	},
]);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
