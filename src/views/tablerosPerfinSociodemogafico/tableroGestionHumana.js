import React from "react";

const TableroGestionHumana = () => {
    return (
        <div style={{backgroundColor: "#F2F2F2", minHeight: "100vh" }}>
            <h2 style={{ textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                Tablero de Gestión Humana
            </h2>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <iframe
                    title="Dashboard_PerfilSociodemografico"
                    width="100%"
                    height="750"
                    src="https://app.powerbi.com/view?r=eyJrIjoiNjc1ZGRiM2EtMDQzNy00ODdmLWI3M2QtNDFkMDhjNjExYTRjIiwidCI6IjEwNzg1MmM2LTJmZjgtNGIyNi1iODk0LTczYTYwYWQxMTM1YSIsImMiOjR9"
                    frameBorder="0"
                    allowFullScreen={true}
                    style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                ></iframe>
                
            </div>
        </div>
    );
};

export default TableroGestionHumana;
