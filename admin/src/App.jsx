import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4"> 
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
