import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactsPage, DashboardPage, EmailsPage, WriteNowPage } from "~/pages";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/contacts" element={<ContactsPage />} />
				<Route path="/emails" element={<EmailsPage />} />
				<Route path="/write-now" element={<WriteNowPage />} />
			</Routes>
		</BrowserRouter>
	);
}
