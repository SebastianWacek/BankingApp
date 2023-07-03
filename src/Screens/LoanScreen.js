import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import { opacity } from 'styled-system';
import { fontWeight } from 'styled-system';

export default function LoanScreen({navigation}) {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [creditCapacity, setCreditCapacity] = useState('');

  let interestRate = 0.05;

  const handleLoanSubmission = () => {
    // Sprawdź, czy pola są wypełnione
    if (loanAmount === '' || loanTerm === '') {
      setIsDialogVisible(true);
      return;
    }

    // Przetwarzanie wniosku o pożyczkę
    setIsProcessing(true);

    // Symulacja przetwarzania wniosku po pewnym czasie
    setTimeout(() => {
      setIsProcessing(false);
      setIsDialogVisible(true);
      setLoanAmount('');
      setLoanTerm('');
    }, 2000);
  };

  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  const calculateCreditCapacity = (amount, term) => {
    const interestRate = 0.5; // Przykładowa stopa oprocentowania: 5%
    const installment =
      amount * (interestRate / 12) / (1 - Math.pow(1 + interestRate / 12, -term));
    return installment.toFixed(2);
  };

  const handleLoanAmountChange = (text) => {
    setLoanAmount(text);
    const capacity = calculateCreditCapacity(Number(text), Number(loanTerm));
    setCreditCapacity(capacity);
  };

  const handleLoanTermChange = (text) => {
    setLoanTerm(text);
    const capacity = calculateCreditCapacity(Number(loanAmount), Number(text));
    setCreditCapacity(capacity);
  };

  const isCreditCapacityVisible = loanAmount !== '' && loanTerm !== '';
  const clickHandler = () => {
    navigation.goBack()
}
  return (
    <Provider>
      <View style={styles.container}>
      <TouchableOpacity
                activeOpacity={3}
                onPress={clickHandler}
                style={styles.touchableOpacityStyle}>
                <Image
                    source={require('../Images/arrow.png')}
                    alt="ads"
                    style={styles.floatingButtonStyle}

                />
            </TouchableOpacity>
        <Text style={styles.title}>Wniosek o pożyczkę</Text>

        <TextInput
          style={styles.input}
          placeholder="Kwota pożyczki"
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={handleLoanAmountChange}
          placeholderTextColor='white'
        />

        <TextInput
          style={styles.input}
          placeholder="Okres pożyczki (w miesiącach)"
          keyboardType="numeric"
          value={loanTerm}
          onChangeText={handleLoanTermChange}
          placeholderTextColor='white'
        />

        <Text style={styles.interestRate}>Stopa oprocentowania to: {interestRate*100}%</Text>

        {isCreditCapacityVisible && (
          <Text style={styles.creditCapacityText}>
            Rata spłaty wyniesie: {creditCapacity} PLN/miesiąc
          </Text>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleLoanSubmission}
          disabled={isProcessing}
        >
          <Text style={styles.submitButtonText}>
            {isProcessing ? 'Przetwarzanie...' : 'Złóż wniosek'}
          </Text>
        </TouchableOpacity>

        <Portal>
          <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
            <Dialog.Title style={styles.dialogTitle}>Wniosek przyjęty</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>
                Wniosek o pożyczkę został przesłany. Nasz konsultant skontaktuje się z Tobą.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#534582'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:20,
    color: 'white'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'white',
    backgroundColor: '#7F86A2',
    fontWeight:'bold',
    fontSize:15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#89b6f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  creditCapacityText: {
    marginTop: 20,
    fontSize: 16,
    color: '#8df49b',
    fontWeight: 'bold',
    display: 'flex', 
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dialogText: {
    fontSize: 20,
  },
  interestRate: {
  marginTop:20,
  color: '#8df49b',
  fontWeight: 'bold'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 32,
},
floatingButtonStyle: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
}

});
