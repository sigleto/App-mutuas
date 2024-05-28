import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AvisoDiasCotizados from './Avisos/AvisoDiasCotizados';

const DevolucionCalculator = ({
  importe,
  parteExenta,
  edad,
  minusvalia,
  setDevolucion
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const calcularDevolucion = () => {
    let pensionConsiderada = parseFloat(importe) - 2000 - parseFloat(parteExenta.split(' ')[2]);
    let impuestoTotal = 0;
    let ingresoTotal = pensionConsiderada;

    const escalasGravamen = [
      { limiteInf: 0, limiteSup: 12450, tipo: 19 },
      { limiteInf: 12450, limiteSup: 20200, tipo: 24 },
      { limiteInf: 20200, limiteSup: 35200, tipo: 30 },
      { limiteInf: 35200, limiteSup: 60000, tipo: 37 },
      { limiteInf: 60000, limiteSup: Infinity, tipo: 45 },
    ];

    for (let escala of escalasGravamen) {
      const tramoInferior = escala.limiteInf;
      const tramoSuperior = escala.limiteSup;
      const tipo = escala.tipo;

      if (ingresoTotal <= 0) break;

      let ingresosEnTramo = Math.min(ingresoTotal, tramoSuperior - tramoInferior);
      let impuestoEnTramo = ingresosEnTramo * (tipo / 100);

      impuestoTotal += impuestoEnTramo;
      ingresoTotal -= ingresosEnTramo;
    }

    let cuotaDelMinimo = 0;
    if (edad >= 65 && edad < 75 && minusvalia < 33) { cuotaDelMinimo = 1330; }
    else if (edad >= 75 && minusvalia < 33) { cuotaDelMinimo = 1600; }
    else if (edad >= 65 && edad < 75 && minusvalia >= 33 && minusvalia < 65) { cuotaDelMinimo = 1850; }
    else if (edad >= 65 && edad < 75 && minusvalia >= 65) { cuotaDelMinimo = 4000; }
    else if (edad > 75 && minusvalia >= 33 && minusvalia < 65) { cuotaDelMinimo = 2100; }
    else if (edad > 75 && minusvalia >= 65) { cuotaDelMinimo = 4592; }
    else if (edad < 65 && minusvalia >= 33 && minusvalia < 65) { cuotaDelMinimo = 1660; }
    else if (edad < 65 && minusvalia >= 65) { cuotaDelMinimo = 3500; }
    else { cuotaDelMinimo = 1077; }

    if (impuestoTotal - cuotaDelMinimo > 0) { impuestoTotal -= cuotaDelMinimo; }
    let tipoGravamenEfectivo = (impuestoTotal / pensionConsiderada) * 100;
    
    const tipoGravamenUno = tipoGravamenEfectivo;
    const tipoGravamenDos = ((impuestoTotal + parseFloat(parteExenta.split(' ')[2]) * (tipoGravamenUno / 100)) / pensionConsiderada) * 100;

    setDevolucion(`El tipo de gravamen inicial es del ${tipoGravamenDos.toFixed(2)}%. Restando la cantidad exenta de pensión, correspondería un tipo de gravamen del ${tipoGravamenUno.toFixed(2)}%.`);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    calcularDevolucion();
  };

  const handleCalcular = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <Button title="CALCULAR2" onPress={handleCalcular} />
      <AvisoDiasCotizados
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

export default DevolucionCalculator;
