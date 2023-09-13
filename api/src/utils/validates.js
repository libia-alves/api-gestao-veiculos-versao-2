class Validate {
    static isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    static isValidCPF(cpf) {
      // Validação de CPF
      if (typeof cpf !== 'string') return false;
      cpf = cpf.replace(/[\s.-]*/gim, ''); // Remove espaços, traços e pontos
      if (
        !cpf ||
        cpf.length !== 11 ||
        /^(\d)\1*$/.test(cpf) // Verifica se todos os dígitos são iguais
      )
        return false;
  
      let sum = 0;
      let remainder;
  
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
  
      remainder = (sum * 10) % 11;
  
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
  
      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
      }
  
      sum = 0;
  
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
  
      remainder = (sum * 10) % 11;
  
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
  
      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
      }
  
      return true;
    }
  
    static isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/; // Exemplo de regex para número de telefone com 10 dígitos
      return phoneRegex.test(phoneNumber);
    }
  
    static isValidPlaca(numeroPlaca) {
      const placaRegex = /^[A-Z]{3}-\d{4}$/; // Exemplo de regex para placa de veículo no formato XXX-9999
      return placaRegex.test(numeroPlaca);
    }
  
    static isValidDate(date) {
      // Validação de data (formato: DD/MM/AAAA)
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      return dateRegex.test(date);
    }
  
    static isValidHour(hour) {
      // Validação de hora (formato: HH:MM)
      const hourRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return hourRegex.test(hour);
    }
  }
  
  module.exports = { Validate };
  