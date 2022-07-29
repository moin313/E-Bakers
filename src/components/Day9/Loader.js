import { toast } from 'react-toastify';
toast.configure()

{/*IT WILL SHOW LOADING */ }

function Loader() {
    return (
        <>
            <div class="spinner">
                <div class="dot1"></div>
                <div class="dot2"></div>
            </div>
        </>
    )
}

export default Loader;