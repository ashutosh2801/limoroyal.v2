import Swal from "sweetalert2";

export const showAlert = ({
  title = "Alert",
  text = "",
  icon = "error", // success | error | warning | info
  confirmText = "OK",
  textColor = "#f27474"
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: confirmText,
    confirmButtonColor: "#000",
    backdrop: "rgba(0,0,0,0.5)",
    didOpen: () => {
      const el = Swal.getHtmlContainer();
      if (el) el.style.color = textColor;

      const iconEl = Swal.getIcon();
      if (iconEl) {
        iconEl.style.fontSize = "0.5rem";
      }
    },
  });
};
