import CloseIcon from "@mui/icons-material/Close";
import {motion} from "framer-motion";

export default function Circle({className="", icon=<CloseIcon className="text-text-muted" />, ...props}) {
    return (
        <motion.div
            className={`rounded-[50%] cursor-pointer glass-effect p-2 h-[40px] w-[40px] flex justify-center items-center z-10 ${className}`}
            {...props}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {icon}
        </motion.div>
    )
}