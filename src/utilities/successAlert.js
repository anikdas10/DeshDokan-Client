import Swal from "sweetalert2";

const successAlert = (title) => {
    console.log(title);
   const alert =  Swal.fire({
      title: {title},
      icon: "success",
    });
    return alert
};

export default successAlert;