import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import Loading, { setProgress } from "../components/Loading";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(0);

    const value = {
        isLoading,
        setIsLoading,
        setLoading,
    };
    
    useEffect(() => {
        const progress = setProgress(setLoading);
        progress.loaded();
    }, []);

    return (
        <LoadingContext.Provider value={value}>
            {isLoading && <Loading percent={loading} />}
            <main className="main-body">{children}</main>
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
