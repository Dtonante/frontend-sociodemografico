import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showAlert(options, onConfirm, onCancel) {
    MySwal.fire({
        title: options.title,
        icon: options.icon,
        text: options.text,
        width: options.width || '600px', // Ancho ajustable por opción
        showCancelButton: options.showCancelButton,
        confirmButtonText: options.confirmButtonText,
        cancelButtonText: options.cancelButtonText,
        customClass: {
            popup: 'swal2-custom-popup'
        }
    }).then(result => {
        if (result.isConfirmed) {
            if (onConfirm) onConfirm();
        } else {
            if (onCancel) onCancel();
        }
    });
}

export function show_alert(message, icon, focus = '', width = '400px') {
    if (!message) return;
    onfocus(focus);
    const toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        width: width, // Ancho ajustable para el toast
        customClass: {
            popup: 'swal2-custom-popup'
        }
    });
    toast.fire({
        title: message,
        icon: icon
    });
}

function onfocus(focus) {
    if (focus !== '') {
        document.getElementById(focus).focus();
    }
}

// Estilos personalizados
const style = document.createElement('style');
style.innerHTML = `
    /* Fuente Poppins */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .swal2-custom-popup {
        background-color: #f1f1f1 !important; /* Blanco de oficina */
        color: #333 !important; /* Color de texto oscuro para contraste */
        font-family: 'Poppins', sans-serif !important; /* Aplica la fuente Poppins */
        border-radius: 15px !important; /* Bordes curveados */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important; /* Sombra suave */
    }
    .swal2-title,
    .swal2-content {
        color: #333 !important; /* Color de texto oscuro */
        font-family: 'Poppins', sans-serif !important;
    }
    .swal2-confirm {
        background-color: #00aa4d !important;
        color: white !important;
        border: none !important;
        font-family: 'Poppins', sans-serif !important;
        border-radius: 8px !important; /* Bordes curveados */
    }
    .swal2-cancel {
        background-color: #ef4444 !important;
        color: white !important;
        border: none !important;
        font-family: 'Poppins', sans-serif !important;
        border-radius: 8px !important; /* Bordes curveados */
    }
    .swal2-confirm:focus,
    .swal2-cancel:focus {
        box-shadow: none !important;
    }
`;
document.head.appendChild(style);

export default show_alert;
