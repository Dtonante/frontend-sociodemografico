import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Función para mostrar alertas generales con confirmación y cancelación
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

// Función para mostrar alertas de tipo toast
export function show_alert(message, icon, focus = '', width = '400px', height = '100px') {
    if (!message) return;
    onfocus(focus);

    const toast = MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        width: width, // Ancho ajustable para el toast
        customClass: {
            popup: 'swal2-custom-popup',
            container: 'swal2-container-custom',  // Clase personalizada para el contenedor
        }
    });

    toast.fire({
        title: message,
        icon: icon,
        didOpen: (toast) => {
            // Aquí añadimos el estilo para ajustar la altura
            toast.style.height = height;  // Altura personalizada para la alerta
        }
    });
}

// Función para manejar el enfoque de un elemento
function onfocus(focus) {
    if (focus !== '') {
        const element = document.getElementById(focus);
        if (element) {
            element.focus();
        } else {
            console.warn(`Elemento con ID "${focus}" no encontrado.`);
        }
    }
}

// Estilos personalizados para el popup y la alerta
const style = document.createElement('style');
style.innerHTML = `
    /* Clase personalizada para ajustar la posición de la alerta */
    .swal2-container-custom {
        position: fixed !important;
        top: 20px !important; /* Ajusta la distancia desde la parte superior */
        left: 90% !important; /* Centra la alerta */
        transform: translateX(-50%) !important; /* Centrado exacto */
        z-index: 9999 !important; /* Asegura que la alerta esté encima de otros elementos */
    }

    /* Estilo adicional para cambiar la altura del popup */
    .swal2-popup {
        height: auto !important;  /* Asegura que el alto sea ajustable */
    }

    /* Fuente Poppins */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    /* Estilo de la alerta personalizada */
    .swal2-custom-popup {
        background-color:rgb(255, 255, 255) !important; /* Blanco de oficina */
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
        background-color: #202B52 !important; /* Cambiar el color de fondo a #202B52 */
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

   div:where(.swal2-icon).swal2-warning {
    border-color: #202B52;
    color: #202B52;
    }

    
}
`;

// Agregar los estilos personalizados al head del documento
document.head.appendChild(style);

export default show_alert;
