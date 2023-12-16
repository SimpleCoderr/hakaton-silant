import { Routes, Route } from "react-router-dom";
import {privateRoutes} from "app/AppAuthRouter/privateRoutes";
import {publicRoutes} from "app/AppAuthRouter/publicRoutes";
const AppAuthRouter = () => {
    const isLogged = false;

    // const { isLogged } = useTypedSelector((state) => state.app);
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         // при каждой перезагрузке происходит проверка токена, если он есть - рефрешим его
    //         dispatch(checkAuth());
    //     }
    // }, []);

    return (
        <Routes>
            {isLogged ? (
                <>
                    {privateRoutes.map((route) => (
                        <Route {...route} key={route.path} />
                    ))}
                </>
            ) : (
                <>
                    {publicRoutes.map((route) => (
                        <Route {...route} key={route.path} />
                    ))}
                </>
            )}
        </Routes>
    )
}

export default AppAuthRouter;