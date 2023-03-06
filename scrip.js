const usuarios = [
  { nombre: "hugo alberto jimenez", documento: 10235817, password: "spiderman", tipo: 1 },
  { nombre: "maria fernanda mejia", documento: 87654321, password: "salem", tipo: 2 },
  { nombre: "Carlos salazar", documento: 13579024, password: "password123", tipo: 2 },
];
const cajero = [];
const arrayTotales = [];
let billetesEntregados = [];
let valorTotalCajero = 0;
// ------------ VARIABLESSS --------------
const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
const contraseña = prompt("Ingrese su contraseña");

let validador = false;
let palanca = false;

function inicioSesion(numeroDocumento, contraseña) {
  const usuarioActual = usuarios.find(({ documento, password }) => documento === numeroDocumento && password === contraseña);
  let validador = false;
  while(!validador){
    if(usuarioActual){
      console.log("Existe")
      if(usuarioActual.tipo == 1){
        alert(`Bienvenido ${usuarioActual.nombre}! Tu rol es de Administrador`)
        const salir = confirm("Salir del cajero?")
        if(salir){
          alert("Hasta pronto")
          break;
        }else{
          recarga()
        }

      }else{
        alert(`Bienvenido ${usuarioActual.nombre}!`)
        const salir = confirm("Salir del cajero?")
        if(salir){
          alert("Hasta pronto")
          break;
        }else{
          cliente()
        }
      }
      validador = true
    }
    if(!usuarioActual){
      console.log("no existe")
      const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
      const contraseña = prompt("Ingrese su contraseña");
      inicioSesion(numeroDocumento, contraseña)
      validador = true
    }
  }
}
inicioSesion(numeroDocumento, contraseña)

//3. Solicitar la cantidad de billetes de 5, 10, 20, 50 y 100 mil pesos COP.
function recarga(){
  let billeteCincoMil = parseInt(prompt("Ingrese la cantidad de billetes de 5.000"));
  let billeteDiezMil = parseInt(prompt("Ingrese la cantidad de billetes de 10.000"));
  let billeteVeinteMil = parseInt(prompt("Ingrese la cantidad de billetes de 20.000"));
  let billeteCincuentaMil = parseInt(prompt("Ingrese la cantidad de billetes de 50.000"));
  let billeteCienMil = parseInt(prompt("Ingrese la cantidad de billetes de 100.000"));

  if(!palanca){
    cajero.push(
      { denominacion: 5000, cantidad: billeteCincoMil  },
      { denominacion: 10000, cantidad: billeteDiezMil },
      { denominacion: 20000, cantidad: billeteVeinteMil },
      { denominacion: 50000, cantidad: billeteCincuentaMil },
      { denominacion: 100000, cantidad: billeteCienMil }
    )
    palanca = true
  }else{
    cajero[0].cantidad = billeteCincoMil;
    cajero[1].cantidad = billeteDiezMil;
    cajero[2].cantidad = billeteVeinteMil;
    cajero[3].cantidad = billeteCincuentaMil;
    cajero[4].cantidad = billeteCienMil;
  }

    console.log("el total de cada denominacion es,")
    for(i = 0; i < cajero.length; i++){
      arrayTotales.push(cajero[i].denominacion * cajero[i].cantidad)
      console.log(cajero[i].denominacion * cajero[i].cantidad)
    }
    console.log("El valor total que hay en el cajero es: ")
    arrayTotales.forEach(function(a){valorTotalCajero += a;});
    console.log(valorTotalCajero);

    const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
    const contraseña = prompt("Ingrese su contraseña");
    inicioSesion(numeroDocumento, contraseña)
    validador = true
}

function cliente(){
  if(valorTotalCajero == 0){
    console.log("Cajero en mantenimiento, vuelva pronto!")
    const salir = confirm("Salir del cajero?")
    if(salir){
      alert("Hasta pronto")
    }else{
      const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
      const contraseña = prompt("Ingrese su contraseña");
      inicioSesion(numeroDocumento, contraseña) 
      validador = true
    }
  }else{
    const dineroRetirar = parseInt(prompt("Cuanto dinero desea retirar?"))
    if(dineroRetirar <= valorTotalCajero && valorTotalCajero > 1){
      let confirmarRetiro = confirm(`Mi dinero actual es de ${valorTotalCajero}, puedes retirar tu ${dineroRetirar}, desea retirarlos?`)
      if(confirmarRetiro){
        let cantidadRestante = dineroRetirar;
        valorTotalCajero -= dineroRetirar;
        console.log(valorTotalCajero)

        for (let i = cajero.length - 1; i >= 0; i--) {
          let billetesDenominacionActual = Math.floor(cantidadRestante / cajero[i].denominacion);
          if (billetesDenominacionActual > cajero[i].cantidad) {
            billetesDenominacionActual = cajero[i].cantidad;
          }
          cantidadRestante -= billetesDenominacionActual * cajero[i].denominacion;

          billetesEntregados.push({ denominacion: cajero[i].denominacion, cantidad: billetesDenominacionActual });
          console.log(billetesEntregados)
    
          console.log(`te puedo entregar ${billetesDenominacionActual} de ${cajero[i].denominacion}`)
          console.log(`valor en cajero es de ${valorTotalCajero}`)

          console.log("Billetes entregados:");
          for (let i = 0; i < billetesEntregados.length; i++) {
            if(i == 4){
              console.log(`${billetesEntregados[i].cantidad} x ${billetesEntregados[i].denominacion} mil pesos COP`);
            }
          }
          const salir = confirm("Salir del cajero?")
          if(salir){
            alert("Hasta pronto")
            break;
          }else{
            const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
            const contraseña = prompt("Ingrese su contraseña");
            inicioSesion(numeroDocumento, contraseña) 
            validador = true
          }
          if (cantidadRestante === 0) {
            break;
          }
        }
      }
    }else{
      alert("No hay dinero suficiente")
      const numeroDocumento = parseInt(prompt("Ingrese su número de documento"));
      const contraseña = prompt("Ingrese su contraseña");
      inicioSesion(numeroDocumento, contraseña)
      validador = true
    }
    
  }
}
