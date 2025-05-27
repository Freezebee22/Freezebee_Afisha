import { useEffect } from "react";
import { useDispatch } from "../../services/store";
import { AppHeader } from "../app-header";
import { EventsItems } from "../events-items";
import { fetchEvents } from "../../services/slices/events";
import { AppFooter } from "../app-footer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../../pages/home";
import { Preloader } from "../preloader";
import { Modal } from "../modal/modal";
import { EventInfo } from "../event-info";
import { BookingPage } from "../../pages/booking";
import { PaymentPage } from "../../pages/payment";
import { SuccessPage } from "../../pages/success";
import { ProfilePage } from "../../pages/profile";
import { fetchUser } from "../../services/slices/user";
import { CategoriesPage } from "../../pages/categories";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const backgroundLocation = location.state?.backgroundLocation;
    
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleModalClose = () => {
		navigate(-1);
	};

    return (
        <div className="page">
            <AppHeader/>
            <main className="main">
                <Routes location={backgroundLocation || location}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/booking" element={<BookingPage />}/>
                    <Route path="/booking/payment" element={<PaymentPage />}/>
                    <Route path="/booking/success" element={<SuccessPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/event/:id" element={
                        <Modal title='' onClose={handleModalClose}>
                            <EventInfo/>
                        </Modal>}
                    />
                    <Route path="/profile/:id" element={
                        <Modal title='' onClose={handleModalClose}>
                            <EventInfo bought/>
                        </Modal>}
                    />
                </Routes>

                {backgroundLocation &&
                    <Routes>
                        <Route
                            path="/event/:id"
                            element={
                                <Modal title='' onClose={handleModalClose}>
                                    <EventInfo/>
                                </Modal>
                            }
                        />
                        <Route path="/profile/:id" element={
                            <Modal title='' onClose={handleModalClose}>
                                <EventInfo bought/>
                            </Modal>}
                    />
                    </Routes>
                }
            </main>
            <AppFooter/>
        </div>
    )
}


export default App;