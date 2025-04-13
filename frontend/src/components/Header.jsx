import { faPlusSquare, faSun } from "@fortawesome/free-regular-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "../store/theme-mode";
import { Link } from "react-router";

export default function Header() {
    const lightMode = useTheme(state => state.lightMode);
    const switchMode = useTheme(state => state.actions.switchMode);

    return (
        <header className={`${lightMode ? "bg-gray-100" : "bg-gray-900"} transition-colors`}>
            <div className="flex items-center justify-between py-2 px-5 max-w-[1200px] mx-auto">
                <div className="flex items-center font-semibold text-2xl gap-x-2 text-blue-600">
                    <Link to={"/"}>
                        <h2 className="uppercase">
                            Product Store
                        </h2>
                    </Link>
                    <FontAwesomeIcon icon={faRocket} />
                </div>
                <div className="text-lg flex gap-x-3">
                    <Link
                        className="bg-gray-700 text-gray-300 w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-600 transition-colors"
                        to={"register-product"}
                    >
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </Link>
                    <button
                        className="bg-gray-700 text-gray-300 w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-600 transition-colors"
                        onClick={() => switchMode()}
                    >
                        <FontAwesomeIcon icon={faSun} />
                    </button>
                </div>
            </div>
        </header>
    )
}
