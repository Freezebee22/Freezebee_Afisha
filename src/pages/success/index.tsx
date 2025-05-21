import { Link } from "react-router-dom";

export const SuccessPage = () => {
    return (
        <>
            <h3>Билеты оформлены!</h3>
            <p>Вы можете посмотреть приобретенные билеты, перейдя в профиль</p>
            <Link to={"/"}>
                <button>На главную</button>
            </Link>
        </>
    )
};