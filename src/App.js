import Router from "./navigation/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthenticationProvider from "./authentication/AuthenticationProvider";


function App() {
    return (
        <div>
            <style>{'body { background-color: #F0F0F0; width: 100%; height: 100%}'}</style>
            <AuthenticationProvider>
                <Router/>
            </AuthenticationProvider>
        </div>
    );
}

export default App;