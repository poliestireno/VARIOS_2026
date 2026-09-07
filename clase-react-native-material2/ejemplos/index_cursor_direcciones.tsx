// ============================================================
// IMPORTS: traemos "herramientas" que ya existen en librerías,
// para no tener que programarlas nosotros desde cero.
// ============================================================

// useState es un "hook" de React: una función especial que le da
// memoria a nuestro componente. Sin esto, cada vez que la pantalla
// se vuelve a dibujar, cualquier variable normal se reiniciaría.
import { useState } from 'react';

// StatusBar es el componente que controla cómo se ve la barrita de
// arriba del celular (donde sale la hora, la batería, el wifi...).
import { StatusBar } from 'expo-status-bar';

// De react-native (la librería principal para hacer apps móviles)
// traemos las piezas de construcción que vamos a usar:
//   - StyleSheet: para crear estilos (como el CSS de las páginas web).
//   - Text: el único componente que puede mostrar texto en pantalla.
//   - View: una "caja" contenedora, para agrupar y ordenar cosas.
//   - Pressable: una caja que detecta cuando el usuario la toca (botón).
import { StyleSheet, Text, View, Pressable } from 'react-native';

// ============================================================
// TIPOS DE DATOS (TypeScript)
// TypeScript es JavaScript "reforzado": nos deja describir qué forma
// tienen nuestros datos, para que el editor nos avise si nos
// equivocamos (por ejemplo, si escribimos mal una palabra).
// ============================================================

// Aquí decimos: "una Direccion SOLO puede ser uno de estos 4 textos
// exactos". Si en cualquier parte del código escribimos 'ariba' (sin la
// segunda 'r'), TypeScript nos avisará del error antes de ejecutar nada.
type Direccion = 'ARRIBA' | 'ABAJO' | 'IZQUIERDA' | 'DERECHA';

// Un "Record<Direccion, string>" es un objeto donde:
//   - Las claves (a la izquierda de los ':') deben ser una Direccion.
//   - Los valores (a la derecha) son texto (string).
// Lo usamos como una especie de "diccionario": le das una dirección
// y te devuelve el emoji de flecha que le corresponde.
const FLECHAS: Record<Direccion, string> = {
  ARRIBA: '⬆️',
  ABAJO: '⬇️',
  IZQUIERDA: '⬅️',
  DERECHA: '➡️',
};

// ============================================================
// COMPONENTE PRINCIPAL
// Un "componente" en React es simplemente una función que devuelve
// lo que se debe pintar en pantalla. Esta función se llama "Index"
// y, como usa "export default", es la pantalla principal de la app
// (Expo Router la reconoce automáticamente por estar en app/index.tsx).
// ============================================================

export default function Index() {
  // ----------------------------------------------------------
  // ESTADO: la "memoria" de nuestro componente.
  //
  // useState<Direccion | null>(null) hace dos cosas:
  //   1) Crea una variable llamada "direccion" que empieza en null
  //      (null significa "todavía no hay ninguna dirección elegida").
  //   2) Crea una función "setDireccion" que es la ÚNICA forma correcta
  //      de cambiar ese valor. Si intentáramos hacer "direccion = 'ARRIBA'"
  //      directamente, React NO se enteraría del cambio y la pantalla
  //      no se actualizaría.
  //
  // Cada vez que llamamos a setDireccion(...), React vuelve a ejecutar
  // esta función Index() de arriba a abajo, pero esta vez con el nuevo
  // valor de "direccion". A eso se le llama "re-renderizar".
  // ----------------------------------------------------------
  const [direccion, setDireccion] = useState<Direccion | null>(null);

  // A partir de aquí, con "return (...)", describimos QUÉ se ve en
  // pantalla. Esto se escribe con una mezcla de HTML y JavaScript
  // llamada JSX. No es HTML real, pero se parece mucho.
  return (
    // View = contenedor principal de toda la pantalla.
    // Su estilo (styles.container) hace que ocupe toda la pantalla
    // y centre su contenido, como veremos más abajo.
    <View style={styles.container}>

      {/* ------------------------------------------------------
          ZONA DE ARRIBA: aquí se muestra en grande la dirección
          que el usuario haya pulsado.
      ------------------------------------------------------ */}
      <View style={styles.pantalla}>
        {/*
          Esto es un operador ternario: "condición ? SI_ES_VERDAD : SI_ES_FALSO".
          Es la forma de escribir un "if/else" dentro del JSX.

          - Si "direccion" tiene un valor (no es null), es "verdadero"
            en JavaScript, así que entramos en la primera parte.
          - Si "direccion" es null, es "falso", y mostramos el mensaje
            de ayuda de la segunda parte.
        */}
        {direccion ? (
          // <>...</> es un "Fragment": sirve para agrupar dos elementos
          // (el Text de la flecha y el Text del nombre) sin tener que
          // meterlos dentro de una View extra que no necesitamos.
          <>
            {/* FLECHAS[direccion] busca en nuestro diccionario de arriba
                el emoji que corresponde a la dirección actual. */}
            <Text style={styles.flechaGrande}>{FLECHAS[direccion]}</Text>
            {/* Mostramos el nombre tal cual, ej: "ARRIBA" */}
            <Text style={styles.textoGrande}>{direccion}</Text>
          </>
        ) : (
          // Como todavía no se pulsó nada, mostramos un texto de ayuda.
          <Text style={styles.textoAyuda}>Pulsa una flecha</Text>
        )}
      </View>

      {/* ------------------------------------------------------
          ZONA DE ABAJO: los 4 botones en forma de cruz, como un
          mando de videojuegos (arriba / izquierda-derecha / abajo).
      ------------------------------------------------------ */}
      <View style={styles.controles}>

        {/* Botón ARRIBA.
            "onPress" es la propiedad que dice qué función ejecutar
            cuando el usuario toca este botón.
            "() => setDireccion('ARRIBA')" es una función flecha (arrow
            function): una mini-función sin nombre que, al ejecutarse,
            llama a setDireccion con el texto 'ARRIBA'. */}
        <Pressable style={styles.boton} onPress={() => setDireccion('ARRIBA')}>
          <Text style={styles.textoBoton}>⬆️</Text>
        </Pressable>

        {/* Fila del medio: ponemos IZQUIERDA y DERECHA uno junto al otro.
            Esto se logra en el estilo "filaMedia" con flexDirection: 'row'
            (ver más abajo en los estilos). */}
        <View style={styles.filaMedia}>
          <Pressable style={styles.boton} onPress={() => setDireccion('IZQUIERDA')}>
            <Text style={styles.textoBoton}>⬅️</Text>
          </Pressable>
          <Pressable style={styles.boton} onPress={() => setDireccion('DERECHA')}>
            <Text style={styles.textoBoton}>➡️</Text>
          </Pressable>
        </View>

        {/* Botón ABAJO, al final de la cruz. */}
        <Pressable style={styles.boton} onPress={() => setDireccion('ABAJO')}>
          <Text style={styles.textoBoton}>⬇️</Text>
        </Pressable>
      </View>

      {/* Barra de estado del sistema (hora, batería...). style="auto"
          hace que sus letras sean claras u oscuras según el fondo. */}
      <StatusBar style="auto" />
    </View>
  );
}

// ============================================================
// ESTILOS
// StyleSheet.create recibe un objeto de JavaScript donde cada
// propiedad es el "nombre" de un estilo, y su valor son las reglas
// de diseño (parecido al CSS de las páginas web, pero escrito como
// un objeto: en vez de "background-color", se escribe "backgroundColor").
// Luego, cada estilo se usa así: style={styles.nombreDelEstilo}
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa el 100% del espacio disponible (toda la pantalla).
    backgroundColor: '#fff', // Fondo blanco.
    alignItems: 'center', // Centra los hijos en el eje horizontal.
    justifyContent: 'center', // Centra los hijos en el eje vertical.
    gap: 32, // Deja 32px de separación entre la "pantalla" y los "controles".
    padding: 24, // Deja un margen interno respecto a los bordes de la pantalla.
  },
  pantalla: {
    width: '100%', // Ocupa todo el ancho disponible.
    minHeight: 160, // Alto mínimo, para que no "salte" cuando cambia el texto.
    alignItems: 'center', // Centra la flecha y el texto horizontalmente.
    justifyContent: 'center', // Centra la flecha y el texto verticalmente.
  },
  flechaGrande: {
    fontSize: 80, // Tamaño de letra enorme, para que la flecha se note mucho.
  },
  textoGrande: {
    fontSize: 40, // Texto grande para el nombre de la dirección.
    fontWeight: 'bold', // Negrita.
  },
  textoAyuda: {
    fontSize: 18,
    color: '#888', // Gris, para que se note que es solo una ayuda/pista.
  },
  controles: {
    alignItems: 'center', // Centra las 3 filas (arriba, medio, abajo) horizontalmente.
    gap: 12, // Separación vertical entre esas 3 filas.
  },
  filaMedia: {
    flexDirection: 'row', // Pone sus hijos en fila horizontal (por defecto es vertical).
    gap: 80, // Espacio entre el botón izquierdo y el derecho, dejando hueco en medio.
  },
  boton: {
    backgroundColor: '#2563eb', // Azul.
    width: 64, // Ancho fijo del botón.
    height: 64, // Alto fijo del botón (igual al ancho, para que sea cuadrado).
    borderRadius: 32, // La mitad de 64: redondea tanto las esquinas que forma un círculo.
    alignItems: 'center', // Centra el emoji horizontalmente dentro del botón.
    justifyContent: 'center', // Centra el emoji verticalmente dentro del botón.
  },
  textoBoton: {
    fontSize: 28, // Tamaño del emoji dentro de cada botón.
  },
});
