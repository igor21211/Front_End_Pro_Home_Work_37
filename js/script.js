let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
},
bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
      const viewBalance = confirm('View card balance?');
  
      if (viewBalance) {
        resolve(userData);
      } else {
        reject({ userData, bankData });
      }
    })
    .then((userBalance) => {
      let currency = prompt('Enter currency for balance:');
      console.log(userBalance);  
      
      if (currency === null) {
        throw new Error('Canceled by user');
      }
  
      while (!userBalance.hasOwnProperty(currency)) {
        currency = prompt('Enter a valid currency for balance:');
        if (currency === null) {
          throw new Error('Canceled by user');
        }
      }
  
      alert(`Balance is: ${userBalance[currency]} ${currency}`);
    })
    .catch(({ userData, bankData }) => {
      let withdrawalCurrency = prompt('Enter currency for withdrawal:');  
  
      if (withdrawalCurrency === null) {
        alert('Canceled by user');
        return;
      }
  
      if (bankData && bankData.hasOwnProperty(withdrawalCurrency) && bankData[withdrawalCurrency].max > 0) {
        let amount = parseFloat(prompt(`Enter amount to withdraw (min: ${bankData[withdrawalCurrency].min}, max: ${bankData[withdrawalCurrency].max}):`));
  
        if (isNaN(amount) || amount < bankData[withdrawalCurrency].min) {
            alert(`The entered amount is less than the allowed minimum. Minimum withdrawal amount: ${bankData[withdrawalCurrency].min}`);
        } else if (amount > bankData[withdrawalCurrency].max) {
            alert(`The entered amount is greater than the allowed maximum. Maximum withdrawal amount: ${bankData[withdrawalCurrency].max}`);
        } else {
            alert(`Here are your cash ${amount} ${withdrawalCurrency} ${bankData[withdrawalCurrency].img}`);
        }
      } else {
        alert(`Sorry, ${withdrawalCurrency} is not available at the moment.`);
      }
    })
    .finally(() => {
      alert('Thank you, have a nice day 😊');
    });
  }

  getMoney(userData, bankData);

