import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { ChatsPage } from '../pages/ChatsPage/ChatsPage';
import { ChatBox } from '../components/Chats/ChatBox/ChatBox';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { StepperProvider } from '../hooks/useStepper';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword/ResetPassword';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage/SettingPage';
import { RequireAuth } from './RequireAuth';

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
				<RegisterPage />,
			</StepperProvider>
		),
	},
]);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
