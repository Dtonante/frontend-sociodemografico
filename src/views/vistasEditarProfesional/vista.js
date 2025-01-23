const actualizar = async (e) => {
  e.preventDefault();

  console.log("personasArray:", personasArray);
  console.log("mascotasArray:", mascotasArray);

  // Definimos los campos obligatorios a validar, incluyendo arrays
  const camposObligatorios = [
    { nombre: "personasArray", valor: personasArray },
    { nombre: "mascotasArray", valor: mascotasArray },
  ];

  // Recorremos los campos para validar que no estén vacíos
  let camposValidos = true;
  camposObligatorios.forEach((campo) => {
    console.log("Validando campo:", campo.nombre);

    // Si el campo es un array, validamos que no esté vacío
    if (Array.isArray(campo.valor)) {
      if (campo.valor.length === 0) {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: true, // Marcamos el error para el campo específico
        }));
        camposValidos = false;
      } else {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: false, // Eliminamos el error si el campo es válido
        }));
      }
    }
    // Si el campo es una cadena, validamos que no esté vacío o tenga solo espacios
    else if (typeof campo.valor === "string" && campo.valor.trim() === "") {
      setError((prevState) => ({
        ...prevState,
        [campo.nombre]: true, // Marcamos el error para el campo específico
      }));
      camposValidos = false;
    } else if (
      campo.valor === null ||
      campo.valor === undefined ||
      campo.valor === ""
    ) {
      setError((prevState) => ({
        ...prevState,
        [campo.nombre]: true, // Marcamos el error para el campo específico
      }));
      camposValidos = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        [campo.nombre]: false, // Si el campo tiene valor, eliminamos el error
      }));
    }
  });

  console.log("camposValidos:", camposValidos);

  if (!camposValidos) {
    // Si algún campo es inválido, mostramos la alerta y detenemos el proceso
    show_alert("Por favor, completa todos los campos obligatorios.", "info");
    return; // Detenemos el proceso si algún campo requerido está vacío
  }

  console.log("var_estadoCivil:", var_estadoCivil);
  console.log("boolean_viveSolo:", boolean_viveSolo);
  console.log("var_numeroPersonasConLasQueVive:", var_numeroPersonasConLasQueVive);
  console.log("set_personasConLasQueVive:", set_personasConLasQueVive);
  console.log("boolean_viveConMascotas:", boolean_viveConMascotas);
  console.log("set_tipoMascotas:", set_tipoMascotas);
  console.log("var_personasDependeciaEconimica:", var_personasDependeciaEconimica);
  console.log("var_totalIngresosPropiosYGrupoFamiliar:", var_totalIngresosPropiosYGrupoFamiliar);

  showAlert(
    {
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios realizados?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    },
    async () => {
      try {
        console.log("URI_PROFESIONAL + id_profesionalPK:", URI_PROFESIONAL + id_profesionalPK);
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
          var_estadoCivil: var_estadoCivil,
          boolean_viveSolo: boolean_viveSolo,
          var_numeroPersonasConLasQueVive: var_numeroPersonasConLasQueVive,
          set_personasConLasQueVive: set_personasConLasQueVive,
          boolean_viveConMascotas: boolean_viveConMascotas,
          set_tipoMascotas: set_tipoMascotas,
          var_personasDependeciaEconimica: var_personasDependeciaEconimica,
          var_totalIngresosPropiosYGrupoFamiliar:
            var_totalIngresosPropiosYGrupoFamiliar,
        });
        navigate("/app/editarDatosProfesional2");
        show_alert("Cambios exitosos", "success");
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        show_alert("Error al guardar los cambios", "error");
      }
    },
    () => {
      show_alert("Cambios cancelados", "info");
    }
  );
};