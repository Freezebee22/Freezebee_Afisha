import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
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
import { fetchUser, initializeAuth } from "../../services/slices/user";
import { CategoriesPage } from "../../pages/categories";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ProtectedRoute } from "../protected-route";
import { NotFoundPage } from "../../pages/not-found";
import { AdminPage } from "../../pages/admin";
import { EventEdit } from "../event-edit";
import { EventAdd } from "../event-add";
import { UsersPage } from "../../pages/users";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const backgroundLocation = location.state?.backgroundLocation;
    const isAdminPage = location.pathname.includes("admin");
    
    useEffect(() => {
        dispatch(initializeAuth());
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleModalClose = () => {
		navigate(-1);
	};

    return (
        <div className="page">
            { isAdminPage 
                ? <AppHeader adminMode/>
                : <AppHeader />
            }
            <main className="main">
                <Routes location={backgroundLocation || location}>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/booking" element={<BookingPage />}/>
                        <Route path="/booking/payment" element={<PaymentPage />}/>
                        <Route path="/booking/success" element={<SuccessPage />}/>
                        <Route path="/profile" element={<ProfilePage />}/>
                        <Route path="/profile/:id" element={
                            <Modal title='' onClose={handleModalClose}>
                                <EventInfo bought/>
                            </Modal>}
                    />
                    </Route>
                    <Route element={<ProtectedRoute adminOnly/>}>
                        <Route path="/admin" element={<AdminPage />}/>
                        <Route path="/admin/users" element={<UsersPage />}/>
                        <Route path="/admin/event/:id" element={
                            <Modal title='' onClose={handleModalClose}>
                                <EventEdit/>
                            </Modal>}
                        />
                        <Route path="/admin/event/add" element={
                            <Modal title='' onClose={handleModalClose}>
                                <EventAdd/>
                            </Modal>}
                        />
                    </Route>
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/event/:id" element={
                        <Modal title='' onClose={handleModalClose}>
                            <EventInfo/>
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
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile/:id" element={
                                <Modal title='' onClose={handleModalClose}>
                                    <EventInfo bought/>
                                </Modal>}
                            />
                        </Route>
                        <Route element={<ProtectedRoute adminOnly/>}>
                            <Route path="/admin/event/:id" element={
                                <Modal title='' onClose={handleModalClose}>
                                    <EventEdit/>
                                </Modal>} 
                            />
                            <Route path="/admin/event/add" element={
                                <Modal title='' onClose={handleModalClose}>
                                    <EventAdd/>
                                </Modal>}
                            />
                        </Route>
                    </Routes>
                }
            </main>
            <AppFooter/>
        </div>
    )
}


export default App;