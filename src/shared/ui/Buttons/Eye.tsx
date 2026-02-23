import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    isOpen?: boolean
    [key: string]: any
}

export default function Eye({isOpen, ...props}: Props) {
    return (
        isOpen ? <VisibilityIcon {...props}/> : <VisibilityOffIcon {...props}/>
    )
}