import Swal from "sweetalert2";

export const showAlert = ({
  title = "Alert",
  text = "",
  icon = "info", // success | error | warning | info
  confirmText = "OK",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: confirmText,
    confirmButtonColor: "#000",
    backdrop: "rgba(0,0,0,0.5)",
  });
};
