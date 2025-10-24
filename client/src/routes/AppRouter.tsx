import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { ChatsPage } from '../pages/ChatsPage/ChatsPage';
import { ChatBox } from '../components/Chats/ChatBox/ChatBox';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { StepperProvider } from '../hooks/useStepper';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <>No page</>,
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
		path: 'register',
		element: (
			<StepperProvider maxSteps={5}>
				<RegisterPage />,
			</StepperProvider>
		),
	},
	{
		path: '*',
		element: <>error</>,
	},
]);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
