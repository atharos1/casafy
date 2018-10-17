var supportedValuesTranslation = {
  "auto": "Automático",
  "default": "Por defecto",
  "vacation": "Vacaciones",
  "party": "Fiesta",
  "normal": "Normal",
  "eco": "Ecológico",
  "off": "Apagado",
  "large": "Grande",
  "conventional": "Convencional",
  "top": "Arriba",
  "bottom": "Abajo",
  "cool": "Frío",
  "heat": "Calor",
  "fan": "Ventilador"
}

function getOriginal(value) {
  for (var key in supportedValuesTranslation) {
    if (supportedValuesTranslation[key].toLowerCase() == value.toLowerCase())
      return key;
  }
}
