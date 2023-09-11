import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

import CloudPage from "./components/cloud-page";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CloudPage />
        </QueryClientProvider>
    );
};

export default App;
