import {colorStyles} from "@/shared/cat/colors";

const Logout = (props) => (
    <svg
        className="w-6 h-6 text-white group-hover:text-white"
        fill="none"
        stroke={colorStyles.text.secondary.light}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
    </svg>
);
export default Logout;