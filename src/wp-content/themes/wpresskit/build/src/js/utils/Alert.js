import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js';

/**
 * Component Alert.
 *
 * @param {Object} props - Params recivied on alert.
 * @param {string} props.title - text string to title.
 * @param {'success' | 'error' | 'warning' | 'info' | 'gray'} props.color - Possibles colors to alert
 * @returns {void} return void
 */
const Alert = ({ title, color }) => {
  const background = {
    'success': 'linear-gradient(to right, #00b09B, #96c93D)',
    'error': 'linear-gradient(to right, #E23939, #FF3939)',
    'warning': 'linear-gradient(to right, #FFD700, #FFFF00)',
    'info': 'linear-gradient(to right, #0000FF, #1E90FF)',
    'gray': 'linear-gradient(to right, #CFCFCF, #BFBFBF)'
  }

  Toastify({
    text: title,
    duration: 3000,
    destination: "",
    newWindow: false,
    close: false,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: { background: background[color] },
    onClick: function() {}
  }).showToast();
}

export default Alert;